(function(){var L=[].slice.call(document.querySelectorAll("#nav a")),T=L.map(function(a){return document.getElementById(a.getAttribute("href").slice(1))});
function u(){var y=window.innerHeight*.4,c=0;T.forEach(function(t,i){if(t&&t.getBoundingClientRect().top<=y)c=i});
L.forEach(function(a,i){a.classList.toggle("on",i==c);if(i==c)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")})}
window.addEventListener("scroll",u,{passive:true});window.addEventListener("resize",u);u()})();