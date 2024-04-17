# spoon-check

Describe what is taking your energy, when words are hard.

<p align = "center">
<img src = "screenshot.png" alt = "screenshot" />
</p>

Hosted version: http://spoon-check.5apps.com/
Linux Container version: (see below)

## Feature requests, bugs, or other issues 

Feedback is very welcome. Raising a GitHub issue is the best way to communicate
:-)

## Design considerations

* Accessibility is very important. 
* Use offline (as a "progressive web app"), so it can be installed.

## Self host - any webserver

Simply copy the `dist` folder to any webserver. No server side support needed.

You can customize data/icons.json to suit your needs.

## Self host - Docker Container

```
docker run -p 3000:3000 ghcr.io/jamesread/spoon-check
```
