/* =========================================================
   Site interactions: sticky header, mobile menu, FAQ accordion,
   contact form (mailto), active nav highlight
   ========================================================= */
(function () {
  document.addEventListener('DOMContentLoaded', function () {

    /* Sticky header shadow */
    var header = document.getElementById('siteHeader');
    function onScroll() {
      if (window.scrollY > 10) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Mobile menu */
    var menuToggle = document.getElementById('menuToggle');
    var nav = document.getElementById('mainNav');
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', function () {
        nav.classList.toggle('open');
      });
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { nav.classList.remove('open'); });
      });
    }

    /* FAQ accordion */
    var faqs = document.querySelectorAll('.faq-item');
    faqs.forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        faqs.forEach(function (other) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });

    /* Contact form -> mailto */
    var form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = form.name.value.trim();
        var email = form.email.value.trim();
        var company = form.company.value.trim();
        var message = form.message.value.trim();
        var subject = encodeURIComponent('Inquiry from ' + (name || 'Website'));
        var body = encodeURIComponent(
          'Name: ' + name + '\n' +
          'Email: ' + email + '\n' +
          'Company: ' + company + '\n\n' +
          message
        );
        window.location.href = 'mailto:reep@163.com?subject=' + subject + '&body=' + body;
      });
    }

    /* Active nav highlight on scroll */
    var sections = document.querySelectorAll('section[id]');
    var navLinks = nav ? nav.querySelectorAll('a') : [];
    if (sections.length && navLinks.length) {
      window.addEventListener('scroll', function () {
        var pos = window.scrollY + 120;
        var current = '';
        sections.forEach(function (s) {
          if (s.offsetTop <= pos) current = s.getAttribute('id');
        });
        navLinks.forEach(function (l) {
          l.style.color = '';
          if (l.getAttribute('href') === '#' + current) {
            l.style.color = '#fff';
          }
        });
      }, { passive: true });
    }
  });
})();
