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

  window.downloadSalmanCV = function (e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    window.closeAllCvDropdowns();

    var fileName = 'SALMAN-ALHARBI-Resume.pdf';
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
  var simSarCounter = document.getElementById('simSarCounter');
  var simSarSub = document.getElementById('simSarSub');
  var simResidencyCounter = document.getElementById('simResidencyCounter');
  var simResidencySub = document.getElementById('simResidencySub');
  var simResidencyCard = document.getElementById('simResidencyCard');
  var simPresetBtns = document.querySelectorAll('.roi-preset-btn');
  var simArchBtns = document.querySelectorAll('.roi-arch-btn');
  var currentArchMode = 'sovereign';

  function updateRoiSimulator() {
    if (!simRecordsSlider || !simTeamSlider) return;
    var records = parseInt(simRecordsSlider.value, 10) || 250000;
    var team = parseInt(simTeamSlider.value, 10) || 8;
    var isSovereign = currentArchMode === 'sovereign';

    var baseTeamHours = team * 42;
    var volumeBonusHours = Math.round((records / 10000) * (3.2 + team * 0.35));
    var totalMonthlyHoursSaved = baseTeamHours + volumeBonusHours;

    var manualCycleHours = Math.max(2, Math.round((records / 25000) * 1.4 + (16 - team) * 0.3));

    // Annual labor savings (145 SAR/hr blended executive/analyst rate) + Token API cost avoidance (62 SAR per 1K records/yr)
    var annualLaborSar = totalMonthlyHoursSaved * 12 * 145;
    var annualTokenApiSar = Math.round((records / 1000) * 62);
    var netAnnualSar = isSovereign
      ? annualLaborSar + annualTokenApiSar
      : Math.max(0, Math.round(annualLaborSar * 0.65 - annualTokenApiSar * 1.4));

    var formattedRecords = records.toLocaleString('en-US');
    var formattedHours = totalMonthlyHoursSaved.toLocaleString('en-US');
    var formattedSar =
      netAnnualSar >= 1000000
        ? (netAnnualSar / 1000000).toFixed(2) + 'M'
        : Math.round(netAnnualSar / 1000).toLocaleString('en-US') + 'K';

    if (simResidencyCard) {
      simResidencyCard.classList.toggle('arch-warning-card', !isSovereign);
    }

    if (currentLang === 'ar') {
      if (simRecordsValueDisplay) simRecordsValueDisplay.textContent = formattedRecords + ' سجل';
      if (simTeamValueDisplay) {
        simTeamValueDisplay.textContent =
          team === 1 ? 'محلل واحد' : team === 2 ? 'محللان (2)' : team + ' محللين';
      }
      if (simDecisionCounter) {
        simDecisionCounter.textContent = isSovereign ? '< 5 ثوانٍ' : '~18–45 ثانية';
      }
      if (simDecisionSub) {
        simDecisionSub.textContent = isSovereign
          ? 'تقليص زمن المراجعة من ~' + manualCycleHours + ' ساعة عمل يدوي إلى أقل من 5 ثوانٍ محلياً'
          : 'زمن استجابة أبطأ بسبب إرسال البيانات عبر الإنترنت لخوادم سحابية خارجية';
      }
      if (simHoursCounter) simHoursCounter.textContent = formattedHours + ' ساعة/شهرياً';
      if (simHoursSub) {
        simHoursSub.textContent =
          'توفير مباشر لفريق مكون من ' + team + ' محللين لمعالجة ' + formattedRecords + ' سجل';
      }
      if (simSarCounter) {
        simSarCounter.textContent = formattedSar + ' ر.س/سنوياً';
      }
      if (simSarSub) {
        simSarSub.textContent = isSovereign
          ? 'صفر رسوم توكنز سحابية خارجية + توفير ' + annualTokenApiSar.toLocaleString('en-US') + ' ر.س من فواتير API'
          : 'خصم رسوم التوكنز المتكررة (~' + Math.round(annualTokenApiSar * 1.4).toLocaleString('en-US') + ' ر.س/سنوياً)';
      }
      if (simResidencyCounter) {
        simResidencyCounter.textContent = isSovereign ? '100%' : '⚠️ خطر PDPL';
      }
      if (simResidencySub) {
        simResidencySub.textContent = isSovereign
          ? 'توطين سيادي بنسبة 100% داخل المملكة دون أي تسريب سحابي خارجي (متوافق مع NDMO)'
          : 'خروج البيانات الحساسة لخوادم أجنبية يعرض المنظمة لمخالفات نظام حماية البيانات الشخصية';
      }
    } else {
      if (simRecordsValueDisplay) simRecordsValueDisplay.textContent = formattedRecords + ' Records';
      if (simTeamValueDisplay) {
        simTeamValueDisplay.textContent = team + (team === 1 ? ' Analyst' : ' Analysts');
      }
      if (simDecisionCounter) {
        simDecisionCounter.textContent = isSovereign ? '< 5 sec' : '~18–45 sec';
      }
      if (simDecisionSub) {
        simDecisionSub.textContent = isSovereign
          ? 'Compressed from ~' + manualCycleHours + ' hrs of manual review to < 5 seconds via Local LLMs'
          : 'Higher network latency due to external API throttling & cross-border payload routing';
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
      if (simSarCounter) {
        simSarCounter.textContent = formattedSar + ' SAR/yr';
      }
      if (simSarSub) {
        simSarSub.textContent = isSovereign
          ? 'Zero external API token fees + saves ~' + annualTokenApiSar.toLocaleString('en-US') + ' SAR/yr in cloud tokens'
          : 'Reduced net ROI due to recurring per-token API billing (~' + Math.round(annualTokenApiSar * 1.4).toLocaleString('en-US') + ' SAR/yr)';
      }
      if (simResidencyCounter) {
        simResidencyCounter.textContent = isSovereign ? '100%' : '⚠️ PDPL Risk';
      }
      if (simResidencySub) {
        simResidencySub.textContent = isSovereign
          ? 'Zero external cloud leakage · Full compliance with Saudi PDPL & NDMO'
          : 'Cross-border data transfer exposes sensitive records to regulatory compliance risk';
      }
    }
  }

  if (simRecordsSlider) {
    simRecordsSlider.addEventListener('input', function () {
      simPresetBtns.forEach(function (b) { b.classList.remove('active'); });
      updateRoiSimulator();
    });
  }
  if (simTeamSlider) {
    simTeamSlider.addEventListener('input', function () {
      simPresetBtns.forEach(function (b) { b.classList.remove('active'); });
      updateRoiSimulator();
    });
  }

  simPresetBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      simPresetBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      var r = this.getAttribute('data-records');
      var t = this.getAttribute('data-team');
      var a = this.getAttribute('data-arch') || 'sovereign';
      if (simRecordsSlider && r) simRecordsSlider.value = r;
      if (simTeamSlider && t) simTeamSlider.value = t;
      currentArchMode = a;
      simArchBtns.forEach(function (ab) {
        ab.classList.toggle('active', ab.getAttribute('data-arch-mode') === currentArchMode);
      });
      updateRoiSimulator();
    });
  });

  simArchBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentArchMode = this.getAttribute('data-arch-mode') || 'sovereign';
      simArchBtns.forEach(function (ab) {
        ab.classList.toggle('active', ab.getAttribute('data-arch-mode') === currentArchMode);
      });
      updateRoiSimulator();
    });
  });

  // ===== SMART CONFERENCE QR & DIGITAL BUSINESS CARD CONTROLLER (HTML5 CANVAS RENDERED) =====
  // Drawn directly onto HTML5 <canvas> so Samsung Internet (S23 Ultra) Force-Dark never inverts SVGs or creates a white glare layer
  var QR_MATRICES = {
    vcard: {
      size: 57,
      rows: [
        "111111100111000100001110011110101100111100001011001111111",
        "100000100100101111000001000000010000101001110101001000001",
        "101110101101100100111110010001101011100101101011001011101",
        "101110101100101010101010000100101110000010010001001011101",
        "101110101001001011011101001111101010010110101001001011101",
        "100000101001010011001010001000110001100111110110001000001",
        "111111101010101010101010101010101010101010101010101111111",
        "000000001010101000011111101000111010010100110100100000000",
        "101111100100111011001010001111110110000100011101101111100",
        "111100000000000101110100000110000001010111100101011110101",
        "010011110001100010110100100001101000110101111000000110001",
        "010010001010110110001000111101111001100100110000100000111",
        "001000100010111110100101101000101101000010011111001100100",
        "100110001001011001101000111010010100001101000011111111011",
        "101101101110110110001011110000111000111001110100101000111",
        "011011000001101101010110100111100001100101001001111001011",
        "100001101110100100000100000010100011001001111111101010010",
        "100011011100100010011111010101001100011100001010110110010",
        "001101110011000010011010001111100011110011010010111000011",
        "110000010110100100001001011101101110001110101111110011000",
        "101001110111100110001101000001000000100010100100101010101",
        "111110001001110111010011110001111010111110001010100111100",
        "010100111000100101010110101101110110100010010000110111101",
        "011011001110011000011011111001100111000001100110110111100",
        "011100110110000110100011100000010110100010000101111011000",
        "101000000011101111101001100110010100000111001011010111110",
        "110111111000001010111100001111110001100010010000111111110",
        "010010001011011010100111111000110010000111010101100010101",
        "010110101100101000110110011010101111011110110101101011010",
        "111010001001010010100001001000100100101101000111100010101",
        "111011111100110111000110001111110001101100010110111110011",
        "110110000000101111110001101001101001110101000000000111100",
        "010011100000111001001100111011100111000000011111100000010",
        "110100011011011111000111000100001010101001100110001011101",
        "110011100000001110000010011001010100010001110101111100010",
        "011110010001000110111111011000001000100111101000110111010",
        "010011100100110111100111111010111111001100100010100100100",
        "000001010011101100100001110000101110111110111001101000110",
        "001111101101110010011010001110110001010010010110110100011",
        "111111011001100111111011000010110101111001101100110001001",
        "110010101111010000010011111110100011000011100100110101100",
        "111001001010001001010011010010101000011101111011111010100",
        "111111110100001011110011101101010101010100110100110111100",
        "110011001000110110111110101110001001110101111100000001100",
        "001000101111011101001111011110000101110010010100010010101",
        "001101000011111110111111110100000110000100110010001001111",
        "101001111111011000101110000101000111101101000111111010000",
        "111110010010011101010101101101001000010000100100001100101",
        "000000110111110001011001111111101100000000011111111111110",
        "000000001101100001011110101000101000110110001100100010101",
        "111111100111011001110100001010101100100000101100101010010",
        "100000101111101111100011101000100001111001001001100010100",
        "101110101111001100010001111111111111010110011111111110110",
        "101110101010101111111010101100110110011100001101110000100",
        "101110101100101011101111110001001101001000000001101000000",
        "100000100000000000001010100010011001101110010000100101001",
        "111111101111100010001001110001011111100000110111010011100"
      ]
    },
    cv: {
      size: 33,
      rows: [
        "111111100011010011111001001111111",
        "100000100001001101100110001000001",
        "101110101010000101101110101011101",
        "101110101001000101000010001011101",
        "101110101001010111101010101011101",
        "100000101100011000110010101000001",
        "111111101010101010101010101111111",
        "000000001001101100110101100000000",
        "101111100011011011001001101111100",
        "011110010010111110011101001101101",
        "110011100101011111001010011010110",
        "100001010100110011100100011011101",
        "011100101001001001011101001101010",
        "010011001111010110100000101111011",
        "000010100111001000000110111101010",
        "100110010010010100000111111101100",
        "111100111101110101010010110110001",
        "111100001110100001111011011101101",
        "010001111100100111101010101110110",
        "010001011000010011111110011111100",
        "000110100100111000000001100111010",
        "111001010101001010011111111101001",
        "101011101001101001101101000010110",
        "100011011111101110110111011011110",
        "100001100111010001110011111110010",
        "000000001101010011111110100010111",
        "111111100000001111100001101010110",
        "100000101010010101111001100011101",
        "101110101101101010011100111111000",
        "101110101100100111100111110010001",
        "101110101110011101010100101101100",
        "100000100100100000110110001011100",
        "111111101100011001010001001100010"
      ]
    },
    portfolio: {
      size: 29,
      rows: [
        "11111110011101001001101111111",
        "10000010011101111000001000001",
        "10111010101010110000001011101",
        "10111010111011000101001011101",
        "10111010100011001011101011101",
        "10000010101111110110001000001",
        "11111110101010101010101111111",
        "00000000100010111010100000000",
        "10111110000010000110101111100",
        "11011101101101001111111110001",
        "00001010101101111100110110000",
        "11111000010011001010000101010",
        "10110111000100100101000001100",
        "00100101100010001111111110001",
        "10110111000000010010101011100",
        "01101000111100101001111100010",
        "11001010001010010100010001100",
        "11001100000101101111111110101",
        "10000010001001110100001110100",
        "10111000110001011001100010010",
        "10100011001100111111111110111",
        "00000000101000001110100011111",
        "11111110010100010101101011100",
        "10000010101000100000100010011",
        "10111010100000011000111110100",
        "10111010111100101001000001111",
        "10111010111011111010001111110",
        "10000010011001101011110101010",
        "11111110101100100101000011100"
      ]
    }
  };

  var qrModal = document.getElementById('qrModal');
  var qrModalCanvas = document.getElementById('qrModalCanvas');
  var qrModalCaption = document.getElementById('qrModalCaption');
  var qrStageBox = document.getElementById('qrStageBox');
  var qrContrastToggleLabel = document.getElementById('qrContrastToggleLabel');
  var currentQrTab = 'vcard';
  var qrLightScanMode = false;

  function isFinderPatternModule(r, c, size) {
    return (
      (r < 7 && c < 7) ||
      (r < 7 && c >= size - 7) ||
      (r >= size - 7 && c < 7)
    );
  }

  window.renderQrCanvas = function (canvas, type, lightMode) {
    if (!canvas || !canvas.getContext) return;
    var data = QR_MATRICES[type] || QR_MATRICES.vcard;
    var size = data.size;
    var rows = data.rows;
    var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    var cssSize = parseInt(canvas.getAttribute('width') || '180', 10);
    canvas.width = Math.round(cssSize * dpr);
    canvas.height = Math.round(cssSize * dpr);
    canvas.style.width = cssSize + 'px';
    canvas.style.height = cssSize + 'px';

    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(dpr, dpr);

    var quietZone = 3.2;
    var totalUnits = size + quietZone * 2;
    var cell = cssSize / totalUnits;

    // Background fill (zero harsh #ffffff white glare by default)
    ctx.fillStyle = lightMode ? '#FEFCE8' : '#0F172A';
    ctx.fillRect(0, 0, cssSize, cssSize);

    // Subtle executive inner border
    ctx.strokeStyle = lightMode ? 'rgba(15, 23, 42, 0.18)' : 'rgba(250, 204, 21, 0.38)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(2, 2, cssSize - 4, cssSize - 4);

    for (var r = 0; r < size; r++) {
      var rowStr = rows[r];
      for (var c = 0; c < size; c++) {
        if (rowStr.charCodeAt(c) === 49) {
          var x = (c + quietZone) * cell;
          var y = (r + quietZone) * cell;
          if (lightMode) {
            ctx.fillStyle = isFinderPatternModule(r, c, size) ? '#0F172A' : '#1E293B';
          } else {
            ctx.fillStyle = isFinderPatternModule(r, c, size) ? '#FACC15' : '#FEF08A';
          }
          // Draw crisp module with slight overlap to prevent subpixel gaps
          ctx.fillRect(x - 0.15, y - 0.15, cell + 0.3, cell + 0.3);
        }
      }
    }

    ctx.restore();
  };

  function renderAllInlineQrCanvases() {
    document.querySelectorAll('.qr-canvas[data-qr]').forEach(function (canvas) {
      var type = canvas.getAttribute('data-qr') || 'vcard';
      window.renderQrCanvas(canvas, type, false);
    });
    if (qrModalCanvas) {
      window.renderQrCanvas(qrModalCanvas, currentQrTab, qrLightScanMode);
    }
  }

  renderAllInlineQrCanvases();

  var qrCaptionKeyMap = {
    vcard: 'qr_card_vcard_sub',
    cv: 'qr_card_cv_sub',
    portfolio: 'qr_card_port_sub'
  };

  function updateQrContrastBtnLabel() {
    if (!qrContrastToggleLabel) return;
    if (qrLightScanMode) {
      qrContrastToggleLabel.textContent =
        currentLang === 'ar'
          ? '🌙 العودة للوضع الذهبي الداكن (Dark-Gold Mode)'
          : '🌙 Switch to Executive Dark-Gold Mode';
    } else {
      qrContrastToggleLabel.textContent =
        currentLang === 'ar'
          ? '☀️ تبديل لوضع المسح الفاتح للكاميرات القديمة'
          : '☀️ Switch to Light Scan Contrast';
    }
  }

  window.toggleQrScanContrast = function () {
    qrLightScanMode = !qrLightScanMode;
    if (qrStageBox) {
      qrStageBox.classList.toggle('qr-stage-light', qrLightScanMode);
    }
    if (qrModalCanvas) {
      window.renderQrCanvas(qrModalCanvas, currentQrTab, qrLightScanMode);
    }
    updateQrContrastBtnLabel();
  };

  window.switchQrTab = function (tabName) {
    currentQrTab = tabName || 'vcard';
    document.querySelectorAll('.qr-tab-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-qr-tab') === currentQrTab);
    });
    if (qrModalCanvas) {
      window.renderQrCanvas(qrModalCanvas, currentQrTab, qrLightScanMode);
    }
    if (qrModalCaption) {
      var capKey = qrCaptionKeyMap[currentQrTab];
      if (translations[currentLang] && translations[currentLang][capKey]) {
        qrModalCaption.textContent = translations[currentLang][capKey];
      }
    }
    if (qrStageBox) {
      qrStageBox.classList.remove('qr-fullscreen-zoom');
    }
    updateQrContrastBtnLabel();
  };

  window.openQrModal = function (tabName) {
    window.switchQrTab(tabName || 'vcard');
    if (qrModal) {
      qrModal.classList.add('open');
      qrModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    var drawer = document.getElementById('mobileDrawer');
    var menuBtn = document.getElementById('mobileMenuBtn');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
  };

  window.closeQrModal = function () {
    if (qrModal) {
      qrModal.classList.remove('open');
      qrModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (qrModal) {
    qrModal.addEventListener('click', function (e) {
      if (e.target === qrModal) {
        window.closeQrModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && qrModal && qrModal.classList.contains('open')) {
      window.closeQrModal();
    }
  });

  window.copyPortfolioUrl = function (btnEl) {
    var url = 'https://salman-qq.github.io/Portfolio/';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url);
    } else {
      var ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (btnEl) {
      var span = btnEl.querySelector('span');
      if (span) {
        var origText = span.textContent;
        span.textContent =
          (translations[currentLang] && translations[currentLang].qr_btn_copied) || 'Copied ✓';
        setTimeout(function () {
          span.textContent =
            (translations[currentLang] && translations[currentLang].qr_btn_copy_link) || origText;
        }, 2000);
      }
    }
  };

  window.sharePortfolio = function () {
    var shareData = {
      title: 'Salman Alharbi | سلمان الحربي — Decision Intelligence & Sovereign AI',
      text: 'Decision Intelligence & Data Governance Specialist (PDPL & NDMO) | Interactive Portfolio & CV',
      url: 'https://salman-qq.github.io/Portfolio/'
    };
    if (navigator.share) {
      navigator.share(shareData).catch(function () {});
    } else {
      window.openQrModal('portfolio');
    }
  };

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
    if (typeof window.switchQrTab === 'function') {
      window.switchQrTab(currentQrTab);
    }

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

