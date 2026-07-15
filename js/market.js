const rowsEl=document.getElementById('stockRows');
const search=document.getElementById('searchInput');
const drawer=document.getElementById('stockDrawer');
const backdrop=document.getElementById('drawerBackdrop');
let currentDrawerSymbol='NVDA';

function fPct(n){return `${n>=0?'+':''}${n.toFixed(2)}%`}
function tagClass(t){return t==='red'?'red':t==='warn'?'warn':''}
function peDisplay(s){return s.pe==null?'— / —':`${s.pe.toFixed(1)} / ${s.sectorPe.toFixed(1)}`}
function formatCell(v){
  if(typeof v==='number') return v;
  const cls=typeof v==='string' && (v.startsWith('+')||v.startsWith('-')) ? (v.startsWith('+')?'up':'down') : '';
  return `<span class="${cls}">${v}</span>`;
}

function filteredStocks(){
  const q=search.value.trim().toLowerCase();
  let arr=stocks.filter(s=>{
    const cat=activeFilter==='all'||(activeFilter==='watch'?watchlist.has(s.symbol):s.cat===activeFilter);
    return cat && (s.symbol.toLowerCase().includes(q)||s.name.toLowerCase().includes(q)||s.sector.toLowerCase().includes(q));
  });
  if(sortKey){
    arr=[...arr].sort((a,b)=>{
      let av=a[sortKey], bv=b[sortKey];
      if(typeof av==='string') return sortAsc?av.localeCompare(bv):bv.localeCompare(av);
      return sortAsc?av-bv:bv-av;
    });
  }
  return arr;
}

function renderRows(){
  rowsEl.innerHTML=filteredStocks().map(s=>`<tr data-symbol="${s.symbol}"><td><button class="watch-btn ${watchlist.has(s.symbol)?'on':''}" data-watch="${s.symbol}" title="关注"><i class="${watchlist.has(s.symbol)?'fa-solid':'fa-regular'} fa-star" aria-hidden="true"></i></button></td><td><div class="company-cell">${stockLogoMarkup(s.symbol,s.logo)}<div><div class="ticker-name">${s.symbol}</div><div class="company-name">${s.name} · ${s.sector}</div></div></div></td><td>$${s.price.toFixed(2)}</td><td class="${s.day>=0?'up':'down'}">${fPct(s.day)}</td><td class="${s.session>=0?'up':'down'}">${fPct(s.session)}</td><td class="${s.month>=0?'up':'down'}">${fPct(s.month)}</td><td><div style="display:flex;align-items:center;gap:8px"><span>${s.rvol.toFixed(1)}×</span><div class="barline"><span style="width:${Math.min(s.rvol/3.6*100,100)}%"></span></div></div></td><td>${s.high.toFixed(1)}%</td><td>${peDisplay(s)}</td><td>${s.btc.toFixed(2)}</td><td><span class="signal-tag ${tagClass(s.tag||'neutral')}">${s.event}</span></td></tr>`).join('');
  rowsEl.querySelectorAll('tr').forEach(tr=>tr.addEventListener('click',e=>{if(e.target.closest('[data-watch]'))return;openDrawer(tr.dataset.symbol)}));
  rowsEl.querySelectorAll('[data-watch]').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();const sym=btn.dataset.watch;watchlist.has(sym)?watchlist.delete(sym):watchlist.add(sym);showToast(watchlist.has(sym)?'已加入关注列表':'已移出关注列表');renderRows()}));
}

document.querySelectorAll('#marketFilters .pill').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#marketFilters .pill').forEach(x=>x.classList.remove('active'));btn.classList.add('active');activeFilter=btn.dataset.filter;renderRows()}));
document.querySelectorAll('th[data-sort]').forEach(th=>th.addEventListener('click',()=>{const k=th.dataset.sort;if(sortKey===k)sortAsc=!sortAsc;else{sortKey=k;sortAsc=false}renderRows()}));

const searchDropdown=document.getElementById('searchDropdown');
const searchResults=document.getElementById('searchResults');
function matchingStocks(q){
  const term=q.trim().toLowerCase();
  const arr=(term?stocks.filter(s=>s.symbol.toLowerCase().includes(term)||s.name.toLowerCase().includes(term)||s.sector.toLowerCase().includes(term)):stocks.slice(0,6));
  return arr.slice(0,6);
}
function renderSearchDropdown(){
  const arr=matchingStocks(search.value);
  searchResults.innerHTML=arr.length?arr.map(s=>`<div class="search-result" data-symbol="${s.symbol}"><div class="search-result-main">${stockLogoMarkup(s.symbol,s.logo)}<div><strong>${s.name}</strong><span>${s.sector}</span></div></div><div class="search-result-code">${s.symbol}</div></div>`).join(''):`<div class="search-empty">没有找到匹配的股票</div>`;
  searchResults.querySelectorAll('.search-result').forEach(item=>item.addEventListener('click',()=>{const sym=item.dataset.symbol;search.value='';searchDropdown.classList.remove('show');openDrawer(sym)}));
}
function showSearchDropdown(){renderSearchDropdown();searchDropdown.classList.add('show')}
function hideSearchDropdown(){searchDropdown.classList.remove('show')}
search.addEventListener('focus',showSearchDropdown);
search.addEventListener('input',()=>{renderRows();showSearchDropdown()});
document.addEventListener('click',e=>{if(!e.target.closest('.searchbox')) hideSearchDropdown();});

