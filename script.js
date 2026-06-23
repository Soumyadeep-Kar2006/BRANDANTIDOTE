// --- THEME TOGGLE ---
(function () {
  var saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();

function toggleTheme() {
  var html = document.documentElement;
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  forceRedText();
  forceTestimonialText();
}

function forceRedText() {
  var dark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.text-\\[#E30613\\], [style*="color: #E30613"]').forEach(function(el) {
    if (dark) {
      el.style.setProperty('color', '#E30613', 'important');
      el.querySelectorAll('path').forEach(function(path) {
        path.style.setProperty('fill', '#E30613', 'important');
      });
    } else {
      el.style.color = '';
      el.querySelectorAll('path').forEach(function(path) {
        path.style.fill = '';
      });
    }
  });
}

function forceTestimonialText() {
  if (!document.documentElement.classList.contains('dark')) return;
  var marquee = document.getElementById('testimonial-marquee');
  if (!marquee) return;
  var cards = marquee.children;
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    card.style.setProperty('background', '#fff', 'important');
    card.style.setProperty('border-color', 'rgba(0,0,0,0.08)', 'important');
    card.querySelectorAll('p').forEach(function(p) {
      p.style.setProperty('color', '#222', 'important');
    });
  }
}

function showFormError(msg) {
  var el = document.getElementById('form-error');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(function() { el.style.display = 'none'; }, 4000);
}

function validateForm() {
  var data = getFormData();
  if (!data.name && !data.email) {
    showFormError('Please fill in your name and email.');
    return false;
  }
  if (!data.name) {
    showFormError('Please enter your name.');
    return false;
  }
  if (!data.email) {
    showFormError('Please enter your email.');
    return false;
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    showFormError('Please enter a valid email address.');
    return false;
  }
  return true;
}

function getFormData() {
  var name = document.getElementById('form-name').value.trim();
  var email = document.getElementById('form-email').value.trim();
  var phone = document.getElementById('form-phone').value.trim();
  var message = document.getElementById('form-message').value.trim();
  return { name: name, email: email, phone: phone, message: message };
}

function sendWhatsApp() {
  if (!validateForm()) return;
  var data = getFormData();
  var text = 'Hello BrandAntidote!';
  if (data.name) text += '\nName: ' + data.name;
  if (data.email) text += '\nEmail: ' + data.email;
  if (data.phone) text += '\nPhone: ' + data.phone;
  if (data.message) text += '\nMessage: ' + data.message;
  window.open('https://wa.me/919831344068?text=' + encodeURIComponent(text), '_blank');
}

