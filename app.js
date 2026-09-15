'use strict';
// Fictional, curated scenarios: no live data, inferred availability, or trained policy.
const sites = [
 {title:'River corridor',type:'HYDRO / INDUSTRIAL REUSE',description:'An existing hydro resource near a substation and an industrial parcel. Explore a connected campus with fiber access.',power:'12 MW',fiber:'3 km',land:'18 ha',resource:'Hydro + substation + fiber',tags:['power','grid','land','fiber'],note:'Verify seasonal flow, water rights, substation headroom, and carrier availability.'},
 {title:'Circular energy',type:'LANDFILL GAS / DISTRIBUTED COMPUTE',description:'Recovered landfill gas paired with modular gensets and a flexible compute load near the source.',power:'4 MW',fiber:'6 km',land:'5 ha',resource:'Landfill gas + gensets + compute',tags:['power','land','compute'],note:'Verify gas yield and composition, emissions permitting, and the load’s uptime requirements.'},
 {title:'Renewable hub',type:'RENEWABLES / STORAGE / DATA CENTER',description:'A curtailed renewable resource paired with battery storage and a data center with flexible demand.',power:'30 MW',fiber:'2 km',land:'40 ha',resource:'Renewables + storage + data center',tags:['power','grid','fiber','compute'],note:'Verify curtailment history, storage sizing, grid agreements, and backup requirements.'}
];
const combinations = [
 {chain:['Hydro','Substation','Fiber'],title:'A resource-connected compute campus',description:'Prepare a hydro-powered site concept using an existing electrical connection and nearby fiber. Match compute demand to a verified generation profile.',checks:['Seasonal generation and environmental flows','Connection capacity and upgrade requirements','Land, fiber service, and compute load fit']},
 {chain:['Landfill gas','Gensets','Compute load'],title:'Recovered gas. Local generation.',description:'Prepare a gas-to-power concept with modular generation and an adaptable compute load. Size generation around verified gas recovery and treatment needs.',checks:['Gas volume, composition, and treatment','Air permits and genset maintenance','Redundancy, cooling, and load flexibility']},
 {chain:['Renewables','Storage','Data center'],title:'Turn curtailment into a planning input',description:'Prepare a renewable-plus-storage concept for a flexible data center. Explore how storage and demand shifting could use otherwise curtailed generation.',checks:['Hourly generation and curtailment records','Storage duration, degradation, and dispatch','Grid backup and firm-load requirements']}
];
let activeSite=0;
const detail=document.getElementById('site-detail');
function selectSite(index){
 activeSite=index;const s=sites[index];
 detail.innerHTML=`<p class="eyebrow">OPPORTUNITY 0${index+1} / CONCEPT</p><h3>${s.title}</h3><p>${s.description}</p><div class="metrics"><div><b>${s.power}</b><span>SCENARIO CAPACITY</span></div><div><b>${s.fiber}</b><span>FIBER DISTANCE</span></div></div><p class="detail-note">${s.note}</p><a href="mailto:dparekh3291@gmail.com?subject=${encodeURIComponent('Site search inquiry: '+s.title)}">Discuss a similar opportunity ↗</a>`;
 document.querySelectorAll('[data-site]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.site)===index)));
}
function filterSites(filter){
 const matches=sites.map((s,i)=>({...s,index:i})).filter(s=>filter==='all'||s.tags.includes(filter));
 document.getElementById('opportunities').innerHTML=matches.map(s=>`<button class="opportunity" data-site="${s.index}" aria-pressed="false"><span class="micro">0${s.index+1} / ${s.type}</span><h3>${s.title}</h3><p>${s.resource}</p><span class="card-bottom"><span>${s.power} · ${s.land} parcel</span><span>Inspect ↗</span></span></button>`).join('');
 document.querySelectorAll('.pin').forEach(p=>p.hidden=!matches.some(s=>s.index===Number(p.dataset.site)));
 selectSite(matches.some(s=>s.index===activeSite)?activeSite:matches[0].index);
}
function showCombination(index){const c=combinations[index];document.getElementById('combination').innerHTML=`<div class="chain">${c.chain.map(x=>`<span>${x}</span>`).join('<i>+</i>')}</div><div class="combination-body"><h3>${c.title}</h3><p>${c.description}</p><p class="micro">DILIGENCE BEFORE DEPLOYMENT</p><ul class="checks">${c.checks.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;}
document.addEventListener('click',e=>{const site=e.target.closest('[data-site]');if(site)selectSite(Number(site.dataset.site));const filter=e.target.closest('[data-filter]');if(filter){document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===filter)));filterSites(filter.dataset.filter);}});
document.getElementById('resource').addEventListener('change',e=>showCombination(Number(e.target.value)));
filterSites('all');showCombination(0);

// Keep the navigation state tied to the section currently in view.
const navItems = document.querySelectorAll('.header nav a');
const sectionObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting);
  if (!visible.length) return;
  const id = visible[0].target.id;
  navItems.forEach(link => {
    if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, {rootMargin: '-10% 0px -55% 0px', threshold: 0});
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

const missionSteps = [
 ['Scout agent mapped the hydro resource and its seasonal generation questions.','Matching agent linked the resource to a substation, industrial parcel, and possible fiber connection.','Planning agent assembled a hydro + substation + fiber campus proposal.','Evaluation agent flagged water rights, connection headroom, and service availability for review.'],
 ['Scout agent identified landfill gas as the candidate resource.','Matching agent connected gas recovery with modular generators and a flexible compute load.','Planning agent prepared a gas-to-power configuration with gas treatment and redundancy questions.','Evaluation agent flagged gas yield, air permits, maintenance, and uptime assumptions for review.'],
 ['Scout agent identified curtailed renewable generation as the candidate resource.','Matching agent connected the resource with storage and flexible data-center demand.','Planning agent prepared a renewable-plus-storage configuration for comparison.','Evaluation agent flagged hourly records, battery sizing, grid backup, and dispatch assumptions for review.']
];
let missionStep = -1;
const missionButton = document.getElementById('mission-next');
const missionOutput = document.getElementById('mission-output');
function resetMission(){missionStep=-1;missionButton.textContent='Start mission preview →';missionOutput.innerHTML='<p class="micro">READY / 4 SPECIALIST AGENTS</p><p>See how a mission moves through the proposed agent network.</p>';document.querySelectorAll('.orbit-node').forEach(n=>n.classList.remove('active'));}
document.getElementById('mission-choice').addEventListener('change',resetMission);
missionButton.addEventListener('click',()=>{
 if(missionStep===4){resetMission();return;}
 missionStep++;
 document.querySelectorAll('.orbit-node').forEach((n,i)=>n.classList.toggle('active',i===missionStep));
 const label=['SCOUT','MATCH','PLAN','EVALUATE','RETURN TO CORE'][missionStep];
 const message=missionStep<4?missionSteps[Number(document.getElementById('mission-choice').value)][missionStep]:'The core receives the reviewed proposal. In the planned system, validated outcomes feed reward signals and evaluated policy updates for future missions.';
 missionOutput.innerHTML='<p class="micro">PREVIEW / '+label+'</p><p>'+message+'</p>';
 missionButton.textContent=missionStep===4?'Reset mission preview ↻':'Next agent step →';
});
