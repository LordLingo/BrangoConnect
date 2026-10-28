const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuButton?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
});
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded','false');
}));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.1,rootMargin:'0px 0px -30px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const checks=[...document.querySelectorAll('.console-check')];
const percent=document.getElementById('meter-percent');
const bar=document.getElementById('meter-bar');
const states=[[1,72],[2,84],[3,93],[4,100]];
let stateIndex=0;
function updateScreeningDemo(){
  if(!checks.length||!percent||!bar)return;
  const[completedCount,progress]=states[stateIndex];
  checks.forEach((row,index)=>{
    const icon=row.querySelector('.check-icon');
    const status=row.querySelector('em');
    row.classList.remove('complete','running','queued');
    if(index<completedCount){
      row.classList.add('complete');
      if(icon)icon.textContent='✓';
      if(status)status.textContent='Complete';
    }else if(index===completedCount&&completedCount<checks.length){
      row.classList.add('running');
      if(icon)icon.textContent='⌕';
      if(status)status.textContent='Running';
    }else{
      row.classList.add('queued');
      if(icon)icon.textContent='+';
      if(status)status.textContent='Queued';
    }
  });
  percent.textContent=`${progress}%`;
  bar.style.width=`${progress}%`;
  stateIndex=(stateIndex+1)%states.length;
}
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(updateScreeningDemo,2600);

document.querySelectorAll('.faq-list details').forEach(item=>item.addEventListener('toggle',()=>{
  if(!item.open)return;
  document.querySelectorAll('.faq-list details').forEach(other=>{if(other!==item)other.open=false;});
}));

document.querySelectorAll('.js-lead-form').forEach(form=>{
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    const submitButton=form.querySelector('button[type="submit"]');
    const status=form.querySelector('.form-status');
    const original=submitButton?.innerHTML;
    if(submitButton){submitButton.disabled=true;submitButton.textContent='Sending…';}
    if(status){status.className='form-status';status.textContent='';}
    try{
      const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if(!response.ok)throw new Error('Form submission failed');
      if(typeof window.va==='function'){
        const source=form.querySelector('[name="source"]')?.value||'';
        window.va('event',{name:'apply-submit',data:{source}});
      }
      window.location.href='thank-you.html';
    }catch(error){
      if(status){
        status.className='form-status error';
        status.innerHTML='We could not send the form. Please try again or email <a href="mailto:info@brangoconnect.com">info@brangoconnect.com</a>.';
      }
      if(submitButton){submitButton.disabled=false;submitButton.innerHTML=original;}
    }
  });
});

/* Analytics placeholder.
   Vercel Web Analytics is loaded from /_vercel/insights/script.js (see the page head).
   It records page views when Analytics is enabled on the Vercel project.
   data-analytics on links is the hook for that script, or for another vendor later.
   No second vendor is installed. */
document.querySelectorAll('a[data-analytics]').forEach(el=>{
  el.addEventListener('click',()=>{
    const name=el.getAttribute('data-analytics');
    if(!name||typeof window.va!=='function')return;
    window.va('event',{name});
  });
});

const launchGrid=document.querySelector('.launch-curtain-grid');
if(launchGrid){
  const launchCards=[...launchGrid.querySelectorAll('.launch-curtain-card')];
  const setLaunchOpen=(card,open)=>{
    card.classList.toggle('is-open',open);
    card.setAttribute('aria-expanded',String(open));
  };
  launchCards.forEach(card=>{
    card.addEventListener('click',()=>{
      const willOpen=!card.classList.contains('is-open');
      launchCards.forEach(other=>{if(other!==card)setLaunchOpen(other,false);});
      setLaunchOpen(card,willOpen);
    });
    card.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();card.click();}
    });
  });
}

const applyBar=document.querySelector('[data-apply-bar]');
if(applyBar){
  const show=on=>{
    applyBar.classList.toggle('is-visible',on);
    document.body.classList.toggle('apply-bar-on',on);
  };
  const applyTarget=document.querySelector('#apply');
  const watched=applyTarget?.querySelector('button[type="submit"]')||applyTarget;
  if(watched){
    const io=new IntersectionObserver(([entry])=>{show(!entry.isIntersecting);},{threshold:.4});
    io.observe(watched);
  }else{
    const onScroll=()=>{show(window.scrollY>160);};
    onScroll();
    window.addEventListener('scroll',onScroll,{passive:true});
  }
}

document.querySelectorAll('footer .footer-grid').forEach(footerGrid=>{
  if(footerGrid.querySelector('a[href="privacy.html"]'))return;
  const columns=[...footerGrid.children].filter(el=>!el.classList.contains('footer-brand'));
  const target=columns[columns.length-1];
  if(!target)return;
  const privacyLink=document.createElement('a');
  privacyLink.href='privacy.html';
  privacyLink.textContent='Privacy Policy';
  const emailLink=[...target.querySelectorAll('a')].find(a=>a.href.startsWith('mailto:'));
  if(emailLink)target.insertBefore(privacyLink,emailLink);
  else target.appendChild(privacyLink);
});
