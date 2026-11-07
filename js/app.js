/**
 * Salman Alharbi — Modular Portfolio Controller & Scroll-Driven Journey Engine
 * Token-optimized: Externalized from index.html, zero Base64 blobs, direct static PDF links.
 */
(function () {
  'use strict';

  var translations = window.PORTFOLIO_TRANSLATIONS || { en: {}, ar: {} };
  var projectDetails = window.PORTFOLIO_PROJECTS || {};

  // ===== DUAL CV DROPDOWN & STATIC PDF DOWNLOADER =====
  window.closeAllCvDropdowns = function () {
    document.querySelectorAll('.cv-dropdown-wrap.open').forEach(function (wrap) {
      wrap.classList.remove('open');
      var btn = wrap.querySelector('button[aria-haspopup]');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  };

  window.toggleCvDropdown = function (wrapId, e) {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    var wrap = document.getElementById(wrapId);
    if (!wrap) return;
    var wasOpen = wrap.classList.contains('open');
    window.closeAllCvDropdowns();
    if (!wasOpen) {
      wrap.classList.add('open');
      var btn = wrap.querySelector('button[aria-haspopup]');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }
  };

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.cv-dropdown-wrap')) {
      window.closeAllCvDropdowns();
    }
  });

  window.downloadSalmanCV = function (e, track) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    window.closeAllCvDropdowns();

    var selectedTrack = track === 'technical' ? 'technical' : 'governance';
    var fileName =
      selectedTrack === 'technical'
        ? 'Salman_Alharbi_Data_Science_AI_CV.pdf'
        : 'SALMAN-ALHARBI-Resume.pdf';

    var a = document.createElement('a');
    a.href = './' + fileName;
    a.download = fileName;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      if (a.parentNode) document.body.removeChild(a);
    }, 300);
    return false;
  };

  // ===== STATE & MODAL CONTROLLER =====
  var currentLang = 'en';
  var activeProjectId = null;
  var lastFocusedElement = null;
  var activeLens = null;

  function renderModalContent(projectId) {
    if (!projectId || !projectDetails[projectId]) return;
    var data = projectDetails[projectId][currentLang];
    if (!data) return;

    document.getElementById('modalPeriod').textContent = data.kicker;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalArchLabel').textContent = data.archLabel;
    document.getElementById('modalChallengesLabel').textContent = data.challengesLabel;
    document.getElementById('modalOutcomesLabel').textContent = data.outcomesLabel;
    document.getElementById('modalStackLabel').textContent = data.stackLabel;

    // Render metrics
    var metricsContainer = document.getElementById('modalMetrics');
    metricsContainer.innerHTML = '';
    data.metrics.forEach(function (m) {
      var item = document.createElement('div');
      item.className = 'metric-item';
      item.innerHTML =
        '<div class="metric-value">' + m.value + '</div><div class="metric-label">' + m.label + '</div>';
      metricsContainer.appendChild(item);
    });

    // Render Visual Financial Report Simulator Card (for Project 1: Insurance)
    var finReportContainer = document.getElementById('modalFinancialReportContainer');
    if (finReportContainer) {
      if (data.financialReport) {
        var fr = data.financialReport;
        var rowsHtml = '';
        fr.rows.forEach(function (r) {
          rowsHtml +=
            '<tr>' +
            '<td><span class="part-dot"></span><strong>' + r.part + '</strong></td>' +
            '<td style="color:#9ca3af;">' + r.status + '</td>' +
            '<td class="fin-cost-cell">' + r.cost + '</td>' +
            '</tr>';
        });
        finReportContainer.innerHTML =
          '<div class="fin-report-card">' +
          '<div class="fin-report-top">' +
          '<div class="fin-report-heading">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' +
          '<span>' + fr.heading + '</span>' +
          '</div>' +
          '<span class="fin-report-badge">' + fr.badge + '</span>' +
          '</div>' +
          '<div class="fin-report-body">' +
          '<div class="fin-vehicle-meta">' +
          '<div class="fin-meta-box">' +
          '<div class="fin-meta-label">' + fr.metaVehicleLabel + '</div>' +
          '<div class="fin-meta-val">' + fr.metaVehicleVal + '</div>' +
          '</div>' +
          '<div class="fin-meta-box">' +
          '<div class="fin-meta-label">' + fr.metaSeverityLabel + '</div>' +
          '<div class="fin-meta-val"><span class="severity-pill-severe">● ' + fr.metaSeverityVal + '</span></div>' +
          '</div>' +
          '<div class="fin-meta-box">' +
          '<div class="fin-meta-label">' + fr.metaPipelineLabel + '</div>' +
          '<div class="fin-meta-val" style="color:var(--accent);">' + fr.metaPipelineVal + '</div>' +
          '</div>' +
          '</div>' +
          '<table class="fin-items-table">' +
          '<thead>' +
          '<tr>' +
          '<th>' + fr.colPart + '</th>' +
          '<th>' + fr.colStatus + '</th>' +
          '<th style="text-align:end;">' + fr.colCost + '</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
          '</table>' +
          '<div class="fin-total-bar">' +
          '<span class="fin-total-label">' + fr.totalLabel + '</span>' +
          '<span class="fin-total-amount">' + fr.totalValue + '</span>' +
          '</div>' +
          '</div>' +
          '</div>';
      } else {
        finReportContainer.innerHTML = '';
      }
    }

    // Render Architecture list
    var archList = document.getElementById('modalArchList');
    archList.innerHTML = '';
    data.architecture.forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      archList.appendChild(li);
    });

    // Render Challenges list
    var challengesList = document.getElementById('modalChallengesList');
    challengesList.innerHTML = '';
    data.challenges.forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      challengesList.appendChild(li);
    });

    // Render Outcomes list
    var outcomesList = document.getElementById('modalOutcomesList');
    outcomesList.innerHTML = '';
    data.outcomes.forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      outcomesList.appendChild(li);
    });

    // Render Tags
    var tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = '';
    data.tags.forEach(function (tag) {
      var span = document.createElement('span');
      span.className = 'tag-item';
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });
  }

  function openModal(projectId, triggerElement) {
    activeProjectId = projectId;
    lastFocusedElement = triggerElement || document.activeElement;
    renderModalContent(projectId);
    var modal = document.getElementById('projectModal');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    var modal = document.getElementById('projectModal');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeProjectId = null;
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // Modal Triggers
  var projectCards = document.querySelectorAll('.project-card[data-project]');
  projectCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var pid = this.getAttribute('data-project');
      openModal(pid, this);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var pid = this.getAttribute('data-project');
        openModal(pid, this);
      }
    });
  });

  // Modal Close Handlers
  var modalCloseBtn = document.getElementById('modalCloseBtn');
  var modalDismissBtn = document.getElementById('modalDismissBtn');
  var modalOverlay = document.getElementById('projectModal');

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeAllCvDropdowns();
      var modal = document.getElementById('projectModal');
      if (modal && modal.classList.contains('open')) {
        closeModal();
      }
    }
  });

  // ===== PROFESSIONAL LENS SWITCHER CONTROLLER =====
  var lensModeBtns = document.querySelectorAll('.lens-mode-btn[data-lens]');
  var lensResetBtn = document.getElementById('lensResetBtn');
  var lensStatusBanner = document.getElementById('lensStatusBanner');
  var lensStatusMessage = document.getElementById('lensStatusMessage');

  function updateLensStatusText() {
    if (!activeLens || !lensStatusMessage) return;
    var msgKey = 'lens_msg_' + activeLens;
    if (translations[currentLang] && translations[currentLang][msgKey]) {
      lensStatusMessage.textContent = translations[currentLang][msgKey];
    }
  }

  function applyLens(lens) {
    if (activeLens === lens) {
      lens = null;
    }
    activeLens = lens;

    lensModeBtns.forEach(function (btn) {
      var isMatch = btn.getAttribute('data-lens') === activeLens;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });

    if (lensResetBtn) {
      lensResetBtn.classList.toggle('visible', !!activeLens);
    }
    if (lensStatusBanner) {
      lensStatusBanner.classList.toggle('visible', !!activeLens);
    }

    if (activeLens) {
      document.querySelectorAll('.skill-category-card').forEach(function (c) {
        c.classList.remove('hidden');
      });
      document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-filter') === 'all');
      });
    }

    var taggedElements = document.querySelectorAll('[data-lens-tags]');
    taggedElements.forEach(function (el) {
      if (!activeLens) {
        el.classList.remove('lens-highlighted', 'lens-dimmed');
        return;
      }
      var tags = (el.getAttribute('data-lens-tags') || '').split(/\s+/);
      if (tags.indexOf(activeLens) !== -1) {
        el.classList.add('lens-highlighted');
        el.classList.remove('lens-dimmed');
      } else {
        el.classList.remove('lens-highlighted');
        el.classList.add('lens-dimmed');
      }
    });

    updateLensStatusText();
  }

  lensModeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLens(this.getAttribute('data-lens'));
    });
  });

  if (lensResetBtn) {
    lensResetBtn.addEventListener('click', function () {
      applyLens(null);
    });
  }

  // ===== SOVEREIGN AI & OPERATIONAL ROI CALCULATOR =====
  var simRecordsSlider = document.getElementById('simRecordsSlider');
  var simTeamSlider = document.getElementById('simTeamSlider');
  var simRecordsValueDisplay = document.getElementById('simRecordsValueDisplay');
  var simTeamValueDisplay = document.getElementById('simTeamValueDisplay');
  var simDecisionCounter = document.getElementById('simDecisionCounter');
  var simDecisionSub = document.getElementById('simDecisionSub');
  var simHoursCounter = document.getElementById('simHoursCounter');
  var simHoursSub = document.getElementById('simHoursSub');

  function updateRoiSimulator() {
    if (!simRecordsSlider || !simTeamSlider) return;
    var records = parseInt(simRecordsSlider.value, 10) || 250000;
    var team = parseInt(simTeamSlider.value, 10) || 8;

    var baseTeamHours = team * 42;
    var volumeBonusHours = Math.round((records / 10000) * (3.2 + team * 0.35));
    var totalMonthlyHoursSaved = baseTeamHours + volumeBonusHours;

    var manualCycleHours = Math.max(2, Math.round((records / 25000) * 1.4 + (16 - team) * 0.3));

    var formattedRecords = records.toLocaleString('en-US');
    var formattedHours = totalMonthlyHoursSaved.toLocaleString('en-US');

    if (currentLang === 'ar') {
      if (simRecordsValueDisplay) simRecordsValueDisplay.textContent = formattedRecords + ' سجل';
      if (simTeamValueDisplay) {
        simTeamValueDisplay.textContent =
          team === 1 ? 'محلل واحد' : team === 2 ? 'محللان (2)' : team + ' محللين';
      }
      if (simDecisionCounter) simDecisionCounter.textContent = '< 5 ثوانٍ';
      if (simDecisionSub) {
        simDecisionSub.textContent =
          'تقليص زمن المراجعة من ~' + manualCycleHours + ' ساعة عمل يدوي إلى أقل من 5 ثوانٍ';
      }
      if (simHoursCounter) simHoursCounter.textContent = formattedHours + ' ساعة/شهرياً';
      if (simHoursSub) {
        simHoursSub.textContent =
          'توفير مباشر لفريق مكون من ' + team + ' محللين لمعالجة ' + formattedRecords + ' سجل';
      }
    } else {
      if (simRecordsValueDisplay) simRecordsValueDisplay.textContent = formattedRecords + ' Records';
      if (simTeamValueDisplay) {
        simTeamValueDisplay.textContent = team + (team === 1 ? ' Analyst' : ' Analysts');
      }
      if (simDecisionCounter) simDecisionCounter.textContent = '< 5 sec';
      if (simDecisionSub) {
        simDecisionSub.textContent =
          'Compressed from ~' + manualCycleHours + ' hrs of manual review to < 5 seconds via Local LLMs';
      }
      if (simHoursCounter) simHoursCounter.textContent = formattedHours + ' hrs/mo';
      if (simHoursSub) {
        simHoursSub.textContent =
          'Saved across ' +
          team +
          (team === 1 ? ' analyst' : ' analysts') +
          ' processing ' +
          formattedRecords +
          ' records';
      }
    }
  }

  if (simRecordsSlider) simRecordsSlider.addEventListener('input', updateRoiSimulator);
  if (simTeamSlider) simTeamSlider.addEventListener('input', updateRoiSimulator);

  // ===== BILINGUAL (EN/AR) ENGINE =====
  function applyLanguage(lang) {
    currentLang = lang;
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    var langLabel = document.getElementById('langLabel');
    if (langLabel) {
      langLabel.textContent = lang === 'en' ? 'العربية' : 'English';
    }

    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.textContent = translations[lang][key];
      }
    });

    if (lang === 'ar') {
      document.title =
        'سلمان الحربي | أخصائي ذكاء القرار وحوكمة البيانات (PDPL & NDMO) | استشارات وحلول تقنية';
    } else {
      document.title =
        'Salman Alharbi | Decision Intelligence & Data Governance Specialist (PDPL & NDMO)';
    }

    updateLensStatusText();
    updateRoiSimulator();

    if (activeProjectId) {
      renderModalContent(activeProjectId);
    }

    if (typeof window.__resetTypewriter === 'function') {
      window.__resetTypewriter();
    }
  }

  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      applyLanguage(currentLang === 'en' ? 'ar' : 'en');
    });
  }

  // ===== SKILLS & CERTIFICATES FILTERS =====
  var filterBtns = document.querySelectorAll('.filter-btn');
  var skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');

      var target = this.getAttribute('data-filter');
      skillCards.forEach(function (card) {
        if (target === 'all' || card.getAttribute('data-category') === target) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  var certFilterChips = document.querySelectorAll('.cert-filter-chip');
  var certItems = document.querySelectorAll('.cert-item');

  certFilterChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      certFilterChips.forEach(function (c) {
        c.classList.remove('active');
      });
      this.classList.add('active');

      var targetCat = this.getAttribute('data-cert-filter');
      certItems.forEach(function (item) {
        if (targetCat === 'all' || item.getAttribute('data-cert-cat') === targetCat) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ===== MOBILE MENU TOGGLE =====
  var mobileBtn = document.getElementById('mobileMenuBtn');
  var mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', function () {
      var isOpen = mobileDrawer.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    var mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileDrawer.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== SCROLL FADE-UP OBSERVER =====
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-up').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  applyLanguage('en');

  // ===== VISUAL EFFECTS, TYPEWRITER & SCROLL-DRIVEN JOURNEY CANVAS =====
  var D = document;
  var R = D.documentElement;
  R.classList.add('js');
  var rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine = matchMedia('(pointer:fine)').matches;

  // Progress bar + cursor spotlight
  var prog = D.createElement('div');
  prog.id = 'prog';
  D.body.appendChild(prog);
  var glow = D.createElement('div');
  glow.id = 'glow';
  D.body.appendChild(glow);

  addEventListener(
    'scroll',
    function () {
      var h = R.scrollHeight - innerHeight;
      prog.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
    },
    { passive: true }
  );

  if (fine) {
    addEventListener('mousemove', function (e) {
      glow.style.opacity = 1;
      glow.style.transform = 'translate(' + (e.clientX - 260) + 'px,' + (e.clientY - 260) + 'px)';
    });
  }

  // Hero extras: dynamic typewriter roles + scroll cue
  var hero = D.querySelector('.hero-section');
  if (hero) {
    var cue = D.createElement('div');
    cue.className = 'scroll-cue';
    hero.appendChild(cue);
  }
  var roles = D.createElement('p');
  roles.className = 'roles';
  roles.innerHTML = '<b></b><i></i>';
  var heroTitleEl = D.querySelector('.hero-title');
  if (heroTitleEl) {
    heroTitleEl.after(roles);
  }

  var RL = {
    en: [
      'Decision Intelligence',
      'Data Governance (PDPL · NDMO)',
      'Business & IT Advisory',
      'Local LLMs (Ollama/DeepSeek)',
      'Process Optimization & ROI'
    ],
    ar: [
      'ذكاء القرار',
      'حوكمة البيانات (PDPL · NDMO)',
      'الاستشارات والحلول التقنية للأعمال',
      'النماذج اللغوية المحلية',
      'تحسين العمليات والعائد الاستثماري'
    ]
  };
  var ri = 0;
  var ci = 0;
  var del = false;
  var rb = roles.firstChild;
  var typeTimer = null;

  function tick() {
    if (typeTimer) clearTimeout(typeTimer);
    var isAr = R.getAttribute('lang') === 'ar' || R.getAttribute('dir') === 'rtl';
    var list = isAr ? RL.ar : RL.en;
    var w = list[ri % list.length];

    if (rm) {
      rb.textContent = w;
      ri++;
      typeTimer = setTimeout(tick, 2600);
      return;
    }

    if (!del) {
      ci++;
      rb.textContent = w.slice(0, ci);
      if (ci >= w.length) {
        del = true;
        typeTimer = setTimeout(tick, 2000);
        return;
      }
      var typeSpeed = isAr ? 65 : 60;
      typeTimer = setTimeout(tick, typeSpeed);
    } else {
      ci--;
      rb.textContent = w.slice(0, Math.max(ci, 0));
      if (ci <= 0) {
        del = false;
        ri++;
        typeTimer = setTimeout(tick, 450);
        return;
      }
      var delSpeed = isAr ? 30 : 25;
      typeTimer = setTimeout(tick, delSpeed);
    }
  }
  tick();

  window.__resetTypewriter = function () {
    if (typeTimer) clearTimeout(typeTimer);
    ci = 0;
    del = false;
    tick();
  };

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var hash = this.getAttribute('href');
      if (!hash || hash === '#') return;
      var targetEl = document.querySelector(hash);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    });
  });

  // ===== SCROLL-DRIVEN JOURNEY BACKGROUND (Data -> Patterns -> AI -> Decision) =====
  (function () {
    if (rm) return;
    var cv = D.getElementById('journeyCanvas');
    if (!cv) return;
    var ctx = cv.getContext('2d');
    if (!ctx) return;

    var isMobile = window.innerWidth < 768;
    var N = isMobile ? 55 : 135;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0;
    var H = 0;

    function onResize() {
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.floor(W * DPR);
      cv.height = Math.floor(H * DPR);
      cv.style.width = W + 'px';
      cv.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    onResize();
    window.addEventListener('resize', onResize);

    var mouse = { x: W * 0.5, y: H * 0.5, targetX: W * 0.5, targetY: H * 0.5 };
    window.addEventListener(
      'mousemove',
      function (e) {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
      },
      { passive: true }
    );

    var projEl = D.getElementById('projects');
    var skillsEl = D.getElementById('skills');
    var contactEl = D.getElementById('contact');

    var railSteps = D.querySelectorAll('.journey-step');
    var railFill = D.getElementById('journeyRailFill');

    railSteps.forEach(function (step) {
      step.addEventListener('click', function () {
        var sel = this.getAttribute('data-target');
        var el = D.querySelector(sel);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    var particles = [];
    for (var i = 0; i < N; i++) {
      var fr = i / N;
      particles.push({
        id: i,
        fr: fr,
        angle: fr * Math.PI * 2,
        baseRadiusFactor: 0.75 + (Math.sin(i * 1.73) * 0.5 + 0.5) * 0.45,
        zJitter: (Math.cos(i * 3.14) * 0.5 + 0.5) * 36 - 18,
        orbitSpeed: 0.0028 + (i % 5) * 0.0006,
        size: 1.3 + (i % 4) * 0.45,
        baseAlpha: 0.32 + (i % 3) * 0.16,
        cluster: i % 4,
        clusterOffsetAngle: (((i * 13) % 100) / 100) * Math.PI * 2,
        clusterOffsetDist: 0.15 + (((i * 7) % 100) / 100) * 0.85,
        layer: i % 4,
        layerSlot: Math.floor(i / 4),
        rayAngle: fr * Math.PI * 2,
        rayDist: 0.08 + Math.pow(((i * 19) % 100) / 100, 1.4) * 0.92,
        x: W * 0.5,
        y: H * 0.5,
        alpha: 0.4
      });
    }

    var animId = null;
    var active = true;
    var lastTime = performance.now();
    var time = 0;

    window.__pauseCanvas = function () {
      active = false;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };
    window.__resumeCanvas = function () {
      if (!active) {
        active = true;
        lastTime = performance.now();
        if (!animId) animId = requestAnimationFrame(loop);
      }
    };

    D.addEventListener('visibilitychange', function () {
      if (D.hidden) {
        active = false;
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      } else {
        active = true;
        lastTime = performance.now();
        if (!animId) {
          animId = requestAnimationFrame(loop);
        }
      }
    });

    function loop(now) {
      if (!active) return;
      animId = requestAnimationFrame(loop);

      var dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += dt;

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      var scrollY = window.scrollY || window.pageYOffset;
      var vh = window.innerHeight;

      var skillsY = skillsEl ? Math.max(1, skillsEl.offsetTop - vh * 0.35) : vh;
      var projY = projEl ? Math.max(skillsY + 1, projEl.offsetTop - vh * 0.35) : vh * 2;
      var contactY = contactEl ? Math.max(projY + 1, contactEl.offsetTop - vh * 0.5) : vh * 3;

      var wHero = 0;
      var wSkills = 0;
      var wProj = 0;
      var wContact = 0;

      if (scrollY <= skillsY) {
        var p1 = Math.min(Math.max(scrollY / skillsY, 0), 1);
        var ease1 = p1 * p1 * (3 - 2 * p1);
        wHero = 1 - ease1;
        wSkills = ease1;
      } else if (scrollY <= projY) {
        var p2 = Math.min(Math.max((scrollY - skillsY) / (projY - skillsY), 0), 1);
        var ease2 = p2 * p2 * (3 - 2 * p2);
        wSkills = 1 - ease2;
        wProj = ease2;
      } else {
        var p3 = Math.min(Math.max((scrollY - projY) / (contactY - projY), 0), 1);
        var ease3 = p3 * p3 * (3 - 2 * p3);
        wProj = 1 - ease3;
        wContact = ease3;
      }

      var activeStep = 0;
      if (scrollY >= contactY - vh * 0.1) {
        activeStep = 3;
      } else if (scrollY >= projY - vh * 0.1) {
        activeStep = 2;
      } else if (scrollY >= skillsY - vh * 0.1) {
        activeStep = 1;
      } else {
        activeStep = 0;
      }

      railSteps.forEach(function (step) {
        var idx = parseInt(step.getAttribute('data-step'), 10);
        step.classList.toggle('active', idx === activeStep);
      });

      if (railFill) {
        var railProgress = 0;
        if (scrollY <= skillsY) {
          railProgress = (scrollY / skillsY) * (1 / 3);
        } else if (scrollY <= projY) {
          railProgress = 1 / 3 + ((scrollY - skillsY) / (projY - skillsY)) * (1 / 3);
        } else {
          railProgress =
            2 / 3 + Math.min(Math.max((scrollY - projY) / (contactY - projY), 0), 1) * (1 / 3);
        }
        railFill.style.height = Math.min(Math.max(railProgress, 0), 1) * 100 + '%';
      }

      var projProgress = 0;
      if (projEl) {
        var pRect = projEl.getBoundingClientRect();
        projProgress = Math.min(Math.max((vh - pRect.top) / (vh + pRect.height), 0), 1);
      }

      ctx.clearRect(0, 0, W, H);

      var heroCenter = {
        x: W > 768 ? W * 0.62 : W * 0.5,
        y: W > 768 ? H * 0.48 : H * 0.42
      };

      var minDim = Math.min(W, H);
      var planetRadius = minDim * (W > 768 ? 0.3 : 0.38);

      var baseTiltX = 1.12;
      var tiltX = baseTiltX + ((mouse.y - H * 0.5) / H) * 0.28;
      var tiltY = ((mouse.x - W * 0.5) / W) * 0.38;

      var clusterCenters = [
        { x: W * 0.28, y: H * 0.32 },
        { x: W * 0.72, y: H * 0.3 },
        { x: W * 0.3, y: H * 0.68 },
        { x: W * 0.7, y: H * 0.66 }
      ];
      var clusterMaxDist = minDim * (isMobile ? 0.16 : 0.13);

      var layerX = [W * 0.18, W * 0.38, W * 0.6, W * 0.82];
      var nodesPerLayer = Math.ceil(N / 4);

      var decisionCenter = { x: W * 0.5, y: H * 0.48 };

      var targets = [];
      for (var i = 0; i < N; i++) {
        var p = particles[i];

        var orbAngle = p.angle + time * p.orbitSpeed * 10;
        var rOrb = planetRadius * p.baseRadiusFactor;
        var x0 = rOrb * Math.cos(orbAngle);
        var y0 = rOrb * Math.sin(orbAngle) * Math.cos(tiltX) + p.zJitter * Math.sin(tiltX);
        var z0 = rOrb * Math.sin(orbAngle) * Math.sin(tiltX) - p.zJitter * Math.cos(tiltX);
        var depthScale = 1 + z0 / (planetRadius * 3.5);
        var hx = heroCenter.x + (x0 * Math.cos(tiltY) - z0 * Math.sin(tiltY)) * depthScale;
        var hy = heroCenter.y + y0 * depthScale;
        var hAlpha = p.baseAlpha * (0.35 + 0.65 * ((z0 + planetRadius) / (planetRadius * 2)));

        var cCenter = clusterCenters[p.cluster];
        var cAngle = p.clusterOffsetAngle + time * 0.2 * (p.cluster % 2 === 0 ? 1 : -1);
        var cDist = p.clusterOffsetDist * clusterMaxDist;
        var sx = cCenter.x + Math.cos(cAngle) * cDist;
        var sy = cCenter.y + Math.sin(cAngle) * cDist;
        var sAlpha = p.baseAlpha * 0.85;

        var lx = layerX[p.layer];
        var ly = H * 0.18 + ((p.layerSlot + 0.5) / nodesPerLayer) * (H * 0.64) + Math.sin(time * 0.7 + i) * 6;
        var layerThreshold = 0.15 + p.layer * 0.2;
        var isLit = projProgress >= layerThreshold;
        var pAlpha = isLit ? Math.min(p.baseAlpha * 1.6, 0.95) : p.baseAlpha * 0.35;

        var pulse = Math.sin(time * 2.5) * 0.08;
        var cDistDec = p.rayDist * minDim * 0.38 * (1 - pulse);
        var cAngleDec = p.rayAngle + time * 0.15;
        var dx = decisionCenter.x + Math.cos(cAngleDec) * cDistDec;
        var dy = decisionCenter.y + Math.sin(cAngleDec) * cDistDec;
        var dAlpha = Math.min(p.baseAlpha * 1.4, 0.9);

        var finalX = 0;
        var finalY = 0;
        var finalAlpha = 0;
        if (wHero > 0 || (wSkills > 0 && wProj === 0 && wContact === 0)) {
          finalX = hx * wHero + sx * wSkills;
          finalY = hy * wHero + sy * wSkills;
          finalAlpha = hAlpha * wHero + sAlpha * wSkills;
        } else if (wSkills > 0 || (wProj > 0 && wContact === 0)) {
          finalX = sx * wSkills + lx * wProj;
          finalY = sy * wSkills + ly * wProj;
          finalAlpha = sAlpha * wSkills + pAlpha * wProj;
        } else {
          finalX = lx * wProj + dx * wContact;
          finalY = ly * wProj + dy * wContact;
          finalAlpha = pAlpha * wProj + dAlpha * wContact;
        }

        p.x += (finalX - p.x) * 0.22;
        p.y += (finalY - p.y) * 0.22;
        p.alpha += (finalAlpha - p.alpha) * 0.22;

        targets.push({
          x: p.x,
          y: p.y,
          alpha: p.alpha,
          size: p.size,
          layer: p.layer,
          cluster: p.cluster,
          isLit: isLit
        });
      }

      if (wProj > 0.04) {
        var synAlpha = wProj * 0.12;
        ctx.lineWidth = 1;
        for (var i = 0; i < N; i++) {
          var pA = targets[i];
          if (pA.layer >= 3) continue;
          for (var j = 0; j < N; j++) {
            var pB = targets[j];
            if (pB.layer === pA.layer + 1 && Math.abs(pA.y - pB.y) < H * 0.28) {
              var litConn = pA.isLit && pB.isLit;
              ctx.strokeStyle = litConn
                ? 'rgba(232, 212, 77, ' + synAlpha * 2.2 + ')'
                : 'rgba(232, 212, 77, ' + synAlpha * 0.6 + ')';
              ctx.beginPath();
              ctx.moveTo(pA.x, pA.y);
              ctx.lineTo(pB.x, pB.y);
              ctx.stroke();
            }
          }
        }
      }

      if (wSkills > 0.04) {
        var clustLineAlpha = wSkills * 0.18;
        ctx.lineWidth = 1;
        for (var i = 0; i < N; i++) {
          var pA = targets[i];
          for (var j = i + 1; j < N; j++) {
            var pB = targets[j];
            if (pA.cluster === pB.cluster) {
              var dx = pA.x - pB.x;
              var dy = pA.y - pB.y;
              var dist = Math.hypot(dx, dy);
              if (dist < 88) {
                var a = clustLineAlpha * (1 - dist / 88);
                ctx.strokeStyle = 'rgba(232, 212, 77, ' + a + ')';
                ctx.beginPath();
                ctx.moveTo(pA.x, pA.y);
                ctx.lineTo(pB.x, pB.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      if (wContact > 0.04) {
        var rayAlpha = wContact * 0.15;
        ctx.lineWidth = 1;
        for (var i = 0; i < N; i++) {
          var pA = targets[i];
          var distToC = Math.hypot(pA.x - decisionCenter.x, pA.y - decisionCenter.y);
          if (distToC < minDim * 0.42) {
            var a = rayAlpha * (1 - distToC / (minDim * 0.42));
            ctx.strokeStyle = 'rgba(232, 212, 77, ' + a + ')';
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(decisionCenter.x, decisionCenter.y);
            ctx.stroke();
          }
        }

        var coreR = 48 * wContact;
        var grad = ctx.createRadialGradient(
          decisionCenter.x,
          decisionCenter.y,
          2,
          decisionCenter.x,
          decisionCenter.y,
          coreR
        );
        grad.addColorStop(0, 'rgba(255, 246, 176, ' + 0.75 * wContact + ')');
        grad.addColorStop(0.25, 'rgba(232, 212, 77, ' + 0.55 * wContact + ')');
        grad.addColorStop(0.65, 'rgba(232, 212, 77, ' + 0.18 * wContact + ')');
        grad.addColorStop(1, 'rgba(232, 212, 77, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(decisionCenter.x, decisionCenter.y, coreR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, ' + 0.9 * wContact + ')';
        ctx.beginPath();
        ctx.arc(decisionCenter.x, decisionCenter.y, 3 * wContact, 0, Math.PI * 2);
        ctx.fill();
      }

      for (var i = 0; i < N; i++) {
        var p = targets[i];
        if (p.alpha <= 0.01) continue;

        ctx.fillStyle = 'rgba(232, 212, 77, ' + p.alpha + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (wProj > 0.4 && p.isLit) {
          ctx.fillStyle = 'rgba(255, 246, 176, ' + p.alpha * 0.45 + ')';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    animId = requestAnimationFrame(loop);
  })();

  // Cards: spotlight + 3D perspective tilt
  var cards = D.querySelectorAll(
    '.pillar-card,.timeline-card,.project-card,.skill-category-card,.edu-card,.contact-box,.roi-simulator-card'
  );
  cards.forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      el.style.setProperty('--mx', x + 'px');
      el.style.setProperty('--my', y + 'px');
      if (!rm && fine && el.matches('.pillar-card,.project-card')) {
        el.style.transform =
          'perspective(900px) rotateX(' +
          (y / r.height - 0.5) * -5 +
          'deg) rotateY(' +
          (x / r.width - 0.5) * 6 +
          'deg) translateY(-3px)';
      }
    });
    el.addEventListener('mouseleave', function () {
      el.style.transform = '';
    });
  });

  // Magnetic buttons
  if (fine && !rm) {
    D.querySelectorAll('.btn').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform =
          'translate(' +
          (e.clientX - r.left - r.width / 2) * 0.18 +
          'px,' +
          (e.clientY - r.top - r.height / 2) * 0.25 +
          'px)';
      });
      b.addEventListener('mouseleave', function () {
        b.style.transform = '';
      });
    });
  }

  // Timeline accordion (all 3 experience cards open by default)
  var items = D.querySelectorAll('.timeline-item');
  items.forEach(function (it) {
    var card = it.querySelector('.timeline-card');
    var t = D.createElement('span');
    t.className = 'tl-toggle';
    t.textContent = '+';
    card.appendChild(t);
    function set(o) {
      card.classList.toggle('open', o);
      it.classList.toggle('open-item', o);
    }
    card.addEventListener('click', function () {
      set(!card.classList.contains('open'));
    });
    set(true);
  });

  // Stagger reveal delays
  [
    '.pillar-grid>*',
    '.projects-grid>*',
    '.skills-display-grid>*',
    '.edu-cert-grid>*',
    '.cert-item'
  ].forEach(function (s) {
    D.querySelectorAll(s).forEach(function (el, i) {
      el.style.transitionDelay = i * 80 + 'ms';
    });
  });

  // Animated metric counters
  function count(el) {
    var m = el.textContent.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!m || rm) return;
    var end = parseFloat(m[2]);
    var dec = (m[2].split('.')[1] || '').length;
    var t0 = performance.now();
    (function s(n) {
      var k = Math.min((n - t0) / 1400, 1);
      var v = end * (1 - Math.pow(1 - k, 3));
      el.textContent = m[1] + v.toFixed(dec) + m[3];
      if (k < 1) requestAnimationFrame(s);
    })(t0);
  }
  var co = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          count(e.target);
          co.unobserve(e.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  D.querySelectorAll('.metric-value').forEach(function (el) {
    co.observe(el);
  });

  // Scrollspy active navigation link
  var links = D.querySelectorAll('.nav-links a');
  var secs = [].map.call(links, function (a) {
    return D.querySelector(a.getAttribute('href'));
  });
  var so = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  secs.forEach(function (s) {
    if (s) so.observe(s);
  });

  // Skills filter pop animation
  D.querySelectorAll('.filter-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      D.querySelectorAll('.skill-category-card').forEach(function (c, i) {
        c.classList.remove('pop');
        void c.offsetWidth;
        if (!c.classList.contains('hidden')) {
          c.style.animationDelay = i * 70 + 'ms';
          c.classList.add('pop');
        }
      });
    });
  });

  // Certificates filter pop animation
  D.querySelectorAll('.cert-filter-chip').forEach(function (b) {
    b.addEventListener('click', function () {
      D.querySelectorAll('.cert-item').forEach(function (c, i) {
        c.classList.remove('pop');
        void c.offsetWidth;
        if (!c.classList.contains('hidden')) {
          c.style.animationDelay = i * 40 + 'ms';
          c.classList.add('pop');
        }
      });
    });
  });
})();

