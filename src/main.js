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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

