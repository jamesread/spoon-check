const ratingEmojis = [
	"&#x1f641",
	"&#x1f62c",
	"&#x1f642",
	"&#x2753"
]

export default class EntryForm extends HTMLElement {
	createElements() {
		var tpl = document.querySelector('template#entryForm').cloneNode(true).content
		this.appendChild(document.importNode(tpl, true))

		this.domLabel = this.querySelector("#label")
		this.domEmoji = this.querySelector("#emoji");
		this.domSlider = this.querySelector("input");

		this.domRateButtons = []

		var emojiIndex = 0;
		for (var emoji of ratingEmojis) {
			var button = document.createElement("button");
			button.innerHTML = emoji;
			button.onclick = e => {
				var v = e.target.innerHTML
				this.onRate(v);
			}

			this.querySelector("#rateButtons").appendChild(button);
		}

		this.questions = [];
		this.currentQuestion = -1;
	}

	onRate(v) {
		var question = this.questions[this.currentQuestion];

		var r = document.createElement("div");
		r.innerHTML = question['txt'] + ": " + v

		document.body.querySelector("#ratings").appendChild(r)

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

		console.log(this.currentQuestion, this.questions.length - 1)

		if (this.currentQuestion == this.questions.length - 1) {
			while (this.firstChild) {
				this.removeChild(this.firstChild);
			}

			var msg = document.createElement("p");
			msg.innerHTML = "You checked your spoons! <br /><br /> Refresh this page if you want to do it again."
			this.appendChild(msg);
			document.body.querySelector("#ratings").hidden = false;
		}
	}
}

window.customElements.define("entry-form", EntryForm);
