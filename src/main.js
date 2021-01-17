//import './modules/EntryForm.js'

//window.ef = document.createElement("entry-form");
//window.ef.createElements();
//document.body.querySelector("main").prepend(window.ef);

window.drainIcons = {
	"&#x1F6CC;": "Tiredness",  
	"&#x1F50A": "Sound",
	"&#x1F354;": "Hungry",
	"&#x1F476;": "Baby",
	"&#x1F375;": "Thirsty",
	"&#x1F3E5;": "Pain",
	"&#x1F464;": "Peopling",
	"&#x1F468;": "Need alone time",
	"&#x1F491;": "Need cuddles",
	"&#x1F3E2;": "Work",
	"&#x1F6BD;": "Toilet",
}

function onRate(v) {
	console.log("rate", v);

	var r = document.createElement("span");
	r.innerHTML = "&nbsp;" + window.drainIcons[v] + " " + v + " " + " <br />";

	document.body.querySelector("#ratings").appendChild(r)

	/*
	let noRatingHelpText = document.querySelector("#noRatingHelpText")

	if (noRatingHelpText != null) {
		noRatingHelpText.remove();
	}
	*/

	showResults();
}

function setupDrainIcons() {
	var iconArea = document.querySelector('#drainIcons');

	for (let icon of Object.keys(window.drainIcons)) {
		var foo = document.createElement('button');
		foo.classList += "icon"
		foo.innerHTML = icon;
		foo.onclick = () => {
			onRate(icon);
		}

		iconArea.appendChild(foo);
	}

	console.log("setup icons");
}

function showResults() {
	document.querySelector("div#ratings").hidden = false
	document.querySelector("p#resultsComplete").hidden = false

	window.location.hash = "#resultsComplete"
}

setupDrainIcons();

var copyResultsButton = document.querySelector("#copyResults");

if (copyResultsButton != null) {
	copyResultsButton.onclick = () => {
		let ta = document.createElement("textarea")
		ta.innerText = document.querySelector("#ratings").innerText
		document.body.appendChild(ta);
		ta.select();
		document.execCommand("copy")
		ta.remove();
		window.alert("Results copied! You can now paste it anywhere.")
	}
}

var pwaNote = document.querySelector("p#pwaNote");

if (pwaNote == null) {
	pwaNote = document.createElement("p")
	document.body.append(pwaNote)
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {
	reg.addEventListener("updatefound", () => {
		var newWorker = reg.installing;
		newWorker.addEventListener("statechange", () => {	
			switch (newWorker.state) {
				case "installed":
					if (navigator.serviceWorker.controller) {
						pwaNote.innerHTML = "You are using an app version of this page."
					} else {
						pwaNote.innerHTML = "PWA possible."
					}

					break;
				case '':
				case 'activating':
				case 'activated':
					return;
				default:
					pwaNote.innerHTML = "Unhandled worker state: " + newWorker.state
			}
		})
	})
  });
} else {
	pwaNote.innerHTML = "Your browser does not support installation of this page as an app (PWA)."
}
