'use strict';
const $ = selector => document.querySelector(selector);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menu = $('.menu-toggle');
const nav = $('.nav');
const more = $('.nav-more');
const menuBackdrop = $('.nav-backdrop');
const mobileHeader = window.matchMedia('(max-width: 920px)');

function closeMenu() {
  if (menu && nav) {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
  }
  if (more) more.open = false;
  if (menuBackdrop) menuBackdrop.hidden = true;
  document.body.classList.remove('site-menu-open');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  if (!open) { closeMenu(); return; }
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  nav.classList.toggle('is-open', open);
  if (menuBackdrop) menuBackdrop.hidden = !open;
  document.body.classList.toggle('site-menu-open', open);
  nav.querySelector('a')?.focus();
});
menuBackdrop?.addEventListener('click', closeMenu);
mobileHeader.addEventListener('change', closeMenu);
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
document.addEventListener('focusin', event => {
  if (!event.target.closest('.header') && (nav?.classList.contains('is-open') || more?.open)) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const headerHasFocus = event.target.closest('.header');
    const focusTarget = nav?.classList.contains('is-open') ? menu : more?.open ? more.querySelector('summary') : null;
    closeMenu();
    if (headerHasFocus) focusTarget?.focus();
  }
});

if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .07});
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('will-reveal');
    observer.observe(element);
  });
}

let scheduled = false;
function updateScroll() {
  const range = document.documentElement.scrollHeight - innerHeight;
  const progress = $('.scroll-progress');
  if (progress) progress.style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
  $('.header')?.classList.toggle('scrolled', scrollY > 15);
  scheduled = false;
}
addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateScroll);
  }
}, {passive: true});
addEventListener('resize', updateScroll);
updateScroll();

// Keep the service chosen on another page when opening Contacto.
const serviceSelect = $('#service-select');
if (serviceSelect) {
  const selected = new URLSearchParams(location.search).get('servicio');
  if (selected && [...serviceSelect.options].some(option => option.value === selected)) {
    serviceSelect.value = selected;
  }
}