const investorPortfolios={
 buffett:{avatar:'WB',name:'Warren Buffett',fund:'Berkshire Hathaway',quarter:'2025 Q4',tags:['价值投资','高集中度','长期持有'],stats:[['披露持仓','41'],['前十大集中度','89.7%'],['本季变化','2 增 · 3 减']],thesis:'以高质量现金流和持久竞争优势为核心，组合集中在消费、金融与大型科技公司。',activity:{date:'07/12 · Demo',symbol:'AAPL',name:'Apple',action:'减持后追踪',performance:'+6.8%',period:'申报季末至今',headline:'Apple 权重下降后，市场仍在重估 AI 换机周期',opinion:'我的观察：减持更像是控制单一持仓集中度，而不是完全否定公司。后续重点应放在服务收入与设备更新周期能否继续抵消估值压力。'},holdings:[['AAPL','Apple','24.2%'],['AXP','American Express','17.1%'],['BAC','Bank of America','10.8%'],['KO','Coca-Cola','9.4%'],['CVX','Chevron','6.2%']]},
 ackman:{avatar:'BA',name:'Bill Ackman',fund:'Pershing Square Capital',quarter:'2025 Q4',tags:['集中持仓','质量成长','主动治理'],stats:[['披露持仓','10'],['前十大集中度','100%'],['本季变化','1 增 · 1 减']],thesis:'偏好商业模式简单、定价能力强且自由现金流稳定的龙头，并通过高度集中表达观点。',activity:{date:'07/09 · Demo',symbol:'UBER',name:'Uber',action:'增持后追踪',performance:'+11.4%',period:'披露后 30 日',headline:'Uber 成为高集中度组合中的增长引擎',opinion:'我的观察：市场正在从出行订单增速转向自由现金流与平台规模效应。若利润率继续扩张，高估值仍有基本面支撑。'},holdings:[['GOOGL','Alphabet','19.6%'],['UBER','Uber','17.8%'],['HLT','Hilton','15.1%'],['QSR','Restaurant Brands','13.4%'],['CMG','Chipotle','11.2%']]},
 burry:{avatar:'MB',name:'Michael Burry',fund:'Scion Asset Management',quarter:'2025 Q4',tags:['逆向投资','估值错配','高换手'],stats:[['披露持仓','13'],['前十大集中度','92.5%'],['本季变化','6 新 · 5 清']],thesis:'寻找市场预期与基本面之间的错配，仓位变化通常较快，需要结合季度申报时滞解读。',activity:{date:'07/08 · Demo',symbol:'BABA',name:'Alibaba',action:'逆向仓位追踪',performance:'-3.2%',period:'披露后 30 日',headline:'Alibaba 反弹遇阻，逆向逻辑仍需盈利验证',opinion:'我的观察：低估值提供缓冲，但消费修复、云业务增长与股东回报必须同时改善，市场才可能给予持续性的估值重估。'},holdings:[['BABA','Alibaba','21.3%'],['JD','JD.com','15.7%'],['HCA','HCA Healthcare','12.8%'],['MOH','Molina','10.1%'],['EL','Estée Lauder','8.9%']]},
 druckenmiller:{avatar:'SD',name:'Stan Druckenmiller',fund:'Duquesne Family Office',quarter:'2025 Q4',tags:['宏观趋势','成长动量','灵活配置'],stats:[['披露持仓','69'],['前十大集中度','54.8%'],['本季变化','12 增 · 9 减']],thesis:'结合宏观周期与企业盈利趋势，在科技、工业和资源类资产之间灵活调整风险敞口。',activity:{date:'07/11 · Demo',symbol:'NVDA',name:'NVIDIA',action:'科技仓位追踪',performance:'+14.6%',period:'披露后 30 日',headline:'NVIDIA 延续强势，但组合开始分散 AI 风险',opinion:'我的观察：AI 资本开支趋势仍强，但增配光通信与工业公司，可能代表组合正从单一芯片赢家扩展至基础设施第二阶段。'},holdings:[['NVDA','NVIDIA','13.9%'],['COHR','Coherent','8.2%'],['NTRA','Natera','7.4%'],['WWD','Woodward','6.1%'],['CPNG','Coupang','5.7%']]}
};
const investorActivityFeed={
 buffett:[
  investorPortfolios.buffett.activity,
  {date:'07/10 · Demo',symbol:'OXY',name:'Occidental Petroleum',action:'能源仓位观察',performance:'+2.4%',period:'近 20 日',headline:'Occidental 获得增持后，油价成为短线关键变量',opinion:'我的观察：这类交易更接近对优质能源资产现金流的长期配置。短期仍需关注油价、资本开支纪律和债务下降速度。'},
  {date:'07/07 · Demo',symbol:'KO',name:'Coca-Cola',action:'长期持仓追踪',performance:'+1.7%',period:'近 30 日',headline:'Coca-Cola 防御属性重新受到市场关注',opinion:'我的观察：在波动放大的环境中，品牌、提价能力与稳定股息会提高组合韧性，但较高估值也会压缩未来回报空间。'},
  {date:'07/03 · Demo',symbol:'AXP',name:'American Express',action:'核心仓位观察',performance:'+4.9%',period:'近 30 日',headline:'American Express 延续高端消费与信贷质量优势',opinion:'我的观察：高消费客群使其信用风险相对可控。后续重点是交易额增长能否抵消资金成本维持高位的压力。'},
  {date:'06/28 · Demo',symbol:'CVX',name:'Chevron',action:'行业配置追踪',performance:'-1.1%',period:'近 30 日',headline:'Chevron 回落，能源组合进入现金流验证期',opinion:'我的观察：股价回撤不一定破坏长期逻辑，但若油价持续转弱，自由现金流、回购规模和项目执行会成为主要估值锚。'}
 ],
 ackman:[
  investorPortfolios.ackman.activity,
  {date:'07/06 · Demo',symbol:'GOOGL',name:'Alphabet',action:'核心仓位追踪',performance:'+7.3%',period:'近 30 日',headline:'Alphabet 在 AI 投资与利润率之间寻找平衡',opinion:'我的观察：市场愿意为搜索护城河和云业务增长付费，但资本开支快速增加后，投资回报率会成为下一阶段焦点。'},
  {date:'07/02 · Demo',symbol:'HLT',name:'Hilton',action:'消费服务观察',performance:'+3.1%',period:'近 20 日',headline:'Hilton 轻资产模式继续释放现金流弹性',opinion:'我的观察：品牌授权与管理费模式降低了资产负担。若商务旅行和国际需求稳定，利润率仍有改善空间。'},
  {date:'06/29 · Demo',symbol:'QSR',name:'Restaurant Brands',action:'持仓修复追踪',performance:'-2.0%',period:'近 30 日',headline:'Restaurant Brands 等待门店效率与国际业务改善',opinion:'我的观察：短期成本和客流会影响情绪，但真正需要观察的是加盟体系健康度、同店销售和门店回报周期。'},
  {date:'06/25 · Demo',symbol:'CMG',name:'Chipotle',action:'成长仓位观察',performance:'+5.6%',period:'近 30 日',headline:'Chipotle 客流韧性支撑高质量成长叙事',opinion:'我的观察：门店扩张和数字化订单仍是增长核心。风险在于高预期下，任何同店销售放缓都会放大估值波动。'}
 ],
 burry:[
  investorPortfolios.burry.activity,
  {date:'07/05 · Demo',symbol:'JD',name:'JD.com',action:'逆向仓位观察',performance:'+2.9%',period:'近 30 日',headline:'JD.com 以物流效率与股东回报对冲消费疑虑',opinion:'我的观察：低估值并不足够，市场需要看到利润率、回购和消费需求同时改善，才会形成更持续的重估。'},
  {date:'07/01 · Demo',symbol:'HCA',name:'HCA Healthcare',action:'医疗仓位追踪',performance:'+4.2%',period:'近 20 日',headline:'HCA Healthcare 受益于医疗服务需求韧性',opinion:'我的观察：住院量和定价具有防御性，但人工成本与政策风险仍可能影响利润率，适合作为逆周期配置观察。'},
  {date:'06/27 · Demo',symbol:'EL',name:'Estée Lauder',action:'修复交易追踪',performance:'-4.6%',period:'近 30 日',headline:'Estée Lauder 修复速度仍低于市场预期',opinion:'我的观察：品牌价值仍在，但旅游零售和中国消费恢复不均。需要库存、毛利率和渠道质量同时改善。'},
  {date:'06/23 · Demo',symbol:'MOH',name:'Molina',action:'估值错配观察',performance:'+1.3%',period:'近 30 日',headline:'Molina 在政策不确定性中寻找估值底部',opinion:'我的观察：医疗保险股的低估值来自政策与赔付率压力。真正的催化剂是成本趋势稳定和管理层指引改善。'}
 ],
 druckenmiller:[
  investorPortfolios.druckenmiller.activity,
  {date:'07/08 · Demo',symbol:'COHR',name:'Coherent',action:'AI 基建追踪',performance:'+9.8%',period:'近 30 日',headline:'Coherent 承接 AI 数据中心的光通信需求',opinion:'我的观察：资金正在从 GPU 扩散到高速互连。订单可见度与产能爬坡决定这类第二阶段受益者能否兑现估值。'},
  {date:'07/04 · Demo',symbol:'NTRA',name:'Natera',action:'成长仓位观察',performance:'+5.1%',period:'近 30 日',headline:'Natera 以检测量增长强化医疗科技趋势',opinion:'我的观察：高增长来自渗透率提升，但估值依赖持续的检测量、报销改善与经营杠杆，波动通常较高。'},
  {date:'06/30 · Demo',symbol:'WWD',name:'Woodward',action:'工业仓位追踪',performance:'+3.7%',period:'近 20 日',headline:'Woodward 成为航空与工业周期的平衡仓位',opinion:'我的观察：商业航空复苏和国防需求提供订单支持，工业持仓也能降低组合对单一科技主题的依赖。'},
  {date:'06/26 · Demo',symbol:'CPNG',name:'Coupang',action:'平台成长观察',performance:'-1.8%',period:'近 30 日',headline:'Coupang 扩张投入暂时压制利润表现',opinion:'我的观察：用户黏性与物流网络仍具价值，但新业务投入会拉长利润兑现周期，市场需要更清晰的单位经济改善。'}
 ]
};
const investorHoldingMarket={
 AAPL:[248.61,1.18,'消费电子'],AXP:[324.11,.74,'金融服务'],BAC:[49.20,-.36,'银行'],KO:[69.12,.28,'必需消费'],CVX:[161.33,-.62,'能源'],
 GOOGL:[196.45,1.42,'互联网'],UBER:[94.20,2.16,'出行平台'],HLT:[268.40,.65,'酒店'],QSR:[72.50,-.21,'餐饮'],CMG:[45.30,1.06,'餐饮'],
 BABA:[119.60,-1.34,'电商'],JD:[34.80,-.72,'电商'],HCA:[389.20,.91,'医疗服务'],MOH:[202.00,-1.82,'医疗保险'],EL:[93.00,.44,'消费品'],
 COHR:[91.00,2.37,'光通信'],NTRA:[157.00,1.63,'生物科技'],WWD:[212.00,.83,'工业'],CPNG:[32.00,1.25,'电商']
};
function createInvestorStock(symbol,name,owner){
  const market=investorHoldingMarket[symbol]||[100,0,'综合'];
  const price=market[0],day=market[1],sector=market[2];
  return {symbol,name,sector,cat:'earnings',logo:symbol.slice(0,2),logoBg:'#252a27',price,day,session:day*.18,week:day*1.7,month:day*3.1,ytd:day*7.4,rvol:1.4,avgVol:'18.4M',marketCap:'Demo',high:-7.2,pe:28.6,sectorPe:25.4,fwdPe:24.8,ps:6.2,revGrowth:'+12.6%',epsGrowth:'+15.8%',btc:.24,eth:.19,nasdaq:.66,beta:'1.18',event:'18天后财报',earningsMove:'+4.2%',btcSensitivity:'0.16×',summary:`${symbol} 是 ${owner} 公开申报组合中的核心持仓之一。当前详情使用 Demo 市场快照，重点用于展示持仓与行情分析如何衔接。`,valuationNote:'当前估值数据为 Demo 示例。实际判断应结合最新公司财报、行业估值与申报持仓时滞。',cryptoNote:'该标的与加密资产没有直接定价关系，相关性仅用于观察跨市场风险偏好。',events:[{title:'名人持仓追踪',desc:`${owner} 的公开申报中包含 ${symbol}，但 13F 无法反映申报日后的即时买卖。`},{title:'下次财报 · 18天后',desc:'关注收入增速、利润率与管理层下一季度指引。'},{title:'数据说明',desc:'价格与指标为产品界面 Demo 示例，不构成投资建议。'}]};
}
function openInvestorHolding(symbol,name,owner){
  if(!stocks.some(stock=>stock.symbol===symbol)) stocks.push(createInvestorStock(symbol,name,owner));
  openDrawer(symbol);
}
let activeInvestorKey='buffett';
let activeActivityIndex=0;
let investorActivityTimer=null;
function renderInvestorActivity(key,index){
  const feed=investorActivityFeed[key];
  activeInvestorKey=key;
  activeActivityIndex=(index+feed.length)%feed.length;
  const activity=feed[activeActivityIndex];
  const body=document.getElementById('investorActivityBody');
  body.classList.remove('activity-enter');
  void body.offsetWidth;
  body.classList.add('activity-enter');
  document.getElementById('investorActivityDate').textContent=activity.date;
  document.getElementById('investorActivityHeadline').textContent=activity.headline;
  document.getElementById('investorActivityAction').textContent=activity.action;
  const activityMove=document.getElementById('investorActivityPerformance');activityMove.textContent=activity.performance;activityMove.className=activity.performance.startsWith('-')?'down':'up';
  document.getElementById('investorActivityPeriod').textContent=activity.period;
  document.getElementById('investorActivityOpinion').textContent=activity.opinion;
  const activityButton=document.getElementById('investorActivityStock');activityButton.dataset.symbol=activity.symbol;activityButton.innerHTML=`查看 ${activity.symbol} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>`;
  activityButton.onclick=()=>openInvestorHolding(activity.symbol,activity.name,investorPortfolios[key].name);
  document.getElementById('investorActivityDots').innerHTML=feed.map((_,dotIndex)=>`<button type="button" class="${dotIndex===activeActivityIndex?'active':''}" data-activity-index="${dotIndex}" aria-label="第 ${dotIndex+1} 則"></button>`).join('');
  document.querySelectorAll('#investorActivityDots button').forEach(dot=>dot.addEventListener('click',()=>{renderInvestorActivity(activeInvestorKey,Number(dot.dataset.activityIndex));startInvestorActivityTimer()}));
}
function moveInvestorActivity(step){renderInvestorActivity(activeInvestorKey,activeActivityIndex+step)}
function startInvestorActivityTimer(){clearInterval(investorActivityTimer);investorActivityTimer=setInterval(()=>moveInvestorActivity(1),6000)}
function renderInvestor(key){
  const d=investorPortfolios[key];
  document.getElementById('investorAvatar').textContent=d.avatar;
  document.getElementById('investorName').textContent=d.name;
  document.getElementById('investorFund').textContent=d.fund;
  document.getElementById('investorQuarter').textContent=d.quarter;
  document.getElementById('investorTags').innerHTML=d.tags.map(tag=>`<span>${tag}</span>`).join('');
  document.getElementById('investorStats').innerHTML=d.stats.map(item=>`<div><small>${item[0]}</small><b>${item[1]}</b></div>`).join('');
  document.getElementById('investorThesis').innerHTML=`<i class="fa-solid fa-quote-left" aria-hidden="true"></i><p>${d.thesis}</p>`;
  renderInvestorActivity(key,0);
  document.getElementById('investorHoldings').innerHTML=d.holdings.map((item,index)=>`<button type="button" class="investor-holding" data-symbol="${item[0]}" data-name="${item[1]}"><span class="holding-rank">${String(index+1).padStart(2,'0')}</span>${stockLogoMarkup(item[0],item[0].slice(0,2),'holding-logo')}<span class="holding-company"><b>${item[0]}</b><small>${item[1]}</small></span><span class="holding-weight">${item[2]}</span><span class="holding-bar"><i style="width:${Math.min(parseFloat(item[2])*3.4,100)}%"></i></span></button>`).join('');
  document.getElementById('investorSource').innerHTML=`<i class="fa-solid fa-database" aria-hidden="true"></i> 数据来源：SEC Form 13F；${d.quarter} Demo 示例持仓，申报数据存在最长 45 天时滞。`;
  document.querySelectorAll('.investor-holding').forEach(btn=>btn.addEventListener('click',()=>openInvestorHolding(btn.dataset.symbol,btn.dataset.name,d.name)));
  startInvestorActivityTimer();
}
document.getElementById('investorActivityPrev').addEventListener('click',()=>{moveInvestorActivity(-1);startInvestorActivityTimer()});
document.getElementById('investorActivityNext').addEventListener('click',()=>{moveInvestorActivity(1);startInvestorActivityTimer()});
const investorActivityCard=document.querySelector('.investor-activity');
investorActivityCard.addEventListener('mouseenter',()=>clearInterval(investorActivityTimer));
investorActivityCard.addEventListener('mouseleave',startInvestorActivityTimer);
document.querySelectorAll('#investorTabs .pill').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#investorTabs .pill').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderInvestor(btn.dataset.investor)}));
renderInvestor('buffett');

