// script.js — идентичная логика, адаптированная под светлую тему
(function() {
  "use strict";

  // PRELOADER
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 400);
  });

  // PARALLAX
  const parallaxBg = document.getElementById('parallaxBg');
  if (parallaxBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
    });
  }

  // REVEAL
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  revealElements.forEach(el => observer.observe(el));

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // SLIDER
  const slider = document.getElementById('slider');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('sliderDots');
  if (slider) {
    const slides = slider.querySelectorAll('.slide');
    let currentIndex = 0;
    function updateSlider() {
      const slideWidth = slider.clientWidth;
      slider.scrollTo({ left: slideWidth * currentIndex, behavior: 'smooth' });
      updateDots();
    }
    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (idx === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => { currentIndex = idx; updateSlider(); });
        dotsContainer.appendChild(dot);
      });
    }
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    });
    slider.addEventListener('scroll', () => {
      const index = Math.round(slider.scrollLeft / slider.clientWidth);
      if (index !== currentIndex) { currentIndex = index; updateDots(); }
    });
    window.addEventListener('resize', updateSlider);
    updateDots();
  }

  // BOOK BUTTONS
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('✨ Спасибо! Я свяжусь с вами в ближайшее время.');
    });
  });

  // FORM VALIDATION
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const date = document.getElementById('date').value;
      if (!name || !phone || !date) return alert('Заполните все поля');
      if (!/^[\d\s\+\-\(\)]{7,}$/.test(phone)) return alert('Введите корректный телефон');
      alert(`Спасибо, ${name}! Заявка на ${date} принята.`);
      form.reset();
    });
  }
})();