const projects = [
  {
    "image": "galeria-letrero-brava.webp",
    "title": "Identidad desde la entrada.",
    "alt": "Letrero circular de Brava Barre instalado en una fachada",
    "note": "Fotografía recuperada del sitio original de Vinilmanía.",
    "category": "negocios",
    "label": "LETREROS COMERCIALES",
    "origin": "original",
    "width": 720,
    "height": 1280
  },
  {
    "image": "galeria-fachada-automotriz.webp",
    "title": "Una fachada que se hace notar.",
    "alt": "Fachada comercial con viniles publicitarios de automóviles",
    "note": "Fotografía recuperada del sitio original de Vinilmanía.",
    "category": "negocios",
    "label": "GRÁFICA PARA NEGOCIOS",
    "origin": "original",
    "width": 1280,
    "height": 960
  },
  {
    "image": "galeria-taza-ilustrada.webp",
    "title": "Ilustraciones que acompañan tu día.",
    "alt": "Taza blanca personalizada con una ilustración de personajes y corazones",
    "note": "Fotografía recuperada del sitio original de Vinilmanía.",
    "category": "personalizados",
    "label": "TAZAS PERSONALIZADAS",
    "origin": "original",
    "width": 1600,
    "height": 1200
  },
  {
    "image": "galeria-vinil-promocion.webp",
    "title": "Tu promoción, en primer plano.",
    "alt": "Ventana comercial con una promoción de automóviles impresa en vinil",
    "note": "Fotografía recuperada del sitio original de Vinilmanía.",
    "category": "negocios",
    "label": "VINIL EN CRISTAL",
    "origin": "original",
    "width": 1280,
    "height": 960
  },
  {
    "image": "galeria-escaparate-promocional.webp",
    "title": "La temporada tiene su propia imagen.",
    "alt": "Escaparate con gráfica de descuentos y campaña Hot Days",
    "note": "Fotografía recuperada del sitio original de Vinilmanía.",
    "category": "negocios",
    "label": "ESCAPARATES",
    "origin": "original",
    "width": 754,
    "height": 1280
  },
  {
    "image": "galeria-taza-papa.webp",
    "title": "Un detalle para papá.",
    "alt": "Taza blanca con corazones y mensaje dedicado a un padre",
    "note": "Fotografía recuperada del sitio original de Vinilmanía.",
    "category": "personalizados",
    "label": "REGALOS PERSONALIZADOS",
    "origin": "original",
    "width": 1600,
    "height": 1200
  },
  {
    "image": "galeria-puerta-vinil-azul.webp",
    "title": "Cada acceso es una oportunidad.",
    "alt": "Puerta de cristal con gráfica azul y mensaje promocional",
    "note": "Fotografía recuperada del sitio original de Vinilmanía.",
    "category": "negocios",
    "label": "ROTULACIÓN EN CRISTAL",
    "origin": "original",
    "width": 1200,
    "height": 1600
  },
  {
    "image": "galeria-panel-publicitario.webp",
    "title": "Información que se ve.",
    "alt": "Panel de cristal con mensajes publicitarios y fotografía de un automóvil",
    "note": "Fotografía recuperada del sitio original de Vinilmanía.",
    "category": "negocios",
    "label": "GRÁFICA COMERCIAL",
    "origin": "original",
    "width": 1200,
    "height": 1600
  },
  {
    "image": "galeria-taza-corazones.webp",
    "title": "Una taza con algo que decir.",
    "alt": "Taza personalizada con corazones y un mensaje de amor",
    "note": "Fotografía recuperada del sitio original de Vinilmanía.",
    "category": "personalizados",
    "label": "TAZAS PERSONALIZADAS",
    "origin": "original",
    "width": 1600,
    "height": 1200
  },
  {
    "image": "galeria-letrero-monica-detalle.webp",
    "title": "Los detalles de tu identidad.",
    "alt": "Vista cercana de un letrero circular de Mónica Márquez",
    "note": "Fotografía recuperada del sitio original de Vinilmanía.",
    "category": "negocios",
    "label": "LETREROS COMERCIALES",
    "origin": "original",
    "width": 1280,
    "height": 720
  },
  {
    "image": "galeria-taza-amor.webp",
    "title": "Una idea para compartir.",
    "alt": "Taza blanca y roja personalizada con un mensaje de amor",
    "note": "Fotografía recuperada del sitio original de Vinilmanía.",
    "category": "personalizados",
    "label": "REGALOS PERSONALIZADOS",
    "origin": "original",
    "width": 1600,
    "height": 1200
  },
  {
    "image": "escaparate.webp",
    "title": "Un escaparate que comunica.",
    "alt": "Vinil promocional sobre un cristal comercial",
    "category": "negocios",
    "label": "GRÁFICA COMERCIAL",
    "width": 720,
    "height": 1280,
    "origin": "original",
    "note": "Fotografía recuperada del sitio original de Vinilmanía."
  },
  {
    "image": "playeras.webp",
    "title": "Tu identidad en cada prenda.",
    "alt": "Playeras negras con emblemas personalizados",
    "category": "textiles",
    "label": "PERSONALIZACIÓN TEXTIL",
    "width": 768,
    "height": 1024,
    "origin": "original",
    "note": "Fotografía recuperada del sitio original de Vinilmanía."
  },
  {
    "image": "letrero.webp",
    "title": "Hazte notar desde la entrada.",
    "alt": "Letrero circular en una fachada comercial",
    "category": "negocios",
    "label": "IDENTIDAD PARA NEGOCIOS",
    "width": 720,
    "height": 1280,
    "origin": "original",
    "note": "Fotografía recuperada del sitio original de Vinilmanía."
  },
  {
    "image": "personalizados.webp",
    "title": "Una misma idea, muchas formas.",
    "alt": "Concepto de una colección de artículos personalizados",
    "category": "inspiracion",
    "label": "CONCEPTO · PERSONALIZACIÓN",
    "width": 1448,
    "height": 1086,
    "origin": "concept",
    "note": "Imagen conceptual · Inspiración para tu proyecto."
  },
  {
    "image": "stickers.webp",
    "title": "Personalidad en pequeño formato.",
    "alt": "Concepto de stickers con gráficos geométricos",
    "category": "inspiracion",
    "label": "CONCEPTO · STICKERS",
    "width": 1448,
    "height": 1086,
    "origin": "concept",
    "note": "Imagen conceptual · Inspiración para tu proyecto."
  },
  {
    "image": "cristal-comercial.webp",
    "title": "Tu espacio, con otra presencia.",
    "alt": "Concepto de vinil microperforado sobre un escaparate",
    "category": "inspiracion",
    "label": "CONCEPTO · GRÁFICA EN CRISTAL",
    "width": 1448,
    "height": 1086,
    "origin": "concept",
    "note": "Imagen conceptual · Inspiración para tu proyecto."
  },
  {
    "image": "vinil-textil.webp",
    "title": "Del gráfico a la prenda.",
    "alt": "Concepto de playera personalizada en una prensa térmica",
    "category": "inspiracion",
    "label": "CONCEPTO · PERSONALIZACIÓN TEXTIL",
    "width": 1448,
    "height": 1086,
    "origin": "concept",
    "note": "Imagen conceptual · Inspiración para tu proyecto."
  },
  {
    "image": "regalos-personalizados.webp",
    "title": "Detalles que van contigo.",
    "alt": "Concepto de tazas, termo y caja de regalo coordinados",
    "category": "inspiracion",
    "label": "CONCEPTO · REGALOS PERSONALIZADOS",
    "width": 1448,
    "height": 1086,
    "origin": "concept",
    "note": "Imagen conceptual · Inspiración para tu proyecto."
  },
  {
    "image": "mesa-diseno.webp",
    "title": "Aquí comienza una nueva idea.",
    "alt": "Concepto de mesa de diseño con muestras y materiales",
    "category": "inspiracion",
    "label": "CONCEPTO · DISEÑO CREATIVO",
    "width": 1448,
    "height": 1086,
    "origin": "concept",
    "note": "Imagen conceptual · Inspiración para tu proyecto."
  }
];
const gallery = $('.gallery-grid');
const dialog = $('#lightbox');
if (gallery && dialog) {
  let visibleProjects = projects.map((_, index) => index);
  let activeProject = 0;
  document.querySelectorAll('.gallery-filters button').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('.gallery-filters button').forEach(item => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      gallery.dataset.filter = filter;
      visibleProjects = [];
      gallery.querySelectorAll('.project-card').forEach(card => {
        const visible = filter === 'all' || card.dataset.category === filter;
        card.hidden = !visible;
        if (visible) {
          visibleProjects.push(Number(card.dataset.project));
          card.classList.add('visible');
        }
      });
      const captions = {all: '14 fotografías del sitio original y 6 conceptos visuales', negocios: 'Gráfica para negocios', textiles: 'Personalización textil', personalizados: 'Productos personalizados', inspiracion: 'Conceptos visuales'};
      $('#gallery-info').textContent = `${visibleProjects.length} ${visibleProjects.length === 1 ? 'imagen' : 'imágenes'} · ${captions[filter] || 'Galería Vinilmanía'}`;
    });
  });
  function showProject(index) {
    activeProject = index;
    const project = projects[index];
    $('#lightbox-image').src = 'assets/' + project.image;
    $('#lightbox-image').alt = project.alt;
    $('#lightbox-title').textContent = project.title;
    $('#lightbox-note').textContent = project.note;
    $('#lightbox-count').textContent = `${visibleProjects.indexOf(index) + 1} / ${visibleProjects.length}`;
  }
  function moveProject(direction) {
    const current = visibleProjects.indexOf(activeProject);
    showProject(visibleProjects[(current + direction + visibleProjects.length) % visibleProjects.length]);
  }
  gallery.querySelectorAll('.project-card').forEach(button => {
    button.addEventListener('click', () => {
      showProject(Number(button.dataset.project));
      dialog.showModal();
      document.body.classList.add('modal-open');
    });
  });
  $('.lightbox-close').addEventListener('click', () => dialog.close());
  $('#prev-image').addEventListener('click', () => moveProject(-1));
  $('#next-image').addEventListener('click', () => moveProject(1));
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      moveProject(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
}

$('#quote-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const name = $('#name').value.trim();
  const message = $('#message').value.trim();
  if (!name || !message) {
    $('#form-feedback').textContent = 'Escribe tu nombre y un poco sobre tu proyecto.';
    return;
  }
  const service = serviceSelect.value || 'Asesoría para mi proyecto';
  const draft = `Hola, Vinilmanía. Soy ${name}.\nMe interesa: ${service}.\n\n${message}\n\n¿Me ayudan con una cotización?`;
  const link = document.createElement('a');
  link.href = 'https://wa.me/527772675660?text=' + encodeURIComponent(draft);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.click();
  $('#form-feedback').textContent = 'Tu mensaje está listo en WhatsApp. Revísalo y envíalo para continuar.';
});
if ($('#year')) $('#year').textContent = new Date().getFullYear();
