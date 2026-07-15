const financialProfiles={
  NVDA:{income:{year:'2025',revenue:'$130.50B',net:'$72.88B',bars:[['2021',27,9],['2022',26,7],['2023',27,4],['2024',61,30],['2025',130,73]],metrics:[['营收','$130.50B'],['毛利','$97.86B'],['营业利润','$81.45B'],['EBITDA','$84.12B'],['净利润','$72.88B'],['毛利率','74.99%'],['营业利润率','62.41%'],['净利率','55.84%']]},balance:{metrics:[['总资产','$111.60B'],['流动资产','$80.13B'],['现金及现金等价物','$31.42B'],['总负债','$28.73B'],['流动负债','$12.88B'],['股东权益','$82.87B'],['总债务','$10.26B'],['净现金','$21.16B']]},cashflow:{metrics:[['经营现金流','$64.09B'],['投资现金流','-$32.01B'],['融资现金流','-$5.14B'],['资本支出','$3.18B'],['自由现金流','$60.91B'],['回购金额','$34.52B'],['现金净变化','$26.94B'],['自由现金流收益率','1.65%']]}},
  COIN:{income:{year:'2025',revenue:'$7.54B',net:'$1.82B',bars:[['2021',7.8,3.6],['2022',3.1,-2.6],['2023',3.7,0.1],['2024',5.9,1.2],['2025',7.5,1.8]],metrics:[['营收','$7.54B'],['毛利','$5.02B'],['营业利润','$1.96B'],['EBITDA','$2.24B'],['净利润','$1.82B'],['毛利率','66.58%'],['营业利润率','26.01%'],['净利率','24.14%']]},balance:{metrics:[['总资产','$22.46B'],['流动资产','$17.90B'],['现金及现金等价物','$6.83B'],['总负债','$12.21B'],['流动负债','$4.62B'],['股东权益','$10.25B'],['总债务','$4.12B'],['净现金','$2.71B']]},cashflow:{metrics:[['经营现金流','$2.14B'],['投资现金流','-$0.62B'],['融资现金流','-$0.28B'],['资本支出','$0.16B'],['自由现金流','$1.98B'],['回购金额','$0.45B'],['现金净变化','$1.24B'],['自由现金流收益率','2.02%']]}},
  MSTR:{income:{year:'2025',revenue:'$0.57B',net:'$0.12B',bars:[['2021',0.5,-0.5],['2022',0.5,-1.4],['2023',0.49,0.43],['2024',0.53,0.17],['2025',0.57,0.12]],metrics:[['营收','$0.57B'],['毛利','$0.40B'],['营业利润','$0.15B'],['EBITDA','$0.18B'],['净利润','$0.12B'],['毛利率','70.18%'],['营业利润率','26.32%'],['净利率','21.05%']]},balance:{metrics:[['总资产','$31.42B'],['流动资产','$2.26B'],['现金及现金等价物','$0.15B'],['总负债','$6.44B'],['流动负债','$1.03B'],['股东权益','$24.98B'],['总债务','$4.80B'],['净现金','-$4.65B']]},cashflow:{metrics:[['经营现金流','$0.11B'],['投资现金流','-$0.03B'],['融资现金流','$0.68B'],['资本支出','$0.02B'],['自由现金流','$0.09B'],['回购金额','$0.00B'],['现金净变化','$0.76B'],['自由现金流收益率','0.07%']]}},
  TSLA:{income:{year:'2025',revenue:'$103.60B',net:'$10.45B',bars:[['2021',53.8,5.5],['2022',81.5,12.6],['2023',96.8,15.0],['2024',97.7,11.1],['2025',103.6,10.5]],metrics:[['营收','$103.60B'],['毛利','$18.66B'],['营业利润','$11.92B'],['EBITDA','$15.84B'],['净利润','$10.45B'],['毛利率','18.01%'],['营业利润率','11.51%'],['净利率','10.09%']]},balance:{metrics:[['总资产','$126.24B'],['流动资产','$58.36B'],['现金及现金等价物','$29.09B'],['总负债','$43.84B'],['流动负债','$30.01B'],['股东权益','$82.40B'],['总债务','$7.41B'],['净现金','$21.68B']]},cashflow:{metrics:[['经营现金流','$14.92B'],['投资现金流','-$7.74B'],['融资现金流','-$3.29B'],['资本支出','$8.84B'],['自由现金流','$6.08B'],['回购金额','$0.00B'],['现金净变化','$3.89B'],['自由现金流收益率','0.56%']]}},
  PLTR:{income:{year:'2025',revenue:'$3.22B',net:'$0.71B',bars:[['2021',1.5,0.05],['2022',1.9,0.02],['2023',2.2,0.21],['2024',2.7,0.46],['2025',3.2,0.71]],metrics:[['营收','$3.22B'],['毛利','$2.58B'],['营业利润','$0.73B'],['EBITDA','$0.84B'],['净利润','$0.71B'],['毛利率','80.12%'],['营业利润率','22.67%'],['净利率','22.05%']]},balance:{metrics:[['总资产','$6.12B'],['流动资产','$4.71B'],['现金及现金等价物','$2.55B'],['总负债','$0.96B'],['流动负债','$0.64B'],['股东权益','$5.16B'],['总债务','$0.22B'],['净现金','$2.33B']]},cashflow:{metrics:[['经营现金流','$0.94B'],['投资现金流','-$0.05B'],['融资现金流','-$0.11B'],['资本支出','$0.03B'],['自由现金流','$0.91B'],['回购金额','$0.14B'],['现金净变化','$0.78B'],['自由现金流收益率','0.27%']]}},
  AVGO:{income:{year:'2025',revenue:'$52.11B',net:'$14.84B',bars:[['2021',27.4,6.7],['2022',33.2,11.5],['2023',35.8,14.1],['2024',43.0,13.6],['2025',52.1,14.8]],metrics:[['营收','$52.11B'],['毛利','$32.41B'],['营业利润','$18.22B'],['EBITDA','$23.47B'],['净利润','$14.84B'],['毛利率','62.19%'],['营业利润率','34.96%'],['净利率','28.48%']]},balance:{metrics:[['总资产','$173.42B'],['流动资产','$22.16B'],['现金及现金等价物','$9.34B'],['总负债','$91.51B'],['流动负债','$16.80B'],['股东权益','$81.91B'],['总债务','$67.85B'],['净现金','-$58.51B']]},cashflow:{metrics:[['经营现金流','$20.63B'],['投资现金流','-$47.30B'],['融资现金流','$25.12B'],['资本支出','$1.84B'],['自由现金流','$18.79B'],['回购金额','$2.71B'],['现金净变化','-$1.55B'],['自由现金流收益率','1.42%']]}},
  AMD:{income:{year:'2025',revenue:'$29.84B',net:'$4.21B',bars:[['2021',16.4,3.2],['2022',23.6,1.3],['2023',22.7,0.85],['2024',26.1,2.7],['2025',29.8,4.2]],metrics:[['营收','$29.84B'],['毛利','$15.24B'],['营业利润','$4.48B'],['EBITDA','$5.87B'],['净利润','$4.21B'],['毛利率','51.07%'],['营业利润率','15.01%'],['净利率','14.11%']]},balance:{metrics:[['总资产','$73.82B'],['流动资产','$31.92B'],['现金及现金等价物','$7.86B'],['总负债','$10.22B'],['流动负债','$6.34B'],['股东权益','$63.60B'],['总债务','$2.41B'],['净现金','$5.45B']]},cashflow:{metrics:[['经营现金流','$4.76B'],['投资现金流','-$0.91B'],['融资现金流','-$0.68B'],['资本支出','$0.52B'],['自由现金流','$4.24B'],['回购金额','$0.80B'],['现金净变化','$3.17B'],['自由现金流收益率','1.44%']]}},
  HOOD:{income:{year:'2025',revenue:'$4.12B',net:'$1.06B',bars:[['2021',1.8,-3.7],['2022',1.4,-1.0],['2023',1.9,0.13],['2024',3.1,0.74],['2025',4.1,1.06]],metrics:[['营收','$4.12B'],['毛利','$3.15B'],['营业利润','$1.08B'],['EBITDA','$1.22B'],['净利润','$1.06B'],['毛利率','76.46%'],['营业利润率','26.21%'],['净利率','25.73%']]},balance:{metrics:[['总资产','$38.42B'],['流动资产','$35.16B'],['现金及现金等价物','$11.24B'],['总负债','$31.08B'],['流动负债','$29.70B'],['股东权益','$7.34B'],['总债务','$0.62B'],['净现金','$10.62B']]},cashflow:{metrics:[['经营现金流','$1.38B'],['投资现金流','-$0.24B'],['融资现金流','-$0.11B'],['资本支出','$0.09B'],['自由现金流','$1.29B'],['回购金额','$0.20B'],['现金净变化','$1.03B'],['自由现金流收益率','1.33%']]}},
};
function formatFinMetrics(items){return items.map(m=>`<div class="fin-metric"><small>${m[0]}</small><b>${m[1]}</b></div>`).join('')}
function incomeChartSvg(bars){
  const max=Math.max(...bars.flatMap(b=>[Math.abs(b[1]), Math.abs(b[2])]))*1.15;
  const baseY=190, chartH=140, groupW=92, barW=26;
  let svg=`<svg class="fin-chart" viewBox="0 0 520 220" preserveAspectRatio="none"><g stroke="rgba(255,255,255,.08)"><line x1="0" y1="40" x2="520" y2="40"/><line x1="0" y1="75" x2="520" y2="75"/><line x1="0" y1="110" x2="520" y2="110"/><line x1="0" y1="145" x2="520" y2="145"/><line x1="0" y1="190" x2="520" y2="190"/></g>`;
  bars.forEach((b,i)=>{const x=35+i*groupW; const revH=Math.max(8,Math.abs(b[1])/max*chartH); const netH=Math.max(8,Math.abs(b[2])/max*chartH); svg+=`<rect x="${x}" y="${baseY-revH}" width="${barW}" height="${revH}" rx="2" fill="#f4d33a"/><rect x="${x+32}" y="${baseY-netH}" width="${barW}" height="${netH}" rx="2" fill="#ff7a1a"/><text x="${x+26}" y="210" fill="#8ea2c1" font-size="12" text-anchor="middle">${b[0]}</text>`;});
  svg+='</svg>'; return svg;
}
function financialsPanel(s){
  const f=financialProfiles[s.symbol]||financialProfiles['NVDA'];
  return `<div class="fin-panel">
    <section class="fin-card"><div class="fin-head"><h4>利润表</h4><div class="fin-toggle"><span class="active">年度</span><span>季度</span></div></div><div class="fin-legend"><span class="rev"><i></i>营收</span><span class="net"><i></i>净利润</span></div><div class="fin-topline">${f.income.year} <strong>${f.income.revenue}</strong> <span style="color:#ff9a40;margin-left:6px">${f.income.net}</span></div>${incomeChartSvg(f.income.bars)}<div class="fin-grid">${formatFinMetrics(f.income.metrics)}</div></section>
    <section class="fin-card"><div class="fin-head"><h4>资产负债表</h4><div class="fin-toggle"><span class="active">年度</span><span>季度</span></div></div><div class="fin-mini-grid">${formatFinMetrics(f.balance.metrics)}</div></section>
    <section class="fin-card"><div class="fin-head"><h4>现金流量表</h4><div class="fin-toggle"><span class="active">年度</span><span>季度</span></div></div><div class="fin-mini-grid">${formatFinMetrics(f.cashflow.metrics)}</div></section>
  </div>`
}