function sendEmail() {
  if (!validateForm()) return;
  var data = getFormData();
  var subject = 'New enquiry from ' + (data.name || 'website visitor');
  var body = '';
  if (data.name) body += 'Name: ' + data.name + '\n';
  if (data.email) body += 'Email: ' + data.email + '\n';
  if (data.phone) body += 'Phone: ' + data.phone + '\n';
  if (data.message) body += '\nMessage:\n' + data.message;
  window.location.href = 'mailto:brandantidote20@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

document.addEventListener('DOMContentLoaded', function () {

  forceRedText();
  forceTestimonialText();

  // --- LOADING SCREEN ---
  const loadingScreen = document.getElementById('loading-screen');
  const loadingLogo = document.getElementById('loading-logo');
  const loadingBar = document.getElementById('loading-bar');
  const loadingText = document.getElementById('loading-text');

  requestAnimationFrame(function () {
    loadingLogo.style.opacity = '1';
    loadingLogo.style.transform = 'translateY(0)';
  });

  setTimeout(function () {
    loadingBar.style.width = '180px';
  }, 50);

  setTimeout(function () {
    loadingText.style.opacity = '1';
  }, 400);

  setTimeout(function () {
    loadingScreen.style.opacity = '0';
    setTimeout(function () {
      loadingScreen.style.display = 'none';
      document.getElementById('header').style.transform = 'translateY(0)';
      document.querySelectorAll('#hero .reveal, #scroll-indicator').forEach(function (el, i) {
        setTimeout(function () {
          el.classList.add('visible');
        }, i * 100 + 200);
      });
      createFloatingShapes();
    }, 600);
  }, 2000);

  // --- FLOATING SHAPES ---
  function createFloatingShapes() {
    var container = document.getElementById('floating-shapes');
    var symbols = ['◉', '◆', '⬡', '◈', '◎', '◇', '✦', '○'];
    var sizes = [30, 40, 50, 35, 45, 55];

    symbols.forEach(function (sym, i) {
      var el = document.createElement('span');
      el.className = 'floating-shape';
      el.textContent = sym;
      var size = sizes[i % sizes.length];
      el.style.fontSize = size + 'px';
      el.style.left = (15 + Math.random() * 70) + '%';
      el.style.top = (10 + Math.random() * 80) + '%';
      el.style.animation = 'float ' + (6 + Math.random() * 6) + 's ease-in-out ' + (i * 0.5) + 's infinite';
      container.appendChild(el);
    });
  }

  // --- HEADER SCROLL ---
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header.classList.add('glass', 'border-b', 'border-black/[0.04]');
      header.style.background = 'rgba(255,255,255,0.8)';
    } else {
      header.classList.remove('glass', 'border-b', 'border-black/[0.04]');
      header.style.background = 'transparent';
    }
  });

  // --- MOBILE MENU ---
  var mobileBtn = document.getElementById('mobile-menu-btn');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileBackdrop = document.getElementById('mobile-backdrop');
  var mobileCloseBtn = document.getElementById('mobile-close-btn');
  var menuLines = mobileBtn.querySelectorAll('.mobile-menu-line');
  var menuOpen = false;

  function openMenu() {
    menuOpen = true;
    document.documentElement.classList.add('no-scroll');
    mobileNav.classList.add('open');
    mobileNav.style.pointerEvents = 'all';
    menuLines[0].style.transform = 'rotate(45deg) translateY(6.5px)';
    menuLines[1].style.opacity = '0';
    menuLines[2].style.transform = 'rotate(-45deg) translateY(-6.5px)';
    document.querySelectorAll('.mobile-nav-item').forEach(function(el, i) {
      el.style.transitionDelay = (0.4 + i * 0.08) + 's';
    });
  }

  function closeMenu() {
    menuOpen = false;
    document.documentElement.classList.remove('no-scroll');
    document.querySelectorAll('.mobile-nav-item').forEach(function(el) {
      el.style.transitionDelay = '0s';
    });
    mobileNav.classList.remove('open');
    mobileNav.style.pointerEvents = 'none';
    menuLines[0].style.transform = 'rotate(0) translate(0, 0)';
    menuLines[1].style.opacity = '1';
    menuLines[2].style.transform = 'rotate(0) translate(0, 0)';
  }

  mobileBtn.addEventListener('click', function () {
    menuOpen ? closeMenu() : openMenu();
  });

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMenu);
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMenu);
  }

  document.querySelectorAll('.mobile-nav-item').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  // --- SCROLL REVEAL ---
  var revealElements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(function (el) {
    if (!el.closest('#hero')) {
      revealObserver.observe(el);
    }
  });

  // --- COUNTER ANIMATION ---
  var counterValues = document.querySelectorAll('.counter-value');
  var countersAnimated = false;

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counterObserver.disconnect();
        counterValues.forEach(function (counter) {
          var target = parseInt(counter.dataset.target);
          var suffix = counter.dataset.suffix || '';
          animateCounter(counter, target, suffix);
        });
      }
    });
  }, { threshold: 0.5 });

  counterValues.forEach(function (el) { counterObserver.observe(el); });

  function animateCounter(element, target, suffix) {
    var current = 0;
    var duration = 2000;
    var stepTime = Math.max(16, Math.floor(duration / target));
    var increment = Math.max(1, Math.floor(target / (duration / 16)));

    var timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current + suffix;
    }, stepTime);
  }

  // --- BUTTON RIPPLE ---
  document.querySelectorAll('.magnetic-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      var rect = this.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });

  // --- MAGNETIC BUTTONS ---
  document.querySelectorAll('.magnetic-btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = this.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform = 'translate(0, 0)';
    });
  });

  // --- PARALLAX ---
  var parallaxItems = document.querySelectorAll('.parallax-item');
  window.addEventListener('mousemove', function (e) {
    var x = (e.clientX / window.innerWidth - 0.5) * 10;
    var y = (e.clientY / window.innerHeight - 0.5) * 10;
    parallaxItems.forEach(function (item, i) {
      var speed = (i + 1) * 0.5;
      item.style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed) + 'px)';
    });
  });

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      var target = document.querySelector(targetId);
      if (target) {
        var headerOffset = 80;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        smoothScrollTo(targetPosition, 1000);
      }
    });
  });

  function smoothScrollTo(targetY, duration) {
    var startY = window.scrollY;
    var diff = targetY - startY;
    var startTime = null;

    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startY + diff * ease);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // --- TESTIMONIAL MARQUEE DUPLICATION ---
  var marquee = document.getElementById('testimonial-marquee');
  if (marquee) {
    var cards = marquee.querySelectorAll(':scope > div');
    cards.forEach(function (card) {
      var clone = card.cloneNode(true);
      marquee.appendChild(clone);
    });
  }

  // --- ACTIVE NAV LINK ---
  var sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    var current = '';
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.classList.remove('text-[#111]');
      if (document.documentElement.classList.contains('dark')) {
        link.style.color = '#f0f0f0';
        if (link.getAttribute('href') === '#' + current) {
          link.style.color = '#fff';
        }
      } else {
        link.style.color = '#666';
        if (link.getAttribute('href') === '#' + current) {
          link.style.color = '#111';
        }
      }
    });
    document.querySelectorAll('.mobile-nav-item').forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

});
