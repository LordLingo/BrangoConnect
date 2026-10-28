const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}));

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}})},{threshold:.1,rootMargin:'0px 0px -30px'});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const audienceCards=[...document.querySelectorAll('#who .industry-card')];
if(audienceCards[3]){const card=audienceCards[3];const icon=card.querySelector('i');const title=card.querySelector('h3');const copy=card.querySelector('p');const tag=card.querySelector('b');if(icon)icon.textContent='↗';if(title)title.textContent='HR Professionals in Transition';if(copy)copy.textContent='If you have spent your career in HR and are ready for a new chapter, your hiring knowledge, employer relationships and understanding of screening can become the foundation for a business you own.';if(tag)tag.textContent='TURN EXPERIENCE INTO OWNERSHIP';}

const checks=[...document.querySelectorAll('.console-check')];const percent=document.getElementById('meter-percent');const bar=document.getElementById('meter-bar');const states=[[1,72],[2,84],[3,93],[4,100]];let stateIndex=0;
function updateScreeningDemo(){if(!checks.length||!percent||!bar)return;const[completedCount,progress]=states[stateIndex];checks.forEach((row,index)=>{const icon=row.querySelector('.check-icon');const status=row.querySelector('em');row.classList.remove('complete','running','queued');if(index<completedCount){row.classList.add('complete');if(icon)icon.textContent='✓';if(status)status.textContent='Complete'}else if(index===completedCount&&completedCount<checks.length){row.classList.add('running');if(icon)icon.textContent='⌕';if(status)status.textContent='Running'}else{row.classList.add('queued');if(icon)icon.textContent='+';if(status)status.textContent='Queued'}});percent.textContent=`${progress}%`;bar.style.width=`${progress}%`;stateIndex=(stateIndex+1)%states.length}
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(updateScreeningDemo,2600);

const faqItems=[...document.querySelectorAll('[data-faq="home"] details')];
const faqContent=[
  {
    question:'Do I need background check experience?',
    answer:'Industry or B2B sales experience can be a major advantage, especially if you already sell background checks. You do not have to build the screening technology, answer every client call, or process the check yourself.',
    href:'#contact',
    cta:'See If I Qualify'
  },
  {
    question:'What does the back office include?',
    answer:'Brango answers your clients\' calls and emails, processes the full background check, and routes every order through one software portal. You keep the client relationship and your brand.',
    href:'#back-office',
    cta:'See the Back Office'
  },
  {
    question:'Is there an upfront fee?',
    answer:'No. There is no upfront fee and no fixed startup price. Brango earns a fee on each search, plus a monthly revenue share of 7%, 12%, or 15%, depending on volume. That share is what Brango earns.',
    href:'#model',
    cta:'See the Model'
  },
  {
    question:'Whose brand does the client see?',
    answer:'Your company stays in front of the client. Brango powers the portal and runs the back office behind it.',
    href:'#contact',
    cta:'Apply — No Upfront Fee'
  },
  {
    question:'What if I already sell background checks for someone else?',
    answer:'If you already sell screening, this gives you a path to build equity in your own client base instead of only earning commission for someone else. The Go Independent page explains ownership, how the back office works, and the questions salespeople usually ask.',
    href:'go-independent.html',
    cta:'Go Independent'
  }
];
faqItems.forEach((item,index)=>{const content=faqContent[index];if(!content)return;const summary=item.querySelector('summary');const answer=item.querySelector('p');if(summary)summary.innerHTML=`${content.question}<span>+</span>`;if(answer)answer.innerHTML=`${content.answer}<a class="faq-cta button button-primary button-small" href="${content.href}">${content.cta} →</a>`;});
const allFaqItems=[...document.querySelectorAll('.faq-list details')];
allFaqItems.forEach(item=>item.addEventListener('toggle',()=>{if(!item.open)return;allFaqItems.forEach(other=>{if(other!==item)other.open=false})}));

const contactForm=document.getElementById('contact-form');
const contactStatus=document.getElementById('form-status');
if(contactForm){contactForm.addEventListener('submit',async event=>{event.preventDefault();const submitButton=contactForm.querySelector('button[type="submit"]');const originalText=submitButton?.innerHTML;if(submitButton){submitButton.disabled=true;submitButton.innerHTML='Sending…';}if(contactStatus){contactStatus.className='form-status';contactStatus.textContent='';}try{const response=await fetch(contactForm.action,{method:'POST',body:new FormData(contactForm),headers:{Accept:'application/json'}});if(response.ok){contactForm.reset();if(contactStatus){contactStatus.className='form-status success';contactStatus.textContent='Thank you. Your information was sent to Brango Connect and our team will follow up with you.';}}else{throw new Error('Form submission failed');}}catch(error){if(contactStatus){contactStatus.className='form-status error';contactStatus.innerHTML='We could not send the form. Please try again or email <a href="mailto:info@brangoconnect.com">info@brangoconnect.com</a>.';}}finally{if(submitButton){submitButton.disabled=false;submitButton.innerHTML=originalText;}}});}

