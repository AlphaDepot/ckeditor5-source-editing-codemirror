# CKEditor 5 Source Editing with CodeMirror

A powerful CKEditor 5 plugin that integrates CodeMirror 6 as the source editing interface, providing enhanced code editing capabilities with syntax highlighting, line numbers, and automatic code formatting via Prettier.

## Features

- **CodeMirror 6 Integration**: Modern, feature-rich code editor for HTML source editing
- **Syntax Highlighting**: Beautiful syntax highlighting for HTML code with support for multiple languages
- **Line Numbers**: Easy reference and navigation with visible line numbers
- **Prettier Formatting**: Automatic code formatting with Prettier 3 supporting:
  - HTML
  - CSS/SCSS
  - TypeScript/JavaScript
  - Markdown
  - YAML
- **Active Line Highlighting**: Visual indicator of the current editing line
- **Smart Indentation**: Automatic and intelligent indentation support
- **Seamless Integration**: Works directly with CKEditor 5's SourceEditing plugin

## Installation

Install the package using npm:

```bash
npm install ckeditor5-source-editing-codemirror
```

## Usage

### Basic Setup

```typescript
import ClassicEditor from 'ckeditor5/ckeditor5-editor-classic/src/classiceditor';
import Essentials from 'ckeditor5/ckeditor5-essentials/src/essentials';
import SourceEditing from 'ckeditor5/ckeditor5-source-editing/src/sourceediting';
import SourceEditingCodeMirror from 'ckeditor5-source-editing-codemirror';

ClassicEditor.create(document.querySelector('#editor'), {
    plugins: [
        Essentials,
        SourceEditing,
        SourceEditingCodeMirror
    ],
    toolbar: ['sourceEditing']
})
.catch(error => console.error(error));
```

### Configuration

You can customize CodeMirror behavior by providing configuration options:

```typescript
ClassicEditor.create(document.querySelector('#editor'), {
    plugins: [
        Essentials,
        SourceEditing,
        SourceEditingCodeMirror
    ],
    sourceEditingCodeMirror: {
        extensions: [
            // Add additional CodeMirror extensions here
        ]
    }
})
.catch(error => console.error(error));
```


## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the project
- `npm run preview` - Preview the build
- `npm run test` - Run Playwright tests
- `npm run test:ui` - Run tests with interactive UI

### Project Structure

```
src/
├── index.ts                      # Main entry point
├── sourceediting-codemirror.ts   # Main plugin implementation
└── sourceediting-codemirror.css  # Plugin styles
playwright/
└── source-editing-code-mirror.spec.ts # End-to-end tests
Sample/
├── index.html                    # Sample application
└── main.ts                       # Sample entry point
```

## How It Works

1. When the SourceEditing mode is activated in CKEditor 5, this plugin automatically replaces the default textarea with a CodeMirror instance
2. The HTML content is automatically formatted using Prettier before being displayed in CodeMirror
3. As you edit the code in CodeMirror, changes are synchronized back to the CKEditor instance in real-time
4. When exiting source editing mode, the CodeMirror instance is destroyed and the original textarea is restored

## Versioning

This package uses **semantic versioning aligned with CKEditor 5's SourceEditing plugin** to ensure compatibility. Each release of this plugin is designed to work with the corresponding version of the SourceEditing plugin.

