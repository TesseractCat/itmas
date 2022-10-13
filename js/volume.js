import { ShaderMaterial, CanvasTexture, DoubleSide } from 'three';

export class VolumeMaterial extends ShaderMaterial {
    topView;
    frontView;
    sideView;

    constructor({topView, frontView, sideView}) {
        super();

        this.topView = topView;
        this.frontView = frontView;
        this.sideView = sideView;
        
        this.uniforms["topView"] = { value: topView };
        this.uniforms["frontView"] = { value: frontView };
        this.uniforms["sideView"] = { value: sideView };

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
uniform sampler2D topView;
uniform sampler2D frontView;
uniform sampler2D sideView;

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

        vec4 t = texture2D(topView, mp.xz);
        vec4 f = texture2D(frontView, mp.xy);
        vec4 s = texture2D(sideView, mp.zy);
        if (t.a > 0.5 && f.a > 0.5 && s.a > 0.5) {
            gl_FragColor = vec4((t.xyz + f.xyz + s.xyz)/3.0, 1);
            break;
        }

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
