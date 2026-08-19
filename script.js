const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}));

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}})},{threshold:.1,rootMargin:'0px 0px -30px'});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const checks=[...document.querySelectorAll('.console-check')];const percent=document.getElementById('meter-percent');const bar=document.getElementById('meter-bar');const states=[[1,72],[2,84],[3,93],[4,100]];let stateIndex=0;
function updateScreeningDemo(){if(!checks.length||!percent||!bar)return;const[completedCount,progress]=states[stateIndex];checks.forEach((row,index)=>{const icon=row.querySelector('.check-icon');const status=row.querySelector('em');row.classList.remove('complete','running','queued');if(index<completedCount){row.classList.add('complete');if(icon)icon.textContent='✓';if(status)status.textContent='Complete'}else if(index===completedCount&&completedCount<checks.length){row.classList.add('running');if(icon)icon.textContent='⌕';if(status)status.textContent='Running'}else{row.classList.add('queued');if(icon)icon.textContent='+';if(status)status.textContent='Queued'}});percent.textContent=`${progress}%`;bar.style.width=`${progress}%`;stateIndex=(stateIndex+1)%states.length}
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(updateScreeningDemo,2600);

const faqItems=[...document.querySelectorAll('.faq-list details')];
const faqContent=[
  {
    question:'Do I need background check experience?',
    answer:'Not necessarily. Sales ability, relationship-building and the willingness to follow a proven launch plan can matter just as much. Brango Connect gives you the screening platform, vendor infrastructure, backend support and operating foundation so you can focus on winning clients and building your own company instead of spending years creating the machinery behind it.',
    cta:'See If I Qualify'
  },
  {
    question:'What could I actually build with a Brango Connect license?',
    answer:'The goal is a real B2B company under your own brand with a growing book of employer clients that need screening again and again. Each new relationship can add recurring order volume, referrals and long-term value to the business you own — not just another commission check for someone else.',
    cta:'Explore Owning My Business'
  },
  {
    question:'Why start here instead of building a background check company from scratch?',
    answer:'Starting alone means solving software, screening vendors, fulfillment, workflows, compliance processes and support before you can focus fully on sales. Brango Connect is designed to remove much of that startup burden so your energy can go toward the part that actually grows the company: finding prospects, building trust and closing recurring clients.',
    cta:'Apply for a License'
  },
  {
    question:'How does owning the client relationship change the opportunity?',
    answer:'When you own the company and the customer relationship, the work you do can build something that belongs to you. Instead of only being paid for this month\'s sale, you can build a branded client base that continues ordering background checks as those employers keep hiring.',
    cta:'See If Brango Connect Fits Me'
  },
  {
    question:'What is the first step if I can see myself doing this?',
    answer:'You do not need to make a big decision today. Start by telling us about your experience, market and goals. We can walk through the model with you, show you the platform and help you decide whether owning a background check business is a realistic fit for where you want to go next.',
    cta:'Start the Conversation'
  }
];
faqItems.forEach((item,index)=>{const content=faqContent[index];if(!content)return;const summary=item.querySelector('summary');const answer=item.querySelector('p');if(summary)summary.innerHTML=`${content.question}<span>+</span>`;if(answer)answer.innerHTML=`${content.answer}<a class="faq-cta button button-primary button-small" href="#contact">${content.cta} →</a>`;});
faqItems.forEach(item=>item.addEventListener('toggle',()=>{if(!item.open)return;faqItems.forEach(other=>{if(other!==item)other.open=false})}));

const contactForm=document.getElementById('contact-form');
const contactStatus=document.getElementById('form-status');
const interestSelect=document.getElementById('contact-interest');
if(interestSelect){const requestedInterest=new URLSearchParams(window.location.search).get('interest');if(requestedInterest&&[...interestSelect.options].some(option=>option.value===requestedInterest))interestSelect.value=requestedInterest;}
if(contactForm){contactForm.addEventListener('submit',async event=>{event.preventDefault();const submitButton=contactForm.querySelector('button[type="submit"]');const originalText=submitButton?.innerHTML;if(submitButton){submitButton.disabled=true;submitButton.innerHTML='Sending…';}if(contactStatus){contactStatus.className='form-status';contactStatus.textContent='';}try{const response=await fetch(contactForm.action,{method:'POST',body:new FormData(contactForm),headers:{Accept:'application/json'}});if(response.ok){contactForm.reset();if(contactStatus){contactStatus.className='form-status success';contactStatus.textContent='Thank you. Your information was sent to Brango Connect and our team will follow up with you.';}}else{throw new Error('Form submission failed');}}catch(error){if(contactStatus){contactStatus.className='form-status error';contactStatus.innerHTML='We could not send the form. Please try again or email <a href="mailto:info@brangoconnect.com">info@brangoconnect.com</a>.';}}finally{if(submitButton){submitButton.disabled=false;submitButton.innerHTML=originalText;}}});}

/* Interactive launch path: curtain-reveal behavior adapted to this site's native HTML/CSS/JS stack. */
if(!document.querySelector('link[href="launch-curtain.css"]')){const launchStyles=document.createElement('link');launchStyles.rel='stylesheet';launchStyles.href='launch-curtain.css';document.head.appendChild(launchStyles);}
const launchGrid=document.querySelector('#launch .timeline-grid');
if(launchGrid){
  const launchSteps=[
    {step:'01',days:'DAYS 1–3',word:'BUILD',sub:'THE GAME PLAN',title:'Build the Game Plan',items:['Choose your first target niche.','Outline pricing and revenue targets.','Create a simple written launch plan.'],image:'assets/launch-step-1.svg',alt:'Build the Game Plan launch roadmap illustration'},
    {step:'02',days:'WEEK 1–2',word:'LAUNCH',sub:'YOUR BRAND + PORTAL',title:'Launch Your Brand + Portal',items:['Configure your white-label portal.','Set up vendors and workflows behind the scenes.','Prepare a live branded dashboard for demos.'],image:'assets/launch-step-2.svg',alt:'Launch your brand and portal illustration'},
    {step:'03',days:'WEEK 2–3',word:'BUILD',sub:'YOUR PIPELINE',title:'Build Your Pipeline',items:['Build a list of ideal prospects.','Use proven outreach scripts and demo flow.','Set up intake and follow-up templates.'],image:'assets/launch-step-3.svg',alt:'Build your sales pipeline illustration'},
    {step:'04',days:'WEEK 3–12',word:'RUN',sub:'DEMOS + SCALE',title:'Run Demos + Scale',items:['Get support through your first demos.','Refine your pitch and pricing.','Scale outreach toward recurring revenue.'],image:'assets/launch-step-4.svg',alt:'Run demos and scale recurring revenue illustration'}
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
