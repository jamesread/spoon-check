function onClickDrainIconButton (btn) {
  if (btn.classList.contains('selected')) {
    btn.classList.remove('selected')
  } else {
    btn.classList.add('selected')
  }

  document.querySelector('#copyParagraph').hidden = false
}

function setupDrainIconButtons () {
  const iconArea = document.querySelector('#drainIcons')

  for (const iconDescription of Object.keys(window.drainIcons)) {
    const iconEmoji = window.drainIcons[iconDescription]

    const btn = document.createElement('button')
    btn.classList.add('drain')
    btn.setAttribute('title', iconDescription)
    btn.innerHTML = '<span class = "icon">' + iconEmoji + '</span> ' + iconDescription
    btn.onclick = () => {
      onClickDrainIconButton(btn)
    }

    iconArea.appendChild(btn)
  }
}

function copyResults () {
  let copytext = 'These things are draining my spoons; \n\n'

  for (const btn of document.getElementById('drainIcons').querySelectorAll('button')) {
    if (btn.classList.contains('selected')) {
      copytext += btn.innerText.replace('\n', ' ') + '\n'
    }
  }

  copytext += '\n' + window.location

  const ta = document.createElement('textarea')
  ta.textContent = copytext

  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  ta.remove()
  window.alert('Results copied! You can now paste it anywhere.')
}

function setupCopyResultsButton () {
  const copyResultsButton = document.querySelector('#copyResults')

  copyResultsButton.onclick = copyResults
}

function setupServiceWorker () {
  const pwaNote = document.querySelector('p#pwaNote')

  if ('serviceWorker' in navigator) {
    const swUrl = new URL('sw.js', import.meta.url)

    try {
      navigator.serviceWorker.register(swUrl, {
        type: 'module'
      }).then(reg => {
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
                pwaNote.innerHTML = 'SW became redundant'
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
    } catch (e) {
      console.error(e)
      pwaNote.innerHTML = e
    }
  } else {
    pwaNote.innerHTML = 'Your browser does not support installation of this page as an app (PWA).'
  }
}

export default function setup () {
  window.fetch('data/icons.json', {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).then((json) => {
    window.drainIcons = json
    setupDrainIconButtons()
  })

  setupCopyResultsButton()
  setupServiceWorker()
}
