/**
 * ==========================================================================
 * HERRAMIENTAS DE CAMPO DE CABLEADO ESTRUCTURADO - LÓGICA E INTERACTIVIDAD
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initReadingProgressBar();
  initStripperGauge();
  initPunchDownTabs();
  initWiremapSimulator();
  initNavHighlight();
});

/* --------------------------------------------------------------------------
   1. ANIMACIONES DE SCROLL (INTERSECTION OBSERVER)
   Aparición (fade-in + slide-up) y transición de salida al retirarse de la vista
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  revealElements.forEach(el => scrollObserver.observe(el));
}

/* --------------------------------------------------------------------------
   2. BARRA DE PROGRESO DE LECTURA (SCROLL PROGRESS)
   -------------------------------------------------------------------------- */
function initReadingProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. SELECTOR INTERACTIVO DE PROFUNDIDAD EN PELACABLES
   -------------------------------------------------------------------------- */
function initStripperGauge() {
  const gaugeButtons = document.querySelectorAll('.gauge-btn');
  const feedbackText = document.getElementById('gauge-feedback');

  if (!gaugeButtons.length || !feedbackText) return;

  gaugeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      gaugeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const desc = btn.getAttribute('data-depth');
      feedbackText.style.opacity = '0';
      setTimeout(() => {
        feedbackText.textContent = desc;
        feedbackText.style.opacity = '1';
      }, 150);
    });
  });
}

/* --------------------------------------------------------------------------
   4. PESTAÑAS COMPACTAS DE CUCHILLAS (PONCHADORA DE IMPACTO)
   -------------------------------------------------------------------------- */
function initPunchDownTabs() {
  const tabButtons = document.querySelectorAll('.c-tab-btn');
  const tabPanels = document.querySelectorAll('.compact-tab-panel');

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. SIMULADOR DE WIREMAP / TESTER DE RED (INTERACTIVO PIN A PIN)
   -------------------------------------------------------------------------- */
function initWiremapSimulator() {
  const btnPass = document.getElementById('btn-wire-pass');
  const btnCross = document.getElementById('btn-wire-cross');
  const btnOpen = document.getElementById('btn-wire-open');
  const verdictBadge = document.getElementById('test-verdict-badge');
  const verdictText = document.getElementById('sim-verdict-text');

  if (!btnPass || !btnCross || !btnOpen || !verdictBadge || !verdictText) return;

  const leds = [
    document.getElementById('led-1'),
    document.getElementById('led-2'),
    document.getElementById('led-3'),
    document.getElementById('led-4'),
    document.getElementById('led-5'),
    document.getElementById('led-6'),
    document.getElementById('led-7'),
    document.getElementById('led-8')
  ];

  const rxLabels = [
    document.getElementById('rx-1'),
    document.getElementById('rx-2'),
    document.getElementById('rx-3'),
    document.getElementById('rx-4'),
    document.getElementById('rx-5'),
    document.getElementById('rx-6'),
    document.getElementById('rx-7'),
    document.getElementById('rx-8')
  ];

  function resetButtons() {
    [btnPass, btnCross, btnOpen].forEach(b => b.classList.remove('active'));
  }

  // Modo 1: Cable Correcto (PASS)
  btnPass.addEventListener('click', () => {
    resetButtons();
    btnPass.classList.add('active');

    verdictBadge.className = 'verdict-badge pass';
    verdictBadge.textContent = 'PASS - T568B';

    // Todos los LEDs encendidos en verde
    leds.forEach((led, idx) => {
      if (led) {
        led.className = 'led-indicator led-on';
      }
      if (rxLabels[idx]) {
        rxLabels[idx].textContent = `PIN ${idx + 1}`;
        rxLabels[idx].style.color = '#94a3b8';
      }
    });

    verdictText.innerHTML = `
      <strong>Continuidad Completa 1 a 1:</strong> Todos los 8 pares transmiten correctamente según norma directa T568B. Enlace certificado para Gigabit Ethernet (1000BASE-T) y alimentación PoE sin pérdidas.
    `;
  });

  // Modo 2: Par Cruzado (CROSS)
  btnCross.addEventListener('click', () => {
    resetButtons();
    btnCross.classList.add('active');

    verdictBadge.className = 'verdict-badge fail';
    verdictBadge.textContent = 'FAIL - PARES CRUZADOS (1-2 / 3-6)';

    // Pines normales
    leds.forEach((led, idx) => {
      if (led) led.className = 'led-indicator led-on';
      if (rxLabels[idx]) {
        rxLabels[idx].textContent = `PIN ${idx + 1}`;
        rxLabels[idx].style.color = '#94a3b8';
      }
    });

    // Invertir pines de datos (Pines 1, 2, 3, 6)
    if (leds[0]) leds[0].className = 'led-indicator led-error';
    if (leds[1]) leds[1].className = 'led-indicator led-error';
    if (leds[2]) leds[2].className = 'led-indicator led-error';
    if (leds[5]) leds[5].className = 'led-indicator led-error';

    if (rxLabels[0]) { rxLabels[0].textContent = 'PIN 3'; rxLabels[0].style.color = '#f87171'; }
    if (rxLabels[1]) { rxLabels[1].textContent = 'PIN 6'; rxLabels[1].style.color = '#f87171'; }
    if (rxLabels[2]) { rxLabels[2].textContent = 'PIN 1'; rxLabels[2].style.color = '#f87171'; }
    if (rxLabels[5]) { rxLabels[5].textContent = 'PIN 2'; rxLabels[5].style.color = '#f87171'; }

    verdictText.innerHTML = `
      <strong style="color: #f87171;">Fallo Crítico: Pares Cruzados Detectados:</strong> Los pares de transmisión (TX: 1-2) y recepción (RX: 3-6) están transpuestos. Típico error por mezclar norma T568A en un extremo y T568B en el otro extremo sin ser un cable crossover intencional.
    `;
  });

  // Modo 3: Hilo Abierto en Pin 4 (OPEN)
  btnOpen.addEventListener('click', () => {
    resetButtons();
    btnOpen.classList.add('active');

    verdictBadge.className = 'verdict-badge warn';
    verdictBadge.textContent = 'WARN - CIRCUITO ABIERTO (PIN 4)';

    leds.forEach((led, idx) => {
      if (led) led.className = 'led-indicator led-on';
      if (rxLabels[idx]) {
        rxLabels[idx].textContent = `PIN ${idx + 1}`;
        rxLabels[idx].style.color = '#94a3b8';
      }
    });

    // Pin 4 abierto
    if (leds[3]) leds[3].className = 'led-indicator led-off';
    if (rxLabels[3]) {
      rxLabels[3].textContent = 'OPEN';
      rxLabels[3].style.color = '#fde68a';
    }

    verdictText.innerHTML = `
      <strong style="color: #fde68a;">Advertencia: Pin 4 (Azul) Desconectado:</strong> No se detecta flujo de corriente en el pin 4. Causa probable: cuchilla IDC no bajó lo suficiente o falso contacto en el conector macho. No superará la certificación TIA-568.
    `;
  });
}

/* --------------------------------------------------------------------------
   6. RESALTADO DINÁMICO DE NAVEGACIÓN EN SCROLL
   -------------------------------------------------------------------------- */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}
