(()=>{
  const key='kcex-color-theme';
  const readSaved=()=>{try{return localStorage.getItem(key)}catch{return null}};
  const save=theme=>{try{localStorage.setItem(key,theme)}catch{}};

  const bindThemeToggle=()=>{
    const root=document.documentElement;
    const button=document.getElementById('themeToggle');
    if(!button)return;

    const icon=button.querySelector('i');
    const apply=theme=>{
      const dark=theme==='dark';
      root.dataset.theme=dark?'dark':'light';
      root.style.colorScheme=dark?'dark':'light';
      button.setAttribute('aria-pressed',String(dark));
      button.setAttribute('aria-label',dark?'切换浅色模式':'切换深色模式');
      button.title=dark?'切换浅色模式':'切换深色模式';
      if(icon)icon.className=`fa-solid ${dark?'fa-sun':'fa-moon'}`;
    };

    apply(readSaved()||'light');
    button.addEventListener('click',()=>{
      const next=root.dataset.theme==='dark'?'light':'dark';
      apply(next);
      save(next);
    });
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',bindThemeToggle,{once:true});
  }else{
    bindThemeToggle();
  }
})();