const rankData={
 gainers:[
  {symbol:'COIN',name:'Coinbase',badge:'加密概念',main:'+6.12%',sub:'现价 $391.18',stats:[['30日涨幅','+26.38%'],['相对成交量','3.4×'],['PE','31.8'],['下次财报','21天后']]},
  {symbol:'MSTR',name:'Strategy',badge:'BTC 代理',main:'+5.84%',sub:'现价 $463.71',stats:[['30日涨幅','+31.05%'],['BTC相关性','0.82'],['BTC敏感度','1.65×'],['相对成交量','3.0×']]},
  {symbol:'HOOD',name:'Robinhood',badge:'金融科技',main:'+4.64%',sub:'现价 $112.84',stats:[['30日涨幅','+19.30%'],['营收增长','+26.4%'],['PE','57.2'],['下次财报','14天后']]}],
 volume:[
  {symbol:'COIN',name:'Coinbase',badge:'爆量',main:'3.4×',sub:'相对 20 日均量',stats:[['今日涨跌','+6.12%'],['30日涨幅','+26.38%'],['PE','31.8'],['BTC相关性','0.76']]},
  {symbol:'MSTR',name:'Strategy',badge:'爆量',main:'3.0×',sub:'相对 20 日均量',stats:[['今日涨跌','+5.84%'],['30日涨幅','+31.05%'],['BTC敏感度','1.65×'],['距52周高点','-9.4%']]},
  {symbol:'NVDA',name:'NVIDIA',badge:'爆量',main:'2.7×',sub:'相对 20 日均量',stats:[['今日涨跌','+4.28%'],['30日涨幅','+18.40%'],['PE','38.5'],['距52周高点','-3.8%']]}],
 high:[
  {symbol:'PLTR',name:'Palantir',badge:'接近新高',main:'-2.9%',sub:'距 52 周高点',stats:[['30日涨幅','+21.70%'],['相对成交量','2.2×'],['PE','186.0'],['下次财报','5天后']]},
  {symbol:'NVDA',name:'NVIDIA',badge:'接近新高',main:'-3.8%',sub:'距 52 周高点',stats:[['30日涨幅','+18.40%'],['相对成交量','2.7×'],['营收增长','+34.2%'],['下次财报','12天后']]},
  {symbol:'AVGO',name:'Broadcom',badge:'接近新高',main:'-5.1%',sub:'距 52 周高点',stats:[['30日涨幅','+12.20%'],['相对成交量','1.5×'],['PE','34.2'],['营收增长','+22.1%']]}],
 earnings:[
  {symbol:'TSLA',name:'Tesla',badge:'财报临近',main:'2天后',sub:'上次财报后 +11.8%',stats:[['PE','92.4'],['30日涨幅','+8.70%'],['相对成交量','1.9×'],['营收增长','+8.6%']]},
  {symbol:'PLTR',name:'Palantir',badge:'财报临近',main:'5天后',sub:'距离前高仅 -2.9%',stats:[['PE','186.0'],['30日涨幅','+21.70%'],['相对成交量','2.2×'],['营收增长','+20.3%']]},
  {symbol:'NVDA',name:'NVIDIA',badge:'财报临近',main:'12天后',sub:'AI 板块焦点',stats:[['PE','38.5'],['30日涨幅','+18.40%'],['相对成交量','2.7×'],['营收增长','+34.2%']]}],
 btc:[
  {symbol:'MSTR',name:'Strategy',badge:'BTC 高相关',main:'0.82',sub:'30日 BTC 相关性',stats:[['BTC敏感度','1.65×'],['30日涨幅','+31.05%'],['相对成交量','3.0×'],['现价','$463.71']]},
  {symbol:'COIN',name:'Coinbase',badge:'BTC 高相关',main:'0.76',sub:'30日 BTC 相关性',stats:[['BTC敏感度','1.21×'],['30日涨幅','+26.38%'],['PE','31.8'],['现价','$391.18']]},
  {symbol:'HOOD',name:'Robinhood',badge:'BTC 高相关',main:'0.58',sub:'30日 BTC 相关性',stats:[['BTC敏感度','0.63×'],['30日涨幅','+19.30%'],['PE','57.2'],['现价','$112.84']]}]
};
function renderRank(k){
  document.getElementById('rankGrid').innerHTML=rankData[k].map((x,i)=>`<article class="rank-card" data-symbol="${x.symbol}"><div class="rank-head"><div class="rank-num">0${i+1}</div><span class="rank-badge">${x.badge}</span></div><div class="rank-company">${stockLogoMarkup(x.symbol,x.symbol.slice(0,2),'rank-logo')}<div><div class="rank-symbol">${x.symbol}</div><div class="rank-meta">${x.name}</div></div></div><div class="rank-value ${String(x.main).startsWith('+')?'up':''}">${x.main}</div><div class="rank-subvalue">${x.sub}</div><div class="rank-stats">${x.stats.map(s=>`<div class="rank-stat"><small>${s[0]}</small><b class="${String(s[1]).startsWith('+')?'up':''}">${s[1]}</b></div>`).join('')}</div></article>`).join('');
  document.querySelectorAll('.rank-card').forEach(c=>c.addEventListener('click',()=>openDrawer(c.dataset.symbol)));
}
document.querySelectorAll('#rankTabs .pill').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#rankTabs .pill').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderRank(btn.dataset.rank)}));
renderRank('gainers');

