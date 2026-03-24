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
vec3 hash3(vec3 p) {
    // floatBitsToUint perfectly preserves bits. Every unique coordinate
    // will output a completely unique noise vector, forever.
    uvec3 v = floatBitsToUint(p);
    
    v = v * 1664525u + 1013904223u;
    v.x += v.y * v.z; 
    v.y += v.z * v.x; 
    v.z += v.x * v.y;
    v ^= v >> 16u;
    v.x += v.y * v.z; 
    v.y += v.z * v.x; 
    v.z += v.x * v.y;
    
    // Convert back to 0.0 -> 1.0 float range
    return vec3(v) * (1.0 / float(0xffffffffu));
}

float sampleDistanceBinary(vec3 p) { // p: (0-1, 0-1, 0-1)
    uvec4 t = texture2D(topViews[0], p.xz);
    uvec4 f = texture2D(frontViews[0], p.xy);
    uvec4 s = texture2D(sideViews[0], p.zy);

    float result = 0.0;

    #pragma unroll_loop_start
    for (int i = 0; i < ${LAYER_COUNT}; i++) {
        if (layerVisibility[i] == 1) {
            float filled = float(all(notEqual(uvec3(t[i], f[i], s[i]), uvec3(0u))));
            result = max(result, filled);
        }
    }
    #pragma unroll_loop_end

    return result;
}

float sampleDistance(vec3 p) {
    return sampleDistanceBinary(p);
}

// https://iquilezles.org/articles/normalsSDF/
vec3 sampleNormal(vec3 p) {
    // Determines the smoothness of the normals
    const float jitterRadius = 16.0 / 256.0;
    
    // Determines the noisiness of the normals
    const int samples = 32; 

    // Generate random rotation per voxel to hide banding,
    vec3 seed = round(p * 256.0 * 0.5);
    vec3 rand = hash3(seed) * 6.28318530718; 
    vec2 cx = vec2(cos(rand.x), sin(rand.x));
    vec2 cy = vec2(cos(rand.y), sin(rand.y));
    
    // 2D rotation matrices for X and Y axes
    mat2 rotX = mat2(cx.x, -cx.y, cx.y, cx.x);
    mat2 rotY = mat2(cy.x, -cy.y, cy.y, cy.x);

    vec3 normal = vec3(0.0);

    #pragma unroll_loop_start
    for (int i = 0; i < samples; i++) {
        float theta = 6.28318530718 * float(i) / 1.61803398875;
        float phi = acos(1.0 - 2.0 * (float(i) + 0.5) / float(samples));

        vec3 dir = vec3(sin(phi) * cos(theta), sin(phi) * sin(theta), cos(phi));

        // Apply our pixel's random rotation to the lattice
        dir.yz = rotX * dir.yz;
        dir.xz = rotY * dir.xz;

        //vec3 center = clamp(p + dir * jitterRadius, 0.0, 1.0);
        vec3 center = p + dir * jitterRadius;

        float s = sampleDistanceBinary(center);

        if (s > 0.0)
            normal += dir;
        else
            normal -= dir;
    }
    #pragma unroll_loop_end

    if (dot(normal, normal) < 1e-5) {
        return vec3(0.0, 1.0, 0.0);
    }

    return normalize(normal);
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
        this.uniforms["lightingEnabled"] = { value: 1 };

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
uniform int lightingEnabled;

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
${sampleNormalSnippet}

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
            if (lightingEnabled == 1) {
                vec3 normal = sampleNormal(vec3(mp.x, 1.0 - mp.y, mp.z));
                vec3 lightDir = vec3(-1.0, 1.0, -1.0);
                vec3 lightDir2 = vec3(1.0, 0.5, 1.0);
                // half lambert
                float ndl = dot(normal, normalize(lightDir));
                ndl = ndl * 0.5 + 0.5;
                float ndl2 = dot(normal, normalize(lightDir2));
                ndl2 = ndl2 * 0.5 + 0.5;
                float diff = clamp(ndl + ndl2 * 0.5, 0.0, 1.0);
                diff = smoothstep(diff, 0.2, 0.4);
                diff = clamp(diff * 1.3, 0.3, 1.0);
                gl_FragColor = vec4(result.rgb * diff, 1.0);
            } else {
                gl_FragColor = vec4(result.rgb, 1.0);
            }
            //gl_FragColor = vec4(normal, 1.0);
            gl_FragDepth = worldToDepth(p);
            break;
        }
    }
}
`;
        this.side = DoubleSide;
    }
}
