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