const events={
 today:[
  {date:'07/17',title:'TSLA 季度财报',meta:'上次财报后 +11.8% · 当前预期波动上升',tag:'高波动',tone:'down',detail:'市场关注汽车毛利率、Robotaxi 进展以及全年交付指引，若指引偏弱，高估值可能放大回撤。',watch:'财报前隐含波动率处于高位，适合事件驱动型交易者重点关注。'},
  {date:'07/17',title:'美国初请失业金',meta:'可能影响美债收益率与成长股估值',tag:'宏观',tone:'',detail:'若数据偏强，可能推升收益率并压制高估值成长股；若偏弱，则有利于降息预期回升。',watch:'先看利率反应，再判断成长股与加密概念股的弹性。'},
  {date:'07/17',title:'台积电电话会',meta:'半导体与 AI 板块的重要需求信号',tag:'AI链',tone:'up',detail:'市场会从资本开支、先进制程与 AI 订单需求判断产业链景气度。',watch:'对 NVDA、AMD、AVGO 这类 AI 链个股有较强映射作用。'},
  {date:'07/17',title:'HOOD 管理层路演',meta:'零售交易情绪与产品节奏更新',tag:'金融科技',tone:'',detail:'若管理层释放更积极的产品与活跃用户信号，可能进一步支撑平台股估值。',watch:'适合与 COIN 一起观察零售风险偏好变化。'},
  {date:'07/17',title:'PLTR 政府订单消息',meta:'市场传闻订单扩张，股价临近前高',tag:'突破观察',tone:'up',detail:'若消息被证实，可能强化其高估值逻辑；若落空，则回撤风险也会更明显。',watch:'重点看成交量是否继续放大。'}
 ],
 week:[
  {date:'07/18',title:'Netflix 财报',meta:'关注订阅增长与广告业务',tag:'财报',tone:'',detail:'虽然不在当前核心股票池，但会影响市场对成长股业绩窗口的整体风险偏好。',watch:'可作为成长股财报情绪的观察样本。'},
  {date:'07/21',title:'PLTR 财报',meta:'股价距离 52 周高点仅 2.9%',tag:'高估值',tone:'up',detail:'高估值叠加临近前高，使得本次财报更容易形成趋势延续或快速回撤。',watch:'如果财报超预期且量能继续放大，突破概率会明显上升。'},
  {date:'07/22',title:'AMD 供应链更新',meta:'关注 AI 芯片出货节奏',tag:'半导体',tone:'',detail:'若数据指向 AI 芯片出货加速，AMD 可能迎来相对补涨。',watch:'适合与 NVDA 强弱做配对观察。'},
  {date:'07/23',title:'COIN 行业监管听证',meta:'监管预期影响加密概念股',tag:'监管',tone:'down',detail:'监管表态若偏友好，有助于平台估值修复；若偏审慎，短线可能压制加密概念股。',watch:'对 COIN 与 HOOD 的短线弹性影响较大。'},
  {date:'07/24',title:'美国 PMI',meta:'观察经济增长预期与美元反应',tag:'宏观',tone:'',detail:'PMI 走强通常支撑经济韧性预期，但也可能抬升利率与美元，影响成长股估值。',watch:'需结合美债与美元方向一起理解。'}
 ],
 macro:[
  {date:'07/18',title:'美国初请失业金',meta:'就业韧性可能影响降息预期',tag:'利率',tone:'',detail:'数据越强，降息预期越容易被推迟，高估值成长股承压概率越高。',watch:'先看 10Y 美债变化，再看纳指与高弹性个股。'},
  {date:'07/24',title:'美国 PMI',meta:'判断制造与服务业动能',tag:'经济',tone:'',detail:'这将影响市场对盈利周期与风险偏好的理解。',watch:'如果景气回升同时利率稳定，成长风格会更占优。'},
  {date:'07/30',title:'FOMC 利率决议',meta:'高成长股与加密资产的重要宏观节点',tag:'高影响',tone:'down',detail:'点阵图与措辞会直接影响利率曲线和风险资产估值。',watch:'是本阶段最重要的宏观风险点之一。'},
  {date:'08/01',title:'美国非农就业',meta:'影响美元、美债与市场宽度',tag:'就业',tone:'',detail:'就业数据如果明显偏热，可能压制降息预期并影响成长股估值弹性。',watch:'适合提前控制高波动仓位。'},
  {date:'08/06',title:'美国 CPI',meta:'通胀回落与否决定利率预期',tag:'通胀',tone:'down',detail:'通胀若高于预期，可能使成长股与高估值标的重新承压。',watch:'尤其会影响 TSLA、PLTR 等高估值成长股。'}
 ]
};
function renderEvents(k){
  const data=events[k];
  const ec=document.getElementById('eventCounter'); if(ec) ec.textContent=`共 ${data.length} 件事件`;
  document.getElementById('eventList').innerHTML=data.map((x,i)=>`<article class="event-item"><button class="event-header" type="button"><div class="date-bubble">${x.date}</div><div class="event-main"><div class="event-title">${x.title}</div><div class="event-meta">${x.meta}</div></div><div class="event-side"><span class="impact ${x.tone}">${x.tag}</span><span class="expand-mark"><i class="fa-solid fa-plus" aria-hidden="true"></i></span></div></button><div class="event-expand"><div class="event-detail">${x.detail}</div><div class="event-watch"><strong>交易看点：</strong>${x.watch}</div></div></article>`).join('');
  document.querySelectorAll('#eventList .event-item').forEach(item=>{
    item.querySelector('.event-header').addEventListener('click',()=>item.classList.toggle('open'));
  });
}
document.querySelectorAll('#eventControls .pill').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#eventControls .pill').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderEvents(btn.dataset.event)}));
renderEvents('today');

