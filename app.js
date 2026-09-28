(function(){if(window.__navInit)return;window.__navInit=1;
var L=[].slice.call(document.querySelectorAll("#nav a")),T=L.map(function(a){return document.getElementById(a.getAttribute("href").slice(1))}),cur=-1;
function u(){var y=window.innerHeight*.4,c=0;T.forEach(function(t,i){if(t&&t.getBoundingClientRect().top<=y)c=i});
if(c===cur)return;cur=c;L.forEach(function(a,i){a.classList.toggle("on",i===c);if(i===c)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")})}
window.addEventListener("scroll",u,{passive:true});window.addEventListener("resize",u);window.addEventListener("load",u);setInterval(u,300);u()})();
(function(){if(window.__galInit)return;window.__galInit=1;document.documentElement.classList.add("js");
var G=[].slice.call(document.querySelectorAll(".gal")),tabs=document.getElementById("gt");
G.forEach(function(g,gi){
var b=document.createElement("button");b.type="button";b.className="gtab";b.textContent=g.getAttribute("data-n");b.onclick=function(){show(gi)};tabs.appendChild(b);
var trk=g.querySelector(".trk"),n=trk.children.length,dots=g.querySelector(".dots"),cnt=g.querySelector(".cnt"),pv=g.querySelector(".pv"),nx=g.querySelector(".nx");
if(n<2){[pv,nx,dots,cnt].forEach(function(e){e.style.display="none"});return}
function idx(){return trk.clientWidth?Math.round(trk.scrollLeft/trk.clientWidth):0}
function go(i){trk.scrollTo({left:i*trk.clientWidth,behavior:"smooth"})}
function upd(){var c=idx();cnt.textContent=(c+1)+" / "+n;[].forEach.call(dots.children,function(d,i){d.classList.toggle("on",i===c)})}
for(var i=0;i<n;i++){(function(i){var d=document.createElement("button");d.type="button";d.setAttribute("aria-label","Ảnh "+(i+1));d.onclick=function(){go(i)};dots.appendChild(d)})(i)}
pv.onclick=function(){var c=idx();go(c>0?c-1:n-1)};nx.onclick=function(){var c=idx();go(c<n-1?c+1:0)};
trk.addEventListener("scroll",upd);window.addEventListener("resize",upd);g.__upd=upd;upd()});
function show(k){G.forEach(function(g,i){g.classList.toggle("on",i===k)});[].forEach.call(tabs.children,function(b,i){b.classList.toggle("on",i===k)});if(G[k].__upd)G[k].__upd()}
show(0)})();