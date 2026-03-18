import { build } from 'esbuild';
import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';
import { watch } from 'fs';
import { cp, mkdir, rm } from 'fs/promises';
import path from 'path';

const outdir = 'dist';
const isWatch = process.argv.includes('--watch');
const staticEntries = ['index.html', 'index.css', 'bundle.js.map', 'icons', 'images', 'models'];

async function copyStaticEntry(entry) {
    try {
        await cp(entry, path.join(outdir, entry), { recursive: true });
    } catch (error) {
        console.warn(`Failed to copy ${entry}`, error);
    }
}

async function copyStaticEntries() {
    await Promise.all(staticEntries.map(copyStaticEntry));
}

await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });

await copyStaticEntries();

if (isWatch) {
    staticEntries.forEach((entry) => {
        watch(entry, { recursive: true }, () => {
            copyStaticEntry(entry);
        });
    });
}

await build({
    plugins: [inlineWorkerPlugin()],
    sourcemap: "linked",
    bundle: true,
    minify: true,
    target: ['chrome58'],
    outfile: path.join(outdir, 'bundle.js'),
    watch: isWatch,
    entryPoints: ['js/index.js'],
});
