import { build } from 'esbuild';
import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';
import { cp, mkdir, rm } from 'fs/promises';
import path from 'path';

const outdir = 'dist';
const isWatch = process.argv.includes('--watch');
const staticEntries = ['index.html', 'index.css', 'icons', 'images', 'models'];

await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });

await Promise.all(
    staticEntries.map((entry) =>
        cp(entry, path.join(outdir, entry), { recursive: true })
    )
);

await build({
    plugins: [inlineWorkerPlugin()],
    bundle: true,
    minify: true,
    target: ['chrome58'],
    outfile: path.join(outdir, 'bundle.js'),
    watch: isWatch,
    entryPoints: ['js/index.js'],
});
