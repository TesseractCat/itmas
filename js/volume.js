import { ShaderMaterial, CanvasTexture, DoubleSide } from 'three';
import { jumpFlood } from './jumpflood';

export const LAYER_COUNT = 4;

export const sampleVolumeSnippet = `
float distSq(vec3 a, vec3 b) {
    vec3 d = a - b;
    return dot(d, d);
}

vec4 unpack_rgb16(uint color) {
    // Transparency
    if (color == 0u)
        return vec4(0.0);

    // Reserved black
    if (color == 1u)
        return vec4(0.0, 0.0, 0.0, 1.0);

    uint r5 = (color >> 11) & 0x1Fu;
    uint g6 = (color >> 5)  & 0x3Fu;
    uint b5 = color & 0x1Fu;

    // Expand to [0,1] with bit replication
    float r = float((r5 << 3) | (r5 >> 2)) / 255.0;
    float g = float((g6 << 2) | (g6 >> 4)) / 255.0;
    float b = float((b5 << 3) | (b5 >> 2)) / 255.0;

    return vec4(r, g, b, 1.0);
}

vec4 compare_colors(uvec4 f, uvec4 t, uvec4 s, int i) {
    vec4 f_u = unpack_rgb16(f[i]);
    vec4 t_u = unpack_rgb16(t[i]);
    vec4 s_u = unpack_rgb16(s[i]);
    vec4 result = f_u;

    float thresholdSq = 0.01 * 0.01;
    float d_fs = distSq(f_u.xyz, s_u.xyz);
    float d_tf = distSq(t_u.xyz, f_u.xyz);
    float d_ts = distSq(t_u.xyz, s_u.xyz);

    result = mix(result, t_u, step(d_tf, thresholdSq));
    result = mix(result, t_u, step(d_ts, thresholdSq));

    float visible = float(layerVisibility[i] != 0);
    float valid = float(all(notEqual(uvec3(t[i], f[i], s[i]), uvec3(0))));

    return result * visible * valid;
}

// a on top of b if a.a > 0
vec4 composite(vec4 a, vec4 b) {
    return mix(b, a, a.a);
}

vec4 sampleVolume(vec3 p) { // p: (0-1, 0-1, 0-1)
    uvec4 t = uvec4(0);
    uvec4 f = uvec4(0);
    uvec4 s = uvec4(0);

    vec4 result = vec4(0.0);

    t = texture2D(topViews[0], p.xz);
    if (any(notEqual(t, uvec4(0)))) {
    f = texture2D(frontViews[0], p.xy);
    if (any(notEqual(f, uvec4(0)))) {
    s = texture2D(sideViews[0], p.zy);
    if (any(notEqual(s, uvec4(0)))) {

        result =
            composite(
                compare_colors(f, t, s, 0),
                composite(
                    compare_colors(f, t, s, 1),
                    composite(
                        compare_colors(f, t, s, 2),
                        compare_colors(f, t, s, 3)
                    )
                )
            );

        //if (compare_colors(f, t, s, 0, result)) {
        //} else if (compare_colors(f, t, s, 1, result)) {
        //} else if (compare_colors(f, t, s, 2, result)) {
        //} else if (compare_colors(f, t, s, 3, result)) {
        //}

    }}}

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
    for (int i = 0; i < ${LAYER_COUNT}; i++) {
        if (layerVisibility[i] == 1) {

        t = texture2D(topViews[i], vec2(p.x, 1.0 - p.z)).a;
        f = texture2D(frontViews[i], p.xy).a;
        s = texture2D(sideViews[i], p.zy).a;

        result = min(result, min(t, min(f, s)));

        }
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
    for (int i = 0; i < ${LAYER_COUNT}; i++) {
        if (layerVisibility[i] == 1) {

        t = texture2D(topViews[i], vec2(p.x, 1.0 - p.z)).a;
        f = texture2D(frontViews[i], p.xy).a;
        s = texture2D(sideViews[i], p.zy).a;

        if (t < 0.5 && f < 0.5 && s < 0.5) {
            result += 1.0;
        }

        }
    }
    #pragma unroll_loop_end

    return result/${LAYER_COUNT}.0;
}

// https://iquilezles.org/articles/normalsSDF/
vec3 sampleNormal(vec3 p) {
    return vec3(1,0,0);
    // const float eps = 0.1; // or some other value
    // const vec2 h = vec2(eps,0);
    // return normalize( vec3(sampleDistanceBinary(p+h.xyy) - sampleDistanceBinary(p-h.xyy),
    //                        sampleDistanceBinary(p+h.yxy) - sampleDistanceBinary(p-h.yxy),
    //                        sampleDistanceBinary(p+h.yyx) - sampleDistanceBinary(p-h.yyx) ) );
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
        this.uniforms["layerVisibility"] = { value: Array(LAYER_COUNT).fill(1) };

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
precision mediump usampler2D;
uniform usampler2D topViews[${LAYER_COUNT/4}];
uniform usampler2D frontViews[${LAYER_COUNT/4}];
uniform usampler2D sideViews[${LAYER_COUNT/4}];
uniform int layerVisibility[${LAYER_COUNT}];

varying vec3 v_position;
varying vec2 v_uv;

uniform mat4 projectionMatrix;

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

float worldToDepth(const vec3 worldPos) {
    vec4 clip = projectionMatrix * viewMatrix * vec4(worldPos, 1.0);

    // NDC (−1..1)
    vec3 ndc = clip.xyz / clip.w;

    // Convert NDC z to depth buffer value (0..1)
    float depth = ndc.z * 0.5 + 0.5;

    return depth;
}

float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

${sampleVolumeSnippet}

void main() {
    gl_FragColor = vec4(1,1,1,1);
    gl_FragDepth = 1.0;

    Ray r = Ray(cameraPosition,
                normalize(v_position - cameraPosition),
                1.0/normalize(v_position - cameraPosition));

    Hit hit;
    intersectBox(vec3(-0.5,-0.5,-0.5), vec3(0.5,0.5,0.5), r, hit);
    vec3 a = r.origin + hit.tMin * r.dir;
    vec3 b = r.origin + hit.tMax * r.dir;

    if (inBox(cameraPosition))
        a = cameraPosition;

    float density = 128.0;
    float rl = distance(a, b)/1.73; // ray length 0-1 with the maximum length being cube diagonal
    int steps = clamp(int(rl * density), 2, 128);
    steps = int(ceil(float(steps)/16.0))*16; // Quantize to minimize divergence

    vec3 stepVector = (b - a) / float(steps);
    float jitter = rand(gl_FragCoord.xy);
    vec3 p = a + (stepVector * jitter);

    //gl_FragColor = vec4(vec3(float(steps)/128.0), 1.0);
    //return;

    for (int i = 0; i < 128; i++) {
        if (i >= steps) break;
        p += stepVector;
        vec3 mp = p + vec3(0.5,0.5,0.5);

        vec4 result = sampleVolume(vec3(mp.x, 1.0 - mp.y, mp.z));
        if (result.a > 0.0) {
            gl_FragColor = result;
            gl_FragDepth = worldToDepth(p);
            break;
        }
    }
}
`;
        this.side = DoubleSide;
    }
}
