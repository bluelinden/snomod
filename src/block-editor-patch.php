<?php
/* SNO's default edit post script breaks on the block editor. so we're gonna do some rearranging! */
/* modification by blue linden */

add_action('admin_enqueue_scripts', function ($hook) {
	global $post;
	if ($hook == 'post-new.php' || $hook == 'post.php' || $hook == 'upload.php') {
		if ($hook == 'upload.php' || $post->post_type === 'post' || $post->post_type === 'page' || $post->post_type == 'infobox' || $post->post_type == 'attachment') {
			/* deactivate SNO's default edit post script */
			wp_dequeue_script('edit_post_script');

			/* get the path of their script */
			$editpostscript = ABSPATH . '/wp-content/themes/snoflex/javascript/edit-post-script.js';

			/* check if the script exists */
			if (file_exists($editpostscript)) {
				/* get the contents of the script */
				$editpostscripttext = file_get_contents($editpostscript);

				/* fix the script */
				$fixededitpostscripttext = "
				/* THIS VERSION OF SNO'S EDIT POST SCRIPT HAS A SPECIFIC CHECK DEACTIVATED ON THE BLOCK EDITOR. IT HAS BEEN INTENTIONALLY MODIFIED. */
				console.log('blue linden: unbeatable sno edit post script override active!');
				" . str_replace('!$(\'.wp-editor-area:visible\').length',  '!$(\'.wp-editor-area:visible\').length && !$(\'.block-editor-page\').length', $editpostscripttext);

				/* register and enqueue the script */
				wp_register_script('bluelinden_edit_post_script', false, array('jquery'));
				wp_localize_script( 'bluelinden_edit_post_script', 'backend_ajax_object', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
				wp_enqueue_script('bluelinden_edit_post_script');
				wp_add_inline_script('bluelinden_edit_post_script', $fixededitpostscripttext);
			}
		}
	}
});
