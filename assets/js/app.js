(()=>{
const S=UE_SITE,DV=UE_DIVISIONS,LD=UE_LEADERS,NW=UE_NEWS,EV=UE_EVENTS,$=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const btn=(u,l,c="")=>u?`<a class="btn ${c}" href="${esc(u)}" target="_blank" rel="noopener">${l}</a>`:`<span class="btn off ${c}" title="Placeholder: add this link in the data file">${l} (pending)</span>`;
const dn=id=>(DV.find(d=>d.id===id)||{name:id}).name;
const fmt=d=>new Date(d+"T00:00").toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});
const sorted=a=>[...a].sort((x,y)=>y.date.localeCompare(x.date));
const head=(t,s)=>`<header class="ph"><div class="wrap"><h1>${t}</h1><p>${s}</p></div></header>`;
const opts=(n,l,a)=>`<select name="${n}" aria-label="${l}"><option value="">${l}</option>${[...new Set(a)].map(x=>`<option>${esc(x)}</option>`).join("")}</select>`;
const filters=(search,sels)=>`<div class="filters">${search?`<input name="q" type="search" placeholder="${search}">`:""}${sels}</div><p class="empty hid">No results match your filters.</p>`;
const divCard=d=>`<article class="card item rv" data-cat="${esc(d.category)}" data-status="${esc(d.status)}"><div class="logo">${esc(d.name[0])}</div>
<h3>${esc(d.name)}</h3><span class="tag">${esc(d.category)}</span><span class="tag ${esc(d.status)}">${esc(d.status)}</span><p>${esc(d.desc)}</p>
<p class="meta">Leader: <b>${esc(d.leader)}</b><br>Members: <b>${esc(d.members)}</b></p>
<a class="btn sm fill" href="#/division/${d.id}">View Division</a>${btn(d.roblox,"Roblox","sm")}${btn(d.discord,"Discord","sm")}</article>`;
const newsCard=n=>`<article class="card item rv" data-cat="${esc(n.category)}"><span class="tag">${esc(n.category)}</span><span class="meta">${fmt(n.date)}</span><h3>${esc(n.title)}</h3><p>${esc(n.desc)}</p>${n.division?`<p class="meta">Division: <a href="#/division/${n.division}">${esc(dn(n.division))}</a></p>`:""}</article>`;
const evCard=e=>`<article class="card item rv" data-status="${esc(e.status)}" data-type="${esc(e.type)}"><span class="tag ${esc(e.status)}">${esc(e.status)}</span><span class="tag">${esc(e.type)}</span><h3>${esc(e.title)}</h3><p class="meta">${fmt(e.date)}</p><p>${esc(e.desc)}</p>
<p class="meta">Divisions: ${e.divisions.map(i=>`<a href="#/division/${i}">${esc(dn(i))}</a>`).join(", ")}</p></article>`;
const sec=(t,more,body)=>`<section class="sec"><div class="wrap">${more?`<a class="more btn sm" href="${more}">View All</a>`:""}<h2>${t}</h2>${body}</div></section>`;
const reg=(t,a)=>`<div class="box"><h3>${t}</h3>${a.map(x=>`<div class="card reg"><b>${esc(x.name)}</b><p>${esc(x.note)}</p></div>`).join("")}</div>`;
const leader=l=>`<article class="card rv"><div class="ava" style="${l.avatar?`background-image:url('${esc(l.avatar)}')`:""}">${l.avatar?"":esc(l.name.replace(/[\[\]]/g,"")[0])}</div><h3>${esc(l.name)}</h3><p class="meta"><b>${esc(l.username)}</b><br>${esc(l.position)} · ${esc(dn(l.division))}</p><p>${esc(l.bio)}</p>${btn(l.link,"Profile","sm")}</article>`;
const R={
"":()=>({t:"Home",h:`<div class="hero"><img src="assets/img/emblem.webp" alt="UE emblem"><h1>UNITED EMPIRE</h1><p class="sub">${esc(S.tagline)}</p><p>${esc(S.intro)}</p>
<a class="btn fill" href="#/divisions">Explore Divisions</a><a class="btn" href="#/recruit">Join the Empire</a><a class="btn" href="#mission" data-scroll>Learn More</a></div>
<section><div class="wrap stats">${S.stats.map(s=>`<div class="card"><b data-n="${s.value}">0</b>${esc(s.label)}</div>`).join("")}</div></section>`+
sec("Featured Divisions","#/divisions",`<div class="grid">${DV.filter(d=>d.featured).map(divCard).join("")}</div>`)+
sec("Latest Announcements","#/news",`<div class="grid">${sorted(NW).slice(0,3).map(newsCard).join("")}</div>`)+
sec("Recent Events & Operations","#/events",`<div class="grid">${sorted(EV).slice(0,3).map(evCard).join("")}</div>`)+
`<span id="mission"></span>`+sec("Our Mission & Values",0,`<div class="grid">${S.values.map(v=>`<div class="card rv"><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></div>`).join("")}</div>`)}),
divisions:()=>({t:"Divisions",h:head("Division Directory","All clans and divisions of the United Empire")+sec("Divisions",0,filters("Search divisions...",opts("cat","All categories",DV.map(d=>d.category))+opts("status","All statuses",DV.map(d=>d.status)))+`<div class="grid">${DV.map(divCard).join("")}</div>`)}),
division:id=>{const d=DV.find(x=>x.id===id);if(!d)return{t:"Not found",h:head("Division not found","")+sec("Unknown division",0,`<a class="btn" href="#/divisions">Back to directory</a>`)};
const n=sorted(NW.filter(x=>x.division===id||!x.division)).slice(0,4);
return{t:d.name,h:head(esc(d.name),`${esc(d.category)} · ${esc(d.status)}`)+`<section><div class="wrap"><div class="banner">[ DIVISION BANNER PLACEHOLDER ]</div><div class="two"><div>
<div class="box"><h3>Overview</h3><p>${esc(d.desc)}</p><p class="meta">Leader: <b>${esc(d.leader)}</b> · Members: <b>${esc(d.members)}</b></p></div>
<div class="box"><h3>History & Background</h3><p>${esc(d.history)}</p></div>
<div class="box"><h3>Recent Announcements</h3><div class="grid">${n.map(newsCard).join("")}</div></div></div><div>
<div class="box"><h3>Connect</h3>${btn(d.roblox,"Roblox Group")}${btn(d.discord,"Discord Server")}</div>
<div class="box"><h3>Recruitment</h3><p>${esc(d.recruiting)}</p></div>
<div class="box"><h3>Leadership Team</h3>${d.leadership.map(l=>`<p class="meta"><b>${esc(l.name)}</b><br>${esc(l.role)}</p>`).join("")}</div>
<div class="box"><h3>Rank Structure</h3><ol class="ranks">${d.ranks.map(r=>`<li>${esc(r)}</li>`).join("")}</ol></div></div></div></div></section>`}},
leadership:()=>({t:"Leadership",h:head("High Command & Leadership","The official leadership directory")+`<section><div class="wrap">${["Emperor","High Command","Division Commanders","Senior Officers","Department Directors"].map(t=>{const a=LD.filter(l=>l.tier===t);return a.length?`<div class="tier">${t}</div><div class="grid">${a.map(leader).join("")}</div>`:""}).join("")}</div></section>`}),
news:()=>({t:"News",h:head("News & Announcements","Official communications of the United Empire")+sec("Announcements",0,filters("Search news...",opts("cat","All categories",["Organization","Division","Promotions","Events","Operations","Diplomacy"]))+`<div class="grid">${sorted(NW).map(newsCard).join("")}</div>`)}),
events:()=>({t:"Events",h:head("Events & Operations","Training, joint operations and major campaigns")+sec("Operations Calendar",0,filters("Search events...",opts("status","All statuses",["Upcoming","Ongoing","Completed"])+opts("type","All types",["Event","Joint Operation","Training","Campaign"]))+`<div class="grid">${sorted(EV).map(evCard).join("")}</div>`)}),
recruit:()=>({t:"Recruitment",h:head("Join the Empire","Enlist in the United Empire")+sec("About",0,`<p>${esc(S.intro)}</p>`)+sec("Requirements",0,`<ul>${S.requirements.map(r=>`<li>${esc(r)}</li>`).join("")}</ul>`)+sec("Enlistment Steps",0,`<ol class="steps">${S.steps.map(r=>`<li>${esc(r)}</li>`).join("")}</ol>`)+
sec("Available Divisions",0,`<div class="grid">${DV.map(d=>`<div class="card rv"><h3>${esc(d.name)}</h3><span class="tag ${esc(d.status)}">${esc(d.status)}</span><p>${esc(d.recruiting)}</p>${btn(d.roblox,"Roblox","sm")}${btn(d.discord,"Discord","sm")}<a class="btn sm" href="#/division/${d.id}">Details</a></div>`).join("")}</div><p>${btn(S.roblox,"UE Roblox Group")}${btn(S.discord,"UE Discord")}</p>`)}),
diplomacy:()=>{const d=S.diplomacy;return{t:"Diplomacy",h:head("Diplomatic Registry","Official relations of the United Empire")+sec("Registry",0,`<div class="two"><div>${reg("Allied Organizations",d.allies)}${reg("Recognized Partners",d.partners)}${reg("Neutral Organizations",d.neutral)}</div><div>${reg("Diplomatic Contacts",d.contacts)}${reg("Treaties & Agreements",d.treaties)}</div></div>`)}}};
function route(){const[p,id]=(location.hash.replace(/^#\/?/,"")).split("/");if(location.hash.startsWith("#mission")||!R[p||""]&&p!=="")return;
const r=(R[p||""]||R[""])(id);$("#app").innerHTML=r.h;document.title=(p?r.t+" | ":"")+"United Empire";
document.querySelectorAll("#menu a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#/"+(p==="division"?"divisions":p)));
$("#menu").classList.remove("open");scrollTo(0,0);boot()}
function boot(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("in");io.unobserve(e.target);if(e.target.dataset.n)count(e.target)}),{threshold:.15});
document.querySelectorAll(".rv,[data-n]").forEach(e=>io.observe(e));
document.querySelectorAll(".filters").forEach(f=>{const run=()=>{const q=(f.querySelector("[name=q]")?.value||"").toLowerCase();let n=0;const items=f.parentElement.querySelectorAll(".item");
items.forEach(i=>{const ok=i.textContent.toLowerCase().includes(q)&&[...f.querySelectorAll("select")].every(s=>!s.value||i.dataset[s.name]===s.value);i.classList.toggle("hid",!ok);n+=ok});f.parentElement.querySelector(".empty").classList.toggle("hid",n>0)};f.addEventListener("input",run)})}
function count(el){const t=+el.dataset.n,s=performance.now();(function f(n){const k=Math.min((n-s)/1400,1);el.textContent=Math.round(t*k).toLocaleString();if(k<1)requestAnimationFrame(f)})(s)}
addEventListener("hashchange",route);route();
document.addEventListener("click",e=>{const a=e.target.closest("[data-scroll]");if(a){e.preventDefault();$("#mission").scrollIntoView({behavior:"smooth"})}});
$("#burger").onclick=()=>$("#burger").setAttribute("aria-expanded",$("#menu").classList.toggle("open"));
const tt=$("#totop");tt.onclick=()=>scrollTo({top:0,behavior:"smooth"});addEventListener("scroll",()=>tt.classList.toggle("on",scrollY>500));
const clock=()=>$("#clock").textContent=new Date().toLocaleString("en-US",{dateStyle:"medium",timeStyle:"medium"});clock();setInterval(clock,1000);
$("#yr").textContent=new Date().getFullYear();addEventListener("load",()=>setTimeout(()=>$("#loader").classList.add("hide"),500));
})();
