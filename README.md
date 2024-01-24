# SNOmod

Hi. I'm blue linden, web manager at The Verdict. Our newspaper is all about being at the cutting edge of the student newspaper space.

This repo contains some of the scripts we load on our site to give us more control over its operation. It allows internal plugins written by the SNO team to be used by web administrators, and unbreaks the block editor when used with their new story template system.

It does not contain any files from SNO's theme and plugins. It simply patches the specified features in-place on each load. Nothing here modifies any files on their servers or your site.

It's technically production-ready, but you should still be mindful about using it in a way that won't break their servers. While their security is pretty good, they never intended for users to have access to their internal tools, _especially_ the debugging tools.

The block editor fixer (block-editor-patch.php) is production ready.

For safety reasons you need to apply these fixes on your own. Install a code snippet management plugin to do so.
