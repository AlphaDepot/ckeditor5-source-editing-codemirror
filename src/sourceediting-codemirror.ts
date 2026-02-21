import { Plugin } from 'ckeditor5';

// CodeMirror 6 imports
import {
    EditorView,
    lineNumbers,
    highlightActiveLine,
    highlightActiveLineGutter
} from '@codemirror/view';

import { EditorState, type Extension } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import {
    syntaxHighlighting,
    defaultHighlightStyle,
    indentOnInput,
    indentUnit
} from '@codemirror/language';
import { indentSelection } from '@codemirror/commands';

// Prettier 3 imports
import prettier from "prettier/standalone";
import * as prettierHtml from "prettier/plugins/html";
import * as prettierCss from "prettier/plugins/postcss";
import * as prettierTs from "prettier/plugins/typescript";
import * as prettierMarkdown from "prettier/plugins/markdown";
import * as prettierYaml from "prettier/plugins/yaml";

interface CodeMirrorConfig {
    extensions?: Extension[];
}

export default class SourceEditingCodeMirror extends Plugin {
    public static get pluginName() {
        return 'SourceEditingCodeMirror' as const;
    }

    public static get requires() {
        return [ 'SourceEditing' ] as const;
    }

    private view: EditorView | null = null;

    // Prettier 3 formatter
    private async formatWithPrettier(code: string): Promise<string> {
        return await prettier.format(code, {
            parser: "html",
            plugins: [
                prettierHtml,
                prettierCss,
                prettierTs,
                prettierMarkdown,
                prettierYaml
            ],
            tabWidth: 4,
            useTabs: false
        });
    }

    // Listen to SourceEditing mode changes
    public afterInit(): void {
        const editor = this.editor;
        const sourceEditing = editor.plugins.get('SourceEditing');

        this.listenTo(
            sourceEditing,
            'change:isSourceEditingMode',
            async (_evt, _name, isOn: boolean) => {
                if (isOn) {
                    await this.enableCodeMirror();
                } else {
                    this.disableCodeMirror();
                }
            }
        );
    }
    // Enable CodeMirror with Prettier formatting
    private async enableCodeMirror(): Promise<void> {
        const editor = this.editor;
        const sourceEditing = editor.plugins.get('SourceEditing');

        // Sync CKEditor → source view
        sourceEditing.updateEditorData();

        // Format HTML using Prettier 3
        const htmlData = await this.formatWithPrettier(editor.getData());

        const container = document.querySelector('.ck-source-editing-area');
        if (!container) return;

        const textarea = container.querySelector('textarea') as HTMLTextAreaElement | null;
        if (textarea) textarea.style.display = 'none';

        const cmDiv = document.createElement('div');
        cmDiv.classList.add('cm-wrapper');
        container.appendChild(cmDiv);

        const cmExtensions: Extension[] = [
            lineNumbers(),
            highlightActiveLine(),
            highlightActiveLineGutter(),
            syntaxHighlighting(defaultHighlightStyle),
            indentOnInput(),
            indentUnit.of('    ')
        ];

        const config = editor.config.get('sourceEditingCodeMirror') as CodeMirrorConfig;
        const extraExtensions = config?.extensions ?? [];

        this.view = new EditorView({
            state: EditorState.create({
                doc: htmlData,
                extensions: [
                    ...cmExtensions,
                    html(),
                    ...extraExtensions,
                    EditorView.updateListener.of(update => {
                        if (update.docChanged) {
                            editor.setData(update.state.doc.toString());
                        }
                    })
                ]
            }),
            parent: cmDiv
        });

        // Select entire document
        this.view.dispatch({
            selection: { anchor: 0, head: this.view.state.doc.length }
        });

        // Indent entire document (after Prettier formatting)
        indentSelection(this.view);
    }

    // Disable CodeMirror and show original textarea
    private disableCodeMirror(): void {
        if (this.view) {
            this.view.destroy();
            this.view = null;
        }

        const textarea = document.querySelector('.ck-source-editing-area textarea') as HTMLTextAreaElement | null;
        if (textarea) textarea.style.display = '';
    }
}