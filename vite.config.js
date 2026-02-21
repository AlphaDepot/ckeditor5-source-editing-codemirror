import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: 'Sample',

    build: {
        // Build from project root, not Sample/
        outDir: '../dist',
        emptyOutDir: false,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'SourceEditingCodeMirror',
            fileName: 'sourceediting-codemirror',
            formats: ['es']   // You only need ESM for CKEditor
        },
        rollupOptions: {
            external: [
                'ckeditor5',
                '@codemirror/view',
                '@codemirror/state',
                '@codemirror/language',
                '@codemirror/lang-html',
                'prettier/standalone',
                'prettier/plugins/html',
                'prettier/plugins/postcss',
                'prettier/plugins/typescript',
                'prettier/plugins/markdown',
                'prettier/plugins/yaml'
            ],
            output: {
                globals: {
                    'ckeditor5': 'CKEditor',
                    '@codemirror/view': 'CodeMirrorView',
                    '@codemirror/state': 'CodeMirrorState',
                    '@codemirror/language': 'CodeMirrorLanguage',
                    '@codemirror/lang-html': 'CodeMirrorHtml',
                    'prettier/standalone': 'prettier',
                    'prettier/plugins/html': 'prettierHtml',
                    'prettier/plugins/postcss': 'prettierPostCss',
                    'prettier/plugins/typescript': 'prettierTs',
                    'prettier/plugins/markdown': 'prettierMarkdown',
                    'prettier/plugins/yaml': 'prettierYaml'
                }
            }

        }
    },

});