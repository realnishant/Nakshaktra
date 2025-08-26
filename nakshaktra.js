
    // Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const NavLinks = document.querySelectorAll('.nav-links a'); // sabhi links select

// Toggle menu
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  hamburger.classList.toggle('active');
});

// Close menu when link clicked
NavLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    hamburger.classList.remove('active');
  });
});






    // Smooth scroll + active nav highlighting
    const navLinks = Array.from(document.querySelectorAll('header nav a'));
    navLinks.forEach(a => a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    }));
    const sections = ['about', 'events', 'gallery', 'contact'].map(id => document.getElementById(id));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          const id = entry.target.id;
          navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
        }
      })
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Fake form handler
    document.getElementById('fakeSubmit').addEventListener('click', () => {
      const name = document.getElementById('name').value.trim() || 'Starfriend';
      const note = document.getElementById('formNote');
      note.textContent = `Thanks, ${name}! Your message is stashed in our demo inbox ✨`;
    });

    // Lightbox modal
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    document.querySelectorAll('#gallery img').forEach(img => {
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modal.classList.add('open');
      })
    });
    modal.addEventListener('click', () => modal.classList.remove('open'));

    // Tiny starfield renderer
    (function starfield() {
      const canvas = document.getElementById('starsCanvas');
      const ctx = canvas.getContext('2d');
      let w, h, stars;
      const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      function resize() {
        w = canvas.width = innerWidth * DPR;
        h = canvas.height = innerHeight * DPR;
        canvas.style.width = innerWidth + 'px';
        canvas.style.height = innerHeight + 'px';
        stars = Array.from({ length: Math.floor((w * h) / 12000) }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2 + 0.2,
          a: Math.random() * 0.8 + 0.2,
          tw: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? -1 : 1)
        }));
      }
      function tick() {
        ctx.clearRect(0, 0, w, h);
        for (const s of stars) {
          s.a += s.tw; if (s.a < 0.2 || s.a > 1) { s.tw *= -1 }
          ctx.globalAlpha = s.a; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill();
          // subtle blue glow
          ctx.globalAlpha = s.a * 0.3; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 2.2, 0, Math.PI * 2); ctx.fillStyle = '#7aa2ff'; ctx.fill();
        }
        requestAnimationFrame(tick);
      }
      window.addEventListener('resize', resize, { passive: true });
      resize(); tick();
    })();