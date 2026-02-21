/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
	ClassicEditor,
	Bold,
	Essentials,
	Heading,
	Italic,
	Paragraph,
	List,
    SourceEditing
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import SourceEditingCodeMirror from '../src/sourceediting-codemirror';
import '../src/sourceediting-codemirror.css';


ClassicEditor
	.create( document.querySelector<HTMLElement>( '#editor' )!, {
		plugins: [ Essentials, Paragraph, Heading, List, Bold, Italic, SourceEditingCodeMirror,SourceEditing ],
		toolbar: [ 'SourceEditing', 'heading', 'bold', 'italic', 'numberedList',  'bulletedList' ],
		licenseKey: 'GPL'
	} )
	.then( editor => {
		window.editor = editor;
		console.log( 'Editor was initialized', editor );
	})
	.catch( error => {
		console.error( error.stack );
	});