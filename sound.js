'use strict';
(()=>{
let enabled=true;try{enabled=localStorage.getItem('hangeul-sound')!=='off'}catch(e){}
const pool={};let unlocked=false,lastStep=0;
for(const n of ['click','step','correct','retry','sign','finish']){pool[n]=new Audio('assets/sounds/'+n+'.wav');pool[n].preload='auto';pool[n].volume=n==='step'?.25:.55}
window.gameSound=n=>{if(!enabled||!unlocked||!pool[n])return;const a=pool[n];a.currentTime=0;a.play().catch(()=>{})};
const sound=document.createElement('button');sound.className='light soundToggle';sound.id='soundToggle';const label=()=>{sound.textContent=enabled?'소리 켜짐':'소리 꺼짐';sound.setAttribute('aria-pressed',String(enabled));sound.setAttribute('aria-label','효과음 '+(enabled?'끄기':'켜기'))};label();sound.onclick=()=>{enabled=!enabled;try{localStorage.setItem('hangeul-sound',enabled?'on':'off')}catch(e){}label();if(enabled)gameSound('click')};document.querySelector('header nav').append(sound);
const full=document.createElement('button');full.className='light screenToggle';full.textContent='전체 화면';full.onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch(e){toast('브라우저 메뉴에서 전체 화면을 선택해 주세요.')}};document.querySelector('header nav').append(full);document.addEventListener('fullscreenchange',()=>full.textContent=document.fullscreenElement?'화면 줄이기':'전체 화면');
document.addEventListener('pointerdown',()=>{unlocked=true},{capture:true});document.addEventListener('keydown',()=>{unlocked=true},{capture:true});
document.addEventListener('click',e=>{if(e.target.closest('button')&&!e.target.closest('[data-answer],#save,#finishStory,#soundToggle'))gameSound('click')});
const basePlace=placeWalker;placeWalker=function(){basePlace();if(walkTarget!==null&&performance.now()-lastStep>310){lastStep=performance.now();gameSound('step')}};
})();
