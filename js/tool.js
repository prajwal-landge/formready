/**
 * FormReady - Core In-Browser Image Resizer & Compressor Engine
 * 100% Client-Side Canvas Processing | Zero Server Uploads | Zero External APIs
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // Preset Database for Indian Government & Competitive Exams
  // -------------------------------------------------------------------------
  var PRESETS = {
    // Staff Selection Commission
    'ssc-photo': {
      category: 'SSC (Staff Selection Commission)',
      name: 'SSC CGL / CHSL / MTS / GD Photo',
      width: 200,
      height: 230,
      maxKB: 50,
      minKB: 20,
      format: 'image/jpeg',
      aspectRatio: 200 / 230,
      notes: 'White or very light background. 20KB to 50KB.'
    },
    'ssc-sign': {
      category: 'SSC (Staff Selection Commission)',
      name: 'SSC CGL / CHSL / MTS / GD Signature',
      width: 140,
      height: 60,
      maxKB: 20,
      minKB: 10,
      format: 'image/jpeg',
      aspectRatio: 140 / 60,
      notes: 'Black ink on white paper. 10KB to 20KB.'
    },

    // Union Public Service Commission
    'upsc-photo': {
      category: 'UPSC (Union Public Service Commission)',
      name: 'UPSC Civil Services / NDA / CDS Photo',
      width: 350,
      height: 350,
      maxKB: 300,
      minKB: 20,
      format: 'image/jpeg',
      aspectRatio: 1,
      notes: 'Min 350x350 px, Max 1000x1000 px. 20KB to 300KB.'
    },
    'upsc-sign': {
      category: 'UPSC (Union Public Service Commission)',
      name: 'UPSC Civil Services / NDA / CDS Signature',
      width: 350,
      height: 350,
      maxKB: 300,
      minKB: 20,
      format: 'image/jpeg',
      aspectRatio: 1,
      notes: 'Min 350x350 px, Max 1000x1000 px. 20KB to 300KB.'
    },

    // Banking Exams (IBPS & SBI)
    'ibps-photo': {
      category: 'Banking Exams (IBPS / SBI)',
      name: 'IBPS PO / Clerk / RRB Photo',
      width: 200,
      height: 230,
      maxKB: 50,
      minKB: 20,
      format: 'image/jpeg',
      aspectRatio: 200 / 230,
      notes: 'Recent passport photo, white background. 20KB to 50KB.'
    },
    'ibps-sign': {
      category: 'Banking Exams (IBPS / SBI)',
      name: 'IBPS PO / Clerk / RRB Signature',
      width: 140,
      height: 60,
      maxKB: 20,
      minKB: 10,
      format: 'image/jpeg',
      aspectRatio: 140 / 60,
      notes: 'Black ink, not in capital letters. 10KB to 20KB.'
    },
    'sbi-photo': {
      category: 'Banking Exams (IBPS / SBI)',
      name: 'SBI PO / Clerk Photo',
      width: 200,
      height: 230,
      maxKB: 50,
      minKB: 20,
      format: 'image/jpeg',
      aspectRatio: 200 / 230,
      notes: 'Dimensions 200x230 px, file size 20KB to 50KB.'
    },
    'sbi-sign': {
      category: 'Banking Exams (IBPS / SBI)',
      name: 'SBI PO / Clerk Signature',
      width: 140,
      height: 60,
      maxKB: 20,
      minKB: 10,
      format: 'image/jpeg',
      aspectRatio: 140 / 60,
      notes: 'Dimensions 140x60 px, file size 10KB to 20KB.'
    },

    // Railway Recruitment Boards
    'rrb-photo': {
      category: 'RRB (Railway Recruitment Boards)',
      name: 'RRB NTPC / Group D / ALP Photo',
      width: 240,
      height: 320,
      maxKB: 50,
      minKB: 20,
      format: 'image/jpeg',
      aspectRatio: 240 / 320,
      notes: 'Clear color photo with plain white background. 20KB to 50KB.'
    },
    'rrb-sign': {
      category: 'RRB (Railway Recruitment Boards)',
      name: 'RRB NTPC / Group D / ALP Signature',
      width: 140,
      height: 60,
      maxKB: 40,
      minKB: 10,
      format: 'image/jpeg',
      aspectRatio: 140 / 60,
      notes: 'Sign with running hand on white paper. 10KB to 40KB.'
    },

    // Medical & Engineering (NTA / IIT)
    'neet-photo': {
      category: 'National Testing Agency (NEET / JEE / CUET)',
      name: 'NEET UG Passport Photo (80% Face)',
      width: 200,
      height: 250,
      maxKB: 200,
      minKB: 10,
      format: 'image/jpeg',
      aspectRatio: 200 / 250,
      notes: '80% face coverage, ears visible, white background. 10KB to 200KB.'
    },
    'neet-postcard': {
      category: 'National Testing Agency (NEET / JEE / CUET)',
      name: 'NEET UG Postcard Photo (4x6 inch)',
      width: 400,
      height: 600,
      maxKB: 200,
      minKB: 10,
      format: 'image/jpeg',
      aspectRatio: 400 / 600,
      notes: 'Postcard size (4x6 in) on white background. 10KB to 200KB.'
    },
    'neet-sign': {
      category: 'National Testing Agency (NEET / JEE / CUET)',
      name: 'NEET UG Signature',
      width: 140,
      height: 60,
      maxKB: 30,
      minKB: 4,
      format: 'image/jpeg',
      aspectRatio: 140 / 60,
      notes: 'Black ink pen on white paper. 4KB to 30KB.'
    },
    'jee-photo': {
      category: 'National Testing Agency (NEET / JEE / CUET)',
      name: 'JEE Main Photo',
      width: 200,
      height: 250,
      maxKB: 200,
      minKB: 10,
      format: 'image/jpeg',
      aspectRatio: 200 / 250,
      notes: 'Recent passport photo, 80% face visible. 10KB to 200KB.'
    },
    'jee-sign': {
      category: 'National Testing Agency (NEET / JEE / CUET)',
      name: 'JEE Main Signature',
      width: 140,
      height: 60,
      maxKB: 30,
      minKB: 4,
      format: 'image/jpeg',
      aspectRatio: 140 / 60,
      notes: 'Clear running handwriting signature. 4KB to 30KB.'
    },
    'gate-photo': {
      category: 'IIT / IISc (GATE)',
      name: 'GATE Photo',
      width: 480,
      height: 640,
      maxKB: 200,
      minKB: 20,
      format: 'image/jpeg',
      aspectRatio: 480 / 640,
      notes: 'High resolution passport photo. 20KB to 200KB.'
    },
    'gate-sign': {
      category: 'IIT / IISc (GATE)',
      name: 'GATE Signature',
      width: 280,
      height: 80,
      maxKB: 200,
      minKB: 5,
      format: 'image/jpeg',
      aspectRatio: 280 / 80,
      notes: 'Dark blue or black ink. 5KB to 200KB.'
    },
    'cuet-photo': {
      category: 'National Testing Agency (NEET / JEE / CUET)',
      name: 'CUET UG Photo',
      width: 200,
      height: 250,
      maxKB: 200,
      minKB: 10,
      format: 'image/jpeg',
      aspectRatio: 200 / 250,
      notes: 'White background, clear face. 10KB to 200KB.'
    },
    'cuet-sign': {
      category: 'National Testing Agency (NEET / JEE / CUET)',
      name: 'CUET UG Signature',
      width: 140,
      height: 60,
      maxKB: 30,
      minKB: 4,
      format: 'image/jpeg',
      aspectRatio: 140 / 60,
      notes: 'Clear signature on white paper. 4KB to 30KB.'
    },

    // State PSCs
    'state-psc-photo': {
      category: 'State Public Service Commissions',
      name: 'State PSC Standard Photo (BPSC / UPPSC / MPPSC)',
      width: 200,
      height: 230,
      maxKB: 50,
      minKB: 20,
      format: 'image/jpeg',
      aspectRatio: 200 / 230,
      notes: 'Standard 3.5cm x 4.5cm. 20KB to 50KB.'
    },
    'state-psc-sign': {
      category: 'State Public Service Commissions',
      name: 'State PSC Standard Signature',
      width: 140,
      height: 60,
      maxKB: 20,
      minKB: 10,
      format: 'image/jpeg',
      aspectRatio: 140 / 60,
      notes: 'Running handwriting on white paper. 10KB to 20KB.'
    },

    // Identity Documents
    'indian-passport': {
      category: 'Government Identity Documents',
      name: 'Indian Passport 35mm x 45mm Photo',
      width: 413,
      height: 531,
      maxKB: 200,
      minKB: 30,
      format: 'image/jpeg',
      aspectRatio: 413 / 531,
      notes: '35mm x 45mm @ 300 DPI, 70-80% face coverage.'
    },
    'pan-photo': {
      category: 'Government Identity Documents',
      name: 'PAN Card Photo (NSDL / UTIITSL)',
      width: 213,
      height: 213,
      maxKB: 30,
      minKB: 10,
      format: 'image/jpeg',
      aspectRatio: 1,
      notes: 'Strict 213x213 px at 300 DPI, under 30KB.'
    },
    'pan-sign': {
      category: 'Government Identity Documents',
      name: 'PAN Card Signature (NSDL / UTIITSL)',
      width: 400,
      height: 200,
      maxKB: 30,
      minKB: 10,
      format: 'image/jpeg',
      aspectRatio: 2,
      notes: 'Clear black ink, max 30KB.'
    },
    'aadhaar-photo': {
      category: 'Government Identity Documents',
      name: 'Aadhaar Card Portal Photo',
      width: 300,
      height: 300,
      maxKB: 100,
      minKB: 20,
      format: 'image/jpeg',
      aspectRatio: 1,
      notes: 'Recent colored photograph with plain white background.'
    }
  };

  // Expose presets globally for other pages / selectors
  window.FORMREADY_PRESETS = PRESETS;

  // -------------------------------------------------------------------------
  // Application State
  // -------------------------------------------------------------------------
  var state = {
    sourceImage: null, // HTMLImageElement
    originalFile: null, // File object
    originalSizeKB: 0,
    originalWidth: 0,
    originalHeight: 0,

    // Adjustment parameters
    targetWidth: 200,
    targetHeight: 230,
    targetKB: 50,
    targetFormat: 'image/jpeg', // 'image/jpeg', 'image/png', 'image/webp'
    lockAspectRatio: false,

    // Transformation
    zoom: 1.0,
    panX: 0,
    panY: 0,
    rotation: 0, // 0, 90, 180, 270
    flipH: false,
    flipV: false,
    bgColor: '#ffffff', // Background fill color for empty areas

    // Output result
    outputBlob: null,
    outputURL: null,
    outputSizeKB: 0,
    outputQuality: 0.92,
    isProcessing: false
  };

  // Canvas References
  var previewCanvas = null;
  var previewCtx = null;

  // DOM Element Cache
  var dom = {};

  // -------------------------------------------------------------------------
  // Initialization
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    cacheDomElements();
    if (!dom.toolSection) {
      return; // Not a page hosting the tool
    }

    initPresetDropdown();
    attachEventListeners();
    readUrlParameters();
  });

  function cacheDomElements() {
    dom.toolSection = document.getElementById('resizer-tool-section');
    if (!dom.toolSection) return;

    dom.dropzone = document.getElementById('dropzone');
    dom.fileInput = document.getElementById('file-input');
    dom.workbench = document.getElementById('workbench');
    dom.canvasContainer = document.getElementById('canvas-container');
    previewCanvas = document.getElementById('preview-canvas');
    if (previewCanvas) {
      previewCtx = previewCanvas.getContext('2d');
    }

    // Controls
    dom.presetSelect = document.getElementById('preset-select');
    dom.inputWidth = document.getElementById('target-width');
    dom.inputHeight = document.getElementById('target-height');
    dom.inputTargetKB = document.getElementById('target-kb');
    dom.selectFormat = document.getElementById('target-format');
    dom.checkLockAspect = document.getElementById('lock-aspect-ratio');
    dom.bgSelect = document.getElementById('bg-color-select');

    // Transform Controls
    dom.sliderZoom = document.getElementById('slider-zoom');
    dom.zoomValueDisplay = document.getElementById('zoom-val-display');
    dom.sliderPanX = document.getElementById('slider-pan-x');
    dom.sliderPanY = document.getElementById('slider-pan-y');
    dom.btnRotateCW = document.getElementById('btn-rotate-cw');
    dom.btnRotateCCW = document.getElementById('btn-rotate-ccw');
    dom.btnFlipH = document.getElementById('btn-flip-h');
    dom.btnResetTransform = document.getElementById('btn-reset-transform');

    // Stats
    dom.statOrigSize = document.getElementById('stat-orig-size');
    dom.statOrigDim = document.getElementById('stat-orig-dim');
    dom.statOutSize = document.getElementById('stat-out-size');
    dom.statOutDim = document.getElementById('stat-out-dim');
    dom.statStatusBadge = document.getElementById('stat-status-badge');

    // Action buttons
    dom.btnDownload = document.getElementById('btn-download');
    dom.btnUploadNew = document.getElementById('btn-upload-new');
    dom.presetNotice = document.getElementById('preset-notice');
  }

  // -------------------------------------------------------------------------
  // Populate Preset Dropdown Grouped by Exam Category
  // -------------------------------------------------------------------------
  function initPresetDropdown() {
    if (!dom.presetSelect) return;

    var currentCategory = '';
    var optGroup = null;

    // Default Custom Option
    var defaultOpt = document.createElement('option');
    defaultOpt.value = 'custom';
    defaultOpt.textContent = 'Custom Width, Height & KB';
    dom.presetSelect.appendChild(defaultOpt);

    for (var key in PRESETS) {
      if (PRESETS.hasOwnProperty(key)) {
        var preset = PRESETS[key];
        if (preset.category !== currentCategory) {
          currentCategory = preset.category;
          optGroup = document.createElement('optgroup');
          optGroup.label = currentCategory;
          dom.presetSelect.appendChild(optGroup);
        }
        var opt = document.createElement('option');
        opt.value = key;
        opt.textContent = preset.name + ' (' + preset.width + 'x' + preset.height + ' px, max ' + preset.maxKB + 'KB)';
        optGroup.appendChild(opt);
      }
    }
  }

  // -------------------------------------------------------------------------
  // URL Query Parameters Support (?preset=upsc-photo or ?w=200&h=230&kb=50)
  // -------------------------------------------------------------------------
  function readUrlParameters() {
    var params = new URLSearchParams(window.location.search);

    var presetParam = params.get('preset');
    if (presetParam && PRESETS[presetParam]) {
      if (dom.presetSelect) {
        dom.presetSelect.value = presetParam;
        applyPreset(presetParam);
      }
      return;
    }

    var w = parseInt(params.get('w'), 10);
    var h = parseInt(params.get('h'), 10);
    var kb = parseInt(params.get('kb'), 10);
    var fmt = params.get('format');

    if (w && !isNaN(w) && w > 10 && w < 8000) {
      state.targetWidth = w;
      if (dom.inputWidth) dom.inputWidth.value = w;
    }
    if (h && !isNaN(h) && h > 10 && h < 8000) {
      state.targetHeight = h;
      if (dom.inputHeight) dom.inputHeight.value = h;
    }
    if (kb && !isNaN(kb) && kb > 1 && kb <= 5000) {
      state.targetKB = kb;
      if (dom.inputTargetKB) dom.inputTargetKB.value = kb;
    }
    if (fmt && (fmt === 'jpeg' || fmt === 'png' || fmt === 'webp')) {
      state.targetFormat = 'image/' + fmt;
      if (dom.selectFormat) dom.selectFormat.value = state.targetFormat;
    }

    // Default mode check based on current page
    var pagePath = window.location.pathname.toLowerCase();
    if (pagePath.indexOf('signature-resizer') !== -1) {
      applyPreset('ssc-sign');
    } else if (pagePath.indexOf('photo-resizer') !== -1) {
      applyPreset('ssc-photo');
    } else if (pagePath.indexOf('compress-image-to-kb') !== -1) {
      if (!kb) {
        state.targetKB = 20;
        if (dom.inputTargetKB) dom.inputTargetKB.value = 20;
      }
    }
  }

  function applyPreset(key) {
    var preset = PRESETS[key];
    if (!preset) return;

    state.targetWidth = preset.width;
    state.targetHeight = preset.height;
    state.targetKB = preset.maxKB;
    state.targetFormat = preset.format;

    if (dom.inputWidth) dom.inputWidth.value = preset.width;
    if (dom.inputHeight) dom.inputHeight.value = preset.height;
    if (dom.inputTargetKB) dom.inputTargetKB.value = preset.maxKB;
    if (dom.selectFormat) dom.selectFormat.value = preset.format;

    highlightMatchingKbChip(preset.maxKB);

    if (dom.presetNotice) {
      dom.presetNotice.textContent = preset.name + ': ' + preset.notes;
      dom.presetNotice.style.display = 'block';
    }

    triggerRender();
  }

  // -------------------------------------------------------------------------
  // Event Listeners Wiring
  // -------------------------------------------------------------------------
  function attachEventListeners() {
    // Dropzone Drag & Drop
    if (dom.dropzone) {
      ['dragenter', 'dragover'].forEach(function (eventName) {
        dom.dropzone.addEventListener(eventName, function (e) {
          e.preventDefault();
          e.stopPropagation();
          dom.dropzone.classList.add('drag-active');
        }, false);
      });

      ['dragleave', 'drop'].forEach(function (eventName) {
        dom.dropzone.addEventListener(eventName, function (e) {
          e.preventDefault();
          e.stopPropagation();
          dom.dropzone.classList.remove('drag-active');
        }, false);
      });

      dom.dropzone.addEventListener('drop', function (e) {
        var dt = e.dataTransfer;
        var files = dt.files;
        if (files && files.length > 0) {
          handleFile(files[0]);
        }
      }, false);

      dom.dropzone.addEventListener('click', function () {
        if (dom.fileInput) dom.fileInput.click();
      });
    }

    if (dom.fileInput) {
      dom.fileInput.addEventListener('change', function (e) {
        if (e.target.files && e.target.files.length > 0) {
          handleFile(e.target.files[0]);
        }
      });
    }

    // Clipboard Paste Support (Ctrl+V anywhere on page)
    window.addEventListener('paste', function (e) {
      if (e.clipboardData && e.clipboardData.items) {
        var items = e.clipboardData.items;
        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            var blob = items[i].getAsFile();
            handleFile(blob);
            break;
          }
        }
      }
    });

    // Preset selector change
    if (dom.presetSelect) {
      dom.presetSelect.addEventListener('change', function () {
        var val = this.value;
        if (val === 'custom') {
          if (dom.presetNotice) dom.presetNotice.style.display = 'none';
        } else {
          applyPreset(val);
        }
      });
    }

    // Width & Height inputs
    if (dom.inputWidth) {
      dom.inputWidth.addEventListener('input', function () {
        var val = parseInt(this.value, 10);
        if (val > 10 && val <= 8000) {
          if (state.lockAspectRatio && state.targetWidth > 0 && state.targetHeight > 0) {
            var ratio = state.targetHeight / state.targetWidth;
            state.targetHeight = Math.round(val * ratio);
            if (dom.inputHeight) dom.inputHeight.value = state.targetHeight;
          }
          state.targetWidth = val;
          markPresetAsCustom();
          triggerRender();
        }
      });
    }

    if (dom.inputHeight) {
      dom.inputHeight.addEventListener('input', function () {
        var val = parseInt(this.value, 10);
        if (val > 10 && val <= 8000) {
          if (state.lockAspectRatio && state.targetWidth > 0 && state.targetHeight > 0) {
            var ratio = state.targetWidth / state.targetHeight;
            state.targetWidth = Math.round(val * ratio);
            if (dom.inputWidth) dom.inputWidth.value = state.targetWidth;
          }
          state.targetHeight = val;
          markPresetAsCustom();
          triggerRender();
        }
      });
    }

    // Aspect ratio lock checkbox
    if (dom.checkLockAspect) {
      dom.checkLockAspect.addEventListener('change', function () {
        state.lockAspectRatio = this.checked;
      });
    }

    // Target KB input
    if (dom.inputTargetKB) {
      dom.inputTargetKB.addEventListener('input', function () {
        var val = parseInt(this.value, 10);
        if (val > 1 && val <= 5000) {
          state.targetKB = val;
          highlightMatchingKbChip(val);
          markPresetAsCustom();
          triggerRender();
        }
      });
    }

    // Quick KB chips
    var kbChips = document.querySelectorAll('.kb-chip');
    kbChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var kb = parseInt(this.getAttribute('data-kb'), 10);
        if (kb && dom.inputTargetKB) {
          dom.inputTargetKB.value = kb;
          state.targetKB = kb;
          highlightMatchingKbChip(kb);
          markPresetAsCustom();
          triggerRender();
        }
      });
    });

    // Format selector
    if (dom.selectFormat) {
      dom.selectFormat.addEventListener('change', function () {
        state.targetFormat = this.value;
        markPresetAsCustom();
        triggerRender();
      });
    }

    // Background color select
    if (dom.bgSelect) {
      dom.bgSelect.addEventListener('change', function () {
        state.bgColor = this.value;
        triggerRender();
      });
    }

    // Zoom slider
    if (dom.sliderZoom) {
      dom.sliderZoom.addEventListener('input', function () {
        state.zoom = parseFloat(this.value);
        if (dom.zoomValueDisplay) {
          dom.zoomValueDisplay.textContent = Math.round(state.zoom * 100) + '%';
        }
        triggerRender();
      });
    }

    // Pan X & Pan Y
    if (dom.sliderPanX) {
      dom.sliderPanX.addEventListener('input', function () {
        state.panX = parseInt(this.value, 10);
        triggerRender();
      });
    }
    if (dom.sliderPanY) {
      dom.sliderPanY.addEventListener('input', function () {
        state.panY = parseInt(this.value, 10);
        triggerRender();
      });
    }

    // Rotate CW (90 deg)
    if (dom.btnRotateCW) {
      dom.btnRotateCW.addEventListener('click', function () {
        state.rotation = (state.rotation + 90) % 360;
        triggerRender();
      });
    }

    // Rotate CCW (90 deg)
    if (dom.btnRotateCCW) {
      dom.btnRotateCCW.addEventListener('click', function () {
        state.rotation = (state.rotation + 270) % 360;
        triggerRender();
      });
    }

    // Flip Horizontal
    if (dom.btnFlipH) {
      dom.btnFlipH.addEventListener('click', function () {
        state.flipH = !state.flipH;
        triggerRender();
      });
    }

    // Reset Transformation
    if (dom.btnResetTransform) {
      dom.btnResetTransform.addEventListener('click', function () {
        resetTransformations();
        triggerRender();
      });
    }

    // Upload New Image
    if (dom.btnUploadNew) {
      dom.btnUploadNew.addEventListener('click', function () {
        if (dom.fileInput) {
          dom.fileInput.value = '';
          dom.fileInput.click();
        }
      });
    }

    // Download Button
    if (dom.btnDownload) {
      dom.btnDownload.addEventListener('click', function () {
        downloadResult();
      });
    }
  }

  function markPresetAsCustom() {
    if (dom.presetSelect && dom.presetSelect.value !== 'custom') {
      dom.presetSelect.value = 'custom';
      if (dom.presetNotice) dom.presetNotice.style.display = 'none';
    }
  }

  function highlightMatchingKbChip(kb) {
    var kbChips = document.querySelectorAll('.kb-chip');
    kbChips.forEach(function (chip) {
      var chipKb = parseInt(chip.getAttribute('data-kb'), 10);
      if (chipKb === kb) {
        chip.classList.add('is-selected');
      } else {
        chip.classList.remove('is-selected');
      }
    });
  }

  function resetTransformations() {
    state.zoom = 1.0;
    state.panX = 0;
    state.panY = 0;
    state.rotation = 0;
    state.flipH = false;
    state.flipV = false;

    if (dom.sliderZoom) dom.sliderZoom.value = 1.0;
    if (dom.zoomValueDisplay) dom.zoomValueDisplay.textContent = '100%';
    if (dom.sliderPanX) dom.sliderPanX.value = 0;
    if (dom.sliderPanY) dom.sliderPanY.value = 0;
  }

  // -------------------------------------------------------------------------
  // File Loading & Validation
  // -------------------------------------------------------------------------
  function handleFile(file) {
    if (!file) return;

    // Validate MIME type
    var validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/gif', 'image/tiff'];
    if (validTypes.indexOf(file.type) === -1 && !/\.(jpe?g|png|webp|bmp|gif|tiff)$/i.test(file.name)) {
      showToast('Please upload a valid image file (JPG, PNG, WebP).', 'error');
      return;
    }

    // Maximum input size limit check (e.g. 50MB safeguard)
    if (file.size > 50 * 1024 * 1024) {
      showToast('Image file is too large (over 50MB). Please select a standard photo.', 'error');
      return;
    }

    state.originalFile = file;
    state.originalSizeKB = Math.round(file.size / 1024);

    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        state.sourceImage = img;
        state.originalWidth = img.naturalWidth || img.width;
        state.originalHeight = img.naturalHeight || img.height;

        // If target dimensions are unset or page is compress-to-kb, initialize intelligently
        var pagePath = window.location.pathname.toLowerCase();
        if (pagePath.indexOf('compress-image-to-kb') !== -1 && (!state.targetWidth || state.targetWidth === 200)) {
          state.targetWidth = state.originalWidth;
          state.targetHeight = state.originalHeight;
          if (dom.inputWidth) dom.inputWidth.value = state.originalWidth;
          if (dom.inputHeight) dom.inputHeight.value = state.originalHeight;
        }

        // Show Workbench UI
        if (dom.dropzone) dom.dropzone.style.display = 'none';
        if (dom.workbench) dom.workbench.style.display = 'grid';

        // Update Original Stats UI
        if (dom.statOrigSize) dom.statOrigSize.textContent = state.originalSizeKB + ' KB';
        if (dom.statOrigDim) dom.statOrigDim.textContent = state.originalWidth + ' x ' + state.originalHeight + ' px';

        resetTransformations();
        triggerRender();
        showToast('Image loaded successfully! Ready for processing.', 'success');
      };

      img.onerror = function () {
        showToast('Failed to load image. The file may be corrupted.', 'error');
      };

      img.src = e.target.result;
    };

    reader.onerror = function () {
      showToast('Error reading the selected file.', 'error');
    };

    reader.readAsDataURL(file);
  }

  // -------------------------------------------------------------------------
  // Rendering & Transformation on Canvas
  // -------------------------------------------------------------------------
  var renderDebounceTimeout = null;

  function triggerRender() {
    if (!state.sourceImage || !previewCanvas) return;

    if (renderDebounceTimeout) {
      clearTimeout(renderDebounceTimeout);
    }
    renderDebounceTimeout = setTimeout(function () {
      renderAndCompress();
    }, 40);
  }

  function renderAndCompress() {
    if (!state.sourceImage || !previewCanvas) return;

    var tw = Math.max(10, Math.min(8000, state.targetWidth || 200));
    var th = Math.max(10, Math.min(8000, state.targetHeight || 230));

    // Set canvas dimensions strictly to target pixel dimensions
    previewCanvas.width = tw;
    previewCanvas.height = th;

    // Fill background
    if (state.bgColor === 'transparent' && state.targetFormat === 'image/png') {
      previewCtx.clearRect(0, 0, tw, th);
    } else {
      previewCtx.fillStyle = state.bgColor || '#ffffff';
      previewCtx.fillRect(0, 0, tw, th);
    }

    // High quality downsampling smoothing
    previewCtx.imageSmoothingEnabled = true;
    previewCtx.imageSmoothingQuality = 'high';

    previewCtx.save();

    // Center origin to canvas center for rotation & scaling
    previewCtx.translate(tw / 2 + state.panX, th / 2 + state.panY);

    // Apply rotation
    if (state.rotation !== 0) {
      previewCtx.rotate((state.rotation * Math.PI) / 180);
    }

    // Apply flip
    var scaleX = state.flipH ? -1 : 1;
    var scaleY = state.flipV ? -1 : 1;
    previewCtx.scale(scaleX, scaleY);

    // Calculate source image draw dimensions to cover/fit
    var imgW = state.sourceImage.naturalWidth || state.sourceImage.width;
    var imgH = state.sourceImage.naturalHeight || state.sourceImage.height;

    // Determine scale based on rotation
    var isRotated90 = state.rotation === 90 || state.rotation === 270;
    var effectiveW = isRotated90 ? th : tw;
    var effectiveH = isRotated90 ? tw : th;

    // Default "Cover" calculation
    var scale = Math.max(effectiveW / imgW, effectiveH / imgH) * state.zoom;
    var drawW = imgW * scale;
    var drawH = imgH * scale;

    previewCtx.drawImage(state.sourceImage, -drawW / 2, -drawH / 2, drawW, drawH);

    previewCtx.restore();

    // Now execute Compression to target KB
    performCompression(tw, th);
  }

  // -------------------------------------------------------------------------
  // Binary Search JPEG/WebP Compression Engine
  // -------------------------------------------------------------------------
  function performCompression(targetWidth, targetHeight) {
    var format = state.targetFormat || 'image/jpeg';
    var maxAllowedBytes = (state.targetKB || 50) * 1024;

    // If format is PNG, standard canvas toBlob does not support quality parameter
    if (format === 'image/png') {
      previewCanvas.toBlob(function (blob) {
        finalizeBlob(blob, targetWidth, targetHeight, 1.0, maxAllowedBytes);
      }, 'image/png');
      return;
    }

    // Binary search quality parameter between 0.01 and 1.00
    var low = 0.01;
    var high = 1.00;
    var iterations = 10; // 2^10 = 1024 precision steps (~0.001 quality accuracy)
    var bestBlob = null;
    var bestQuality = 0.5;

    // Helper to evaluate quality step
    function testQuality(q) {
      return new Promise(function (resolve) {
        previewCanvas.toBlob(function (b) {
          resolve({ blob: b, quality: q });
        }, format, q);
      });
    }

    // Run first step at q = 0.95 to check if full quality already fits under target KB
    testQuality(0.95).then(function (result) {
      if (result.blob && result.blob.size <= maxAllowedBytes) {
        // Fits easily! Let's check 1.00
        return testQuality(1.0).then(function (resMax) {
          if (resMax.blob && resMax.blob.size <= maxAllowedBytes) {
            finalizeBlob(resMax.blob, targetWidth, targetHeight, 1.0, maxAllowedBytes);
          } else {
            finalizeBlob(result.blob, targetWidth, targetHeight, 0.95, maxAllowedBytes);
          }
        });
      }

      // Check lowest quality (0.01)
      return testQuality(0.01).then(function (resMin) {
        if (!resMin.blob || resMin.blob.size > maxAllowedBytes) {
          // Cannot reach target size even at minimum quality (due to huge dimensions)
          finalizeBlob(resMin.blob, targetWidth, targetHeight, 0.01, maxAllowedBytes, true);
          return;
        }

        // Binary search loop
        bestBlob = resMin.blob;
        bestQuality = 0.01;
        low = 0.01;
        high = 0.95;

        function runStep(step) {
          if (step >= iterations) {
            finalizeBlob(bestBlob, targetWidth, targetHeight, bestQuality, maxAllowedBytes);
            return;
          }

          var mid = (low + high) / 2;
          testQuality(mid).then(function (res) {
            if (res.blob && res.blob.size <= maxAllowedBytes) {
              bestBlob = res.blob;
              bestQuality = mid;
              low = mid; // Try higher quality
            } else {
              high = mid; // Needs stronger compression
            }
            runStep(step + 1);
          });
        }

        runStep(0);
      });
    });
  }

  function finalizeBlob(blob, tw, th, quality, maxBytes, isOverBudget) {
    if (!blob) return;

    if (state.outputURL) {
      URL.revokeObjectURL(state.outputURL);
    }

    state.outputBlob = blob;
    state.outputURL = URL.createObjectURL(blob);
    state.outputSizeKB = Math.round((blob.size / 1024) * 10) / 10;
    state.outputQuality = quality;

    // Update Output Stats UI
    if (dom.statOutSize) {
      dom.statOutSize.textContent = state.outputSizeKB + ' KB';
    }
    if (dom.statOutDim) {
      dom.statOutDim.textContent = tw + ' x ' + th + ' px';
    }

    if (dom.statStatusBadge) {
      if (blob.size <= maxBytes) {
        dom.statStatusBadge.className = 'stat-item-badge badge-success';
        dom.statStatusBadge.textContent = '✓ Ready for upload (' + state.outputSizeKB + ' KB / max ' + state.targetKB + ' KB)';
      } else {
        dom.statStatusBadge.className = 'stat-item-badge badge-danger';
        dom.statStatusBadge.textContent = '⚠ ' + state.outputSizeKB + ' KB (Exceeds ' + state.targetKB + ' KB limit)';
      }
    }

    if (isOverBudget) {
      showToast('Note: Output is ' + state.outputSizeKB + ' KB. The dimensions (' + tw + 'x' + th + ') are too large to compress below ' + state.targetKB + ' KB. Consider switching to JPG or slightly reducing dimensions.', 'info');
    }
  }

  // -------------------------------------------------------------------------
  // Download Result
  // -------------------------------------------------------------------------
  function downloadResult() {
    if (!state.outputBlob || !state.outputURL) {
      showToast('Please upload and process an image first.', 'error');
      return;
    }

    var ext = 'jpg';
    if (state.targetFormat === 'image/png') ext = 'png';
    if (state.targetFormat === 'image/webp') ext = 'webp';

    var presetVal = dom.presetSelect ? dom.presetSelect.value : 'custom';
    var filename = 'formready-' + (presetVal !== 'custom' ? presetVal : 'processed') + '-' + state.targetWidth + 'x' + state.targetHeight + '.' + ext;

    var downloadLink = document.createElement('a');
    downloadLink.href = state.outputURL;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    showToast('Downloaded ' + filename + ' (' + state.outputSizeKB + ' KB)!', 'success');
  }

  // -------------------------------------------------------------------------
  // Global Toast Notification Helper
  // -------------------------------------------------------------------------
  function showToast(message, type) {
    var container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'info');

    var iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    if (type === 'success') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    }

    toast.innerHTML = iconSvg + '<span>' + message + '</span>';
    container.appendChild(toast);

    setTimeout(function () {
      toast.classList.add('toast-show');
    }, 10);

    setTimeout(function () {
      toast.classList.remove('toast-show');
      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4500);
  }

  window.FormReadyToast = showToast;
})();

