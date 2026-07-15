const shareModal=document.getElementById('shareModal');
const shareBackdrop=document.getElementById('shareBackdrop');
function slugify(text){return text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function updateShareModal(symbol){
  const s=stocks.find(x=>x.symbol===symbol)||stocks[0];
  const dt=new Date();
  const pad=n=>String(n).padStart(2,'0');
  document.getElementById('shareCompanyName').textContent=`${s.name}`;
  document.getElementById('shareTicker').textContent=s.symbol;
  document.getElementById('shareMovePct').textContent=fPct(s.day);
  document.getElementById('shareMovePct').style.color=s.day>=0?'#118a5d':'#d5534f';
  document.getElementById('shareArrow').innerHTML=`<i class="fa-solid ${s.day>=0?'fa-arrow-trend-up':'fa-arrow-trend-down'}" aria-hidden="true"></i>`;
  document.getElementById('shareArrow').style.color=s.day>=0?'#118a5d':'#d5534f';
  document.getElementById('sharePrice').textContent=`$${s.price.toFixed(2)}`;
  document.getElementById('shareTime').textContent=`${dt.getFullYear()}年${dt.getMonth()+1}月${dt.getDate()}日 ${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;
  const link=`https://www.kcex.com/zh-hant/stocks/${slugify(s.name)}-${s.symbol.toLowerCase()}`;
  document.getElementById('shareLink').value=link;
  document.getElementById('shareUrlText').textContent=link.replace('https://','');
  document.getElementById('shareTextArea').value=`${s.name}（${s.symbol}）今日${s.day>=0?'上涨':'下跌'} ${fPct(s.day)}，现价 $${s.price.toFixed(2)}。`;
  const line=s.day>=0?'M0 185 C60 190,90 156,136 140 S220 102,285 88 S375 46,460 34':'M0 128 C50 110,105 126,152 98 S245 64,295 84 S360 168,415 158 S440 135,460 140';
  document.getElementById('shareSparkLine').setAttribute('d',line);
  document.getElementById('shareSparkLine').setAttribute('stroke', s.day>=0 ? '#16a56a' : '#df5d58');
}
function openShareModal(){updateShareModal(currentDrawerSymbol);shareModal.classList.add('open');shareBackdrop.classList.add('open')}
function closeShareModal(){shareModal.classList.remove('open');shareBackdrop.classList.remove('open')}
document.getElementById('drawerShareBtn').addEventListener('click',openShareModal);
document.getElementById('shareClose').addEventListener('click',closeShareModal);
shareBackdrop.addEventListener('click',closeShareModal);
async function copyPlainText(text,fallbackInput){
  if(navigator.clipboard?.writeText){try{await navigator.clipboard.writeText(text);return true}catch(error){}}
  if(fallbackInput){fallbackInput.focus();fallbackInput.select();try{return document.execCommand('copy')}catch(error){}}
  return false;
}
function shareCanvasBlob(canvas){return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('PNG 生成失败')),'image/png'))}
async function renderShareNote(){
  if(typeof html2canvas!=='function')throw new Error('图片组件尚未加载');
  return html2canvas(document.querySelector('.share-note'),{scale:2,backgroundColor:null,useCORS:true,logging:false});
}
async function runShareAction(button,busyText,action){
  const original=button.innerHTML;
  button.disabled=true;
  button.innerHTML=`<span class="share-icon"><i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i></span><span>${busyText}</span>`;
  try{await action()}finally{button.disabled=false;button.innerHTML=original}
}
document.getElementById('copyLinkBtn').addEventListener('click',async()=>{
  const input=document.getElementById('shareLink');
  showToast(await copyPlainText(input.value,input)?'链接已复制':'无法复制链接');
});
document.getElementById('saveShareBtn').addEventListener('click',function(){
  runShareAction(this,'生成中',async()=>{
    try{
      const canvas=await renderShareNote();
      const blob=await shareCanvasBlob(canvas);
      const url=URL.createObjectURL(blob);
      const download=document.createElement('a');
      download.href=url;download.download=`KCEX-${currentDrawerSymbol}-market-note.png`;
      document.body.appendChild(download);download.click();download.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
      showToast('分享图片已保存');
    }catch(error){showToast(error.message||'图片保存失败')}
  });
});
document.getElementById('copyShareBtn').addEventListener('click',function(){
  runShareAction(this,'复制中',async()=>{
    try{
      const canvas=await renderShareNote();
      const blob=await shareCanvasBlob(canvas);
      if(navigator.clipboard?.write&&typeof ClipboardItem!=='undefined'){
        await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
        showToast('分享图片已复制');
        return;
      }
      throw new Error('当前浏览器不支持图片剪贴簿');
    }catch(error){
      const text=document.getElementById('shareTextArea').value;
      showToast(await copyPlainText(text,document.getElementById('shareTextArea'))?'图片复制受限，已复制分享文字':'复制失败');
    }
  });
});

const topNav=document.getElementById('topNav');
const topNavButtons=[...topNav.querySelectorAll('button[data-target]')];
const topNavTargets=topNavButtons.map(button=>({button,element:document.getElementById(button.dataset.target)})).filter(item=>item.element);
let pendingTopNavTarget='';
let pendingTopNavTimer=0;
function setActiveTopNav(targetId){
  topNavButtons.forEach(button=>{
    const active=button.dataset.target===targetId;
    button.classList.toggle('active',active);
    if(active)button.setAttribute('aria-current','location');
    else button.removeAttribute('aria-current');
  });
}
topNavButtons.forEach(button=>button.addEventListener('click',()=>{
  const target=document.getElementById(button.dataset.target);
  if(!target)return;
  pendingTopNavTarget=button.dataset.target;
  clearTimeout(pendingTopNavTimer);
  setActiveTopNav(pendingTopNavTarget);
  const top=Math.max(0,target.getBoundingClientRect().top+window.scrollY-88);
  window.scrollTo({top,behavior:'smooth'});
  pendingTopNavTimer=setTimeout(()=>{pendingTopNavTarget='';syncTopNav()},1200);
}));
let topNavFramePending=false;
function syncTopNav(){
  topNav.classList.toggle('is-scrolled',window.scrollY>24);
  if(pendingTopNavTarget){
    const pending=document.getElementById(pendingTopNavTarget);
    if(pending&&Math.abs(pending.getBoundingClientRect().top-88)<8)pendingTopNavTarget='';
    else{topNavFramePending=false;return;}
  }
  if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-6){
    setActiveTopNav(topNavTargets.at(-1)?.button.dataset.target);
  }else{
    const marker=window.scrollY+120;
    const passed=topNavTargets.filter(item=>item.element.offsetTop<=marker);
    if(passed.length)setActiveTopNav(passed.at(-1).button.dataset.target);
  }
  topNavFramePending=false;
}
window.addEventListener('scroll',()=>{if(!topNavFramePending){topNavFramePending=true;requestAnimationFrame(syncTopNav)}},{passive:true});
window.addEventListener('resize',syncTopNav);
syncTopNav();

renderRows();
