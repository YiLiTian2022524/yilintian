/* ============================================
   云南易林田经贸有限公司 - 网站交互脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ---------- 导航栏滚动效果 ----------
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // ---------- 移动端菜单 ----------
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---------- 导航高亮 ----------
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // ---------- 滚动入场动画 ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- 联系表单 ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => { data[key] = value; });

      const submitBtn = this.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '发送中...';
      submitBtn.disabled = true;

      // 模拟发送（实际使用时可替换为真实API）
      setTimeout(() => {
        // 显示成功提示
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
          margin-top: 16px;
          padding: 14px 20px;
          background: #F0FFF4;
          border: 1px solid #C6F6D5;
          border-radius: 8px;
          color: #276749;
          font-size: 14px;
          text-align: center;
        `;
        successMsg.textContent = '✓ 留言已提交成功，我们将尽快与您联系！';

        const oldMsg = this.querySelector('.form-success');
        if (oldMsg) oldMsg.remove();
        successMsg.classList.add('form-success');
        this.appendChild(successMsg);

        // 重置表单
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // 自动消失
        setTimeout(() => {
          successMsg.style.opacity = '0';
          successMsg.style.transition = 'opacity 0.5s ease';
          setTimeout(() => successMsg.remove(), 500);
        }, 5000);
      }, 800);
    });
  }

  // ---------- 统计数据动效 ----------
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    if (!target) return;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString();
    }, 16);
  }

  const statNumbers = document.querySelectorAll('.stat-number .num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

  // ---------- 平滑滚动（兼容） ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
