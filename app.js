const D=window.UE,app=document.getElementById('app');
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ini=n=>n.replace(/\(.*?\)/g,'').replace(/[\[\]]/g,'').trim().split(/\s+/).map(w=>w[0]).join('').slice(0,3).toUpperCase()||'UE';
const L=(u,t,c='')=>u?`<a class="btn ${c}" href="${esc(u)}" target="_blank" rel="noopener">${t}</a>`:`<span class="btn off ${c}" title="Add this link in data.js">${t}: not set</span>`;
const divs=D.divisions.map(d=>({leader:'[Leader name]',members:'[000]',roblox:'',discord:'',
  overview:`[Overview of ${d.name}. Replace this text in data.js.]`,history:'[History and background. Replace this text.]',
  recruit:'[Recruitment requirements and how to apply.]',ranks:['[Rank 1]','[Rank 2]','[Rank 3]','[Rank 4]'],
  team:[{name:'[Name]',title:'[Role]'},{name:'[Name]',title:'[Role]'}],...d}));

const post=n=>`<article class="box"><small>${esc(n.date)}</small><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p></article>`;
const card=d=>`<article class="card"><div class="top"><div class="logo">${ini(d.name)}</div><div><h3><a href="#/division/${d.slug}">${esc(d.name)}</a></h3><span class="st ${esc(d.status)}">${esc(d.status)}</span></div></div>
<p>${esc(d.short)}</p><div class="meta"><span>Leader<b>${esc(d.leader)}</b></span><span>Members<b>${esc(d.members)}</b></span></div>
<div class="row">${L(d.roblox,'Roblox','sm')}${L(d.discord,'Discord','sm')}<a class="btn sm" href="#/division/${d.slug}">Details</a></div></article>`;
const prof=p=>`<article class="card pf"><div class="top"><div class="logo round big">${p.image?`<img src="${esc(p.image)}" alt="">`:ini(p.name)}</div>
<div><h3>${esc(p.name)}</h3><span class="st">${esc(p.title)}</span></div></div>${p.bio?`<p>${esc(p.bio)}</p>`:''}
${p.roblox||p.discord?`<div class="row">${p.roblox?L(p.roblox,'Roblox','sm'):''}${p.discord?L(p.discord,'Discord','sm'):''}</div>`:''}</article>`;

