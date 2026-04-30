import { resolve } from 'node:path';
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'static',
        emptyOutDir: false,
        rolldownOptions: {
            input: resolve(import.meta.dirname, 'src/master.js'),
            output: {
                entryFileNames: '[name].js',
                assetileNames: '[name].[ext]'
            }
        }
    }
});