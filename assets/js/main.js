(() => {
  const init = () => {
  const root = document.documentElement;
  const config = window.KIEWIK_SITE_CONFIG || {};
  const safeStorage = {
    get(key){ try { return localStorage.getItem(key); } catch { return null; } },
    set(key,value){ try { localStorage.setItem(key,value); } catch {} }
  };
  document.querySelectorAll('[data-config-link]').forEach(el => {
    const key = el.dataset.configLink;
    const value = config[key];
    if (value) el.href = key === 'email' ? `mailto:${value}` : value;
    else if (el.dataset.hideIfEmpty !== undefined) el.hidden = true;
  });
  document.querySelectorAll('[data-support-card]').forEach(card => {
    card.hidden = !config[card.dataset.supportCard];
  });
  const menuBtn = document.querySelector('[data-menu]');
  const nav = document.querySelector('.nav-links');
  menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click',()=>nav.classList.remove('open')));

  const themeBtn = document.querySelector('[data-theme-toggle]');
  const storedTheme = safeStorage.get('kp-theme');
  if (storedTheme) root.dataset.theme = storedTheme;
  themeBtn?.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next; safeStorage.set('kp-theme', next);
    themeBtn.setAttribute('aria-label', next === 'light' ? 'Use dark theme' : 'Use light theme');
  });

  const translations = {
    en: {
      nav_home:'Home',nav_horizon:'Horizon',nav_projects:'Projects',nav_about:'About',nav_support:'Support',
      hero_eyebrow:'Independent maker brand',hero_title:'Practical tools for clearer digital work.',
      hero_copy:'Kiewik Projects builds focused browser extensions and desktop tools that turn complex information into clear, useful decisions.',
      hero_primary:'Explore Horizon for Claude',hero_secondary:'Chrome Web Store',
      trust_free:'Free to use',trust_free_sub:'No paid tier',trust_api:'No API key',trust_api_sub:'Works inside Claude.ai',trust_local:'Local-first',trust_local_sub:'Readings stay in Chrome',trust_lang:'English + Polish',trust_lang_sub:'From the first release',trust_indie:'Independent',trust_indie_sub:'Not affiliated with AI platforms',
      horizon_eyebrow:'Available now',horizon_title:'Horizon for Claude',horizon_lead:'Understand Claude’s 5-hour and weekly usage limits with forecasts, reset timelines and flexible in-page layouts.',
      horizon_desc:'Horizon turns raw usage percentages into a clear “what happens first?” view. Keep a compact bar near the composer, use a movable mini dock, or open the full Chrome side panel for deeper statistics.',
      btn_install:'Add to Chrome',btn_uneed:'Uneed launch',btn_privacy:'Privacy policy',
      f1_title:'5-hour + weekly view',f1_text:'See both limit windows together, with reset times and current usage.',f2_title:'What happens first?',f2_text:'Compare forecasted exhaustion with the fixed reset time.',f3_title:'Flexible layouts',f3_text:'Horizontal, vertical, floating and mini modes that fit your workflow.',f4_title:'Side-panel statistics',f4_text:'Open a larger dashboard with pace, history, forecasts and timelines.',
      gallery_title:'See the real interface',gallery_lead:'Actual screens from Horizon 2.1.19 — no mock data panels or generic illustrations.',g1:'Decision First + side panel',g2:'Horizontal bar',g3:'Native usage + mini bar',g4:'Statistics dashboard',g5:'Settings + live preview',
      projects_eyebrow:'Product family',projects_title:'One standard, different platforms.',projects_lead:'Each product keeps its own identity while following the same clear interaction principles.',available:'Available now',development:'In development',p_horizon:'Claude usage-limit monitor with forecasts and flexible layouts.',p_zenith:'A related ChatGPT limit-monitoring project currently under development.',p_orbit:'A related Gemini monitoring project currently under development.',
      about_eyebrow:'About the maker',about_title:'Kiewik Projects',about_text:'An independent maker brand from Poland, focused on practical Chrome extensions and desktop utilities. The goal is simple: clearer workflows, useful diagnostics and interfaces that stay out of the way.',
      launch_eyebrow:'Launching soon',launch_title:'Horizon on Uneed',launch_text:'Follow the upcoming Uneed launch, view the product page and join the discussion when it goes live.',launch_btn:'Open Uneed page',
      support_eyebrow:'Support development',support_title:'Keep independent tools moving forward.',support_text:'Horizon is free. Optional support helps fund testing, design work and future Kiewik Projects releases.',support_global:'International support',support_global_text:'Support Kiewik Projects through Buy Me a Coffee.',support_pl:'Support from Poland',support_pl_text:'A Polish support option can be enabled in the site configuration when the confirmed public link is available.',support_btn:'Support Kiewik Projects',
      footer_note:'Independent maker brand. Not affiliated with Anthropic, OpenAI or Google.',footer_privacy:'Website privacy',footer_hprivacy:'Horizon privacy',footer_contact:'Contact'
    },
    pl: {
      nav_home:'Start',nav_horizon:'Horizon',nav_projects:'Projekty',nav_about:'O marce',nav_support:'Wsparcie',
      hero_eyebrow:'Niezależna marka twórcy',hero_title:'Praktyczne narzędzia do bardziej przejrzystej pracy cyfrowej.',
      hero_copy:'Kiewik Projects tworzy skoncentrowane dodatki do przeglądarki i narzędzia desktopowe, które zamieniają złożone informacje w czytelne, użyteczne decyzje.',
      hero_primary:'Poznaj Horizon dla Claude',hero_secondary:'Chrome Web Store',
      trust_free:'Całkowicie bezpłatny',trust_free_sub:'Bez płatnego planu',trust_api:'Bez klucza API',trust_api_sub:'Działa wewnątrz Claude.ai',trust_local:'Lokalne dane',trust_local_sub:'Odczyty pozostają w Chrome',trust_lang:'Polski + angielski',trust_lang_sub:'Od pierwszego wydania',trust_indie:'Niezależny projekt',trust_indie_sub:'Bez powiązania z platformami AI',
      horizon_eyebrow:'Dostępny teraz',horizon_title:'Horizon dla Claude',horizon_lead:'Zrozum 5-godzinne i tygodniowe limity Claude dzięki prognozom, osiom resetu i elastycznym układom na stronie.',
      horizon_desc:'Horizon zamienia surowe procenty użycia w czytelny widok „co nastąpi pierwsze?”. Możesz pozostawić kompaktową belkę przy polu wiadomości, użyć przesuwanej mini belki albo otworzyć pełny panel boczny Chrome ze statystykami.',
      btn_install:'Dodaj do Chrome',btn_uneed:'Premiera Uneed',btn_privacy:'Polityka prywatności',
      f1_title:'Widok 5H + tydzień',f1_text:'Oba okna limitów, czasy resetu i wykorzystanie w jednym miejscu.',f2_title:'Co nastąpi pierwsze?',f2_text:'Porównanie prognozowanego wyczerpania ze stałym terminem resetu.',f3_title:'Elastyczne układy',f3_text:'Tryb poziomy, pionowy, pływający i mini dopasowane do sposobu pracy.',f4_title:'Statystyki w panelu bocznym',f4_text:'Większy pulpit z tempem, historią, prognozami i osiami czasu.',
      gallery_title:'Zobacz prawdziwy interfejs',gallery_lead:'Rzeczywiste ekrany Horizon 2.1.19 — bez ogólnych makiet i sztucznych paneli.',g1:'Decyzja i panel boczny',g2:'Belka pozioma',g3:'Natywne limity i mini belka',g4:'Panel statystyk',g5:'Ustawienia i podgląd',
      projects_eyebrow:'Rodzina produktów',projects_title:'Wspólny standard, różne platformy.',projects_lead:'Każdy produkt zachowuje własną tożsamość, ale stosuje te same czytelne zasady obsługi.',available:'Dostępny',development:'W przygotowaniu',p_horizon:'Monitor limitów Claude z prognozami i elastycznymi układami.',p_zenith:'Powiązany projekt monitorowania limitów ChatGPT, obecnie rozwijany.',p_orbit:'Powiązany projekt monitorowania Gemini, obecnie rozwijany.',
      about_eyebrow:'O twórcy',about_title:'Kiewik Projects',about_text:'Niezależna marka twórcy z Polski, skupiona na praktycznych dodatkach Chrome i programach desktopowych. Cel jest prosty: bardziej przejrzyste procesy, użyteczna diagnostyka i interfejsy, które nie przeszkadzają w pracy.',
      launch_eyebrow:'Premiera wkrótce',launch_title:'Horizon na Uneed',launch_text:'Obserwuj nadchodzącą premierę Uneed, otwórz kartę produktu i dołącz do dyskusji w dniu startu.',launch_btn:'Otwórz stronę Uneed',
      support_eyebrow:'Wsparcie rozwoju',support_title:'Pomóż rozwijać niezależne narzędzia.',support_text:'Horizon jest bezpłatny. Dobrowolne wsparcie pomaga finansować testy, projektowanie i kolejne wydania Kiewik Projects.',support_global:'Wsparcie międzynarodowe',support_global_text:'Wesprzyj Kiewik Projects przez Buy Me a Coffee.',support_pl:'Wsparcie z Polski',support_pl_text:'Polska metoda wsparcia może zostać włączona w konfiguracji strony po wpisaniu potwierdzonego publicznego adresu.',support_btn:'Wesprzyj Kiewik Projects',
      footer_note:'Niezależna marka twórcy. Bez powiązania z Anthropic, OpenAI ani Google.',footer_privacy:'Prywatność strony',footer_hprivacy:'Prywatność Horizon',footer_contact:'Kontakt'
    }
  };
  const langBtn = document.querySelector('[data-lang-toggle]');
  const browserLang = navigator.language?.toLowerCase().startsWith('pl') ? 'pl' : 'en';
  let lang = safeStorage.get('kp-lang') || browserLang;
  function applyLang(next){
    lang = next; safeStorage.set('kp-lang',lang); document.documentElement.lang=lang;
    document.querySelectorAll('[data-i18n]').forEach(el=>{const v=translations[lang]?.[el.dataset.i18n]; if(v) el.textContent=v;});
    if(langBtn){langBtn.textContent=lang==='pl'?'EN':'PL';langBtn.setAttribute('aria-label',lang==='pl'?'Switch to English':'Przełącz na polski');}
  }
  applyLang(lang);
  langBtn?.addEventListener('click',()=>applyLang(lang==='pl'?'en':'pl'));

  const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  const dialog=document.querySelector('#lightbox'); const lightboxImg=dialog?.querySelector('img');
  document.querySelectorAll('[data-lightbox]').forEach(btn=>btn.addEventListener('click',()=>{
    lightboxImg.src=btn.dataset.full; lightboxImg.alt=btn.querySelector('img')?.alt||''; dialog.showModal();
  }));
  dialog?.querySelector('[data-close]')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog?.open)dialog.close()});

  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
