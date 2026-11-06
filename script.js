/* ===== 1. Nút về đầu trang ===== */
(function(){var b=document.getElementById("totop");if(!b)return;function u(){b.classList.toggle("hide",window.scrollY<500)}window.addEventListener("scroll",u,{passive:true});u()})();

/* ===== 2. Điều hướng (nav) + Gallery ảnh giao diện ===== */
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

/* ===== 4. Lộ trình trên từng thẻ, sắp xếp thẻ, hiệu ứng xuất hiện ===== */
(function(){
var TLD={p:[['Pilot','Hiện tại'],['Triển khai','Tiếp theo']],
 i:[['Triển khai','Hiện tại']],
 a:[['Triển khai','Hiện tại'],['Mở rộng nhiều chương trình','Liên tục']],
 c:[['Coding','Hiện tại'],['Pilot → Triển khai','Tiếp theo']]};
/* Vòng đời dùng chung: Coding → Pilot → Triển khai → Vận hành */
function tl(c){if(c.querySelector('.tlm'))return;
 var k=c.classList.contains('s-p')?'p':c.classList.contains('s-i')?'i':c.classList.contains('s-c')?'c':null;if(!k)return;
 var h=c.querySelector('h3'),ttl=h?h.textContent.trim():'';if(k=='i'&&/^A\.I/.test(ttl))k='a';
 var sec=c.closest('section'),T=TLD[k],sid=sec?sec.id:'';
 /* AcacyOne: 10 module Triển khai Q1/2027; 3 module Triển khai Q1 – Q2/2027 */
 if(sid=='one'){var late=/^(Tổng quan Vận hành|Đội ngũ – Kết quả Chốt kỳ|Thị trường – Discipline)/.test(ttl);
  T=[['Pilot',late?'T10/2026':'T9/2026'],['Triển khai',late?'T1 – T6/2027':'T1/2027']]}
 /* Visibility: Coding (hiện tại) → Pilot T11/2026 → Triển khai T12/2026 */
 if(/^Visibility status/.test(ttl))T=[['Coding','Hiện tại'],['Pilot','T11/2026'],['Triển khai','T12/2026']];
 /* App giao diện mới: chỉ còn Triển khai (hiện tại) */
 if(/^APP giao diện mới/.test(ttl))T=[['Triển khai','T10/2026']];
 if(sid=='web'&&/^Quản lý POSM/.test(ttl))T=[['Pilot','T10/2026'],['Triển khai','T12/2026']];
 if(sid=='web'&&/^QRCode cửa hàng/.test(ttl))T=[['Triển khai','T10/2026']];
 /* Tạo mới cửa hàng / Đăng ký thêm Chương trình trưng bày: Pilot T12/2026 */
 if(sid=='app'&&/^(Tạo mới cửa hàng|Đăng ký thêm Chương trình)/.test(ttl))T=[['Pilot','T12/2026']];
 if(sid=='dash'&&/^POSM/.test(ttl))T=[['Triển khai','T10/2026']];
 var d=document.createElement('div');d.className='tlm';
 d.innerHTML='<span class="tlk">Lộ trình</span><ol>'+T.map(function(s,i){return'<li'+(i?'':' class="on"')+'><i></i><b>'+s[0]+'</b><small>'+s[1]+'</small></li>'}).join('')+'</ol>';
 c.appendChild(d)}
function rk(c){return c.classList.contains('hi')?0:(c.querySelector('.ty.nw')?1:2)}
function srt(l,o){o.disconnect();[].forEach.call(l.children,tl);
  var a=[].slice.call(l.children).map(function(c,i){return{c:c,i:i,r:rk(c)}});
  a.sort(function(x,y){return x.r-y.r||x.i-y.i});
  a.forEach(function(x){l.appendChild(x.c)});
  o.observe(l,{childList:true})}
[].forEach.call(document.querySelectorAll('.two .list'),function(l){
  var o=new MutationObserver(function(){srt(l,o)});srt(l,o)});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.it,.bc,.nc,.kc,.ik1,.hc,.rd,.sx').forEach(function(el){el.classList.add('rv');io.observe(el)})}
})();

