const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

// A short, controllable story connecting the three areas of work.
const stage = document.querySelector('.connection-stage');
if (stage) {
  const scenes = [
    ['Clareza antes de começar.', 'Entender o negócio, definir prioridades e escolher o próximo passo.'],
    ['Ideias que encontram sua voz.', 'Calendário editorial, roteiros e gestão para dar consistência à sua presença.'],
    ['O interesse encontra um caminho.', 'Sites, sistemas e automações conectados à experiência de quem chega.'],
    ['Uma direção. Tudo conectado.', 'Estratégia, marketing e tecnologia trabalhando para o mesmo negócio.']
  ];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = stage.querySelector('.motion-toggle');
  const steps = [...stage.querySelectorAll('[data-step]')];
  let current = 0;
  let paused = reduceMotion.matches;
  let visible = false;
  let timer;
  function showScene(index) {
    current = index;
    stage.dataset.scene = String(index);
    stage.querySelector('#scene-index').textContent = `0${index + 1} / 04`;
    stage.querySelector('#scene-title').textContent = scenes[index][0];
    stage.querySelector('#scene-description').textContent = scenes[index][1];
    steps.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  }
  function syncPlayback() {
    clearInterval(timer);
    const stopped = paused || !visible || document.hidden;
    stage.classList.toggle('is-paused', stopped);
    toggle.textContent = paused ? 'Reproduzir animação' : 'Pausar animação';
    toggle.setAttribute('aria-label', paused ? 'Reproduzir apresentação animada' : 'Pausar apresentação animada');
    if (!stopped) timer = setInterval(() => showScene((current + 1) % scenes.length), 6000);
  }
  toggle.addEventListener('click', () => { paused = !paused; syncPlayback(); });
  steps.forEach(button => button.addEventListener('click', () => {
    paused = true;
    showScene(Number(button.dataset.step));
    syncPlayback();
  }));
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    syncPlayback();
  }, { threshold: .25 }).observe(stage);
  document.addEventListener('visibilitychange', syncPlayback);
  reduceMotion.addEventListener('change', () => { paused = reduceMotion.matches; syncPlayback(); });
  syncPlayback();
}

// Open once when the hero enters view; the same object can be replayed.
const unfoldingHero = document.querySelector('.unfolding-hero');
if (unfoldingHero) {
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const control = unfoldingHero.querySelector('.unfold-toggle');
  const content = unfoldingHero.querySelector('.unfold-content');
  const caption = unfoldingHero.querySelector('.unfold-foot p');
  let openingTimer;
  let hasStarted = motionPreference.matches;
  function setOpen(open) {
    unfoldingHero.dataset.state = open ? 'open' : 'closed';
    content.inert = !open;
    content.setAttribute('aria-hidden', String(!open));
    control.setAttribute('aria-expanded', String(open));
    control.textContent = open ? (motionPreference.matches ? 'Fechar possibilidades' : 'Rever abertura') : 'Abrir possibilidades';
    caption.textContent = open ? 'Uma direção. Novas possibilidades.' : 'O próximo passo está aqui dentro.';
  }
  setOpen(motionPreference.matches);
  const openingObserver = new IntersectionObserver(entries => {
    clearTimeout(openingTimer);
    if (entries[0].isIntersecting && !hasStarted && !document.hidden) {
      openingTimer = setTimeout(() => { hasStarted = true; setOpen(true); }, 1000);
    }
  }, { threshold: .5 });
  openingObserver.observe(unfoldingHero);
  control.addEventListener('click', () => {
    hasStarted = true;
    clearTimeout(openingTimer);
    const isOpen = unfoldingHero.dataset.state === 'open';
    if (motionPreference.matches || !isOpen) { setOpen(!isOpen); return; }
    setOpen(false);
    openingTimer = setTimeout(() => setOpen(true), 1800);
  });
  motionPreference.addEventListener('change', () => {
    clearTimeout(openingTimer);
    hasStarted = true;
    setOpen(true);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimeout(openingTimer); if (hasStarted) setOpen(true); }
    else if (!hasStarted) {
      const rect = unfoldingHero.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) {
        openingTimer = setTimeout(() => { hasStarted = true; setOpen(true); }, 1000);
      }
    }
  });
}

document.querySelectorAll('[data-interest]').forEach(card => {
  card.href = '/conversar?interesse=' + encodeURIComponent(card.dataset.interest);
});
// Carry only campaign attribution to the guided conversation.
const campaignParams = new URLSearchParams(location.search);
document.querySelectorAll('a[href^="/conversar"]').forEach(anchor => {
  const destination = new URL(anchor.href, location.origin);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = campaignParams.get(key);
    if (value) destination.searchParams.set(key, value.slice(0,100));
  }
  anchor.href = destination.pathname + destination.search;
});
