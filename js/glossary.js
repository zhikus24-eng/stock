const glossaryDefinitions={
  '盘前/盘后':'美股正常交易时段之外的交易阶段，流动性通常较低、波动可能更大。',
  '相对成交量':'当前成交量相对于近期平均成交量的倍数。高于 1× 代表当前交易活跃度高于平均水平。',
  '20日均量':'过去 20 个交易日的平均成交量，用于判断当前成交是否异常放大。',
  '距52周高点':'当前价格距离过去 52 周最高价的百分比，可用于判断是否接近突破区。',
  'PE':'市盈率，股价相对于每股收益的估值倍数。数值越高通常代表市场给予更高成长预期。',
  'Forward PE':'预期市盈率，以未来预估盈利计算的市盈率，用来观察市场对未来盈利的定价。',
  'PS':'市销率，市值相对于公司营收的倍数，常用于尚未稳定盈利的成长型公司。',
  'YTD':'Year to Date，指从当年年初至今的累计涨跌幅。',
  'YoY':'Year over Year，同比增长率，即与去年同期相比的变化幅度。',
  'EPS':'每股收益，表示公司净利润分摊到每一股普通股上的盈利。',
  'EBITDA':'息税折旧摊销前利润，用于观察公司核心经营获利能力。',
  'Beta':'衡量股票相对大盘波动敏感度的指标。大于 1 通常表示波动高于市场。',
  '市值':'公司全部已发行股票按当前股价计算的总市场价值。',
  '营收':'公司在一定期间内销售商品或服务获得的总收入。',
  '毛利':'营收扣除直接成本后的利润，反映产品或服务本身的盈利能力。',
  '营业利润':'扣除营业成本与经营费用后的利润，反映主营业务获利能力。',
  '净利润':'扣除所有成本、费用、利息和税项后的最终利润。',
  '毛利率':'毛利占营收的比例，用于衡量产品或服务的基础盈利能力。',
  '营业利润率':'营业利润占营收的比例，用于衡量公司核心经营效率。',
  '净利率':'净利润占营收的比例，反映每 1 元营收最终留下多少利润。',
  '总资产':'公司拥有或控制的全部经济资源总额。',
  '流动资产':'预计可在一年内变现或使用的资产，例如现金、应收账款和存货。',
  '现金及现金等价物':'流动性极高、期限很短且可快速转换为现金的资产。',
  '总负债':'公司需要偿还的全部债务和其他经济义务。',
  '流动负债':'预计在一年内需要偿还的负债。',
  '股东权益':'公司总资产扣除总负债后归属于股东的净资产。',
  '总债务':'公司有息债务的总额，包括短期与长期借款。',
  '净现金':'现金及现金等价物减去总债务后的净额。',
  '经营现金流':'公司主营业务实际产生的现金流入减去现金流出。',
  '投资现金流':'公司买卖长期资产或投资活动产生的现金流。',
  '融资现金流':'公司通过借款、发股、回购或分红等融资活动产生的现金流。',
  '资本支出':'公司用于购买或升级固定资产、设备等长期资产的支出。',
  '自由现金流收益率':'自由现金流相对于公司市值的比例，用于衡量现金创造能力与估值关系。',
  '自由现金流':'经营现金流扣除资本支出后剩余的现金，可用于回购、分红、还债或再投资。',
  '回购金额':'公司用于回购自身股票的资金规模。',
  '现金净变化':'某一期间公司现金余额的净增加或净减少。',
  '财报':'公司定期披露的财务报告，通常包括营收、利润、资产负债与现金流等数据。',
  '财报倒计时':'距离下一次财报公布日期剩余的时间。',
  '隐含波动率':'由期权价格反推出的市场预期波动程度，常用于衡量财报等事件前的预期风险。',
  '估值分位':'当前估值在历史区间中的相对位置，例如 70% 分位表示高于约 70% 的历史时期。',
  '行业平均':'同一行业可比公司的平均水平，用于判断单家公司是否高于或低于同行。',
  '营收增长':'公司收入相对上一期或去年同期的增长幅度。',
  '净利润同比增长':'净利润相较去年同期的增长幅度。'
};