const home=()=>{const f=divs.filter(d=>d.featured).slice(0,3);return`
<section class="hero"><div class="w"><h1>UNITED EMPIRE</h1><p class="sub">${esc(D.tagline)}</p><p>${esc(D.intro)}</p>
<div class="row"><a class="btn pri" href="#/divisions">Explore Divisions</a><a class="btn" href="#/join">Join the Empire</a><button class="btn" type="button" data-scroll="mission">Learn More</button></div></div></section>
<div class="stats"><div class="w sg">${D.stats.map(s=>`<div class="stat"><b>${s.value==='auto'?divs.length:esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div></div>
<section class="s"><div class="w"><div class="head"><div><h2>Featured divisions</h2></div><a class="btn sm" href="#/divisions">All divisions</a></div><div class="g">${f.map(card).join('')}</div></div></section>
<section class="s"><div class="w cols"><div><h2>Latest announcements</h2><p class="lead"></p>${D.news.slice(0,3).map(post).join('')}</div>
<div><h2>Events and operations</h2><p class="lead"></p>${D.events.map(e=>`<article class="box"><small>${esc(e.date)}<span class="tag">${esc(e.type)}</span></small><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></article>`).join('')}</div></div></section>
<section class="s" id="mission"><div class="w"><h2>Mission and values</h2><p class="lead">The United Empire exists to give every division a stronger home: shared standards, shared events and a command that backs its members.</p>
<div class="g">${D.values.map(v=>`<div class="box"><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></div>`).join('')}</div></div></section>`};

const cats=[...new Set(divs.map(d=>d.category))],sts=[...new Set(divs.map(d=>d.status))];
const dir=()=>`<section class="s"><div class="w"><h2>Divisions</h2><p class="lead">Every clan and division in the United Empire network.</p>
<div class="bar"><input id="q" type="search" placeholder="Search divisions" aria-label="Search divisions">
<select id="c" aria-label="Category"><option value="">All categories</option>${cats.map(c=>`<option>${esc(c)}</option>`).join('')}</select>
<select id="s" aria-label="Status"><option value="">All statuses</option>${sts.map(c=>`<option>${esc(c)}</option>`).join('')}</select></div>
<p id="n"></p><div class="g" id="g"></div></div></section>`;
function initDir(){const q=document.getElementById('q'),c=document.getElementById('c'),s=document.getElementById('s'),g=document.getElementById('g'),n=document.getElementById('n');
const go=()=>{const t=q.value.toLowerCase().trim();const r=divs.filter(d=>(!c.value||d.category===c.value)&&(!s.value||d.status===s.value)&&(d.name+' '+d.short).toLowerCase().includes(t));
g.innerHTML=r.length?r.map(card).join(''):'<p class="lead">No divisions match. Clear the search or filters.</p>';n.textContent=`Showing ${r.length} of ${divs.length} divisions`};
[q,c,s].forEach(e=>e.addEventListener('input',go));go()}

const div=slug=>{const d=divs.find(x=>x.slug===slug);if(!d)return nf();
const news=D.news.filter(n=>n.division===d.slug),imgs=d.images||[];
return`<section class="ban" data-i="${ini(d.name)}"${d.banner?` style="background-image:linear-gradient(90deg,rgba(11,11,13,.85),rgba(11,11,13,.4)),url('${esc(d.banner)}')"`:''}><div class="w">
<a class="back" href="#/divisions">Back to divisions</a><div class="top"><div class="logo big">${ini(d.name)}</div><div><h1>${esc(d.name)}</h1><span class="st ${esc(d.status)}">${esc(d.status)}</span><span class="tag">${esc(d.category)}</span></div></div><p>${esc(d.short)}</p></div></section>
<section class="s"><div class="w cols"><div>
<div class="box"><h3>Overview</h3><p>${esc(d.overview)}</p></div>
<div class="box"><h3>History and background</h3><p>${esc(d.history)}</p></div>
<div class="box"><h3>Recent announcements</h3>${news.length?news.map(n=>`<p><small>${esc(n.date)}</small><br><b>${esc(n.title)}</b><br>${esc(n.text)}</p><br>`).join(''):'<p>No announcements for this division yet.</p>'}</div>
<div class="box"><h3>Gallery</h3><div class="gal">${[0,1,2].map(i=>imgs[i]?`<div style="background-image:url('${esc(imgs[i])}')"></div>`:'<div>Image placeholder</div>').join('')}</div></div>
</div><aside>
<div class="box"><h3>Links</h3><div class="row">${L(d.roblox,'Roblox group')}${L(d.discord,'Discord')}</div></div>
<div class="box"><h3>Leadership</h3><p><small>Current leader</small><br><b>${esc(d.leader)}</b></p>${d.team.map(t=>`<p><small>${esc(t.title)}</small><br>${esc(t.name)}</p>`).join('')}</div>
<div class="box"><h3>Rank structure</h3><ol class="rk">${d.ranks.map(r=>`<li>${esc(r)}</li>`).join('')}</ol></div>
<div class="box"><h3>Recruitment</h3><p>${esc(d.recruit)}</p><p style="margin-top:12px">Members: <b>${esc(d.members)}</b></p></div>
</aside></div></section>`};

const cmd=()=>`<section class="s"><div class="w"><h2>High Command</h2><p class="lead">The leadership of the United Empire, from the throne to each division.</p>
${D.command.map(t=>{const ppl=t.fromDivisions?divs.map(d=>({name:d.leader,title:'Commander, '+d.name,division:d.slug})):t.people;
return`<div class="tier"><h2>${esc(t.tier)}</h2><div class="g">${ppl.map(prof).join('')}</div></div>`}).join('')}</div></section>`;

const join=()=>`<section class="s"><div class="w"><h2>Join the Empire</h2><p class="lead">Pick a division, join its group and Discord, and apply through its recruitment process.</p>
<div class="g"><div class="box"><h3>1. Choose a division</h3><p>Browse the directory and read each division's recruitment requirements.</p><br><a class="btn sm" href="#/divisions">View divisions</a></div>
<div class="box"><h3>2. Join the community</h3><p>Join the main Roblox group and Discord server for the whole Empire.</p><br><div class="row">${L(D.links.roblox,'Roblox','sm')}${L(D.links.discord,'Discord','sm')}</div></div>
<div class="box"><h3>3. Apply and train</h3><p>Follow the division's application steps, attend training and earn your rank.</p></div></div></div></section>`;
const nf=()=>`<section class="s"><div class="w"><h2>Page not found</h2><p class="lead">That page does not exist. Return to the <a href="#/" style="color:var(--gold2)">homepage</a>.</p></div></section>`;

function route(){const [p,a]=location.hash.replace(/^#\/?/,'').split('/');let h,t='United Empire';
if(p==='divisions'){h=dir();t='Divisions | United Empire'}else if(p==='division'){h=div(a);const d=divs.find(x=>x.slug===a);if(d)t=d.name+' | United Empire'}
else if(p==='command'){h=cmd();t='High Command | United Empire'}else if(p==='join'){h=join();t='Join | United Empire'}else if(!p){h=home()}else h=nf();
app.innerHTML=h;document.title=t;if(p==='divisions')initDir();
document.querySelectorAll('nav a').forEach(l=>l.classList.toggle('on',l.dataset.r===(p==='division'?'divisions':p||'')));
document.getElementById('nav').classList.remove('open');document.getElementById('mb').setAttribute('aria-expanded','false');window.scrollTo(0,0)}
addEventListener('hashchange',route);route();
document.getElementById('mb').addEventListener('click',e=>{const o=document.getElementById('nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)});
app.addEventListener('click',e=>{const b=e.target.closest('[data-scroll]');if(b)document.getElementById(b.dataset.scroll).scrollIntoView({behavior:'smooth'})});
