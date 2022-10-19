import { Texture, DataTexture, Vector2 } from 'three';
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js';

const packSnippet = `
// float packUvec2(uvec2 p) {
//     return float((p.x << 8) | (p.y & uint(0xff)));
// }
// uvec2 unpackUvec2(uint p) {
//     return uvec2((p & uint(0xff00)) >> 8, p & uint(0xff));
// }
float packUvec2(uvec2 p) {
    return float(((p.x << 16) & uint(0xffff0000)) | (p.y & uint(0xffff))) + 1.0;
}
uvec2 unpackUvec2(uint p) {
    return uvec2(((p - uint(1)) & uint(0xffff0000)) >> 16,
                 (p - uint(1)) & uint(0xffff));
}
`;

export function jumpFlood(renderer, texture) {
    const gpuCompute = new GPUComputationRenderer(256, 256, renderer);
    let ping = gpuCompute.createRenderTarget();
    let pong = gpuCompute.createRenderTarget();

    const error = gpuCompute.init();
    if (error !== null)
        console.error(error);

    const preprocessMaterial = gpuCompute.createShaderMaterial(`
${packSnippet}

uniform sampler2D i;

void main() {
    vec4 p = texture2D(i, gl_FragCoord.xy/resolution.xy);
    if (p.a > 0.0)
        p.a = packUvec2(uvec2(gl_FragCoord.xy));
    gl_FragColor = p;
}
`, {
    i: { value: texture }
});
    gpuCompute.doRenderTarget(preprocessMaterial, ping);

    const jumpFloodMaterial = gpuCompute.createShaderMaterial(`
uniform int k;
uniform sampler2D i;

${packSnippet}

void main() {
    vec4 p = texture2D(i, gl_FragCoord.xy/resolution.xy);

    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            ivec2 offset = ivec2(gl_FragCoord.xy) + ivec2(x, y) * k;
            offset = clamp(offset, ivec2(0,0), ivec2(resolution.xy) - ivec2(1, 1));

            vec4 q = texture2D(i, vec2(offset)/resolution.xy);
            if (p.a == 0.0 && q.a > 0.0) {
                p = q;
            } else if (p.a > 0.0 && q.a > 0.0) {
                vec2 s = vec2(unpackUvec2(uint(p.a)));
                vec2 sPrime = vec2(unpackUvec2(uint(q.a)));

                if (distance(gl_FragCoord.xy, s) > distance(gl_FragCoord.xy, sPrime))
                    p = q;
            }
        }
    }

    if (k == 1) {
        vec2 s = vec2(unpackUvec2(uint(p.a)));
        vec2 v = gl_FragCoord.xy - s;
        //p.a = 1.0 - distance(gl_FragCoord.xy, s)/256.0;
        p.a = 1.0 - dot(v, v)/256.0;
    }

    gl_FragColor = p;
}
`, {
    k: { value: null },
    i: { value: ping.texture }
});
    for (let k = 256/2; k >= 1; k /= 2) {
        jumpFloodMaterial.uniforms.k.value = k;

        gpuCompute.doRenderTarget(jumpFloodMaterial, pong);
        [ping, pong] = [pong, ping];
        jumpFloodMaterial.uniforms.i.value = ping.texture;
    }

    return ping;
}
