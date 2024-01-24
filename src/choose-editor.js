const postNewLinks = document.querySelectorAll('a[href*="post-new.php"]');


postNewLinks.forEach(function (link) {
	link.addEventListener('click', async function (event) {
		event.preventDefault();
		Swal.fire({
			title: 'Choose Your Editor',
			text: 'Pick the editor you\'d like to use. Need simplicity? Go standard. Want to make a super cool layout? Use the new editor. If you haven\'t learned how to use the new editor, just go with the classic editor.',
			icon: 'question',
			showDenyButton: true,
			confirmButtonColor: '#3a3',
			denyButtonColor: '#33d',
			confirmButtonText: 'New editor',
			denyButtonText: 'Classic editor'
		}).then((result) => {
			if (result.isConfirmed) {
				// handle Block Editor selection
				console.log('Block Editor chosen!');
				// now, you can redirect to post-new.php or do whatever you need
				// get link url
				const blockUrl = new URL(link.href);
				// add editor=block to url
				blockUrl.searchParams.set('classic-editor__forget', 'true');
				// redirect
				window.location.href = blockUrl.href;
			} else if (result.isDenied) {
				// handle Classic Editor selection
				console.log('Classic Editor chosen!');
				// same here, redirect or customize based on choice
				const classicUrl = new URL(link.href);
				classicUrl.searchParams.set('classic-editor', '');
				classicUrl.searchParams.set('classic-editor__forget', '');
				window.location.href = classicUrl.href;
			}
		});
	});


});