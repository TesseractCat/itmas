import { build } from 'esbuild';
import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';

await build({
    plugins: [inlineWorkerPlugin()],
    bundle: true,
    minify: true,
    target: ['chrome58'],
    outfile: 'bundle.js',
    watch: process.argv.includes('--watch'),
    entryPoints: ['js/index.js'],
});