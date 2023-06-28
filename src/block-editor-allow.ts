import $ from "jquery";
import { addAutocompletes } from "./block-editor-autocomplete";

export default function blockEditorAllow() {
	// if the user hasn't converted an article's template to the July 2023 format, patch the convert button into the Gutenberg UI properly so they can do so without leaving the block editor.
	if ($(".convert-template").length !== 0) {
		$("body").on("click", ".convert-template", function () {
			$("#sno_convert_template").prop("checked", true);
			if ($(".editor-post-save-draft").text() == "Save draft") {
				$(".editor-post-save-draft").trigger("click");
				setTimeout(() => window.location.reload(), 1500);
			} else {
				$(".editor-post-publish-button").trigger("click");
				setTimeout(() => window.location.reload(), 1500);
			}
		});
	}

	// if using july 2023 template, add an alternate event listener to the header/footer customize checkbox and the customize story design checkbox

	// do that on gutenberg load
	if ($("input.customize-hf").is(":checked")) {
		$(".story-hf-options").show();
	} else {
		$(".story-hf-options").hide();
	}

	if ($("input.customize-template").is(":checked")) {
		$(".story-template-options").show();
	} else {
		$(".story-template-options").hide();
	}

	// do that on change
	$("body").on("change", "input.customize-hf", function () {
		if (this.checked) {
			// set customizable template option defaults based on template
			$(".story-hf-options").show();
		} else {
			$(".story-hf-options").hide();
		}
	});

	// displaying customizable template options
	$("body").on("change", "input.customize-template", function () {
		if ($(this).is(":checked")) {
			// set customizable template option defaults based on template
			set_customization_defaults();
			$(".story-template-options").show();
		} else {
			$(".story-template-options").hide();
		}
	});
	set_customization_defaults();
	function set_customization_defaults() {
		const template = $("input.story-template:checked").val();
		if (template == "fse") {
			$(".story-hf-design").hide();
		} else {
			$(".story-hf-design").show();
		}
		$(".story-template-options select").each(function () {
			$(this).val(
				$(this)
					.closest(".snodo-selectbox-wrap")
					.data(template as string)
			);
			const skip = $(this)
				.closest(".snodo-selectbox-wrap")
				.data("skip")
				.split(",");
			var selectbox = $(this).closest(".snodo-selectbox-wrap");
			selectbox.show();
			$.each(skip, function (index, value) {
				if (value == template) {
					selectbox.hide();
				}
			});
		});
		$(".story-color-selection").each(function () {
			const skip = $(this).data("skip").split(",");
			var colorbox = $(this);
			colorbox.show();
			$.each(skip, function (index, value) {
				if (value == template) {
					colorbox.hide();
				}
			});
		});
	}

	// when you change the template, stuff should reset.
	$("body").on("change", "input.story-template", function () {
		const sidebar_mode = $(this).data("sidebar-mode");
		switch (sidebar_mode) {
			case "dual":
				$(".story-sidebar-options").slideDown();
				$(".primary-sidebar-wrap").slideDown();
				$(".secondary-sidebar-wrap").slideDown();
				break;
			case "single":
				$(".story-sidebar-options").slideDown();
				$(".primary-sidebar-wrap").slideDown();
				$(".secondary-sidebar-wrap").slideUp();
				break;
			case "none":
				$(".story-sidebar-options").slideUp();
				$(".primary-sidebar-wrap").slideUp();
				$(".secondary-sidebar-wrap").slideUp();
				break;
		}
		$("select#story-sidebar-primary").val("default");
		$("select#story-sidebar-primary option.default-option").text(
			"Default (" + $(this).data("sidebar-primary-default-name") + ")"
		);
		$("select#story-sidebar-secondary").val("default");
		$("select#story-sidebar-secondary option.default-option").text(
			"Default (" + $(this).data("sidebar-secondary-default-name") + ")"
		);

		$("select#story_header").val("default");
		$("select#story_header option.default-option").text(
			"Default (" + $(this).data("header-default-name") + ")"
		);
		$("select#story_footer").val("default");
		$("select#story_footer option.default-option").text(
			"Default (" + $(this).data("footer-default-name") + ")"
		);

		if ($(this).data("photo-default") == "") {
			$("select#featureimage").closest(".snodo-input-wrap").slideUp();
		} else {
			$("select#featureimage").val($(this).data("photo-default"));
			$("select#featureimage").closest(".snodo-input-wrap").slideDown();
		}
		if ($(this).data("video-default") == "") {
			$("select#videolocation").closest(".snodo-input-wrap").slideUp();
		} else {
			$("select#videolocation").val($(this).data("video-default"));
			$("select#videolocation").closest(".snodo-input-wrap").slideDown();
		}
		if ($(this).val() == "split" || $(this).val() == "fulltop") {
			$(".sno-story-form-options").slideDown();
		} else {
			$(".sno-story-form-options").slideUp();
			if ($("input.use_alt_story_format").prop("checked") == true)
				$("input.use_alt_story_format").trigger("click");
		}
		if ($(this).val() == "fulltop") {
			$(".custom-field-mobile-image").slideDown();
		} else {
			$(".custom-field-mobile-image").slideUp();
		}

		// reset customizable template option defaults and selection whenever a template is changed
		set_customization_defaults();
	});

	// video embed code adder box manipulators
	$("body").on("click", ".sno-video-add", function () {
		$(this).hide();
		$(".custom-fields-video-content").show();
	});

	$(".custom-field-videographer-add").on("click", function (evt) {
		if ($(this).closest(".alt-story-wrapper").length) {
			var segment_id = $(this).closest(".sno-story-segment").data("id");
			$(this)
				.closest(".custom-fields-video-group")
				.find(".alt-story-videographers")
				.append(
					'<div class="custom-fields-videographer"><div class="snodo-input-wrap"><label>Embed/Video Credit Line</label><input class="videographer-autocomplete" name="segmentvideographers_' +
						segment_id +
						'[]" type="text"/><div class="custom-field-videographer-remove"><div class="fa fa-times-circle"></div></div></div>'
				);
		} else {
			$(this)
				.closest(".custom-fields-video-group")
				.find(".custom-fields-videographers")
				.append(
					'<div class="custom-fields-videographer"><div class="snodo-input-wrap"><label>Embed/Video Credit Line</label><input class="videographer-autocomplete" name="videographers[]" type="text" /><div class="custom-field-videographer-remove"><div class="fa fa-times-circle"></div></div></div></div>'
				);
		}
		$(this)
			.closest(".custom-fields-videographers")
			.find(".custom-fields-videographer")
			.last()
			.find("input")
			.trigger("focus");
		addAutocompletes();
	});

	$(document).on(
		"click",
		".custom-field-videographer-remove",
		function (evt) {
			$(this).closest(".custom-fields-videographer").remove();
		}
	);
}
