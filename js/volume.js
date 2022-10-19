import { ShaderMaterial, CanvasTexture, DoubleSide } from 'three';
import { jumpFlood } from './jumpflood';

export const sampleVolumeSnippet = `
vec4 sampleVolume(vec3 p) { // p: (0-1, 0-1, 0-1)
    vec4 t = vec4(0,0,0,0);
    vec4 f = vec4(0,0,0,0);
    vec4 s = vec4(0,0,0,0);

    vec4 result = vec4(0,0,0,0);

    #pragma unroll_loop_start
    for (int i = 0; i < 4; i++) {
        t = texture2D(topViews[i], vec2(p.x, 1.0 - p.z));
        f = texture2D(frontViews[i], p.xy);
        s = texture2D(sideViews[i], p.zy);

        if (t.a > 0.5 && f.a > 0.5 && s.a > 0.5) {
            //result = vec4((t.xyz + f.xyz + s.xyz)/3.0, 1);
            result = vec4(f.xyz, 1);

            if (distance(f.xyz, s.xyz) < 0.01)
                result = vec4(f.xyz, 1);
            if (distance(t.xyz, f.xyz) < 0.01)
                result = vec4(t.xyz, 1);
            if (distance(t.xyz, s.xyz) < 0.01)
                result = vec4(t.xyz, 1);

            return result;
        }
    }
    #pragma unroll_loop_end

    return result;
}
`;

export const sampleNormalSnippet = `
float sampleDistance(vec3 p) { // p: (0-1, 0-1, 0-1)
    float t = 0.0;
    float f = 0.0;
    float s = 0.0;

    float result = 999.0;

    #pragma unroll_loop_start
    for (int i = 0; i < 4; i++) {
        t = texture2D(topViews[i], vec2(p.x, 1.0 - p.z)).a;
        f = texture2D(frontViews[i], p.xy).a;
        s = texture2D(sideViews[i], p.zy).a;

        result = min(result, min(t, min(f, s)));
    }
    #pragma unroll_loop_end

    return result;
}
float sampleDistanceBinary(vec3 p) {
    float t = 0.0;
    float f = 0.0;
    float s = 0.0;

    float result = 0.0;

    #pragma unroll_loop_start
    for (int i = 0; i < 4; i++) {
        t = texture2D(topViews[i], vec2(p.x, 1.0 - p.z)).a;
        f = texture2D(frontViews[i], p.xy).a;
        s = texture2D(sideViews[i], p.zy).a;

        if (t < 0.5 && f < 0.5 && s < 0.5) {
            result += 1.0;
        }
    }
    #pragma unroll_loop_end

    return result/4.0;
}

// https://iquilezles.org/articles/normalsSDF/
vec3 sampleNormal(vec3 p) {
    const float eps = 0.1; // or some other value
    const vec2 h = vec2(eps,0);
    return normalize( vec3(sampleDistanceBinary(p+h.xyy) - sampleDistanceBinary(p-h.xyy),
                           sampleDistanceBinary(p+h.yxy) - sampleDistanceBinary(p-h.yxy),
                           sampleDistanceBinary(p+h.yyx) - sampleDistanceBinary(p-h.yyx) ) );
}
`;

export class VolumeMaterial extends ShaderMaterial {
    renderer;

    topViews;
    frontViews;
    sideViews;

    constructor(renderer, {topViews, frontViews, sideViews}) {
        super();

        this.renderer = renderer;

        this.topViews = topViews;
        this.frontViews = frontViews;
        this.sideViews = sideViews;

        this.uniforms["topViews"] = { type: "tv", value: this.topViews };
        this.uniforms["frontViews"] = { type: "tv", value: this.frontViews };
        this.uniforms["sideViews"] = { type: "tv", value: this.sideViews };

        this.vertexShader = `
varying vec3 v_position;
varying vec2 v_uv;

void main() {
    v_position = (modelMatrix * vec4(position, 1)).xyz;
    v_uv = uv;

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition; 
}
`

        this.fragmentShader = `
uniform sampler2D topViews[4];
uniform sampler2D frontViews[4];
uniform sampler2D sideViews[4];

varying vec3 v_position;
varying vec2 v_uv;

struct Ray {
    vec3 origin;
    vec3 dir;
    vec3 invDir;
};
struct Hit {
    float tMin;
    float tMax;
};

bool inBox(vec3 p) {
    return (p.x > -0.5 && p.y > -0.5 && p.z > -0.5 && p.x < 0.5 && p.y < 0.5 && p.z < 0.5);
}

bool intersectBox(const vec3 boxMin, const vec3 boxMax, const Ray r, out Hit hit) {
    vec3 tbot = r.invDir * (boxMin - r.origin);
    vec3 ttop = r.invDir * (boxMax - r.origin);
    vec3 tmin = min(ttop, tbot);
    vec3 tmax = max(ttop, tbot);
    vec2 t = max(tmin.xx, tmin.yz);
    float t0 = max(t.x, t.y);
    t = min(tmax.xx, tmax.yz);
    float t1 = min(t.x, t.y);
    hit.tMin = t0;
    hit.tMax = t1;
    return t1 > max(t0, 0.0);
}

${sampleVolumeSnippet}
${sampleNormalSnippet}

void main() {
    gl_FragColor = vec4(1,1,1,1);

    Ray r = Ray(cameraPosition,
                normalize(v_position - cameraPosition),
                1.0/normalize(v_position - cameraPosition));

    Hit hit;
    intersectBox(vec3(-0.5,-0.5,-0.5), vec3(0.5,0.5,0.5), r, hit);
    vec3 a = r.origin + hit.tMin * r.dir;
    vec3 b = r.origin + hit.tMax * r.dir;

    if (inBox(cameraPosition))
        a = cameraPosition;

    for (float i = 0.0; i < 128.0; i++) {
        vec3 p = mix(a, b, i/128.0);
        vec3 mp = p + vec3(0.5,0.5,0.5);

        vec4 result = sampleVolume(mp);
        if (result.a > 0.0) {
            gl_FragColor = result;
            break;
        }
    }
}
`;
        this.side = DoubleSide;
    }
}
