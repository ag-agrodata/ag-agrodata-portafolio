// js/main.js

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. OBSERVERS (Animaciones al hacer scroll)
  // ==========================================

  // Observer para elementos fade-in y barras de progreso
  const fadeObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Si es una barra de progreso, animar su ancho
        if (entry.target.classList.contains('bar-fill')) {
          const width = entry.target.getAttribute('data-width');
          if (width) entry.target.style.width = width;
        }

        observer.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);

  document.querySelectorAll('.fade-in, .bar-fill').forEach(el => fadeObserver.observe(el));

  // Observer para contadores animados (usando requestAnimationFrame para mayor suavidad)
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-target'));

        if (!target) return; // Seguridad: si no hay target, salir

        const duration = 1500; // 1.5 segundos
        const start = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function (easeOutCubic) para un movimiento más natural
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = target * easeOut;

          // Formatear según si es decimal o entero
          if (target % 1 !== 0) {
            counter.textContent = current.toFixed(1);
          } else {
            counter.textContent = Math.floor(current).toLocaleString();
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target % 1 !== 0 ? target.toFixed(1) : target.toLocaleString();
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  // ==========================================
  // 2. NAVEGACIÓN (Scroll effect + Menú móvil)
  // ==========================================
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  // Efecto de sombra al hacer scroll (con passive: true para mejor rendimiento)
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Toggle menú móvil
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer clic en un link
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // 3. HERO SLIDER
  // ==========================================
  const slides = document.querySelectorAll('.slider-text');

  if (slides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 4000; // 4 segundos por frase

    function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);
  }

  // ==========================================
  // 4. HERO CAROUSEL (Imágenes de fondo)
  // ==========================================
  const carouselSlides = document.querySelectorAll('.carousel-slide');

  if (carouselSlides.length > 0) {
    let currentCarouselSlide = 0;
    const carouselInterval = 5000; // 5 segundos por imagen

    function nextCarouselSlide() {
      carouselSlides[currentCarouselSlide].classList.remove('active');
      currentCarouselSlide = (currentCarouselSlide + 1) % carouselSlides.length;
      carouselSlides[currentCarouselSlide].classList.add('active');
    }

    setInterval(nextCarouselSlide, carouselInterval);
  }

});
