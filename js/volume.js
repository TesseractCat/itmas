import { ShaderMaterial, CanvasTexture, DoubleSide } from 'three';

export class VolumeMaterial extends ShaderMaterial {
    topViews;
    frontViews;
    sideViews;

    constructor({topViews, frontViews, sideViews}) {
        super();

        this.topViews = topViews;
        this.frontViews = frontViews;
        this.sideViews = sideViews;
        
        this.uniforms["topViews"] = { type: "tv", value: topViews };
        this.uniforms["frontViews"] = { type: "tv", value: frontViews };
        this.uniforms["sideViews"] = { type: "tv", value: sideViews };

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
    return (p.x > 0.0 && p.y > 0.0 && p.z > 0.0 && p.x < 1.0 && p.y < 1.0 && p.z < 1.0);
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

void main() {
    gl_FragColor = vec4(1,1,1,1);

    Ray r = Ray(cameraPosition,
                normalize(v_position - cameraPosition),
                1.0/normalize(v_position - cameraPosition));

    Hit hit;
    intersectBox(vec3(-0.5,-0.5,-0.5), vec3(0.5,0.5,0.5), r, hit);
    vec3 a = r.origin + hit.tMin * r.dir;
    vec3 b = r.origin + hit.tMax * r.dir;

    for (float i = 0.0; i < 128.0; i++) {
        vec3 p = mix(a, b, i/128.0);
        vec3 mp = p + vec3(0.5,0.5,0.5);

        vec4 t = vec4(0,0,0,0);
        vec4 f = vec4(0,0,0,0);
        vec4 s = vec4(0,0,0,0);
        #pragma unroll_loop_start
        for (int i = 0; i < 4; i++) {
            t = texture2D(topViews[i], vec2(mp.x, 1.0 - mp.z));
            f = texture2D(frontViews[i], mp.xy);
            s = texture2D(sideViews[i], mp.zy);

            if (t.a > 0.5 && f.a > 0.5 && s.a > 0.5) {
                gl_FragColor = vec4((t.xyz + f.xyz + s.xyz)/3.0, 1);
                break;
            }
        }
        #pragma unroll_loop_end

        // vec3 border = abs(mp - vec3(0.5,0.5,0.5));
        // const float width = 0.48;
        // if (border.x > width && border.y > width && border.z > width) {
        //     gl_FragColor = vec4(0,0,0,1);
        //     break;
        // }
    }
}
`;
        this.side = DoubleSide;
    }
}
