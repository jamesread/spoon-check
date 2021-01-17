const ratingEmojis = [
	"&#x1f641", // Sad
	"&#x1f62c", // Eash
	"&#x1f642", // Happy
	"&#x2753"   // Don't know
]

export default class EntryForm extends HTMLElement {
	createElements() {
		var tpl = document.querySelector('template#entryFormTemplate').cloneNode(true).content
		this.appendChild(document.importNode(tpl, true))

		this.domLabel = this.querySelector("#label")
		this.domEmoji = this.querySelector("#emoji");
		this.domSlider = this.querySelector("input");

		this.domRateButtons = []

		var emojiIndex = 0;
		for (var emoji of ratingEmojis) {
			var button = document.createElement("button");
			button.classList += "icon"
			button.innerHTML = emoji;
			button.setAttribute("type", "button");
			button.onclick = e => {
				var v = e.target.innerHTML
			}

			this.querySelector("#rateButtons").appendChild(button);
		}

		this.questions = [];
		this.currentQuestion = -1;
	}

	onRate(v) {
		this.askQuestion();
	}

	addQuestion(txt, emoji) {
		this.questions.push({
			"txt": txt,
			"emoji": emoji
		})
	}

	askQuestion() {
		this.currentQuestion++;
		var question = this.questions[this.currentQuestion];

		this.domLabel.innerText = question['txt'] + '?';
		this.domEmoji.innerHTML = question['emoji'];
		this.domEmoji.setAttribute("title", question['txt'] + " icon")

		console.log(this.currentQuestion, this.questions.length - 1)

		for (var button of this.querySelectorAll("#rateButtons button")) {
			button.title = "Describe your " + question['txt'] + " as " + button.innerText;
		}

		if (this.currentQuestion == this.questions.length - 1) {
			while (this.firstChild) {
				this.removeChild(this.firstChild);
			}
		}
	}
}

window.customElements.define("entry-form", EntryForm);