/* ===== 5. Vạch "Hôm nay" tự cập nhật theo ngày hiện tại. Trục: T1/2026 → T6/2027 (18 tháng) ===== */
(function(){var el=document.getElementById("today");if(!el)return;
var START_Y=2026,START_M=0,N=18;
function upd(){var d=new Date(),i=(d.getFullYear()-START_Y)*12+(d.getMonth()-START_M),
dim=new Date(d.getFullYear(),d.getMonth()+1,0).getDate(),f=(i+(d.getDate()-1)/dim)/N;
if(f<0||f>1){el.style.display="none";return}
el.style.display="";el.style.left="calc(var(--lw) + (100% - var(--lw)) * "+f.toFixed(4)+")";
var p=function(x){return x<10?"0"+x:x};
el.firstElementChild.textContent="Hôm nay "+p(d.getDate())+"/"+p(d.getMonth()+1)}
upd();setInterval(upd,3600000)})();

/* ===== 6. Demo cho từng thẻ tính năng =====
   Cách 1 (dễ nhất): khai báo bên dưới theo TÊN THẺ -> danh sách file (ảnh .png/.jpg/.gif/.webp, video .mp4/.webm, hoặc link YouTube/Vimeo).
   Cách 2: thêm thuộc tính vào thẻ:  <div class="it ..." data-demo="images/demo/a.mp4,images/demo/b.png">
   Thẻ nào không có demo thì không hiện nút. */
(function(){
var DEMOS={
 "A.I nhận diện & tự điền báo cáo":["images/a.i.superfg.mp4","images/a.i.mp4"],
 "Visibility status":["images/Visibility-1.png"],
 "Tạo mới cửa hàng":["images/Addstore-1.png"],
 "Đăng ký thêm Chương trình trưng bày":["images/Addpromotion-1.png"]
};
function norm(t){return (t||"").replace(/\s+/g," ").trim()}
function list(c){var a=c.getAttribute("data-demo");if(a)return a.split(",").map(function(x){return x.trim()}).filter(Boolean);
 var h=c.querySelector("h3");return h&&DEMOS[norm(h.textContent)]||[]}
function yt(u){var m=u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/);if(m)return"https://www.youtube.com/embed/"+m[1];
 m=u.match(/vimeo\.com\/(\d+)/);return m?"https://player.vimeo.com/video/"+m[1]:null}
var box,cur=[],idx=0,ttl="";
function build(){if(box)return;box=document.createElement("div");box.className="dm";box.hidden=true;
 box.innerHTML='<div class="dm-b"></div><div class="dm-c" role="dialog" aria-modal="true"><button type="button" class="dm-x" aria-label="Đóng">×</button><div class="dm-h"></div><div class="dm-s"><button type="button" class="dm-p" aria-label="Trước">‹</button><div class="dm-m"></div><button type="button" class="dm-n" aria-label="Sau">›</button></div><div class="dm-f"></div></div>';
 document.body.appendChild(box);
 box.querySelector(".dm-b").onclick=box.querySelector(".dm-x").onclick=close;
 box.querySelector(".dm-p").onclick=function(){go(idx-1)};box.querySelector(".dm-n").onclick=function(){go(idx+1)};
 document.addEventListener("keydown",function(e){if(box.hidden)return;if(e.key=="Escape")close();if(e.key=="ArrowLeft")go(idx-1);if(e.key=="ArrowRight")go(idx+1)})}
function go(i){idx=(i+cur.length)%cur.length;var u=cur[idx],m=box.querySelector(".dm-m"),e=yt(u),h;
 if(e)h='<iframe src="'+e+'" allow="fullscreen;encrypted-media" allowfullscreen></iframe>';
 else if(/\.(mp4|webm|mov|m4v)(\?|$)/i.test(u))h='<video src="'+u+'" controls controlsList="nodownload noplaybackrate noremoteplayback" disablePictureInPicture disableRemotePlayback autoplay playsinline></video>';
 else h='<img src="'+u+'" alt="Demo" draggable="false">';
 m.innerHTML=h;box.querySelector(".dm-f").textContent=cur.length>1?(idx+1)+" / "+cur.length:"";
 var one=cur.length<2;box.querySelector(".dm-p").style.visibility=box.querySelector(".dm-n").style.visibility=one?"hidden":"visible"}
function open(t,l){build();ttl=t;cur=l;box.querySelector(".dm-h").textContent=t;box.hidden=false;document.documentElement.classList.add("dm-open");go(0);box.querySelector(".dm-x").focus()}
function close(){if(!box)return;box.hidden=true;box.querySelector(".dm-m").innerHTML="";document.documentElement.classList.remove("dm-open")}
function init(){[].forEach.call(document.querySelectorAll(".it"),function(c){if(c.querySelector(".dmb"))return;var l=list(c);if(!l.length)return;
 var b=document.createElement("button");b.type="button";b.className="dmb";
 b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>Xem demo';
 b.onclick=function(){open(norm(c.querySelector("h3").textContent),l)};
 var t=c.querySelector(".tlm");t?c.insertBefore(b,t):c.appendChild(b)})}
init();setTimeout(init,300);
})();

