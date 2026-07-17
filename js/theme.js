(()=>{
  const key='kcex-color-theme';
  const systemDark=window.matchMedia?.('(prefers-color-scheme: dark)');
  const readSaved=()=>{try{return localStorage.getItem(key)}catch{return null}};
  const save=theme=>{try{localStorage.setItem(key,theme)}catch{}}
  const apply=theme=>{
    document.documentElement.dataset.theme=theme;
    document.documentElement.style.colorScheme=theme;
    const button=document.getElementById('themeToggle');
    if(!button)return;
    const dark=theme==='dark';
    button.setAttribute('aria-pressed',String(dark));
    button.setAttribute('aria-label',dark?'切换浅色模式':'切换深色模式');
    button.querySelector('i').className=`fa-solid ${dark?'fa-sun':'fa-moon'}`;
    button.querySelector('span').textContent=dark?'浅色':'深色';
  };
  const initial=readSaved()||'light';
  apply(initial);
  window.addEventListener('DOMContentLoaded',()=>{
    apply(document.documentElement.dataset.theme||initial);
    document.getElementById('themeToggle')?.addEventListener('click',()=>{
      const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
      save(next);
      apply(next);
    });
  });
  systemDark?.addEventListener?.('change',event=>{if(!readSaved())apply(event.matches?'dark':'light')});
})();
