import $ from 'jquery';
import blockEditorAllow from './block-editor-allow';
console.log('blue linden: snomod is loaded.');

// if the user is on the block editor, load the block editor script
if( $('.block-editor-page').length ) {
  console.log('blue linden: block editor detected.');
  // load the block editor script
  blockEditorAllow();
}