/* ===== 7. Chống tải/sao chép ảnh, video, chặn F12 / view source / lưu trang =====
   Lưu ý: chỉ ngăn thao tác thông thường, không phải bảo mật tuyệt đối. */
(function(){
function stop(e){e.preventDefault();e.stopPropagation();return false}
document.addEventListener("keydown",function(e){
  var c=e.ctrlKey||e.metaKey,s=e.shiftKey,a=e.altKey,k=e.code;
  if(e.key==="F12"
    ||(c&&s&&(k==="KeyI"||k==="KeyJ"||k==="KeyC"||k==="KeyK"))
    ||(c&&(k==="KeyU"||k==="KeyS"))
    ||(e.metaKey&&a&&(k==="KeyI"||k==="KeyJ"||k==="KeyC"||k==="KeyU"))
  )return stop(e);
},true);
document.addEventListener("contextmenu",stop,true);
document.addEventListener("dragstart",function(e){if(e.target.tagName==="IMG"||e.target.tagName==="VIDEO")stop(e)},true);
function lock(){[].forEach.call(document.querySelectorAll("img"),function(i){i.setAttribute("draggable","false")})}
lock();setInterval(lock,2000);
})();

/* ===== 8. Thanh công cụ: sáng/tối + cỡ chữ (chỉ ở trang gốc, không hiện khi nhúng); nhớ lựa chọn ===== */
(function(){
var R=document.documentElement,K='acacy-prefs',P={};

/* Điều kiện nhúng: trong iframe hoặc có ?embed=1 -> bỏ toàn bộ tính năng */
var emb=false;try{emb=window.self!==window.top}catch(e){emb=true}
if(emb||/[?&]embed=1/.test(location.search)){R.classList.add('embed');return}

try{P=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
function save(){try{localStorage.setItem(K,JSON.stringify(P))}catch(e){}}

var mq=window.matchMedia('(prefers-color-scheme:dark)');
var theme=P.t||(mq.matches?'dark':'light');
var ZS=[.9,1,1.1,1.2,1.35],zi=typeof P.z=='number'&&ZS[P.z]?P.z:1;

var c=document.createElement('div');c.className='ctrl';
c.setAttribute('role','toolbar');c.setAttribute('aria-label','Tùy chỉnh hiển thị');
c.innerHTML=
 '<button type="button" id="zm" aria-label="Giảm cỡ chữ">A−</button>'+
 '<button type="button" id="zp" aria-label="Tăng cỡ chữ">A+</button>'+
 '<span class="sep"></span>'+
 '<button type="button" id="th" aria-label="Đổi giao diện sáng/tối">'+
 '<svg class="moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>'+
 '<svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'+
 '</button>';
document.body.appendChild(c);

function applyTheme(){R.setAttribute('data-theme',theme)}
function applyZoom(){R.style.setProperty('--z',ZS[zi]);
 c.querySelector('#zm').disabled=zi===0;c.querySelector('#zp').disabled=zi===ZS.length-1;
 c.querySelector('#zm').style.opacity=zi===0?.35:1;c.querySelector('#zp').style.opacity=zi===ZS.length-1?.35:1}
c.querySelector('#th').onclick=function(){theme=theme==='dark'?'light':'dark';P.t=theme;save();applyTheme()};
c.querySelector('#zm').onclick=function(){if(zi>0){zi--;P.z=zi;save();applyZoom()}};
c.querySelector('#zp').onclick=function(){if(zi<ZS.length-1){zi++;P.z=zi;save();applyZoom()}};
applyTheme();applyZoom();
})();