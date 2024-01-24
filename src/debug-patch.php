<?php

/**
 * Patch the SNO Debugger plugin to allow any administrator of the site to use it
 * THIS MODIFICATION IS IN NO WAY ENDORSED OR SUPPORTED BY SNO. IF YOU BREAK YOUR SITE USING THEIR DEBUGGER IT IS YOUR FAULT.
 */
function registerDebugSnomodPatched(): void
{
	if (class_exists('SNO_DEBUG\\inc\\Init')) {
		$user = wp_get_current_user();
		$name = $user->user_login;

		/* don't run if snoadmin bc snoadmin has already run it */
		if ($name == 'snoadmin') {
			return;
		}
		/* only run if administrator */
		if (!current_user_can('administrator')) {
			return;
		}
		\SNO_DEBUG\inc\Init::register_services();
	}
}

add_action('plugins_loaded', 'registerDebugSnomodPatched');