document.querySelectorAll('.heat-tile').forEach(btn=>btn.addEventListener('click',()=>showToast(`${btn.dataset.sector}：代表 ETF 单日资金流 ${btn.dataset.flow}（Demo）`)));

const peerGroups={
 semis:{label:'半导体',title:'半导体核心标的对比',desc:'把趋势、量能、估值与增长放在同一张表里，看谁强、强在哪、风险又在哪里。',dims:['30日涨跌','相对成交量','距52周高点','PE','营收增长 YoY','下次财报'],rows:[
  {symbol:'NVDA',name:'NVIDIA',logo:'NV',logoBg:'#111',vals:['+18.40%','2.7×','-3.8%','38.5','+34.2%','12天后']},
  {symbol:'AVGO',name:'Broadcom',logo:'AV',logoBg:'#2869e9',vals:['+12.20%','1.5×','-5.1%','34.2','+22.1%','16天后']},
  {symbol:'AMD',name:'AMD',logo:'AM',logoBg:'#1e1e1e',vals:['+7.80%','2.0×','-11.2%','41.8','+17.8%','18天后']},
  {symbol:'INTC',name:'Intel',logo:'IN',logoBg:'#3173f5',vals:['+2.90%','1.2×','-19.4%','28.7','+6.3%','20天后']}
 ],note:'<strong>怎么看：</strong> NVDA 兼具最强的 30 日涨幅、最高的量能放大以及最接近 52 周高点的位置；AVGO 更偏稳健龙头；AMD 更像板块扩散时的补涨观察对象。'},
 crypto:{label:'加密概念',title:'加密概念股对比',desc:'同样是加密概念股，驱动逻辑并不完全相同：有的更像 BTC beta，有的更像交易活跃度代理。',dims:['30日涨跌','BTC相关性','BTC敏感度','相对成交量','距52周高点','下次财报'],rows:[
  {symbol:'MSTR',name:'Strategy',logo:'MS',logoBg:'#f05b3d',vals:['+31.05%','0.82','1.65×','3.0×','-9.4%','18天后']},
  {symbol:'COIN',name:'Coinbase',logo:'CO',logoBg:'#6f4dff',vals:['+26.38%','0.76','1.21×','3.4×','-7.6%','21天后']},
  {symbol:'HOOD',name:'Robinhood',logo:'HO',logoBg:'#15a05c',vals:['+19.30%','0.58','0.63×','2.6×','-6.8%','14天后']}
 ],note:'<strong>怎么看：</strong> MSTR 更接近 BTC 的杠杆代理；COIN 更像“币价 + 成交量”双因子标的；HOOD 对加密的敏感度较弱，但更能反映零售交易情绪。'},
 ai:{label:'AI 软件',title:'AI 软件标的对比',desc:'AI 软件更需要同时看估值与成长性，因为高估值往往伴随更高的业绩验证压力。',dims:['30日涨跌','相对成交量','距52周高点','PE','营收增长 YoY','下次财报'],rows:[
  {symbol:'PLTR',name:'Palantir',logo:'PL',logoBg:'#4d5bd7',vals:['+21.70%','2.2×','-2.9%','186.0','+20.3%','5天后']},
  {symbol:'SNOW',name:'Snowflake',logo:'SN',logoBg:'#63a8ff',vals:['+11.20%','1.6×','-8.4%','—','+24.1%','17天后']},
  {symbol:'CRM',name:'Salesforce',logo:'CR',logoBg:'#2e86ff',vals:['+6.40%','1.1×','-12.1%','29.4','+10.8%','22天后']}
 ],note:'<strong>怎么看：</strong> PLTR 的强势最明显，但也是估值压力最大的一档；若财报无法继续兑现高增长，高位回撤风险同样最大。'},
 ev:{label:'EV',title:'电动车与高估值成长股对比',desc:'对 EV 板块来说，除了看涨跌，更要看估值、销量与财报指引。',dims:['30日涨跌','相对成交量','距52周高点','PE','销量/营收增长','下次财报'],rows:[
  {symbol:'TSLA',name:'Tesla',logo:'TS',logoBg:'#d92b2b',vals:['+8.70%','1.9×','-18.5%','92.4','+8.6%','2天后']},
  {symbol:'RIVN',name:'Rivian',logo:'RI',logoBg:'#111411',vals:['+5.10%','1.7×','-24.7%','—','+12.4%','15天后']},
  {symbol:'LI',name:'理想汽车',logo:'LI',logoBg:'#00af66',vals:['+3.80%','1.3×','-17.2%','18.6','+9.2%','19天后']}
 ],note:'<strong>怎么看：</strong> TSLA 的核心并非短线涨跌，而是财报窗口下高估值能否继续被叙事支撑；其他 EV 标的则更偏销量验证。'},
 fintech:{label:'金融科技',title:'金融科技平台对比',desc:'平台型公司常同时受到交易活跃度、利率环境与用户增长节奏影响。',dims:['30日涨跌','相对成交量','PE','营收增长 YoY','BTC相关性','下次财报'],rows:[
  {symbol:'HOOD',name:'Robinhood',logo:'HO',logoBg:'#15a05c',vals:['+19.30%','2.6×','57.2','+26.4%','0.58','14天后']},
  {symbol:'SQ',name:'Block',logo:'SQ',logoBg:'#111411',vals:['+9.50%','1.4×','26.8','+12.7%','0.41','23天后']},
  {symbol:'SOFI',name:'SoFi',logo:'SF',logoBg:'#11b7c7',vals:['+7.10%','1.8×','38.1','+18.2%','0.29','9天后']}
 ],note:'<strong>怎么看：</strong> HOOD 具备更高的弹性与更强的零售情绪代理属性；SQ 更偏支付与生态；SOFI 更偏传统金融科技成长。'}
};
function renderPeerGroup(key){
  const g=peerGroups[key];
  document.getElementById('peerGroupLabel').textContent=g.label;
  document.getElementById('peerGroupTitle').textContent=g.title;
  document.getElementById('peerDimensions').innerHTML=g.dims.map(d=>`<span>${d}</span>`).join('');
  document.getElementById('peerTableHead').innerHTML=`<th>公司</th>${g.dims.map(d=>`<th>${d}</th>`).join('')}`;
  document.getElementById('peerTableBody').innerHTML=g.rows.map(r=>`<tr data-peer-symbol="${r.symbol}"><td><button class="peer-company-button" type="button" data-symbol="${r.symbol}"><span class="peer-first">${stockLogoMarkup(r.symbol,r.logo)}<span><span class="ticker-name">${r.symbol}</span><span class="company-name">${r.name}</span></span></span><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button></td>${r.vals.map(v=>`<td>${formatCell(v)}</td>`).join('')}</tr>`).join('');
  document.querySelectorAll('.peer-company-button').forEach(btn=>btn.addEventListener('click',()=>selectPeerCompany(g,btn.dataset.symbol)));
  selectPeerCompany(g,g.rows[0].symbol);
}
function selectPeerCompany(group,symbol){
  const row=group.rows.find(item=>item.symbol===symbol)||group.rows[0];
  document.querySelectorAll('#peerTableBody tr').forEach(tr=>tr.classList.toggle('selected',tr.dataset.peerSymbol===row.symbol));
  document.getElementById('peerFootnote').innerHTML=`<div class="peer-selection-copy"><span>当前选择</span><h4>${row.name} <small>${row.symbol}</small></h4><p>${group.note}</p></div><div class="peer-selection-metrics">${row.vals.slice(0,3).map((value,index)=>`<div><small>${group.dims[index]}</small><b>${value}</b></div>`).join('')}</div><button class="peer-detail-button" id="peerDetailAction" type="button">查看股票详情 <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>`;
  document.getElementById('peerDetailAction').addEventListener('click',()=>{const match=stocks.find(stock=>stock.symbol===row.symbol);if(match)openDrawer(match.symbol);else showToast(`${row.symbol} 详情模块为 Demo 占位`)});
}
document.querySelectorAll('#peerSectorTabs .pill').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#peerSectorTabs .pill').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderPeerGroup(btn.dataset.peer)}));
renderPeerGroup('semis');
