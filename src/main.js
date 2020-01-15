import './modules/EntryForm.js'

window.ef = document.createElement("entry-form");
window.ef.createElements();

document.body.querySelector("main").prepend(window.ef);

window.ef.addQuestion("Tiredness", "&#x1F6CC;")
window.ef.addQuestion("Sounds", "&#x1F50A")
window.ef.addQuestion("Hunger", "&#x1F354;")
window.ef.addQuestion("Thirst", "&#x1F375;")
window.ef.addQuestion("Pain", "&#x1F3E5;")
window.ef.addQuestion("Peopling", "&#x1F464;")
window.ef.addQuestion("Toilet", "&#x1F6BD;")
window.ef.askQuestion();

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
