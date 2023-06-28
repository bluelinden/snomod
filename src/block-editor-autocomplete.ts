declare const staff_profiles: string[];

export function addAutocompletes() {
	$(".writer-autocomplete").map(function () {
		autocomplete(this as HTMLInputElement, staff_profiles);
	});
	$(".videographer-autocomplete").map(function () {
		autocomplete(this as HTMLInputElement, staff_profiles);
	});
	$(".photographer-autocomplete").map(function () {
		autocomplete(this as HTMLInputElement, staff_profiles);
	});
}

export function autocomplete(inp: HTMLInputElement, arr: string[]) {
	/*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
	let currentFocus: number;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function () {
		let a: HTMLDivElement,
			b: HTMLDivElement,
			i: number,
			val: string = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) {
			return false;
		}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("div");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode!.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (
				arr[i].substring(0, val.length).toUpperCase() ==
				val.toUpperCase()
			) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("div");
				/*make the matching letters bold:*/
				b.innerHTML =
					"<strong>" + arr[i].substring(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substring(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function () {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					$("input").trigger("blur");
					/*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});

	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function (e: KeyboardEvent) {
		const element = document.getElementById(this.id + "autocomplete-list");
		let x: HTMLCollectionOf<HTMLDivElement> | null;
		if (element) {
			x = element.getElementsByTagName("div");
		} else {
			x = null;
		}
		if (e.key === "ArrowDown") {
			/*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/

			if (x !== null) addActive(x);
		} else if (e.key === "ArrowUp") {
			//up
			/*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			if (x !== null) addActive(x);
		} else if (e.key === "Enter") {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (x) x[currentFocus].click();
			}
		}
	});
	function addActive(x: HTMLCollectionOf<HTMLDivElement>) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x: HTMLCollectionOf<HTMLDivElement>) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt?: HTMLElement) {
		/*close all autocomplete lists in the document,
    except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode!.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e: MouseEvent) {
		closeAllLists(e.target as HTMLElement);
	});
}

$(document).on("click", ".custom-field-videographer-remove", function () {
	$(this).closest(".custom-fields-videographer").remove();
});

$(".custom-fields-writer").on("blur", ".writer-autocomplete", function (evt) {
	let writer_name = evt.target.value;
	$(this)
		.closest(".custom-fields-writer")
		.find(".staff-profile-alert")
		.remove();
	if (writer_name == "") return;
});

$("#custom-fields-writer").on("click", ".create-profile-no", function () {
	$(this)
		.closest(".custom-fields-writer")
		.find(".staff-profile-alert")
		.remove();
});

$("#custom-fields-videographer").on(
	"blur",
	".videographer-autocomplete",
	function (evt) {
		let writer_name = evt.target.value;
		$(this)
			.closest("#custom-fields-videographer")
			.find(".staff-profile-alert")
			.remove();
		if (writer_name == "") return;
	}
);

$("#custom-fields-videographer").on("click", ".create-profile-no", function () {
	$(this)
		.closest("#custom-fields-videographer")
		.find(".staff-profile-alert")
		.remove();
});

$("#custom-fields-photographer").on(
	"blur",
	".photographer-autocomplete",
	function (evt) {
		let photographer_name = evt.target.value;
		$(this)
			.closest("#custom-fields-photographer")
			.find(".staff-profile-alert")
			.remove();
		if (photographer_name == "") return;
	}
);

$("#custom-fields-photographer").on("click", ".create-profile-no", function () {
	$(this)
		.closest("#custom-fields-photographer")
		.find(".staff-profile-alert")
		.remove();
});

$(document).on("focus", ".photographer-autocomplete", function () {
	$(".photographer-autocomplete").map(function () {
		autocomplete(this as HTMLInputElement, staff_profiles);
	});
});
