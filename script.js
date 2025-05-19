// @section: Initialization
document.addEventListener('DOMContentLoaded', () => {
  // ------------------- Particelle -------------------
  particlesJS("particles-js", {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: ["#ff6b00", "#ff9900", "#ffd500"] },
      shape: { type: "circle" },
      opacity: {
        value: 0.6,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 5,
        random: true,
        anim: { enable: true, speed: 3, size_min: 1, sync: false }
      },
      move: { enable: true, speed: 0.5, direction: "top", outMode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
    },
    retina_detect: true
  });

  // ------------------- Inizializzazioni -------------------
  initAnimations();
  initScrollEffect();
  initServicesScroll();
  initSideMenu();
  initLogoSlideshow();
  initVideoGallery();
  initVideoFilters();
  initForm();
  initRealEstatePromo();
  initSlideshow();
});

// ------------------- Funzioni -------------------

// Animazione SVG
function initAnimations() {
  const svgEl = document.querySelector('.disegno-svg');
  if (!svgEl) return;
  setTimeout(() => svgEl.classList.add('show'), 500);
}

// Effetto scroll pulsante
function initScrollEffect() {
  const svgTitle = document.getElementById('svg-title2');
  if (!svgTitle) return;
  
  let wasInView = false;
  const handler = () => {
    const rect = svgTitle.getBoundingClientRect();
    const inView = rect.top <= window.innerHeight && rect.bottom >= 0;
    
    if (inView && !wasInView) {
      svgTitle.classList.add('pulse-twice');
      setTimeout(() => svgTitle.classList.remove('pulse-twice'), 1000);
    }
    wasInView = inView;
  };

  window.addEventListener('scroll', handler);
}

// Gestione scroll
function initServicesScroll() {
  window.addEventListener('scroll', () => {
    document.body.classList.toggle('window-scrolled', window.scrollY > window.innerHeight * 0.5);
  });
}

function initSideMenu() {
    const sideMenu = document.getElementById('side-menu');
    if (!sideMenu) return;

    const submenuToggles = sideMenu.querySelectorAll('.submenu-toggle');
    const submenuItems = sideMenu.querySelectorAll('.has-submenu');
    const menuLinks = sideMenu.querySelectorAll('.menu-item > a:not(.submenu-toggle)');

    // Hamburger mobile
    const hamburgerLink = sideMenu.querySelector('.menu-item:first-child > a');
    if (hamburgerLink) {
        hamburgerLink.addEventListener('click', e => {
            if (window.innerWidth < 768) {
                e.preventDefault();
                sideMenu.classList.toggle('submenu-active');
                document.body.style.overflow = sideMenu.classList.contains('submenu-active') ? 'hidden' : '';
            }
        });
    }

    // Toggle sottomenù
    submenuToggles.forEach(btn => {
        ['click', 'touchstart'].forEach(evtType => {
            btn.addEventListener(evtType, e => {
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    btn.closest('.has-submenu').classList.toggle('submenu-open');
                }
            });
        });
    });

    // Gestione hover desktop
    if (window.innerWidth >= 768) {
        submenuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('submenu-open');
            });
            item.addEventListener('mouseleave', () => {
                item.classList.remove('submenu-open');
            });
        });
    }

    // Chiudi menu mobile
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                sideMenu.classList.remove('submenu-active');
                document.body.style.overflow = '';
            }
        });
    });

    // Click esterno
    ['click', 'touchstart'].forEach(evtType => {
        document.addEventListener(evtType, e => {
            if (!e.target.closest('#side-menu')) {
                if (window.innerWidth < 768) {
                    sideMenu.classList.remove('submenu-active');
                    document.body.style.overflow = '';
                }
                submenuItems.forEach(item => item.classList.remove('submenu-open'));
            }
        });
    });

    // Gestione resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            sideMenu.classList.remove('submenu-active');
            document.body.style.overflow = '';
        }
    });
}

// Slideshow automatico
function initSlideshow() {
  const slider = document.querySelector('.illustration-slider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.slide'));
  if (!slides.length) return;

  let current = 0, timerId = null;
  slides.forEach((s, i) => s.classList.toggle('active', i === 0));

  const nextSlide = () => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  };

  const start = () => timerId = timerId || setInterval(nextSlide, 4500);
  const stop = () => { clearInterval(timerId); timerId = null; };

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  start();
}

// Logo casuali
function initLogoSlideshow() {
  const track = document.querySelector('.logos-track');
  if (!track) return;

  const items = Array.from(track.querySelectorAll('.logo-item'));
  items.sort(() => Math.random() - 0.5);
  track.innerHTML = '';
  items.concat(items.map(item => item.cloneNode(true))).forEach(item => track.appendChild(item));

  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

// Video Modal
function initVideoGallery() {
  const modal = document.getElementById('video-modal');
  const modalFrame = document.getElementById('modal-iframe');
  const closeBtn = document.getElementById('modal-close');

  if (!modal || !modalFrame || !closeBtn) return;

  document.querySelectorAll('.video-item').forEach(card => {
    card.addEventListener('click', () => {
      modalFrame.src = `https://www.youtube.com/embed/${card.dataset.videoId}?autoplay=1`;
      modal.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalFrame.src = '';
  });
}

// Filtri video
function initVideoFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.video-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      cards.forEach(c => {
        c.style.display = (filter === 'all' || c.classList.contains(filter)) ? '' : 'none';
      });
    });
  });
}

// Form contatti
function initForm() {
  document.querySelectorAll('.field-wrapper input, .field-wrapper textarea').forEach(f => {
    f.addEventListener('focus', () => f.parentNode.classList.add('focused'));
    f.addEventListener('blur', () => {
      if (!f.value) f.parentNode.classList.remove('focused');
    });
  });

  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const feedback = form.querySelector('.form-feedback');
    
    if (!form.checkValidity()) {
      form.querySelectorAll(':invalid').forEach(el => el.classList.add('error'));
      feedback.textContent = 'Compila tutti i campi obbligatori';
      return;
    }

    feedback.textContent = 'Invio in corso...';
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      feedback.textContent = response.ok 
        ? 'Messaggio inviato con successo!' 
        : 'Errore durante l\'invio';
        
      if (response.ok) form.reset();
    } catch (error) {
      feedback.textContent = 'Errore di connessione';
    }
  });
}

// Real Estate Promo
function initRealEstatePromo() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('visible', entry.isIntersecting));
  }, { threshold: 0.2 });

  document.querySelectorAll('#real-estate-promo .promo-content > div').forEach(el => observer.observe(el));

  document.querySelectorAll('.promo-benefits .benefit-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => icon.classList.add('icon-glow'));
    icon.addEventListener('mouseleave', () => icon.classList.remove('icon-glow'));
  });
}