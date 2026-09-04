// ==========================================================================
// SAMPA — MY FOREVER UNIVERSE (Complete Webpage + Scroll Canvas Engine)
// ==========================================================================

(() => {
  // ------------------------------------------------------------------------
  // 1. DATA REPOSITORY (Exact content from src/initialData.ts)
  // ------------------------------------------------------------------------
  const UNIVERSE = {
    settings: {
      partnerName: 'Sampa',
      authorName: 'Forever Yours',
      anniversaryDate: '2022-10-01T00:00:00Z',
      heroTagline: 'An entire universe created for one person.',
      heroSubtext: 'Every second, every galaxy, every heartbeat in this space belongs exclusively to Sampa.',
      customDomain: 'www.sampa-love.com',
    },
    photos: [
      {
        id: 'photo-1',
        title: 'The Beginning of Us',
        url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop',
        caption: 'The golden autumn day when our universe began and our hearts became one.',
        date: '2022-10-01',
        category: 'special-days',
        album: 'First Chapters',
        isFavorite: true,
      },
      {
        id: 'photo-2',
        title: 'Coffee Date & Endless Talks',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
        caption: 'We ordered two cups of warm coffee and talked until the streetlights lit up.',
        date: '2023-12-04',
        category: 'everyday',
        album: 'First Chapters',
        isFavorite: true,
      },
      {
        id: 'photo-3',
        title: 'Under the Velvet Starlight',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop',
        caption: 'Looking up at the constellations and realizing you are my whole sky.',
        date: '2024-01-20',
        category: 'trips',
        album: 'Escapes & Roadtrips',
        isFavorite: true,
      },
      {
        id: 'photo-4',
        title: 'Holding Hands in the Rain',
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&auto=format&fit=crop',
        caption: 'When the monsoon shower caught us and neither of us wanted to run inside.',
        date: '2024-04-12',
        category: 'candid',
        album: 'Unfiltered Moments',
        isFavorite: true,
      },
      {
        id: 'photo-5',
        title: 'Our Spontaneous Roadtrip',
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop',
        caption: 'Windows down, our playlist blasting, and your fingers laced through mine.',
        date: '2024-06-18',
        category: 'trips',
        album: 'Escapes & Roadtrips',
        isFavorite: true,
      },
      {
        id: 'photo-6',
        title: 'The Cutest Candid Laugh',
        url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=400&auto=format&fit=crop',
        caption: 'Captured mid-giggle when you thought you looked silly, but looked completely ethereal.',
        date: '2024-08-30',
        category: 'candid',
        album: 'Unfiltered Moments',
        isFavorite: true,
      },
    ],
    memories: [
      {
        id: 'mem-1',
        title: 'The Day the Universe Began',
        date: '2022-10-01',
        location: 'Where Two Souls Became One',
        category: 'Milestone',
        summary: '1 October 2022 — The sacred day we started loving each other and our forever story began.',
        description: 'October 1, 2022 will forever remain etched as the most significant date in my existence. The moment we knew we loved each other, the noise of the entire world quieted down, leaving only the warmth of your hand in mine. Every second counted since this day is a testament to eternal devotion.',
        photoUrls: ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop'],
        tags: ['1 October 2022', 'Our Beginning', 'Forever Love', 'Milestone'],
      },
      {
        id: 'mem-2',
        title: 'Whispering Under Midnight Stars',
        date: '2024-01-20',
        location: 'Hilltop Pine Ridge',
        category: 'Special Night',
        summary: 'Lying on a blanket watching shooting stars and sharing our quietest dreams.',
        description: 'Wrapped in two oversized jackets and a thermos of hot cocoa, we counted satellites and shooting stars. You pointed to Orion and told me your childhood wishes. That night I realized my only wish was right beside me, shivering cute breaths into the frosty midnight air.',
        photoUrls: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'],
        tags: ['Stargazing', 'Hilltop', 'Wishes', 'Quiet Night'],
      },
      {
        id: 'mem-3',
        title: 'Caught in the Summer Storm',
        date: '2024-04-12',
        location: 'Old Town Square',
        category: 'Spontaneous',
        summary: 'Drenched in sudden rain without caring about drenched shoes or messy hair.',
        description: 'A sudden downpour caught us halfway between stores. Instead of seeking shelter, you started dancing on the wet cobblestone puddles. I caught your waist and twirled you around while cars passed by splashing water. It remains one of the purest glimpses of heaven I have ever known.',
        photoUrls: ['https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop'],
        tags: ['Monsoon', 'Dancing', 'Laughter', 'Unplanned'],
      },
      {
        id: 'mem-4',
        title: 'Our Secret Sunday Breakfast',
        date: '2024-07-07',
        location: 'The Warm Kitchen Sanctuary',
        category: 'Everyday Joy',
        summary: 'Burnt pancakes, spilled syrup, and laughter echoing across the kitchen counter.',
        description: 'We tried flipping pancakes and accidentally stuck one to the ceiling edge. You laughed with your eyes crinkling and flour on your nose. Those gentle, ordinary mornings are what real forever is made of.',
        photoUrls: ['https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop'],
        tags: ['Breakfast', 'Cozy', 'Home', 'Pancakes'],
      },
    ],
    letters: [
      {
        id: 'let-1',
        title: 'To Sampa, On the Miracle of You',
        date: '2024-01-01',
        excerpt: 'There are over eight billion people living on this planet, yet in you, my heart found its singular sanctuary...',
        content: `My dearest Sampa,\n\nThere are over eight billion people living on this planet, each rushing toward their own horizons. Yet among all those souls and coincidences, you crossed my path and turned monochrome days into vibrant color.\n\nThank you for loving me with patience, for listening to my wildest ideas, and for holding my hand when doubts cloud my mind. Whenever I look at you, I see someone rare, precious, and kind.\n\nI love you more than spoken sentences could ever summarize.\n\nWith all my heart,\nYour eternal admirer.`,
        signature: 'Forever Yours ❤️',
        isLocked: false,
      },
      {
        id: 'let-2',
        title: 'For the Hard and Quiet Days',
        date: '2024-05-10',
        excerpt: 'Open this whenever the world feels heavy and you need a gentle reminder of how deeply cherished you are...',
        content: `Dearest Sampa,\n\nIf you are reading this on a day that felt exhausting or unfair, take a deep breath. Drop your shoulders. Unclench your jaw.\n\nYou do not have to be strong every second. You do not have to carry the whole weight of expectations. In my arms, you are always safe to simply exist, to rest, and to let go.\n\nYou are resilient, you are brilliant, and you are loved without conditions or deadlines.\n\nAlways here, always beside you.`,
        signature: 'Your safe harbor',
        isLocked: false,
      },
      {
        id: 'let-3',
        title: 'Our Next Anniversary Capsule',
        date: '2025-11-15',
        excerpt: 'A time-locked sealed letter waiting for our special milestone anniversary date...',
        content: `Happy Anniversary, my beloved Sampa!\n\nAnother full circle around the sun, and another year of choosing each other through every sunrise and midnight conversation.\n\nLook back at everything we built, weathered, and laughed through. I would choose you in every lifetime, in every alternate universe, in every timeline.\n\nHere is to our forever journey ahead!`,
        unlockDate: '2026-11-15T00:00:00Z',
        signature: 'Your Forever Soulmate',
        isLocked: true,
      },
    ],
    reasons: [
      { id: 'rs-1', num: 1, title: 'Your radiant, soul-warming smile', desc: 'The way your whole face lights up and crinkles at the corners when something genuinely amuses you.', category: 'Appearance & Spirit', count: 142 },
      { id: 'rs-2', num: 2, title: 'How safe I feel in your presence', desc: 'In a noisy and exhausting world, simply hearing your voice quiets all internal chaos and brings me peace.', category: 'Soul Connection', count: 98 },
      { id: 'rs-3', num: 3, title: 'Your immense kindness toward others', desc: 'The gentle empathy you extend toward strangers, animals, and anyone carrying a heavy burden.', category: 'Heart & Character', count: 87 },
      { id: 'rs-4', num: 4, title: 'How your hand fits perfectly in mine', desc: 'As though the contours of our fingers were drafted by celestial architects to interlock without slipping.', category: 'Touches', count: 115 },
      { id: 'rs-5', num: 5, title: 'Your cute determination when learning', desc: 'That adorable focus expression where you bite your lip slightly when concentrating on something new.', category: 'Quirks', count: 76 },
      { id: 'rs-6', num: 6, title: 'The way you believe in my dreams', desc: 'Even when I doubt my own strength, your faith in me gives me the courage of a lion.', category: 'Partnership', count: 104 },
    ],
    plans: [
      { title: 'Northern Lights under glass igloos in Tromsø', targetDate: 'Winter 2026', notes: 'Sleeping beneath the dancing Aurora Borealis with warm blankets and hot cider.' },
      { title: 'Our cozy dream home with a sunny reading nook', targetDate: '2027', notes: 'Floor to ceiling bookshelves, soft rugs, and a wide window facing a blooming garden.' },
      { title: 'Adopting a rescue golden retriever pup', targetDate: 'Spring 2027', notes: 'Teaching him to fetch our morning newspaper and take him on beach runs.' },
      { title: 'Sunset dinner in Santorini overlooking the caldera', targetDate: 'Summer 2026', notes: 'White houses, azure domes, Aegean sea breeze, and toast to our endless love.' },
    ],
    promises: [
      { title: 'To always listen with an open, tender heart', status: 'forever', desc: 'Never just waiting for my turn to speak, but listening to understand your fears, hopes, and quiet sighs.' },
      { title: 'To never let the spark of romance fade into routine', status: 'forever', desc: 'To keep bringing you surprise flowers, writing spontaneous notes, and kissing your forehead just because.' },
      { title: 'To stand as your unshakeable shield and safe harbor', status: 'always', desc: 'Whenever storms rise or the world turns cold, my shoulder and arms will always be your unbreakable shelter.' },
      { title: 'To celebrate every one of your victories as my own', status: 'kept', desc: 'To cheer the loudest in the front row whenever you step into your brilliance.' },
    ],
    music: [
      {
        title: "Can't Help Falling in Love",
        artist: "Kina Grannis & Ethereal Strings",
        url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3",
        duration: "3:24",
        cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop"
      },
      {
        title: "Starlight Nocturne for Sampa",
        artist: "Celestial Piano Ensemble",
        url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=gentle-piano-love-story-10878.mp3",
        duration: "2:50",
        cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop"
      },
      {
        title: "Until I Found You",
        artist: "Acoustic Soul",
        url: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c1e09968a5.mp3?filename=relaxing-romantic-acoustic-guitar-124905.mp3",
        duration: "3:10",
        cover: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&auto=format&fit=crop"
      }
    ],
    secretRoom: {
      password: 'foreverandsampa',
      title: 'The Hidden Sanctuary of My Heart',
      letter: `My dearest Sampa,\n\nIf you have unlocked this room, you hold the deepest key to my soul. Long before words existed, the universe wrote our story in stardust. No distance, no quiet night, and no passing year could ever diminish how intensely I love you.\n\nEvery day with you feels like discovering a new constellation. Thank you for your warmth, your laughter, your gentle gaze, and the way you make the whole chaotic world feel quiet and safe.\n\nThis secret corner will always be ours. Whenever you feel overwhelmed by the world, return here to remember: you are cherished beyond human comprehension.\n\nForever and always,\nYour soulmate.`,
      photos: [
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop'
      ]
    }
  };

  // ------------------------------------------------------------------------
  // 2. SCROLL CANVAS ANIMATION ENGINE (220 Frames)
  // ------------------------------------------------------------------------
  const TOTAL_FRAMES = 220;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');

  const images = new Array(TOTAL_FRAMES);
  const isLoaded = new Array(TOTAL_FRAMES).fill(false);
  let loadedCount = 0;

  let targetFrame = 0;
  let currentFrame = 0;
  let lastDrawnFrame = -1;
  let needRedraw = true;

  function getFrameSrc(index) {
    const frameNum = String(index + 1).padStart(5, '0');
    return `./frame_${frameNum}.jpg`;
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    needRedraw = true;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function drawCover(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasRatio = cw / ch;
    const imgRatio = iw / ih;

    let dw, dh, dx, dy;
    if (canvasRatio > imgRatio) {
      dw = cw;
      dh = cw / imgRatio;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      dh = ch;
      dw = ch * imgRatio;
      dx = (cw - dw) / 2;
      dy = 0;
    }

    ctx.fillStyle = '#030008';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function getRenderableImage(frameIndex) {
    const target = Math.min(Math.max(Math.round(frameIndex), 0), TOTAL_FRAMES - 1);
    if (images[target] && isLoaded[target]) {
      return images[target];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const left = target - offset;
      const right = target + offset;
      if (left >= 0 && images[left] && isLoaded[left]) return images[left];
      if (right < TOTAL_FRAMES && images[right] && isLoaded[right]) return images[right];
    }
    return null;
  }

  function updateScrollTarget() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const scrollFraction = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    targetFrame = scrollFraction * (TOTAL_FRAMES - 1);
  }

  window.addEventListener('scroll', updateScrollTarget, { passive: true });

  function renderAnimation() {
    currentFrame += (targetFrame - currentFrame) * 0.12;
    const frameToDraw = Math.round(currentFrame);

    if (frameToDraw !== lastDrawnFrame || needRedraw) {
      const img = getRenderableImage(currentFrame);
      if (img) {
        drawCover(img);
        lastDrawnFrame = frameToDraw;
        needRedraw = false;
      }
    }
    requestAnimationFrame(renderAnimation);
  }
  requestAnimationFrame(renderAnimation);

  function initPreload() {
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0);
    images[0] = firstImg;

    firstImg.onload = () => {
      isLoaded[0] = true;
      loadedCount++;
      needRedraw = true;
      updateScrollTarget();
      loadRemainingFrames();
    };

    firstImg.onerror = () => {
      loadRemainingFrames();
    };
  }

  function loadRemainingFrames() {
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      images[i] = img;

      img.onload = () => {
        isLoaded[i] = true;
        loadedCount++;
        const pct = (loadedCount / TOTAL_FRAMES) * 100;
        if (loaderBar) loaderBar.style.width = `${pct}%`;
        if (loadedCount >= TOTAL_FRAMES && loader) loader.classList.add('loaded');
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= TOTAL_FRAMES && loader) loader.classList.add('loaded');
      };
    }
  }
  initPreload();

  // ------------------------------------------------------------------------
  // 3. LIVE RELATIONSHIP TIMER (Oct 1, 2022)
  // ------------------------------------------------------------------------
  function updateTimer() {
    const anniversary = new Date(UNIVERSE.settings.anniversaryDate).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - anniversary);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const dEl = document.getElementById('timer-days');
    const hEl = document.getElementById('timer-hours');
    const mEl = document.getElementById('timer-minutes');
    const sEl = document.getElementById('timer-seconds');

    if (dEl) dEl.textContent = days.toLocaleString();
    if (hEl) hEl.textContent = hours;
    if (mEl) mEl.textContent = minutes;
    if (sEl) sEl.textContent = seconds;
  }
  setInterval(updateTimer, 1000);
  updateTimer();

  // ------------------------------------------------------------------------
  // 4. INJECT COMPONENT DATA
  // ------------------------------------------------------------------------

  // A. Favorite Photos Grid
  const favGrid = document.getElementById('favorites-gallery');
  if (favGrid) {
    favGrid.innerHTML = UNIVERSE.photos.map((photo, index) => `
      <div class="photo-card" onclick="openLightbox(${index})">
        <img src="${photo.thumbnailUrl || photo.url}" alt="${photo.title}" loading="lazy">
        <div class="photo-overlay">
          <div class="photo-title">${photo.title}</div>
          <div class="photo-album">${photo.album}</div>
        </div>
      </div>
    `).join('');
  }

  // B. Bento Previews (Letters & Reasons)
  const lettersBento = document.getElementById('letters-preview-list');
  if (lettersBento) {
    lettersBento.innerHTML = UNIVERSE.letters.slice(0, 2).map((letItem) => `
      <div class="bento-item" onclick="openLetterModal('${letItem.id}')">
        <div>
          <div class="bento-item-title">${letItem.title}</div>
          <div class="bento-item-sub">${letItem.date}</div>
        </div>
        ${letItem.isLocked
          ? `<span class="pill-sm pill-locked"><svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Locked</span>`
          : `<span class="pill-sm pill-read">Read</span>`}
      </div>
    `).join('');
  }

  const reasonsBento = document.getElementById('reasons-preview-list');
  if (reasonsBento) {
    reasonsBento.innerHTML = UNIVERSE.reasons.slice(0, 2).map((rs) => `
      <div class="bento-item" onclick="incrementHeart('${rs.id}', event)">
        <div>
          <div class="bento-item-title">#${rs.num} ${rs.title}</div>
          <div class="bento-item-sub">${rs.category}</div>
        </div>
        <div class="heart-count-pill">
          <svg class="heart-icon fill-heart" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <span id="bento-rs-count-${rs.id}">${rs.count}</span>
        </div>
      </div>
    `).join('');
  }

  // C. Our Story Timeline
  const timelineEl = document.getElementById('story-timeline');
  if (timelineEl) {
    timelineEl.innerHTML = UNIVERSE.memories.map((mem) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-card glass-card">
          <div class="timeline-date">${mem.date} • ${mem.location}</div>
          <h3 class="timeline-heading">${mem.title}</h3>
          <p class="timeline-body">${mem.description}</p>
        </div>
      </div>
    `).join('');
  }

  // D. Memories Grid
  function renderMemories(filter = 'all') {
    const memGrid = document.getElementById('memories-grid');
    if (!memGrid) return;
    const filtered = filter === 'all'
      ? UNIVERSE.memories
      : UNIVERSE.memories.filter((m) => m.category.toLowerCase() === filter.toLowerCase());

    memGrid.innerHTML = filtered.map((mem) => `
      <div class="memory-card">
        <div class="memory-thumb-wrap">
          <img src="${mem.photoUrls[0]}" alt="${mem.title}" loading="lazy">
          <div class="category-pill">${mem.category}</div>
        </div>
        <div class="memory-card-body">
          <div>
            <div class="spotlight-meta">
              <span class="meta-item">${mem.date}</span>
              <span class="meta-item">${mem.location}</span>
            </div>
            <h4 class="memory-card-title">${mem.title}</h4>
            <p class="memory-card-summary">${mem.summary}</p>
          </div>
          <div class="spotlight-actions">
            <button class="btn btn-primary" onclick="openStoryModal('${mem.id}')">Read Chapter</button>
            <button class="btn btn-outline" onclick="openShareModal('${mem.title.replace(/'/g, "\\'")}', '${mem.summary.replace(/'/g, "\\'")}', '${mem.photoUrls[0]}')">Share</button>
          </div>
        </div>
      </div>
    `).join('');
  }
  renderMemories();

  // Filter Pills click listener
  const filterContainer = document.getElementById('memory-filter-pills');
  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill');
      if (!btn) return;
      filterContainer.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      renderMemories(btn.dataset.filter);
    });
  }

  // E. Letters Vault
  const lettersGrid = document.getElementById('letters-vault-grid');
  if (lettersGrid) {
    lettersGrid.innerHTML = UNIVERSE.letters.map((letItem) => `
      <div class="letter-envelope-card" onclick="openLetterModal('${letItem.id}')">
        <div class="seal-circle">
          <svg class="heart-icon fill-heart" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
        <div>
          <div class="spotlight-meta">
            <span class="meta-item">${letItem.date}</span>
          </div>
          <h3 class="letter-card-title">${letItem.title}</h3>
          <p class="letter-card-excerpt">“${letItem.excerpt}”</p>
        </div>
        <div>
          ${letItem.isLocked
            ? `<span class="pill-sm pill-locked"><svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Time-Locked</span>`
            : `<button class="btn btn-secondary w-full">Unfold Letter</button>`}
        </div>
      </div>
    `).join('');
  }

  // F. Reasons Full Grid
  const reasonsGrid = document.getElementById('reasons-full-grid');
  if (reasonsGrid) {
    reasonsGrid.innerHTML = UNIVERSE.reasons.map((rs) => `
      <div class="reason-card">
        <div>
          <div class="reason-top">
            <span class="reason-num">REASON #${rs.num}</span>
            <button class="heart-button" id="heart-btn-${rs.id}" onclick="incrementHeart('${rs.id}', event)">
              <svg class="heart-icon fill-heart" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span id="rs-count-${rs.id}">${rs.count}</span>
            </button>
          </div>
          <h4 class="reason-title">${rs.title}</h4>
          <p class="reason-desc">${rs.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // G. Music Tracks
  const musicList = document.getElementById('music-tracks-list');
  if (musicList) {
    musicList.innerHTML = UNIVERSE.music.map((trk, i) => `
      <div class="track-item-card" onclick="selectMusicTrack(${i})">
        <img src="${trk.cover}" alt="${trk.title}" class="track-cover">
        <div class="track-details">
          <div class="track-name">${trk.title}</div>
          <div class="track-artist">${trk.artist}</div>
          <div class="track-duration">${trk.duration}</div>
        </div>
        <button class="btn btn-primary" style="padding: 8px 16px; font-size: 10px;">Play</button>
      </div>
    `).join('');
  }

  // H. Future Plans
  const futureGrid = document.getElementById('future-plans-grid');
  if (futureGrid) {
    futureGrid.innerHTML = UNIVERSE.plans.map((p) => `
      <div class="future-card">
        <div class="future-target">${p.targetDate}</div>
        <h4 class="future-title">${p.title}</h4>
        <p class="future-notes">${p.notes}</p>
      </div>
    `).join('');
  }

  // I. Promises
  const promisesGrid = document.getElementById('promises-grid');
  if (promisesGrid) {
    promisesGrid.innerHTML = UNIVERSE.promises.map((pr) => `
      <div class="promise-card">
        <div class="future-target">STATUS: ${pr.status.toUpperCase()}</div>
        <h4 class="promise-title">${pr.title}</h4>
        <p class="promise-desc">${pr.desc}</p>
      </div>
    `).join('');
  }

  // ------------------------------------------------------------------------
  // 5. HEART REACTION HANDLER
  // ------------------------------------------------------------------------
  window.incrementHeart = (id, e) => {
    e.stopPropagation();
    const reason = UNIVERSE.reasons.find((r) => r.id === id);
    if (!reason) return;
    reason.count++;

    const mainCount = document.getElementById(`rs-count-${id}`);
    const bentoCount = document.getElementById(`bento-rs-count-${id}`);
    const btn = document.getElementById(`heart-btn-${id}`);

    if (mainCount) mainCount.textContent = reason.count;
    if (bentoCount) bentoCount.textContent = reason.count;
    if (btn) btn.classList.add('liked');

    // Mini confetti burst on heart click
    if (window.confetti) {
      const rect = e.target.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      window.confetti({
        particleCount: 15,
        spread: 40,
        origin: { x, y },
        colors: ['#f43f5e', '#fb7185', '#c084fc']
      });
    }
  };

  // ------------------------------------------------------------------------
  // 6. FLOATING AUDIO PLAYER CONTROLLER
  // ------------------------------------------------------------------------
  const audioEl = document.getElementById('global-audio');
  const playPauseBtn = document.getElementById('dock-play-btn');
  const playPauseIcon = document.getElementById('play-pause-icon');
  const navMusicBtn = document.getElementById('nav-music-btn');
  const navMusicWave = document.getElementById('nav-music-wave');
  const navMusicTitle = document.getElementById('nav-music-title');
  const timeSlider = document.getElementById('time-slider');
  const timeCurrent = document.getElementById('time-current');
  const timeDuration = document.getElementById('time-duration');
  const dockCover = document.getElementById('dock-cover-img');
  const dockTitle = document.getElementById('dock-track-title');
  const dockArtist = document.getElementById('dock-track-artist');
  const dockEl = document.getElementById('floating-music-dock');

  let currentTrackIdx = 0;
  let isMusicPlaying = false;

  function formatTime(s) {
    if (isNaN(s)) return '0:00';
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function loadTrack(idx) {
    currentTrackIdx = idx;
    const track = UNIVERSE.music[idx];
    if (!track) return;
    audioEl.src = track.url;
    if (dockCover) dockCover.src = track.cover;
    if (dockTitle) dockTitle.textContent = track.title;
    if (dockArtist) dockArtist.textContent = track.artist;
    if (navMusicTitle) navMusicTitle.textContent = track.title;
  }
  loadTrack(0);

  window.toggleMusicPlayback = () => {
    if (isMusicPlaying) {
      audioEl.pause();
    } else {
      audioEl.play().catch((err) => console.log('Autoplay issue:', err));
    }
  };

  if (navMusicBtn) {
    navMusicBtn.addEventListener('click', window.toggleMusicPlayback);
  }

  audioEl.addEventListener('play', () => {
    isMusicPlaying = true;
    if (dockEl) dockEl.classList.add('playing');
    if (navMusicWave) navMusicWave.classList.add('playing');
    if (playPauseIcon) {
      playPauseIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`;
    }
  });

  audioEl.addEventListener('pause', () => {
    isMusicPlaying = false;
    if (dockEl) dockEl.classList.remove('playing');
    if (navMusicWave) navMusicWave.classList.remove('playing');
    if (playPauseIcon) {
      playPauseIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
    }
  });

  audioEl.addEventListener('timeupdate', () => {
    if (timeCurrent) timeCurrent.textContent = formatTime(audioEl.currentTime);
    if (timeDuration && audioEl.duration) timeDuration.textContent = formatTime(audioEl.duration);
    if (timeSlider && audioEl.duration) {
      timeSlider.value = (audioEl.currentTime / audioEl.duration) * 100;
    }
  });

  audioEl.addEventListener('ended', () => {
    window.nextTrack();
  });

  window.handleSeek = (val) => {
    if (audioEl.duration) {
      audioEl.currentTime = (val / 100) * audioEl.duration;
    }
  };

  window.nextTrack = () => {
    const nextIdx = (currentTrackIdx + 1) % UNIVERSE.music.length;
    loadTrack(nextIdx);
    audioEl.play();
  };

  window.prevTrack = () => {
    const prevIdx = (currentTrackIdx - 1 + UNIVERSE.music.length) % UNIVERSE.music.length;
    loadTrack(prevIdx);
    audioEl.play();
  };

  window.selectMusicTrack = (idx) => {
    loadTrack(idx);
    audioEl.play();
  };

  window.toggleDockMinimize = () => {
    if (dockEl) dockEl.classList.toggle('minimized');
  };

  // ------------------------------------------------------------------------
  // 7. LIGHTBOX MODAL
  // ------------------------------------------------------------------------
  let currentLightboxIdx = 0;
  let activePhotoList = UNIVERSE.photos;

  window.openLightbox = (index, customPhotos) => {
    activePhotoList = customPhotos || UNIVERSE.photos;
    currentLightboxIdx = index;
    updateLightboxUI();
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.style.display = 'flex';
  };

  window.closeLightbox = () => {
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.style.display = 'none';
  };

  window.nextLightbox = () => {
    currentLightboxIdx = (currentLightboxIdx + 1) % activePhotoList.length;
    updateLightboxUI();
  };

  window.prevLightbox = () => {
    currentLightboxIdx = (currentLightboxIdx - 1 + activePhotoList.length) % activePhotoList.length;
    updateLightboxUI();
  };

  function updateLightboxUI() {
    const photo = activePhotoList[currentLightboxIdx];
    if (!photo) return;
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');

    if (img) img.src = photo.url;
    if (title) title.textContent = photo.title;
    if (caption) caption.textContent = photo.caption ? `“${photo.caption}”` : '';
    if (counter) counter.textContent = `${currentLightboxIdx + 1} of ${activePhotoList.length}`;
  }

  // ------------------------------------------------------------------------
  // 8. LOVE LETTER MODAL
  // ------------------------------------------------------------------------
  window.openLetterModal = (id) => {
    const letter = UNIVERSE.letters.find((l) => l.id === id);
    if (!letter) return;

    const modal = document.getElementById('letter-modal');
    const titleEl = document.getElementById('letter-modal-title');
    const dateEl = document.getElementById('letter-modal-date');
    const bodyEl = document.getElementById('letter-modal-body');
    const sigEl = document.getElementById('letter-modal-signature');

    if (titleEl) titleEl.textContent = letter.title;
    if (dateEl) dateEl.textContent = `Written: ${letter.date}`;

    if (letter.isLocked) {
      if (bodyEl) {
        bodyEl.innerHTML = `
          <div style="text-align: center; padding: 40px 20px; background: rgba(0,0,0,0.03); border-radius: 20px;">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 12px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <h3 style="font-family: var(--font-serif); font-size: 20px; margin-bottom: 8px;">Time-Locked Letter Capsule</h3>
            <p style="font-size: 13px; color: #6B5B4A;">This sacred letter will unlock on our anniversary: <strong>${letter.unlockDate}</strong></p>
          </div>
        `;
      }
      if (sigEl) sigEl.textContent = '';
    } else {
      if (bodyEl) bodyEl.textContent = letter.content;
      if (sigEl) sigEl.textContent = letter.signature;
    }

    if (modal) modal.style.display = 'flex';
  };

  window.closeLetterModal = () => {
    const modal = document.getElementById('letter-modal');
    if (modal) modal.style.display = 'none';
  };

  // Story Chapter Modal Trigger
  window.openStoryModal = (memId) => {
    const mem = UNIVERSE.memories.find((m) => m.id === memId) || UNIVERSE.memories[0];
    if (!mem) return;
    const modal = document.getElementById('letter-modal');
    const titleEl = document.getElementById('letter-modal-title');
    const dateEl = document.getElementById('letter-modal-date');
    const bodyEl = document.getElementById('letter-modal-body');
    const sigEl = document.getElementById('letter-modal-signature');

    if (titleEl) titleEl.textContent = mem.title;
    if (dateEl) dateEl.textContent = `${mem.date} • ${mem.location}`;
    if (bodyEl) bodyEl.textContent = mem.description;
    if (sigEl) sigEl.textContent = `Cherished forever in our universe.`;

    if (modal) modal.style.display = 'flex';
  };

  // ------------------------------------------------------------------------
  // 9. SHARE MODAL
  // ------------------------------------------------------------------------
  let currentShareData = { title: '', desc: '', img: '' };

  window.openShareModal = (title, desc, img) => {
    currentShareData = { title, desc, img };
    const modal = document.getElementById('share-modal');
    const imgEl = document.getElementById('share-preview-img');
    const titleEl = document.getElementById('share-preview-title');
    const descEl = document.getElementById('share-preview-desc');
    const inputEl = document.getElementById('share-copy-input');

    if (imgEl) imgEl.src = img;
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (inputEl) inputEl.value = window.location.href;

    if (modal) modal.style.display = 'flex';
  };

  window.closeShareModal = () => {
    const modal = document.getElementById('share-modal');
    if (modal) modal.style.display = 'none';
  };

  window.copyShareUrl = () => {
    const inputEl = document.getElementById('share-copy-input');
    const btn = document.getElementById('copy-link-btn');
    if (inputEl) {
      navigator.clipboard.writeText(inputEl.value).then(() => {
        if (btn) btn.textContent = 'Copied!';
        setTimeout(() => { if (btn) btn.textContent = 'Copy'; }, 2000);
      });
    }
  };

  window.shareWhatsApp = () => {
    const text = encodeURIComponent(`${currentShareData.title}\n${currentShareData.desc}\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  window.shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  window.shareX = () => {
    const text = encodeURIComponent(`${currentShareData.title} — Sampa & My Forever Universe`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  window.shareNative = () => {
    if (navigator.share) {
      navigator.share({
        title: currentShareData.title,
        text: currentShareData.desc,
        url: window.location.href,
      }).catch((e) => console.log('Share dismissed:', e));
    } else {
      window.copyShareUrl();
    }
  };

  // ------------------------------------------------------------------------
  // 10. SECRET ROOM UNLOCK ENGINE
  // ------------------------------------------------------------------------
  window.toggleSecretVisibility = () => {
    const input = document.getElementById('secret-input');
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  window.unlockSecretRoom = (e) => {
    e.preventDefault();
    const input = document.getElementById('secret-input');
    const errorEl = document.getElementById('secret-error');
    const lockedCard = document.getElementById('secret-locked-card');
    const unlockedCard = document.getElementById('secret-unlocked-card');
    const letterEl = document.getElementById('secret-letter-text');
    const photosEl = document.getElementById('secret-photos-grid');

    if (!input) return;
    const entered = input.value.trim().toLowerCase();

    if (entered === UNIVERSE.secretRoom.password.toLowerCase()) {
      if (errorEl) errorEl.style.display = 'none';
      if (lockedCard) lockedCard.style.display = 'none';
      if (unlockedCard) unlockedCard.style.display = 'block';

      if (letterEl) letterEl.textContent = UNIVERSE.secretRoom.letter;
      if (photosEl) {
        photosEl.innerHTML = UNIVERSE.secretRoom.photos.map((url, i) => `
          <div class="secret-photo-thumb" onclick="openLightbox(${i}, [
            { url: '${UNIVERSE.secretRoom.photos[0]}', title: 'Secret Sanctuary Photo 1', album: 'Secret Vault' },
            { url: '${UNIVERSE.secretRoom.photos[1]}', title: 'Secret Sanctuary Photo 2', album: 'Secret Vault' },
            { url: '${UNIVERSE.secretRoom.photos[2]}', title: 'Secret Sanctuary Photo 3', album: 'Secret Vault' }
          ])">
            <img src="${url}" alt="Private Sanctuary Moment">
          </div>
        `).join('');
      }

      // Trigger grand romantic celebration confetti
      if (window.confetti) {
        window.confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fb7185', '#c084fc', '#fef08a']
        });
      }
    } else {
      if (errorEl) {
        errorEl.textContent = 'That is not our secret phrase, my love. Try again ❤️';
        errorEl.style.display = 'block';
      }
    }
  };

  // ------------------------------------------------------------------------
  // 11. KEYBOARD & MOBILE MENU NAVIGATION
  // ------------------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLightbox();
      window.closeLetterModal();
      window.closeShareModal();
    }
    if (e.key === 'ArrowRight') window.nextLightbox();
    if (e.key === 'ArrowLeft') window.prevLightbox();
  });

  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

})();