const glossaryTerms=Object.keys(glossaryDefinitions).sort((a,b)=>b.length-a.length);
const escapeGlossaryRegex=t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const glossaryRegex=new RegExp(glossaryTerms.map(escapeGlossaryRegex).join('|'),'g');

function annotateGlossary(root=document.body){
  if(!root || root.nodeType!==1 && root.nodeType!==9) return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
    acceptNode(node){
      if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p=node.parentElement;
      if(!p || p.closest('script,style,textarea,input,option,svg,.glossary-term,.glossary-tooltip')) return NodeFilter.FILTER_REJECT;
      glossaryRegex.lastIndex=0;
      return glossaryRegex.test(node.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }
  });
  const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node=>{
    const text=node.nodeValue;
    glossaryRegex.lastIndex=0;
    let match,last=0; const frag=document.createDocumentFragment();
    while((match=glossaryRegex.exec(text))){
      if(match.index>last) frag.appendChild(document.createTextNode(text.slice(last,match.index)));
      const term=match[0];
      const span=document.createElement('span');
      span.className='glossary-term';
      span.tabIndex=0;
      span.dataset.term=term;
      span.dataset.definition=glossaryDefinitions[term];
      span.textContent=term;
      frag.appendChild(span);
      last=match.index+term.length;
    }
    if(last<text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag,node);
  });
}

const glossaryTooltip=document.getElementById('glossaryTooltip');
let glossaryPinned=false;
function placeGlossaryTooltip(termEl){
  if(!termEl || !glossaryTooltip) return;
  glossaryTooltip.innerHTML=`<b>${termEl.dataset.term}</b><span>${termEl.dataset.definition}</span>`;
  glossaryTooltip.classList.add('show');
  const r=termEl.getBoundingClientRect();
  const tw=glossaryTooltip.offsetWidth, th=glossaryTooltip.offsetHeight;
  let left=r.left+r.width/2-tw/2;
  left=Math.max(12,Math.min(left,window.innerWidth-tw-12));
  let top=r.bottom+9;
  if(top+th>window.innerHeight-12) top=r.top-th-9;
  glossaryTooltip.style.left=`${left}px`;
  glossaryTooltip.style.top=`${Math.max(12,top)}px`;
}
function hideGlossaryTooltip(){if(!glossaryPinned) glossaryTooltip?.classList.remove('show')}
document.addEventListener('mouseover',e=>{const el=e.target.closest?.('.glossary-term');if(el&&!glossaryPinned) placeGlossaryTooltip(el)});
document.addEventListener('mouseout',e=>{if(e.target.closest?.('.glossary-term')&&!glossaryPinned) hideGlossaryTooltip()});
document.addEventListener('focusin',e=>{const el=e.target.closest?.('.glossary-term');if(el&&!glossaryPinned) placeGlossaryTooltip(el)});
document.addEventListener('focusout',e=>{if(e.target.closest?.('.glossary-term')&&!glossaryPinned) hideGlossaryTooltip()});
document.addEventListener('click',e=>{
  const el=e.target.closest?.('.glossary-term');
  if(el){e.stopPropagation();glossaryPinned=true;placeGlossaryTooltip(el);return;}
  glossaryPinned=false;glossaryTooltip?.classList.remove('show');
});
window.addEventListener('scroll',()=>{if(!glossaryPinned) glossaryTooltip?.classList.remove('show')},{passive:true});
window.addEventListener('resize',()=>{if(!glossaryPinned) glossaryTooltip?.classList.remove('show')});

const glossaryObserver=new MutationObserver(mutations=>{
  const roots=[];
  mutations.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1) roots.push(n)}));
  roots.forEach(r=>annotateGlossary(r));
});
window.addEventListener('DOMContentLoaded',()=>{
  const stockDrawer=document.getElementById('stockDrawer');
  if(!stockDrawer) return;
  annotateGlossary(stockDrawer);
  glossaryObserver.observe(stockDrawer,{childList:true,subtree:true});
});
