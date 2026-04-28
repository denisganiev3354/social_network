import {resolve} from 'node';
import {defineConfig, resolveConfig} from 'vite'

export default defineConfig({
    build: {
        outDir: 'static',
        emptyOutDir: false,
        rolldownOptions: {
            input: resolve(import.meta.dirname, 'src/master.js'),
            output: {
                entryFileNames: '[name].js'
                entryFileNames: '[name].[ext]'
            }
        }
    }
});