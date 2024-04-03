// import './modules/EntryForm.js'

// window.ef = document.createElement("entry-form");
// window.ef.createElements();
// document.body.querySelector("main").prepend(window.ef);

window.drainIcons = {
  '&#x1F6CC;': 'Tiredness',
  '&#x1F50A;': 'Sound',
  '&#x1F354;': 'Hungry',
  '&#x1F476;': 'Baby',
  '&#x1F375;': 'Thirsty',
  '&#x1F3E5;': 'Pain',
  '&#x1F464;': 'Peopling',
  '&#x1F468;': 'Need alone time',
  '&#x1F491;': 'Need cuddles',
  '&#x1F3E2;': 'Work',
  '&#x1F6BD;': 'Toilet'
}

function onRate (v) {
  console.log('rate', v)

  const r = document.createElement('span')
  r.innerHTML = '' + window.drainIcons[v] + ' ' + v + ' ' + ' <br />'

  document.body.querySelector('#ratings').appendChild(r)

  /*
  let noRatingHelpText = document.querySelector("#noRatingHelpText")

  if (noRatingHelpText != null) {
    noRatingHelpText.remove();
  }
  */

  showResults()
}

function setupDrainIcons () {
  const iconArea = document.querySelector('#drainIcons')

  for (const iconKey of Object.keys(window.drainIcons)) {
    const btn = document.createElement('button')
    btn.classList += 'icon'
    btn.setAttribute('title', window.drainIcons[iconKey])
    btn.innerHTML = iconKey
    btn.onclick = () => {
      onRate(iconKey)
    }

    iconArea.appendChild(btn)
  }

  console.log('Icon buttons setup completed.')
}

function showResults () {
  document.querySelector('div#ratings').hidden = false
  document.querySelector('p#resultsComplete').hidden = false

  window.location.hash = '#resultsComplete'
}

setupDrainIcons()

const copyResultsButton = document.querySelector('#copyResults')

if (copyResultsButton != null) {
  copyResultsButton.onclick = () => {
    const ta = document.createElement('textarea')
    ta.textContent = document.querySelector('#ratings').innerText
    ta.textContent += '\n\n' + 'https://spoon-check.5apps.com'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
    window.alert('Results copied! You can now paste it anywhere.')
  }
}

let pwaNote = document.querySelector('p#pwaNote')

if (pwaNote == null) {
  pwaNote = document.createElement('p')
  document.body.append(pwaNote)
}

if ('serviceWorker' in navigator) {
  const swUrl = new URL('sw.js')
  navigator.serviceWorker.register(swUrl).then(reg => {
    reg.addEventListener('updatefound', () => {
      reg.update()

      const newWorker = reg.installing
      newWorker.addEventListener('statechange', () => {
        switch (newWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              pwaNote.innerHTML = 'You are using an app version of this page.'
            } else {
              pwaNote.innerHTML = 'PWA possible.'
            }

            break
          case 'redundant':
            console.log('SW became redundant')
            break
          case '':
          case 'waiting':
          case 'activating':
          case 'activated':
            return
          default:
            pwaNote.innerHTML = 'Unhandled worker state: ' + newWorker.state
        }
      })
    })
  })
} else {
  pwaNote.innerHTML = 'Your browser does not support installation of this page as an app (PWA).'
}
