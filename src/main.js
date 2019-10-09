import './modules/EntryForm.js'

window.ef = document.createElement("entry-form");
window.ef.createElements();

//document.body.querySelector("#ratings").hidden = true;
document.body.querySelector("main").appendChild(window.ef);

window.ef.addQuestion("Tiredness", "&#x1F6CF;")
window.ef.addQuestion("Hunger", "&#x1F354;")
window.ef.addQuestion("Thirst", "&#x1F375;")
window.ef.addQuestion("Pain", "&#x1F631;")
window.ef.addQuestion("Peopling", "&#x1F464;")
window.ef.addQuestion("Toilet", "&#x1F6BD;")
window.ef.askQuestion();
