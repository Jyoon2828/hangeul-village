'use strict';
// 도착한 의뢰는 한 번 열고, 같은 자리에 머무르는 동안 다시 열지 않아요.
let autoQuestPlace=null,autoQuestTimer;
const manualGoTo=goTo;
goTo=function(node){clearTimeout(autoQuestTimer);if(nearPlace!==null&&node===approaches[nearPlace])autoQuestPlace=null;manualGoTo(node)};
const priorNear=updateNear;
updateNear=function(){priorNear();if(nearPlace===null){autoQuestPlace=null;clearTimeout(autoQuestTimer);return}if(walkTarget!==null||walkQueue.length||!state.storyStarted||storyBusy||$('#modal').open||autoQuestPlace===nearPlace)return;const i=nearPlace;autoQuestPlace=i;clearTimeout(autoQuestTimer);autoQuestTimer=setTimeout(()=>{if(nearPlace===i&&walkTarget===null&&!walkQueue.length&&!storyBusy&&!$('#modal').open){gameSound?.('click');openPlace(i)}else autoQuestPlace=null},850)};
$('#modal').addEventListener('close',()=>setTimeout(updateNear,200));
$('#nearDesc').textContent='간판 앞에 도착하면 주민의 의뢰가 자동으로 열려요.';
const oldStoryHint=updateStoryHUD;updateStoryHUD=function(){oldStoryHint();$('#storyHint').textContent='간판 앞으로 이동 → 의뢰 자동 열기 → 우리말 이름 짓기'};