const tradeRuntime={side:'long',orderType:'limit',leverage:10,percent:25,available:5000};
function perpTradeUrl(symbol){return `https://www.kcex.com/futures/exchange/${symbol}_USDT`}
function tradingPanel(s){
  return `<section class="perp-panel">
    <div class="perp-head"><div class="perp-symbol-wrap"><div class="perp-symbol">${s.symbol}USDT 永续</div><div class="perp-sub">USDT 本位 · 全仓 / 逐仓 · Demo 交易组件</div></div><span class="perp-badge">最高 50×</span></div>
    <div class="side-switch" id="sideSwitch"><button class="long active" data-side="long">买入 / 做多</button><button class="short" data-side="short">卖出 / 做空</button></div>
    <div class="trade-row"><div class="order-type-tabs" id="orderTypeTabs"><button class="active" data-order="limit">限价</button><button data-order="market">市价</button></div><button class="leverage-button" id="leverageButton">10× 杠杆</button></div>
    <div class="trade-watermark">0 ${s.symbol}</div>
    <div class="balance-row"><span>可用保证金</span><b>${tradeRuntime.available.toLocaleString()} USDT</b></div>
    <div class="trade-field"><div class="trade-field-top"><label>委托价格</label><div class="trade-input-wrap"><input id="tradePriceInput" type="number" step="0.01" value="${s.price.toFixed(2)}"><span>USDT</span></div></div><small id="tradePriceHint">标记价格 ${s.price.toFixed(2)}</small></div>
    <div class="trade-field"><div class="trade-field-top"><label>委托数量</label><div class="trade-input-wrap"><input id="tradeQtyInput" type="number" step="0.0001" value=""><span>${s.symbol}</span></div></div><small id="tradeQtyHint">请输入数量或选择仓位比例</small></div>
    <div class="leverage-row" id="leverageChips">${[5,10,20,50].map(v=>`<button class="lev-chip ${v===10?'active':''}" data-lev="${v}">${v}×</button>`).join('')}</div>
    <div class="percent-row" id="percentRow">${[25,50,75,100].map(v=>`<button class="${v===25?'active':''}" data-pct="${v}">${v}%</button>`).join('')}</div>
    <div class="trade-summary"><div class="trade-summary-item"><small>预计保证金</small><b id="tradeMargin">-- USDT</b></div><div class="trade-summary-item"><small>预估强平价</small><b id="tradeLiq">-- USDT</b></div></div>
    <button class="trade-submit" id="tradeSubmitBtn">登录后买入 / 做多</button>
    <button class="trade-pro-link" id="tradeProLink">前往专业交易页 <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></button>
    <div class="trade-note">此为产品 Demo。永续合约具有高风险，实际产品应展示保证金模式、维持保证金率、资金费率与风险提示。</div>
  </section>`
}
function bindTradePanel(s){
  const panel=document.getElementById('panel-trading');
  if(!panel)return;
  tradeRuntime.side='long';tradeRuntime.orderType='limit';tradeRuntime.leverage=10;tradeRuntime.percent=25;
  const priceInput=panel.querySelector('#tradePriceInput');
  const qtyInput=panel.querySelector('#tradeQtyInput');
  const marginEl=panel.querySelector('#tradeMargin');
  const liqEl=panel.querySelector('#tradeLiq');
  const submitBtn=panel.querySelector('#tradeSubmitBtn');
  const levBtn=panel.querySelector('#leverageButton');
  function calc(){
    const price=Number(priceInput.value)||s.price;
    const qty=Number(qtyInput.value)||0;
    const notional=price*qty;
    const margin=notional/tradeRuntime.leverage;
    const liq=tradeRuntime.side==='long'?price*(1-0.9/tradeRuntime.leverage):price*(1+0.9/tradeRuntime.leverage);
    marginEl.textContent=qty?`${margin.toFixed(2)} USDT`:'-- USDT';
    liqEl.textContent=qty?`${liq.toFixed(2)} USDT`:'-- USDT';
  }
  function fillByPercent(pct){
    tradeRuntime.percent=pct;
    const price=Number(priceInput.value)||s.price;
    const marginBudget=tradeRuntime.available*(pct/100);
    const qty=(marginBudget*tradeRuntime.leverage)/price;
    qtyInput.value=qty.toFixed(4);
    panel.querySelectorAll('#percentRow button').forEach(b=>b.classList.toggle('active',Number(b.dataset.pct)===pct));
    calc();
  }
  panel.querySelectorAll('#sideSwitch button').forEach(btn=>btn.addEventListener('click',()=>{
    tradeRuntime.side=btn.dataset.side;
    panel.querySelectorAll('#sideSwitch button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const isLong=tradeRuntime.side==='long';
    submitBtn.textContent=isLong?'登录后买入 / 做多':'登录后卖出 / 做空';
    submitBtn.classList.toggle('short',!isLong);
    calc();
  }));
  panel.querySelectorAll('#orderTypeTabs button').forEach(btn=>btn.addEventListener('click',()=>{
    tradeRuntime.orderType=btn.dataset.order;
    panel.querySelectorAll('#orderTypeTabs button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const market=tradeRuntime.orderType==='market';
    priceInput.disabled=market;
    priceInput.style.opacity=market?'.45':'1';
    panel.querySelector('#tradePriceHint').textContent=market?'按市场最优价格成交':`标记价格 ${s.price.toFixed(2)}`;
  }));
  panel.querySelectorAll('#leverageChips .lev-chip').forEach(btn=>btn.addEventListener('click',()=>{
    tradeRuntime.leverage=Number(btn.dataset.lev);
    panel.querySelectorAll('#leverageChips .lev-chip').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    levBtn.textContent=`${tradeRuntime.leverage}× 杠杆`;
    if(qtyInput.value)fillByPercent(tradeRuntime.percent);else calc();
  }));
  panel.querySelectorAll('#percentRow button').forEach(btn=>btn.addEventListener('click',()=>fillByPercent(Number(btn.dataset.pct))));
  priceInput.addEventListener('input',calc);qtyInput.addEventListener('input',calc);
  submitBtn.addEventListener('click',()=>showToast(`Demo：${s.symbol}USDT 永续 ${tradeRuntime.side==='long'?'做多':'做空'}订单已进入确认流程`));
  panel.querySelector('#tradeProLink').addEventListener('click',()=>window.open(perpTradeUrl(s.symbol),'_blank','noopener'));
  fillByPercent(25);
}

function valuationPanel(s){
  const peText=s.pe==null?'—':s.pe.toFixed(1);
  const sectorPe=s.sectorPe==null?'—':`行业 ${s.sectorPe.toFixed(1)}`;
  return `<div class="valuation-table"><div class="val-row head"><span>指标</span><span>当前</span><span>历史/行业</span></div><div class="val-row"><b>PE</b><span>${peText}</span><span>${sectorPe}</span></div><div class="val-row"><b>Forward PE</b><span>${s.fwdPe==null?'—':s.fwdPe.toFixed(1)}</span><span>${s.sector}可比区间</span></div><div class="val-row"><b>PS</b><span>${typeof s.ps==='number'?s.ps.toFixed(1):s.ps}</span><span>估值分位观察</span></div><div class="val-row"><b>营收增长 YoY</b><span class="${String(s.revGrowth).startsWith('-')?'down':'up'}">${s.revGrowth}</span><span>${s.sector}行业对比</span></div><div class="val-row"><b>EPS 增长 YoY</b><span class="${String(s.epsGrowth).startsWith('-')?'down':'up'}">${s.epsGrowth}</span><span>盈利兑现能力</span></div></div><div class="ai-summary">${s.valuationNote}</div>`;
}
function cryptoPanel(s){
  return `<div class="detail-grid"><div class="detail-item"><small>BTC 30日相关性</small><b>${s.btc.toFixed(2)}</b></div><div class="detail-item"><small>BTC 敏感度</small><b>${s.btcSensitivity}</b></div><div class="detail-item"><small>ETH 30日相关性</small><b>${s.eth.toFixed(2)}</b></div><div class="detail-item"><small>NASDAQ 相关性</small><b>${s.nasdaq.toFixed(2)}</b></div><div class="detail-item"><small>Beta</small><b>${s.beta}</b></div><div class="detail-item"><small>市场角色</small><b>${s.cat==='crypto'?'高敏感概念股':'风险偏好观察股'}</b></div></div><div class="ai-summary">${s.cryptoNote}</div>`;
}
function eventsPanel(s){
  return s.events.map(e=>`<div class="event-card"><b>${e.title}</b><p>${e.desc}</p></div>`).join('');
}
function openDrawer(symbol){
  currentDrawerSymbol=symbol;
  const s=stocks.find(x=>x.symbol===symbol)||stocks[0];
  document.getElementById('drawerLogo').innerHTML=`<img src="${stockLogoUrl(s.symbol)}" alt="${s.symbol} 公司 Logo" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="logo-fallback" hidden>${s.logo}</span>`;
  document.getElementById('drawerLogo').style.background='#fff';
  document.getElementById('drawerName').textContent=s.name;
  document.getElementById('drawerTicker').textContent=`${s.symbol} · ${s.sector}`;
  document.getElementById('drawerPrice').textContent=`$${s.price.toFixed(2)}`;
  document.getElementById('drawerPerpPair').textContent=`${s.symbol}USDT 永续`;
  const mv=document.getElementById('drawerMove'); mv.textContent=fPct(s.day); mv.className=s.day>=0?'up':'down';
  document.getElementById('drawerOverviewCaption').textContent=`30 日趋势之外，再看周度强弱、YTD、量能、市值与事件，信息会更完整。`;
  document.getElementById('drawerMetrics').innerHTML=`
    <div class="detail-item"><small>今日涨跌</small><b class="${s.day>=0?'up':'down'}">${fPct(s.day)}</b></div>
    <div class="detail-item"><small>盘前/盘后</small><b class="${s.session>=0?'up':'down'}">${fPct(s.session)}</b></div>
    <div class="detail-item"><small>7日表现</small><b class="${s.week>=0?'up':'down'}">${fPct(s.week)}</b></div>
    <div class="detail-item"><small>30日表现</small><b class="${s.month>=0?'up':'down'}">${fPct(s.month)}</b></div>
    <div class="detail-item"><small>YTD</small><b class="${s.ytd>=0?'up':'down'}">${fPct(s.ytd)}</b></div>
    <div class="detail-item"><small>相对成交量</small><b>${s.rvol.toFixed(1)}×</b></div>
    <div class="detail-item"><small>20日均量</small><b>${s.avgVol}</b></div>
    <div class="detail-item"><small>市值</small><b>${s.marketCap}</b></div>
    <div class="detail-item"><small>距52周高点</small><b>${s.high.toFixed(1)}%</b></div>
    <div class="detail-item"><small>BTC相关性</small><b>${s.btc.toFixed(2)}</b></div>`;
  document.getElementById('drawerQuickFacts').innerHTML=`<span class="quick-fact">下次事件：${s.event}</span><span class="quick-fact">上次财报后：${s.earningsMove}</span><span class="quick-fact">PE：${s.pe==null?'—':s.pe.toFixed(1)}</span><span class="quick-fact">营收增长：${s.revGrowth}</span>`;
  document.getElementById('drawerSummary').innerHTML=`<b>KCEX AI 行情解释：</b> ${s.summary}`;
  document.getElementById('panel-valuation').innerHTML=valuationPanel(s);
  document.getElementById('panel-crypto').innerHTML=cryptoPanel(s);
  document.getElementById('panel-events').innerHTML=eventsPanel(s);
  document.getElementById('panel-financials').innerHTML=financialsPanel(s);
  document.getElementById('panel-trading').innerHTML=tradingPanel(s);
  bindTradePanel(s);
  document.querySelectorAll('#drawerTabs .pill').forEach((btn,i)=>btn.classList.toggle('active',i===0));
  document.querySelectorAll('.drawer-panel').forEach((p,i)=>p.classList.toggle('active',i===0));
  drawer.classList.add('open'); backdrop.classList.add('open');
}
const drawerExpand=document.getElementById('drawerExpand');
function setDrawerExpanded(expanded){
  if(expanded&&document.getElementById('panel-trading').classList.contains('active')) activateDrawerPanel('overview');
  drawer.classList.toggle('expanded',expanded);
  drawerExpand.querySelector('i').className=`fa-solid ${expanded?'fa-compress':'fa-expand'}`;
  drawerExpand.setAttribute('aria-pressed',String(expanded));
  drawerExpand.setAttribute('aria-label',expanded?'縮小詳情':'放大詳情');
  drawerExpand.title=expanded?'縮回側邊視窗':'放大為全螢幕';
}
function closeDrawer(){drawer.classList.remove('open');backdrop.classList.remove('open');setDrawerExpanded(false)}
drawerExpand.addEventListener('click',()=>setDrawerExpanded(!drawer.classList.contains('expanded')));
document.getElementById('drawerClose').addEventListener('click',closeDrawer); backdrop.addEventListener('click',closeDrawer); document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(drawer.classList.contains('expanded'))setDrawerExpanded(false);else closeDrawer()}});
function activateDrawerPanel(panelName){
  document.querySelectorAll('#drawerTabs .pill').forEach(btn=>btn.classList.toggle('active',btn.dataset.panel===panelName));
  document.querySelectorAll('.drawer-panel').forEach(panel=>panel.classList.toggle('active',panel.id===`panel-${panelName}`));
}
document.querySelectorAll('#drawerTabs .pill').forEach(btn=>btn.addEventListener('click',()=>activateDrawerPanel(btn.dataset.panel)));


document.querySelectorAll('.marquee-item[data-symbol]').forEach(item=>{
  const symbol=item.dataset.symbol;
  item.insertAdjacentHTML('afterbegin',stockLogoMarkup(symbol,symbol.slice(0,2),'marquee-logo'));
  item.addEventListener('click',()=>openDrawer(item.dataset.symbol));
});
document.getElementById('openProTradeBtn').addEventListener('click',()=>window.open(perpTradeUrl(currentDrawerSymbol),'_blank','noopener'));

function showToast(text){const t=document.getElementById('toast');t.textContent=text;t.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove('show'),1800)}
