window.fetch("data/icons.json",{method:"GET"}).then(e=>e.json()).then(e=>{window.drainIcons=e,function(){let e=document.querySelector("#drainIcons");for(let n of Object.keys(window.drainIcons)){let t=window.drainIcons[n],a=document.createElement("button");a.classList.add("drain"),a.setAttribute("title",n),a.innerHTML='<span class = "icon">'+t+"</span> "+n,a.onclick=()=>{a.classList.contains("selected")?a.classList.remove("selected"):a.classList.add("selected"),document.querySelector("#copyParagraph").hidden=!1},e.appendChild(a)}}()}),document.querySelector("#copyResults").onclick=function(){let e="These things are draining my spoons; \n\n";for(let n of document.getElementById("drainIcons").querySelectorAll("button"))n.classList.contains("selected")&&(e+=n.innerText.replace("\n"," ")+"\n");e+="\n\n"+window.location;let n=document.createElement("textarea");n.textContent=e,document.body.appendChild(n),n.select(),document.execCommand("copy"),n.remove(),window.alert("Results copied! You can now paste it anywhere.")},function(){let e=document.querySelector("p#pwaNote");if("serviceWorker"in navigator){let n=new URL("sw.js");navigator.serviceWorker.register(n).then(n=>{n.addEventListener("updatefound",()=>{n.update();let t=n.installing;t.addEventListener("statechange",()=>{switch(t.state){case"installed":navigator.serviceWorker.controller?e.innerHTML="You are using an app version of this page.":e.innerHTML="PWA possible.";break;case"redundant":console.log("SW became redundant");break;case"":case"waiting":case"activating":case"activated":return;default:e.innerHTML="Unhandled worker state: "+t.state}})})})}else e.innerHTML="Your browser does not support installation of this page as an app (PWA)."}();