/* Interactive launch path: curtain-reveal behavior adapted to this site's native HTML/CSS/JS stack. */
if(!document.querySelector('link[href="launch-curtain.css"]')){const launchStyles=document.createElement('link');launchStyles.rel='stylesheet';launchStyles.href='launch-curtain.css';document.head.appendChild(launchStyles);}
const launchGrid=document.querySelector('#launch .timeline-grid');
if(launchGrid){
  const launchSteps=[
    {step:'01',days:'DAYS 1–3',word:'BUILD',sub:'THE GAME PLAN',title:'Build the Game Plan',items:['Choose your first target niche.','Outline pricing and revenue targets.','Create a simple written launch plan.'],image:'assets/launch-step-1.svg',alt:'Build the Game Plan launch roadmap illustration'},
    {step:'02',days:'WEEK 1–2',word:'LAUNCH',sub:'YOUR BRAND + PORTAL',title:'Launch Your Brand + Portal',items:['Configure your white-label portal.','Set up vendors and workflows behind the scenes.','Prepare a live branded dashboard for demos.'],image:'assets/launch-step-2.svg',alt:'Launch your brand and portal illustration'},
    {step:'03',days:'WEEK 2–3',word:'SCALE',sub:'YOUR PIPELINE',title:'Build Your Pipeline',items:['Build a list of ideal prospects.','Use proven outreach scripts and demo flow.','Set up intake and follow-up templates.'],image:'assets/launch-step-3.svg',alt:'Build your sales pipeline illustration'},
    {step:'04',days:'WEEK 3–12',word:'RUN',sub:'DEMOS + SCALE',title:'Run Demos + Scale',items:['Get support through your first demos.','Refine your pitch and pricing.','Scale outreach toward repeat client orders.'],image:'assets/launch-step-4.svg',alt:'Run demos and scale client outreach illustration'}
  ];
  launchGrid.insertAdjacentHTML('beforebegin','<div class="launch-curtain-hint"><i></i><span>Hover a step to open it — tap on mobile</span></div>');
  launchGrid.className='launch-curtain-grid';
  launchGrid.innerHTML=launchSteps.map(step=>`<article class="launch-curtain-card" tabindex="0" role="button" aria-expanded="false" aria-label="Open ${step.title}"><div class="launch-card-back"><div class="launch-back-top"><span class="launch-days">${step.days}</span><span class="launch-step-badge">${step.step}</span></div><h3>${step.title}</h3><ul>${step.items.map(item=>`<li>${item}</li>`).join('')}</ul><div class="launch-step-art"><img src="${step.image}" alt="${step.alt}" loading="lazy"></div></div><div class="launch-front" aria-hidden="true"><div class="launch-front-top"><span class="launch-front-label">STEP ${step.step}</span><span class="launch-front-number">${step.step}</span></div><div class="launch-front-word">${step.word}<span class="launch-front-sub">${step.sub}</span></div><div class="launch-front-bottom"><small>${step.days}</small><span class="launch-open-pill"><i></i> OPEN STEP ↗</span></div></div></article>`).join('');
  const launchCards=[...launchGrid.querySelectorAll('.launch-curtain-card')];
  const setLaunchOpen=(card,open)=>{card.classList.toggle('is-open',open);card.setAttribute('aria-expanded',String(open));};
  launchCards.forEach(card=>{
    card.addEventListener('click',()=>{const willOpen=!card.classList.contains('is-open');launchCards.forEach(other=>{if(other!==card)setLaunchOpen(other,false)});setLaunchOpen(card,willOpen);});
    card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();card.click();}});
  });
}


/* Ensure Privacy Policy is available from the footer site-wide. */
document.querySelectorAll('footer .footer-grid').forEach(footerGrid=>{if(footerGrid.querySelector('a[href="privacy.html"]'))return;const columns=[...footerGrid.children].filter(el=>!el.classList.contains('footer-brand'));const target=columns[columns.length-1];if(target){const privacyLink=document.createElement('a');privacyLink.href='privacy.html';privacyLink.textContent='Privacy Policy';const emailLink=[...target.querySelectorAll('a')].find(a=>a.href.startsWith('mailto:'));if(emailLink)target.insertBefore(privacyLink,emailLink);else target.appendChild(privacyLink);}});
