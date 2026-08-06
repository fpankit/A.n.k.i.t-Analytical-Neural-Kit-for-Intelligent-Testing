// Ankit AI Agency Landing Page Interactions

document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect (rAF-throttled) ---
  const header = document.getElementById('header');
  
  let scrollTicking = false;
  const handleScroll = () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 20);
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run once in case user starts scrolled down

  // --- Mobile Navigation Menu ---
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const toggleMobileNav = () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  };
  
  mobileToggle.addEventListener('click', toggleMobileNav);
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileNav();
      }
    });
  });

  // --- Card Mouse Tracker Glow Effect ---
  // Tracks mouse coordinate overlays for service and testimonial card elements
  const cards = document.querySelectorAll('.testimonial-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --- Hide "Built with Spline" Watermark Badge ---
  const hideAllSplineLogos = (root) => {
    if (!root) return;
    // Try multiple selector strategies
    const selectors = [
      '#logo', '.logo', '#spline-logo',
      'a[href*="spline.design"]',
      'a[href*="spline"]',
      '[class*="logo"]', '[id*="logo"]',
    ];
    selectors.forEach(sel => {
      try {
        root.querySelectorAll(sel).forEach(el => {
          el.style.cssText = 'display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;width:0!important;height:0!important;overflow:hidden!important;';
        });
      } catch(e) { /* ignore */ }
    });
    // Also scan all elements for "Built with Spline" text
    try {
      root.querySelectorAll('*').forEach(el => {
        if (el.textContent && el.textContent.includes('Built with Spline') && el.children.length === 0) {
          // Walk up to the badge container and hide it
          let target = el.closest('a') || el.closest('[class*="logo"]') || el.parentElement || el;
          target.style.cssText = 'display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;width:0!important;height:0!important;overflow:hidden!important;';
        }
      });
    } catch(e) { /* ignore */ }
  };

  const splineViewers = document.querySelectorAll('spline-viewer');
  splineViewers.forEach(splineViewer => {
    const hideSplineLogo = () => {
      // Check shadow root
      if (splineViewer.shadowRoot) {
        hideAllSplineLogos(splineViewer.shadowRoot);
      }
      // Also check direct children (some versions render outside shadow DOM)
      hideAllSplineLogos(splineViewer);
    };

    splineViewer.addEventListener('load', hideSplineLogo);

    // Lightweight polling: check every 250ms for ~6 seconds
    let checks = 0;
    const interval = setInterval(() => {
      hideSplineLogo();
      checks++;
      if (checks > 24) clearInterval(interval);
    }, 250);
  });

  // --- Mobile Spline Touch & Auto-Animation ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile && !isTouchDevice && !prefersReducedMotion) {
    // Non-touch mobile: random pop-in/pop-out + drift animation on spline viewers
    const splineStyle = document.createElement('style');
    splineStyle.textContent = `
      @keyframes splinePopDrift {
        0%   { transform: scale(0.7)  translate(0, 0)     rotate(0deg);   opacity: 0.4; }
        8%   { transform: scale(1.05) translate(5px, -8px)  rotate(1deg);   opacity: 1;   }
        16%  { transform: scale(0.85) translate(-3px, 6px)  rotate(-0.5deg); opacity: 0.6; }
        24%  { transform: scale(1.1)  translate(8px, 4px)   rotate(2deg);   opacity: 1;   }
        32%  { transform: scale(0.75) translate(-6px, -4px) rotate(-1deg);  opacity: 0.5; }
        40%  { transform: scale(1.08) translate(4px, -10px) rotate(1.5deg); opacity: 1;   }
        48%  { transform: scale(0.8)  translate(-8px, 5px)  rotate(-2deg);  opacity: 0.55;}
        56%  { transform: scale(1.12) translate(6px, -6px)  rotate(0.5deg); opacity: 1;   }
        64%  { transform: scale(0.7)  translate(-4px, 8px)  rotate(-1.5deg);opacity: 0.4; }
        72%  { transform: scale(1.05) translate(7px, 2px)   rotate(1deg);   opacity: 1;   }
        80%  { transform: scale(0.82) translate(-5px, -6px) rotate(-0.5deg);opacity: 0.6; }
        88%  { transform: scale(1.1)  translate(3px, 7px)   rotate(2deg);   opacity: 1;   }
        100% { transform: scale(0.7)  translate(0, 0)       rotate(0deg);   opacity: 0.4; }
      }
      .hero-3d-container spline-viewer {
        animation: splinePopDrift 16s ease-in-out infinite;
      }
      .about-3d-container spline-viewer {
        animation: splinePopDrift 20s ease-in-out infinite 4s;
      }
    `;
    document.head.appendChild(splineStyle);

    // Also add a subtle random position shift via JS for more organic feel
    document.querySelectorAll('.hero-3d-container spline-viewer, .about-3d-container spline-viewer').forEach(viewer => {
      const randomShift = () => {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 16;
        viewer.style.marginLeft = x + 'px';
        viewer.style.marginTop = y + 'px';
        setTimeout(randomShift, 2000 + Math.random() * 3000);
      };
      randomShift();
    });
  } else if (isMobile && isTouchDevice) {
    // Touch mobile: ensure viewers respond to touch
    document.querySelectorAll('spline-viewer').forEach(viewer => {
      viewer.style.touchAction = 'none';
      viewer.style.pointerEvents = 'auto';
    });
  }

  // --- Spline runtime loading ---
  // The Spline runtime (596KB JS + 182KB wasm) plus the 1.2MB scene are the
  // heaviest assets on the page. Phones don't run WebGL at all (the viewer is
  // hidden via CSS for guaranteed smoothness), so we never download the runtime
  // there. Desktop loads it right away for a fast, interactive hero.
  const needsSpline = !!document.querySelector('spline-viewer');

  const loadSplineRuntime = () => {
    if (document.querySelector('script[src*="spline-viewer.js"]')) return;
    const head = document.head;
    const mkLink = (rel, href, attrs) => {
      const l = document.createElement('link');
      l.rel = rel;
      l.href = href;
      if (attrs) Object.keys(attrs).forEach(k => l.setAttribute(k, attrs[k]));
      head.appendChild(l);
      return l;
    };
    mkLink('preconnect', 'https://prod.spline.design', { crossorigin: '' });
    mkLink('preconnect', 'https://unpkg.com', { crossorigin: '' });
    mkLink('preload', 'https://prod.spline.design/4IwzGcC1Bo3ZCSX2/scene.splinecode', { as: 'fetch', crossorigin: 'anonymous' });
    const s = document.createElement('script');
    s.type = 'module';
    s.src = 'https://unpkg.com/@splinetool/viewer@1.9.0/build/spline-viewer.js';
    s.async = true;
    head.appendChild(s);
  };

  if (needsSpline && !isMobile) {
    loadSplineRuntime();
  }

  // --- Spline Performance Manager ---
  // Continuous full-screen WebGL animation is the #1 jank source. Strategy:
  //   1. Load the scene ONCE and keep it loaded forever (no `unloadable`), so it
  //      never reloads/re-animates when scrolled back into view.
  //   2. After the first frame renders, freeze the scene permanently — the last
  //      rendered frame stays on screen ("saved state").
  //   3. Only play() while the user is actively interacting with the viewer
  //      (drag/touch); re-freeze a few seconds after they stop.
  //   4. On phones, additionally render the canvas at 1x device pixels.
  const splineApps = () => Array.from(document.querySelectorAll('spline-viewer'))
    .map(v => v._spline || v._runtime || v._splineApp || null)
    .filter(Boolean);

  const capCanvasResolution = (viewer) => {
    // Direct, API-independent resolution cap (works even if the runtime handle
    // is unreachable). Cuts GPU fill cost by ~4-6x on high-DPI phones.
    const canvas = viewer.shadowRoot && viewer.shadowRoot.querySelector('canvas');
    if (canvas && canvas.clientWidth && canvas.clientHeight) {
      canvas.width = Math.round(canvas.clientWidth);
      canvas.height = Math.round(canvas.clientHeight);
    }
  };

  const freezeSplines = () => {
    splineApps().forEach(app => {
      try { if (!app.isStopped) app.stop(); } catch (e) { /* ignore */ }
    });
  };

  document.querySelectorAll('spline-viewer').forEach(viewer => {
    const getApp = () => viewer._spline || viewer._runtime || viewer._splineApp || null;

    const freeze = () => {
      if (isMobile) capCanvasResolution(viewer);
      const app = getApp();
      if (!app) return;
      try { if (!app.isStopped) app.stop(); } catch (e) { /* ignore */ }
    };

    const thaw = () => {
      const app = getApp();
      if (!app) return;
      try { app.play(); } catch (e) { /* ignore */ }
    };

    let idleTimer = null;
    const resumeIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(freeze, 2500);
    };

    // First frame rendered → freeze it permanently (saved state).
    viewer.addEventListener('load', freeze);
    if (isMobile) window.addEventListener('resize', () => capCanvasResolution(viewer), { passive: true });

    // Animate only while directly interacting; re-freeze shortly after.
    viewer.addEventListener('pointerdown', thaw);
    viewer.addEventListener('pointermove', (e) => { if (e.buttons > 0) thaw(); });
    viewer.addEventListener('pointerup', resumeIdle);
    viewer.addEventListener('pointercancel', resumeIdle);
    viewer.addEventListener('pointerleave', resumeIdle);
  });

  // Freeze during scroll; do NOT resume — scenes stay frozen until interaction.
  let scrollRaf = null;
  window.addEventListener('scroll', () => {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(() => {
      scrollRaf = null;
      freezeSplines();
    });
  }, { passive: true });

  // --- Block LinkedIn links baked into Spline scene hotspots ---
  const isLinkedInUrl = (u) => typeof u === 'string' && /linkedin\.com/i.test(u);
  const originalWindowOpen = window.open;
  window.open = function (url, ...rest) {
    if (isLinkedInUrl(url)) return null;
    return originalWindowOpen.apply(this, arguments);
  };
  document.addEventListener('click', (e) => {
    const link = e.target && e.target.closest ? e.target.closest('a') : null;
    if (link && isLinkedInUrl(link.href)) e.preventDefault();
  }, true);

  // Global MutationObserver to catch any late-rendered Spline badges
  const globalSplineObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.tagName === 'SPLINE-VIEWER' || node.querySelector?.('spline-viewer')) {
            setTimeout(() => {
              if (node.shadowRoot) hideAllSplineLogos(node.shadowRoot);
              hideAllSplineLogos(node);
              node.querySelectorAll?.('spline-viewer').forEach(sv => {
                if (sv.shadowRoot) hideAllSplineLogos(sv.shadowRoot);
              });
            }, 200);
          }
          // Also check if this node contains "Built with Spline" text
          if (node.textContent?.includes('Built with Spline')) {
            const badge = node.closest?.('a') || node.closest?.('[class*="logo"]') || node;
            if (badge && badge.style) {
              badge.style.cssText = 'display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;width:0!important;height:0!important;overflow:hidden!important;';
            }
          }
        }
      });
    });
  });
  globalSplineObserver.observe(document.body, { childList: true, subtree: true });

  // --- Stagger Testimonials Carousel ---
  const testimonialsContainer = document.getElementById('stagger-testimonials-container');
  if (testimonialsContainer) {
    const testimonialsData = [
      {
        testimonial: "Our order management used to eat up entire evenings. ANKIT automated it end to end, and now we handle the same workload in half the time.",
        by: "Rajesh Sharma, Founder at Sharma Textiles, Ludhiana",
      },
      {
        testimonial: "They built our booking system and a follow-up bot. Patients love it, and my front desk finally got their Sundays back.",
        by: "Priya Nair, Owner at Nair's Ayurvedic Clinic, Kochi",
      },
      {
        testimonial: "The automation agents handle our vendor invoices and material tracking. Mistakes have dropped dramatically, and we finally see real numbers.",
        by: "Amit Verma, Director at Verma Construction, Jaipur",
      },
      {
        testimonial: "Our website went from a static page to a proper online ordering system. Delivery enquiries doubled in the very first month.",
        by: "Sunita Gupta, Proprietor at Gupta Sweets & Snacks, Delhi",
      },
      {
        testimonial: "Lead follow-up is fully automated now. We qualify every enquiry within minutes and closed more deals last quarter than ever before.",
        by: "Vikram Malhotra, Managing Partner at Malhotra Realty, Mumbai",
      },
      {
        testimonial: "The dashboard they designed is so simple. I can see daily sales and supplier costs at a glance, no technical background needed.",
        by: "Anjali Deshpande, Co-founder at Deshpande Foods, Pune",
      }
    ];

    let list = [...testimonialsData];
    let cardSize = window.matchMedia("(min-width: 640px)").matches ? 365 : 290;

    // Track card elements mapping
    let cardElements = [];

    // Create cards in DOM once
    const initTestimonials = () => {
      testimonialsContainer.innerHTML = '';
      cardElements = testimonialsData.map((t) => {
        const card = document.createElement('div');
        card.className = 'stagger-card';
        card.innerHTML = `
          <span class="card-diagonal-line"></span>
          <div class="author-img">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h3 class="testimonial-text">"${t.testimonial}"</h3>
          <div class="testimonial-author">
            <span class="author-name">${t.by.split(',')[0]}</span>
            <span class="author-title">${t.by.split(',').slice(1).join(',')}</span>
          </div>
        `;
        
        card.addEventListener('click', () => {
          const currentPos = list.indexOf(t) - (list.length / 2); // Center is at half the list
          if (currentPos !== 0) {
            handleMove(currentPos);
          }
        });
        
        testimonialsContainer.appendChild(card);
        return { element: card, data: t };
      });
    };

    // Shift array items and update styles
    const handleMove = (steps) => {
      if (steps > 0) {
        for (let i = 0; i < steps; i++) {
          const item = list.shift();
          list.push(item);
        }
      } else {
        for (let i = 0; i < -steps; i++) {
          const item = list.pop();
          list.unshift(item);
        }
      }
      renderTestimonials();
    };

    const renderTestimonials = () => {
      const half = list.length / 2;
      cardElements.forEach((item) => {
        const index = list.indexOf(item.data);
        const position = index - half;
        const isCenter = position === 0;
        
        const element = item.element;
        
        if (isCenter) {
          element.classList.add('center-active');
        } else {
          element.classList.remove('center-active');
        }
        
        // Calculate offset transforms
        const translateX = (cardSize / 1.5) * position;
        const translateY = isCenter ? -65 : (position % 2 !== 0 ? 15 : -15);
        const rotate = isCenter ? 0 : (position % 2 !== 0 ? 2.5 : -2.5);
        
        element.style.transform = `
          translate(-50%, -50%) 
          translateX(${translateX}px)
          translateY(${translateY}px)
          rotate(${rotate}deg)
        `;
        element.style.zIndex = isCenter ? '10' : '0';
        
        // Hide elements far from view to optimize DOM paint
        if (position < -3 || position > 3) {
          element.style.opacity = '0';
          element.style.pointerEvents = 'none';
          element.style.visibility = 'hidden';
        } else {
          element.style.opacity = isCenter ? '1' : '0.5';
          element.style.pointerEvents = 'auto';
          element.style.visibility = 'visible';
        }
      });
    };

    // Nav triggers
    const prevBtn = document.getElementById('prev-testimonial-btn');
    const nextBtn = document.getElementById('next-testimonial-btn');

    if (prevBtn) prevBtn.addEventListener('click', () => handleMove(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => handleMove(1));

    window.addEventListener('resize', () => {
      cardSize = window.matchMedia("(min-width: 640px)").matches ? 365 : 290;
      renderTestimonials();
    });

    initTestimonials();
    renderTestimonials();
  }

  // --- Contact Form Submission (Formspree) ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.form-submit-btn');
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;

      // Set loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Collect form data as JSON (Formspree expects JSON or URL-encoded)
      const formData = {
        name: contactForm.querySelector('[name="name"]')?.value || '',
        email: contactForm.querySelector('[name="email"]')?.value || '',
        phone: contactForm.querySelector('[name="phone"]')?.value || '',
        message: contactForm.querySelector('[name="message"]')?.value || '',
      };

      try {
        const response = await fetch('https://formspree.io/f/xvkpolpb', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Success
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.backgroundColor = '#10b981';
          submitBtn.style.color = '#ffffff';
          contactForm.reset();

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.color = '';
            submitBtn.disabled = false;
          }, 3000);
        } else {
          // Formspree returned an error
          const data = await response.json().catch(() => ({}));
          const errorMsg = (data.errors && data.errors.length > 0)
            ? data.errors.map(err => err.message).join(', ')
            : 'Something went wrong. Please try again.';

          submitBtn.textContent = errorMsg;
          submitBtn.style.backgroundColor = '#ef4444'; // Red error
          submitBtn.style.color = '#ffffff';

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.color = '';
            submitBtn.disabled = false;
          }, 4000);
        }
      } catch (err) {
        // Network error
        submitBtn.textContent = 'Network error. Try again.';
        submitBtn.style.backgroundColor = '#ef4444';
        submitBtn.style.color = '#ffffff';

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 4000);
      }
    });
  }

  // --- FAQ Accordion & Tab Switching ---
  const faqTabBtns = document.querySelectorAll('.faq-tab-btn');
  const faqLists = document.querySelectorAll('.faq-list');

  faqTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      faqTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      faqLists.forEach(list => {
        list.classList.remove('active');
      });

      const targetCategory = btn.getAttribute('data-category');
      const targetList = document.getElementById(`faq-list-${targetCategory}`);
      if (targetList) {
        targetList.classList.add('active');
      }
    });
  });

  // Accordion toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other items
      const siblingItems = item.parentElement.querySelectorAll('.faq-item');
      siblingItems.forEach(sib => {
        if (sib !== item) {
          sib.classList.remove('open');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });
});
