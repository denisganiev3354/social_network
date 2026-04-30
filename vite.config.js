import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    build: {
        outDir: 'static',
        emptyOutDir: false,
        sourcemap: true,
        rolldownOptions: {
            input: resolve(import.meta.dirname, 'src/master.jsx'),
            output: {
                entryFileNames: '[name].js',
                assetileNames: '[name].[ext]'
            }
        }
    },
    plugins: [react()]
});