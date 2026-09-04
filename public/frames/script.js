// ==========================================================================
// SAMPA — MY FOREVER UNIVERSE (Complete Webpage + Scroll Engine + Admin Panel)
// ==========================================================================

(() => {
  // Secure SHA-256 hash of admin password
  const ADMIN_PASS_HASH = '60bf237a8e760b9bf28d82a7a09df954a27bbf83278bead64fcc71a9efabb9ec';

  async function sha256Hex(str) {
    try {
      const buf = new TextEncoder().encode(str);
      const hashBuf = await crypto.subtle.digest('SHA-256', buf);
      return Array.from(new Uint8Array(hashBuf)).map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return '';
    }
  }

  // ------------------------------------------------------------------------
  // 1. DEFAULT DATA REPOSITORY
  // ------------------------------------------------------------------------
  const DEFAULT_UNIVERSE = {
    settings: {
      partnerName: 'Sampa',
      authorName: 'Forever Yours',
      anniversaryDate: '2022-10-01T00:00:00Z',
      heroTagline: 'An entire universe created for one person.',
      heroSubtext: 'Every second, every galaxy, every heartbeat in this space belongs exclusively to Sampa.',
      customDomain: 'www.sampa-love.com',
      spotlightPhotoUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop',
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
        unlockDate: '2026-11-15',
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
      { id: 'plan-1', title: 'Northern Lights under glass igloos in Tromsø', targetDate: 'Winter 2026', notes: 'Sleeping beneath the dancing Aurora Borealis with warm blankets and hot cider.' },
      { id: 'plan-2', title: 'Our cozy dream home with a sunny reading nook', targetDate: '2027', notes: 'Floor to ceiling bookshelves, soft rugs, and a wide window facing a blooming garden.' },
      { id: 'plan-3', title: 'Adopting a rescue golden retriever pup', targetDate: 'Spring 2027', notes: 'Teaching him to fetch our morning newspaper and take him on beach runs.' },
      { id: 'plan-4', title: 'Sunset dinner in Santorini overlooking the caldera', targetDate: 'Summer 2026', notes: 'White houses, azure domes, Aegean sea breeze, and toast to our endless love.' },
    ],
    promises: [
      { id: 'prom-1', title: 'To always listen with an open, tender heart', status: 'forever', desc: 'Never just waiting for my turn to speak, but listening to understand your fears, hopes, and quiet sighs.' },
      { id: 'prom-2', title: 'To never let the spark of romance fade into routine', status: 'forever', desc: 'To keep bringing you surprise flowers, writing spontaneous notes, and kissing your forehead just because.' },
      { id: 'prom-3', title: 'To stand as your unshakeable shield and safe harbor', status: 'always', desc: 'Whenever storms rise or the world turns cold, my shoulder and arms will always be your unbreakable shelter.' },
      { id: 'prom-4', title: 'To celebrate every one of your victories as my own', status: 'kept', desc: 'To cheer the loudest in the front row whenever you step into your brilliance.' },
    ],
    music: [
      {
        id: 'trk-1',
        title: "Can't Help Falling in Love",
        artist: "Kina Grannis & Ethereal Strings",
        url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3",
        duration: "3:24",
        cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: 'trk-2',
        title: "Starlight Nocturne for Sampa",
        artist: "Celestial Piano Ensemble",
        url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=gentle-piano-love-story-10878.mp3",
        duration: "2:50",
        cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: 'trk-3',
        title: "Until I Found You",
        artist: "Acoustic Soul",
        url: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c1e09968a5.mp3?filename=relaxing-romantic-acoustic-guitar-124905.mp3",
        duration: "3:10",
        cover: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&auto=format&fit=crop"
      }
    ],
    secretRoom: {
      password: 'foreverandsampa',
      hint: 'Our sacred word combining forever and your name',
      title: 'The Hidden Sanctuary of My Heart',
      letter: `My dearest Sampa,\n\nIf you have unlocked this room, you hold the deepest key to my soul. Long before words existed, the universe wrote our story in stardust. No distance, no quiet night, and no passing year could ever diminish how intensely I love you.\n\nEvery day with you feels like discovering a new constellation. Thank you for your warmth, your laughter, your gentle gaze, and the way you make the whole chaotic world feel quiet and safe.\n\nThis secret corner will always be ours. Whenever you feel overwhelmed by the world, return here to remember: you are cherished beyond human comprehension.\n\nForever and always,\nYour soulmate.`,
      photos: [
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop'
      ]
    }
  };

  // Clone or restore data from localStorage
  let UNIVERSE = JSON.parse(JSON.stringify(DEFAULT_UNIVERSE));
  const savedUniverse = localStorage.getItem('sampa_universe_data');
  if (savedUniverse) {
    try {
      const parsed = JSON.parse(savedUniverse);
      UNIVERSE = { ...DEFAULT_UNIVERSE, ...parsed };
      UNIVERSE.settings = { ...DEFAULT_UNIVERSE.settings, ...(parsed.settings || {}) };
      UNIVERSE.secretRoom = { ...DEFAULT_UNIVERSE.secretRoom, ...(parsed.secretRoom || {}) };
    } catch (e) {
      console.warn('Could not parse saved universe data, using defaults:', e);
    }
  }

  // ------------------------------------------------------------------------
  // 2. IMAGE UPLOAD & RESIZING ENGINE (Canvas Downsampling)
  // ------------------------------------------------------------------------
  function processImageFile(file, maxWidth = 1000, quality = 0.82) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        reject(new Error('Selected file is not an image'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Return clean, compact base64 JPEG
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => reject(new Error('Image decode error'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('File read error'));
      reader.readAsDataURL(file);
    });
  }

  function showToast(msg) {
    const existing = document.querySelector('.admin-feedback-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'admin-feedback-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  // ------------------------------------------------------------------------
  // 2b. HIGH-CAPACITY STORAGE ENGINE (IndexedDB - Unlimited Quota)
  // ------------------------------------------------------------------------
  const MASTER_DB_NAME = 'sampa_universe_master_db';
  const MASTER_DB_VERSION = 1;
  const DATA_STORE = 'universe_data_store';
  const AUDIO_STORE = 'audio_tracks';

  function openMasterDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(MASTER_DB_NAME, MASTER_DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(DATA_STORE)) {
          db.createObjectStore(DATA_STORE);
        }
        if (!db.objectStoreNames.contains(AUDIO_STORE)) {
          db.createObjectStore(AUDIO_STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function saveUniverseToDB(data) {
    try {
      const db = await openMasterDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(DATA_STORE, 'readwrite');
        const store = tx.objectStore(DATA_STORE);
        const req = store.put(data, 'master_state');
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('IndexedDB save failed:', err);
      return false;
    }
  }

  async function loadUniverseFromDB() {
    try {
      const db = await openMasterDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(DATA_STORE, 'readonly');
        const store = tx.objectStore(DATA_STORE);
        const req = store.get('master_state');
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('IndexedDB load failed:', err);
      return null;
    }
  }

  async function clearUniverseDB() {
    try {
      const db = await openMasterDB();
      const tx = db.transaction([DATA_STORE, AUDIO_STORE], 'readwrite');
      tx.objectStore(DATA_STORE).clear();
      tx.objectStore(AUDIO_STORE).clear();
    } catch (err) {
      console.warn('Clear DB failed:', err);
    }
  }

  async function saveAudioBlob(key, blob) {
    try {
      const db = await openMasterDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(AUDIO_STORE, 'readwrite');
        const store = tx.objectStore(AUDIO_STORE);
        const req = store.put(blob, key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('saveAudioBlob error:', e);
    }
  }

  async function getAudioBlob(key) {
    try {
      const db = await openMasterDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(AUDIO_STORE, 'readonly');
        const store = tx.objectStore(AUDIO_STORE);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('getAudioBlob error:', e);
      return null;
    }
  }

  async function deleteAudioBlob(key) {
    try {
      const db = await openMasterDB();
      const tx = db.transaction(AUDIO_STORE, 'readwrite');
      tx.objectStore(AUDIO_STORE).delete(key);
    } catch (e) {
      console.warn('deleteAudioBlob error:', e);
    }
  }

  const audioObjectUrls = {};

  async function resolveTrackUrl(track) {
    if (!track) return '';
    if (track.idbKey) {
      try {
        if (audioObjectUrls[track.idbKey]) {
          return audioObjectUrls[track.idbKey];
        }
        const blob = await getAudioBlob(track.idbKey);
        if (blob) {
          const url = URL.createObjectURL(blob);
          audioObjectUrls[track.idbKey] = url;
          return url;
        }
      } catch (e) {
        console.warn('Could not read from IndexedDB, falling back to track.url', e);
      }
    }
    return track.url || '';
  }

  function getAudioDuration(file) {
    return new Promise((resolve) => {
      try {
        const url = URL.createObjectURL(file);
        const tempAudio = new Audio();
        tempAudio.src = url;
        tempAudio.onloadedmetadata = () => {
          const dur = tempAudio.duration;
          URL.revokeObjectURL(url);
          if (!isNaN(dur) && isFinite(dur)) {
            const m = Math.floor(dur / 60);
            const s = Math.floor(dur % 60);
            resolve(`${m}:${s < 10 ? '0' : ''}${s}`);
          } else {
            resolve('3:00');
          }
        };
        tempAudio.onerror = () => {
          URL.revokeObjectURL(url);
          resolve('3:00');
        };
      } catch (e) {
        resolve('3:00');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. SCROLL CANVAS ANIMATION ENGINE (220 Frames)
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
  // 4. LIVE RELATIONSHIP TIMER
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
  // 5. RENDER ALL COMPONENTS (Called on load & whenever admin edits)
  // ------------------------------------------------------------------------
  function renderAllComponents() {
    // 1. Settings & Hero Elements
    const partnerName = UNIVERSE.settings.partnerName || 'Sampa';
    document.title = `${partnerName.toUpperCase()} — MY FOREVER UNIVERSE`;

    const brandNameEl = document.querySelector('.brand-name');
    if (brandNameEl) brandNameEl.textContent = partnerName.toUpperCase();

    const heroHighlight = document.querySelector('.hero-name-highlight');
    if (heroHighlight) heroHighlight.textContent = partnerName.toUpperCase();

    const heroQuote = document.querySelector('.hero-quote');
    if (heroQuote) heroQuote.textContent = `“${UNIVERSE.settings.heroTagline}”`;

    const heroSub = document.querySelector('.hero-subtext');
    if (heroSub) heroSub.textContent = UNIVERSE.settings.heroSubtext;

    const timerOrigin = document.querySelector('.timer-origin');
    if (timerOrigin) {
      const dateFormatted = new Date(UNIVERSE.settings.anniversaryDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      timerOrigin.textContent = `Loving each other from ${dateFormatted}`;
    }

    // 2. Spotlight Memory
    const featuredMem = UNIVERSE.memories.find((m) => m.id === 'mem-1') || UNIVERSE.memories[0];
    if (featuredMem) {
      const spotImg = document.querySelector('.spotlight-img');
      const spotTitle = document.querySelector('.spotlight-title');
      const spotSummary = document.querySelector('.spotlight-summary');

      const spotlightSrc = UNIVERSE.settings.spotlightPhotoUrl || featuredMem.photoUrls[0];
      if (spotImg) spotImg.src = spotlightSrc;
      if (spotTitle) spotTitle.textContent = featuredMem.title;
      if (spotSummary) spotSummary.textContent = `“${featuredMem.summary}”`;
    }

    // 3. Favorites Gallery Grid
    const favGrid = document.getElementById('favorites-gallery');
    if (favGrid) {
      favGrid.innerHTML = UNIVERSE.photos.map((photo, index) => `
        <div class="photo-card" onclick="openLightbox(${index})">
          <img src="${photo.thumbnailUrl || photo.url}" alt="${photo.title}" loading="lazy">
          <div class="photo-overlay">
            <div class="photo-title">${photo.title}</div>
            <div class="photo-album">${photo.album || 'Archive'}</div>
          </div>
        </div>
      `).join('');
    }

    // 4. Bento Previews
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

    // 5. Story Timeline
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

    // 6. Memories Grid
    renderMemoriesGrid('all');

    // 7. Letters Vault
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

    // 8. Reasons Full Grid
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

    // 9. Music Tracks
    const musicList = document.getElementById('music-tracks-list');
    if (musicList) {
      musicList.innerHTML = UNIVERSE.music.map((trk, i) => `
        <div class="track-item-card" onclick="selectMusicTrack(${i})">
          <img src="${trk.cover}" alt="${trk.title}" class="track-cover">
          <div class="track-details">
            <div class="track-name">${trk.title}</div>
            <div class="track-artist">${trk.artist}</div>
            <div class="track-duration">${trk.duration || ''}</div>
          </div>
          <button class="btn btn-primary" style="padding: 8px 16px; font-size: 10px;">Play</button>
        </div>
      `).join('');
    }

    // 10. Future Plans & Promises
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

    // 11. Secret Room Hint
    const vaultHint = document.querySelector('.vault-hint');
    if (vaultHint && UNIVERSE.secretRoom.hint) {
      vaultHint.innerHTML = `<strong>Secret Hint:</strong> ${UNIVERSE.secretRoom.hint}`;
    }
  }

  function renderMemoriesGrid(filter = 'all') {
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

  // Filter Pill Clicks
  const filterContainer = document.getElementById('memory-filter-pills');
  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill');
      if (!btn) return;
      filterContainer.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      renderMemoriesGrid(btn.dataset.filter);
    });
  }

  // Initial synchronous render
  renderAllComponents();

  // Asynchronously hydrate from high-capacity master IndexedDB (unlimited quota)
  loadUniverseFromDB().then((saved) => {
    if (saved) {
      UNIVERSE = { ...DEFAULT_UNIVERSE, ...saved };
      UNIVERSE.settings = { ...DEFAULT_UNIVERSE.settings, ...(saved.settings || {}) };
      UNIVERSE.secretRoom = { ...DEFAULT_UNIVERSE.secretRoom, ...(saved.secretRoom || {}) };
      renderAllComponents();
      if (typeof updateTimer === 'function') updateTimer();
      loadTrack(currentTrackIdx);
    }
  });

  // ------------------------------------------------------------------------
  // 6. HEART REACTION HANDLER
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

    // Save reaction safely to IndexedDB without quota crash
    saveUniverseToDB(UNIVERSE);
    try {
      localStorage.setItem('sampa_universe_data', JSON.stringify(UNIVERSE));
    } catch (_) {}

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
  // 7. FLOATING AUDIO PLAYER
  // ------------------------------------------------------------------------
  const audioEl = document.getElementById('global-audio');
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

  async function loadTrack(idx) {
    currentTrackIdx = idx;
    const track = UNIVERSE.music[idx];
    if (!track) return;
    const resolvedUrl = await resolveTrackUrl(track);
    audioEl.src = resolvedUrl;
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

  window.nextTrack = async () => {
    const nextIdx = (currentTrackIdx + 1) % UNIVERSE.music.length;
    await loadTrack(nextIdx);
    audioEl.play().catch(() => {});
  };

  window.prevTrack = async () => {
    const prevIdx = (currentTrackIdx - 1 + UNIVERSE.music.length) % UNIVERSE.music.length;
    await loadTrack(prevIdx);
    audioEl.play().catch(() => {});
  };

  window.selectMusicTrack = async (idx) => {
    await loadTrack(idx);
    audioEl.play().catch(() => {});
  };

  window.toggleDockMinimize = () => {
    if (dockEl) dockEl.classList.toggle('minimized');
  };

  // ------------------------------------------------------------------------
  // 8. LIGHTBOX & MODALS
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

  // Love Letter Modal
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

  // Share Modal
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
  // 9. SECRET ROOM UNLOCK ENGINE
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
  // 10. ADMIN CONTROL PANEL CONTROLLER
  // ------------------------------------------------------------------------
  let currentAdminTab = 'settings';

  window.openAdminModal = () => {
    const modal = document.getElementById('admin-modal');
    const loginView = document.getElementById('admin-login-view');
    const dashView = document.getElementById('admin-dashboard-view');
    const passInput = document.getElementById('admin-password-input');
    const errorEl = document.getElementById('admin-login-error');

    if (errorEl) errorEl.style.display = 'none';
    if (passInput) passInput.value = '';

    const isAuth = sessionStorage.getItem('sampa_admin_auth') === 'true';
    if (isAuth) {
      if (loginView) loginView.style.display = 'none';
      if (dashView) dashView.style.display = 'flex';
      window.switchAdminTab(currentAdminTab);
    } else {
      if (loginView) loginView.style.display = 'flex';
      if (dashView) dashView.style.display = 'none';
    }

    if (modal) modal.style.display = 'flex';
  };

  window.closeAdminModal = () => {
    const modal = document.getElementById('admin-modal');
    if (modal) modal.style.display = 'none';
  };

  window.toggleAdminPassVisibility = () => {
    const input = document.getElementById('admin-password-input');
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
  };

  window.handleAdminLogin = async (e) => {
    e.preventDefault();
    const input = document.getElementById('admin-password-input');
    const errorEl = document.getElementById('admin-login-error');
    const loginView = document.getElementById('admin-login-view');
    const dashView = document.getElementById('admin-dashboard-view');

    if (!input) return;
    const entered = input.value.trim();
    const enteredHash = await sha256Hex(entered);

    if (enteredHash === ADMIN_PASS_HASH) {
      sessionStorage.setItem('sampa_admin_auth', 'true');
      input.value = '';
      if (errorEl) errorEl.style.display = 'none';
      if (loginView) loginView.style.display = 'none';
      if (dashView) dashView.style.display = 'flex';
      window.switchAdminTab('settings');
      showToast('✨ Welcome, Admin! Management unlocked.');
    } else {
      if (errorEl) {
        errorEl.textContent = 'Incorrect admin password. Access denied!';
        errorEl.style.display = 'block';
      }
    }
  };

  window.handleAdminLogout = () => {
    sessionStorage.removeItem('sampa_admin_auth');
    const loginView = document.getElementById('admin-login-view');
    const dashView = document.getElementById('admin-dashboard-view');
    if (loginView) loginView.style.display = 'flex';
    if (dashView) dashView.style.display = 'none';
    showToast('Logged out of admin panel.');
  };

  window.switchAdminTab = (tabName) => {
    currentAdminTab = tabName;
    const tabsBar = document.getElementById('admin-tabs-bar');
    if (tabsBar) {
      tabsBar.querySelectorAll('.admin-tab').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
      });
    }

    const bodyEl = document.getElementById('admin-tab-body');
    if (!bodyEl) return;

    switch (tabName) {
      case 'settings':
        renderAdminSettings(bodyEl);
        break;
      case 'photos':
        renderAdminPhotos(bodyEl);
        break;
      case 'memories':
        renderAdminMemories(bodyEl);
        break;
      case 'letters':
        renderAdminLetters(bodyEl);
        break;
      case 'reasons':
        renderAdminReasons(bodyEl);
        break;
      case 'secret':
        renderAdminSecret(bodyEl);
        break;
      case 'music':
        renderAdminMusic(bodyEl);
        break;
      case 'backup':
        renderAdminBackup(bodyEl);
        break;
    }
  };

  // --- TAB 1: SETTINGS ---
  function renderAdminSettings(container) {
    container.innerHTML = `
      <div class="admin-form-card">
        <h3 class="admin-section-title">⚙️ General Website & Hero Configuration</h3>
        <div class="admin-grid-2">
          <div class="admin-form-group">
            <label class="admin-label">Partner's Name</label>
            <input type="text" id="adm-partner-name" class="admin-input" value="${UNIVERSE.settings.partnerName}">
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Author Name</label>
            <input type="text" id="adm-author-name" class="admin-input" value="${UNIVERSE.settings.authorName}">
          </div>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Anniversary Date & Time (Drives Live Love Counter)</label>
          <input type="text" id="adm-anniversary-date" class="admin-input" value="${UNIVERSE.settings.anniversaryDate}" placeholder="YYYY-MM-DDTHH:MM:SSZ">
          <small style="color: var(--text-muted); font-size: 11px;">Example: 2022-10-01T00:00:00Z</small>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Hero Tagline Quote</label>
          <input type="text" id="adm-hero-tagline" class="admin-input" value="${UNIVERSE.settings.heroTagline}">
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Hero Subtext Description</label>
          <textarea id="adm-hero-subtext" class="admin-textarea">${UNIVERSE.settings.heroSubtext}</textarea>
        </div>

        <!-- Featured Spotlight Photo Direct Uploader -->
        <div class="admin-form-group" style="margin-top: 20px;">
          <label class="admin-label">Main Memory Spotlight Photo (Hero Section)</label>
          <div class="upload-dropzone" id="spotlight-dropzone">
            <input type="file" accept="image/*" onchange="handleSpotlightUpload(this.files[0])">
            <svg class="upload-dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <div class="upload-dropzone-title">Click to upload your own picture for Spotlight</div>
            <div class="upload-dropzone-sub">Directly replaces the hero spotlight image</div>
          </div>
          <div style="width: 140px; height: 100px; border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border);">
            <img src="${UNIVERSE.settings.spotlightPhotoUrl || (UNIVERSE.memories[0] && UNIVERSE.memories[0].photoUrls[0])}" id="adm-spotlight-preview" style="width:100%; height:100%; object-fit: cover;">
          </div>
        </div>
      </div>
    `;

    // Hook inputs to update UNIVERSE on change
    const pInput = document.getElementById('adm-partner-name');
    const aInput = document.getElementById('adm-author-name');
    const dInput = document.getElementById('adm-anniversary-date');
    const tInput = document.getElementById('adm-hero-tagline');
    const sInput = document.getElementById('adm-hero-subtext');

    if (pInput) pInput.oninput = (e) => { UNIVERSE.settings.partnerName = e.target.value; renderAllComponents(); };
    if (aInput) aInput.oninput = (e) => { UNIVERSE.settings.authorName = e.target.value; renderAllComponents(); };
    if (dInput) dInput.oninput = (e) => { UNIVERSE.settings.anniversaryDate = e.target.value; renderAllComponents(); updateTimer(); };
    if (tInput) tInput.oninput = (e) => { UNIVERSE.settings.heroTagline = e.target.value; renderAllComponents(); };
    if (sInput) sInput.oninput = (e) => { UNIVERSE.settings.heroSubtext = e.target.value; renderAllComponents(); };
  }

  window.handleSpotlightUpload = async (file) => {
    if (!file) return;
    try {
      showToast('Processing photo...');
      const dataUrl = await processImageFile(file);
      UNIVERSE.settings.spotlightPhotoUrl = dataUrl;
      if (UNIVERSE.memories[0]) UNIVERSE.memories[0].photoUrls[0] = dataUrl;
      const preview = document.getElementById('adm-spotlight-preview');
      if (preview) preview.src = dataUrl;
      window.saveAllUniverseData();
      showToast('✅ Spotlight photo updated!');
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  };

  // --- TAB 2: PHOTOS & UPLOAD ---
  function renderAdminPhotos(container) {
    container.innerHTML = `
      <div class="admin-form-card">
        <h3 class="admin-section-title">
          <span>📸 Photo Archive & Direct Upload</span>
          <span style="font-size: 12px; color: var(--accent-gold); font-family: var(--font-sans);">${UNIVERSE.photos.length} Photos</span>
        </h3>

        <!-- Multi-photo Drag & Drop zone -->
        <div class="upload-dropzone" id="gallery-dropzone">
          <input type="file" multiple accept="image/*" onchange="handleGalleryMultiUpload(this.files)">
          <svg class="upload-dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <div class="upload-dropzone-title">Upload Pictures from Your Device</div>
          <div class="upload-dropzone-sub">Drag and drop or click here to upload one or multiple pictures</div>
        </div>

        <div id="adm-photos-list">
          ${UNIVERSE.photos.map((p, idx) => `
            <div class="admin-item-card" id="adm-photo-item-${p.id}">
              <div class="admin-thumb-box">
                <img src="${p.url}" alt="${p.title}" id="adm-photo-img-${p.id}">
                <label class="admin-thumb-replace-btn">
                  Replace
                  <input type="file" accept="image/*" style="display:none" onchange="handleReplacePhoto('${p.id}', this.files[0])">
                </label>
              </div>

              <div class="admin-item-fields">
                <div class="admin-item-row">
                  <input type="text" class="admin-input" style="flex:2" value="${p.title}" placeholder="Photo Title" oninput="updatePhotoField('${p.id}', 'title', this.value)">
                  <input type="text" class="admin-input" style="flex:1" value="${p.album || 'First Chapters'}" placeholder="Album" oninput="updatePhotoField('${p.id}', 'album', this.value)">
                </div>
                <input type="text" class="admin-input" value="${p.caption || ''}" placeholder="Caption / Romantic Memory..." oninput="updatePhotoField('${p.id}', 'caption', this.value)">
                <div style="display:flex; align-items: center; justify-content: space-between;">
                  <label style="font-size: 11px; color: var(--text-secondary); display:flex; align-items:center; gap: 6px; cursor:pointer;">
                    <input type="checkbox" ${p.isFavorite ? 'checked' : ''} onchange="updatePhotoField('${p.id}', 'isFavorite', this.checked)">
                    <span>Show in Favorite 6 Grid (Hero)</span>
                  </label>
                  <button class="admin-delete-btn" onclick="deletePhoto('${p.id}')">Delete</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  window.handleGalleryMultiUpload = async (files) => {
    if (!files || files.length === 0) return;
    showToast(`Processing ${files.length} photo(s)...`);

    for (let i = 0; i < files.length; i++) {
      try {
        const dataUrl = await processImageFile(files[i]);
        const newPhoto = {
          id: 'photo-' + Date.now() + '-' + i,
          title: files[i].name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Cherished Moment',
          url: dataUrl,
          thumbnailUrl: dataUrl,
          caption: 'Captured with love.',
          date: new Date().toISOString().split('T')[0],
          category: 'everyday',
          album: 'Special Memories',
          isFavorite: true,
        };
        UNIVERSE.photos.unshift(newPhoto);
      } catch (err) {
        console.error(err);
      }
    }

    window.saveAllUniverseData();
    window.switchAdminTab('photos');
    showToast(`✅ ${files.length} photo(s) added to gallery!`);
  };

  window.handleReplacePhoto = async (photoId, file) => {
    if (!file) return;
    try {
      showToast('Updating photo...');
      const dataUrl = await processImageFile(file);
      const photo = UNIVERSE.photos.find((p) => p.id === photoId);
      if (photo) {
        photo.url = dataUrl;
        photo.thumbnailUrl = dataUrl;
        const imgEl = document.getElementById(`adm-photo-img-${photoId}`);
        if (imgEl) imgEl.src = dataUrl;
        window.saveAllUniverseData();
        showToast('✅ Photo replaced!');
      }
    } catch (err) {
      alert('Replace failed: ' + err.message);
    }
  };

  window.updatePhotoField = (id, field, value) => {
    const photo = UNIVERSE.photos.find((p) => p.id === id);
    if (photo) {
      photo[field] = value;
      renderAllComponents();
    }
  };

  window.deletePhoto = (id) => {
    if (confirm('Delete this photo from gallery?')) {
      UNIVERSE.photos = UNIVERSE.photos.filter((p) => p.id !== id);
      window.saveAllUniverseData();
      window.switchAdminTab('photos');
    }
  };

  // --- TAB 3: MEMORIES ---
  function renderAdminMemories(container) {
    container.innerHTML = `
      <div class="admin-form-card">
        <h3 class="admin-section-title">
          <span>📖 Shared Memories & Chapters</span>
          <button class="btn btn-secondary btn-sm" onclick="addNewMemory()">+ Add New Chapter</button>
        </h3>

        ${UNIVERSE.memories.map((m) => `
          <div class="admin-item-card" style="flex-direction: column;">
            <div style="display:flex; width:100%; gap: 16px; align-items: flex-start;">
              <div class="admin-thumb-box" style="width: 110px; height: 80px;">
                <img src="${m.photoUrls[0]}" id="adm-mem-img-${m.id}">
                <label class="admin-thumb-replace-btn">
                  Photo
                  <input type="file" accept="image/*" style="display:none" onchange="handleMemoryPhotoUpload('${m.id}', this.files[0])">
                </label>
              </div>

              <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
                <div class="admin-item-row">
                  <input type="text" class="admin-input" style="flex:2" value="${m.title}" placeholder="Chapter Title" oninput="updateMemoryField('${m.id}', 'title', this.value)">
                  <input type="text" class="admin-input" style="flex:1" value="${m.date}" placeholder="Date (YYYY-MM-DD)" oninput="updateMemoryField('${m.id}', 'date', this.value)">
                </div>
                <div class="admin-item-row">
                  <input type="text" class="admin-input" style="flex:1" value="${m.location}" placeholder="Location" oninput="updateMemoryField('${m.id}', 'location', this.value)">
                  <input type="text" class="admin-input" style="flex:1" value="${m.category}" placeholder="Category" oninput="updateMemoryField('${m.id}', 'category', this.value)">
                </div>
              </div>

              <button class="admin-delete-btn" onclick="deleteMemory('${m.id}')">Delete</button>
            </div>

            <div style="width:100%; margin-top: 10px;">
              <input type="text" class="admin-input" style="width:100%; margin-bottom:8px;" value="${m.summary}" placeholder="Summary Quote" oninput="updateMemoryField('${m.id}', 'summary', this.value)">
              <textarea class="admin-textarea" placeholder="Full chapter story narrative..." oninput="updateMemoryField('${m.id}', 'description', this.value)">${m.description}</textarea>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  window.handleMemoryPhotoUpload = async (memId, file) => {
    if (!file) return;
    try {
      showToast('Uploading memory picture...');
      const dataUrl = await processImageFile(file);
      const mem = UNIVERSE.memories.find((m) => m.id === memId);
      if (mem) {
        mem.photoUrls[0] = dataUrl;
        const imgEl = document.getElementById(`adm-mem-img-${memId}`);
        if (imgEl) imgEl.src = dataUrl;
        window.saveAllUniverseData();
        showToast('✅ Memory picture updated!');
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  };

  window.updateMemoryField = (id, field, value) => {
    const mem = UNIVERSE.memories.find((m) => m.id === id);
    if (mem) {
      mem[field] = value;
      renderAllComponents();
    }
  };

  window.addNewMemory = () => {
    const newId = 'mem-' + Date.now();
    UNIVERSE.memories.push({
      id: newId,
      title: 'Our New Romantic Chapter',
      date: new Date().toISOString().split('T')[0],
      location: 'Where Hearts Meet',
      category: 'Special Night',
      summary: 'A beautiful moment shared together.',
      description: 'Write down every heartfelt memory here...',
      photoUrls: ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200'],
      tags: ['Love', 'Forever']
    });
    window.saveAllUniverseData();
    window.switchAdminTab('memories');
  };

  window.deleteMemory = (id) => {
    if (confirm('Delete this chapter?')) {
      UNIVERSE.memories = UNIVERSE.memories.filter((m) => m.id !== id);
      window.saveAllUniverseData();
      window.switchAdminTab('memories');
    }
  };

  // --- TAB 4: LETTERS ---
  function renderAdminLetters(container) {
    container.innerHTML = `
      <div class="admin-form-card">
        <h3 class="admin-section-title">
          <span>💌 Sealed Love Letters</span>
          <button class="btn btn-secondary btn-sm" onclick="addNewLetter()">+ Add New Letter</button>
        </h3>

        ${UNIVERSE.letters.map((l) => `
          <div class="admin-item-card" style="flex-direction: column;">
            <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
              <input type="text" class="admin-input" style="flex:2; margin-right: 10px;" value="${l.title}" placeholder="Letter Title" oninput="updateLetterField('${l.id}', 'title', this.value)">
              <input type="text" class="admin-input" style="flex:1; margin-right: 10px;" value="${l.date}" placeholder="Date" oninput="updateLetterField('${l.id}', 'date', this.value)">
              <button class="admin-delete-btn" onclick="deleteLetter('${l.id}')">Delete</button>
            </div>

            <div style="width:100%; margin-top: 10px;">
              <input type="text" class="admin-input" style="width:100%; margin-bottom:8px;" value="${l.excerpt}" placeholder="Preview Excerpt" oninput="updateLetterField('${l.id}', 'excerpt', this.value)">
              <textarea class="admin-textarea" style="min-height:120px;" placeholder="Full heartfelt letter text..." oninput="updateLetterField('${l.id}', 'content', this.value)">${l.content}</textarea>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-top:10px;">
              <input type="text" class="admin-input" style="width: 200px;" value="${l.signature || 'Forever Yours ❤️'}" placeholder="Signature" oninput="updateLetterField('${l.id}', 'signature', this.value)">
              <label style="font-size: 12px; color: var(--text-secondary); display:flex; align-items:center; gap: 6px;">
                <input type="checkbox" ${l.isLocked ? 'checked' : ''} onchange="updateLetterField('${l.id}', 'isLocked', this.checked)">
                <span>Lock with timer (Anniversary Capsule)</span>
              </label>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  window.updateLetterField = (id, field, value) => {
    const letItem = UNIVERSE.letters.find((l) => l.id === id);
    if (letItem) {
      letItem[field] = value;
      renderAllComponents();
    }
  };

  window.addNewLetter = () => {
    UNIVERSE.letters.push({
      id: 'let-' + Date.now(),
      title: 'A Letter for My Sampa',
      date: new Date().toISOString().split('T')[0],
      excerpt: 'Words straight from my soul to you...',
      content: 'Dearest Sampa,\n\nI love you more than words can express...',
      signature: 'Forever Yours ❤️',
      isLocked: false,
    });
    window.saveAllUniverseData();
    window.switchAdminTab('letters');
  };

  window.deleteLetter = (id) => {
    if (confirm('Delete this letter?')) {
      UNIVERSE.letters = UNIVERSE.letters.filter((l) => l.id !== id);
      window.saveAllUniverseData();
      window.switchAdminTab('letters');
    }
  };

  // --- TAB 5: REASONS ---
  function renderAdminReasons(container) {
    container.innerHTML = `
      <div class="admin-form-card">
        <h3 class="admin-section-title">
          <span>💖 Reasons Why I Love You</span>
          <button class="btn btn-secondary btn-sm" onclick="addNewReason()">+ Add Reason</button>
        </h3>

        ${UNIVERSE.reasons.map((r, idx) => `
          <div class="admin-item-card" style="flex-direction: column;">
            <div class="admin-item-row" style="width:100%;">
              <input type="number" class="admin-input" style="width: 70px;" value="${r.num}" oninput="updateReasonField('${r.id}', 'num', parseInt(this.value)||1)">
              <input type="text" class="admin-input" style="flex:2;" value="${r.title}" placeholder="Reason Title" oninput="updateReasonField('${r.id}', 'title', this.value)">
              <input type="text" class="admin-input" style="flex:1;" value="${r.category}" placeholder="Category" oninput="updateReasonField('${r.id}', 'category', this.value)">
              <input type="number" class="admin-input" style="width: 80px;" value="${r.count}" placeholder="Hearts" oninput="updateReasonField('${r.id}', 'count', parseInt(this.value)||0)">
              <button class="admin-delete-btn" onclick="deleteReason('${r.id}')">Delete</button>
            </div>
            <textarea class="admin-textarea" style="width:100%; margin-top:8px; min-height:60px;" placeholder="Reason description..." oninput="updateReasonField('${r.id}', 'desc', this.value)">${r.desc}</textarea>
          </div>
        `).join('')}
      </div>
    `;
  }

  window.updateReasonField = (id, field, value) => {
    const r = UNIVERSE.reasons.find((item) => item.id === id);
    if (r) {
      r[field] = value;
      renderAllComponents();
    }
  };

  window.addNewReason = () => {
    const nextNum = UNIVERSE.reasons.length + 1;
    UNIVERSE.reasons.push({
      id: 'rs-' + Date.now(),
      num: nextNum,
      title: 'Your heartwarming laughter',
      category: 'Soul Connection',
      desc: 'The melody of your voice brightens any cloudy day.',
      count: 50
    });
    window.saveAllUniverseData();
    window.switchAdminTab('reasons');
  };

  window.deleteReason = (id) => {
    if (confirm('Delete this reason?')) {
      UNIVERSE.reasons = UNIVERSE.reasons.filter((r) => r.id !== id);
      window.saveAllUniverseData();
      window.switchAdminTab('reasons');
    }
  };

  // --- TAB 6: SECRET ROOM ---
  function renderAdminSecret(container) {
    container.innerHTML = `
      <div class="admin-form-card">
        <h3 class="admin-section-title">🔐 Secret Room Configuration</h3>

        <div class="admin-grid-2">
          <div class="admin-form-group">
            <label class="admin-label">Secret Room Passcode</label>
            <input type="text" id="adm-secret-pass" class="admin-input" value="${UNIVERSE.secretRoom.password}">
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Public Hint for Sampa</label>
            <input type="text" id="adm-secret-hint" class="admin-input" value="${UNIVERSE.secretRoom.hint || ''}">
          </div>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Hidden Soulmate Letter (Revealed upon unlock)</label>
          <textarea id="adm-secret-letter" class="admin-textarea" style="min-height: 140px;">${UNIVERSE.secretRoom.letter}</textarea>
        </div>

        <div class="admin-form-group" style="margin-top: 20px;">
          <label class="admin-label">Upload Private Photos for the Secret Vault</label>
          <div class="upload-dropzone">
            <input type="file" multiple accept="image/*" onchange="handleSecretPhotosUpload(this.files)">
            <svg class="upload-dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <div class="upload-dropzone-title">Upload Private Photos from Device</div>
            <div class="upload-dropzone-sub">These photos remain completely hidden until unlocked</div>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 12px;" id="adm-secret-photos-preview">
            ${UNIVERSE.secretRoom.photos.map((src, i) => `
              <div style="position: relative; aspect-ratio: 1; border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border);">
                <img src="${src}" style="width:100%; height:100%; object-fit:cover;">
                <button onclick="removeSecretPhoto(${i})" style="position:absolute; top:4px; right:4px; background:rgba(0,0,0,0.7); color:#FFF; border:none; border-radius:50%; width:20px; height:20px; cursor:pointer; font-size:10px;">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    const passInput = document.getElementById('adm-secret-pass');
    const hintInput = document.getElementById('adm-secret-hint');
    const letterInput = document.getElementById('adm-secret-letter');

    if (passInput) passInput.oninput = (e) => { UNIVERSE.secretRoom.password = e.target.value; };
    if (hintInput) hintInput.oninput = (e) => { UNIVERSE.secretRoom.hint = e.target.value; renderAllComponents(); };
    if (letterInput) letterInput.oninput = (e) => { UNIVERSE.secretRoom.letter = e.target.value; };
  }

  window.handleSecretPhotosUpload = async (files) => {
    if (!files || files.length === 0) return;
    showToast(`Uploading ${files.length} private photo(s)...`);

    for (let i = 0; i < files.length; i++) {
      try {
        const dataUrl = await processImageFile(files[i]);
        UNIVERSE.secretRoom.photos.push(dataUrl);
      } catch (e) {
        console.error(e);
      }
    }
    window.saveAllUniverseData();
    window.switchAdminTab('secret');
    showToast(`✅ ${files.length} private photo(s) added to Secret Vault!`);
  };

  window.removeSecretPhoto = (index) => {
    UNIVERSE.secretRoom.photos.splice(index, 1);
    window.saveAllUniverseData();
    window.switchAdminTab('secret');
  };

  // --- TAB 7: MUSIC ---
  function renderAdminMusic(container) {
    container.innerHTML = `
      <div class="admin-form-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
          <div>
            <h3 class="admin-section-title" style="margin-bottom:4px;">🎵 Romantic Music Playlist</h3>
            <p style="font-size:12px; color:var(--text-secondary);">Upload your personal romantic songs (.mp3, .m4a, .wav) directly from your phone or PC</p>
          </div>
          <span style="font-size:12px; color:var(--accent-gold); font-weight:600;">${UNIVERSE.music.length} Songs in Playlist</span>
        </div>

        <!-- Big Audio File Upload Dropzone -->
        <div class="upload-dropzone" id="music-audio-dropzone" style="margin-bottom: 24px; padding: 24px;">
          <input type="file" accept="audio/*,.mp3,.m4a,.wav,.ogg,.aac" onchange="handleAddNewMusicTrack(this.files[0])">
          <svg class="upload-dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          <div class="upload-dropzone-title">Upload Music File From Device (.mp3, .m4a, .wav, .ogg)</div>
          <div class="upload-dropzone-sub">Click here or drag & drop an audio file to add a new song to Sampa's universe</div>
        </div>

        <!-- Track List Cards -->
        <div class="admin-music-list">
          ${UNIVERSE.music.map((m, idx) => `
            <div class="admin-item-card" style="align-items:flex-start; margin-bottom:16px;">
              <div class="admin-thumb-box" style="width: 80px; height: 80px; flex-shrink:0;">
                <img src="${m.cover}" id="adm-music-cover-${idx}">
                <label class="admin-thumb-replace-btn" title="Change Cover Image">
                  Cover
                  <input type="file" accept="image/*" style="display:none" onchange="handleMusicCoverUpload(${idx}, this.files[0])">
                </label>
              </div>

              <div class="admin-item-fields" style="flex:1;">
                <div class="admin-item-row">
                  <input type="text" class="admin-input" style="flex:2;" value="${m.title}" placeholder="Song Title" oninput="updateMusicField(${idx}, 'title', this.value)">
                  <input type="text" class="admin-input" style="flex:1;" value="${m.artist}" placeholder="Artist" oninput="updateMusicField(${idx}, 'artist', this.value)">
                </div>

                <div style="display:flex; align-items:center; gap:8px; margin-top:4px; flex-wrap:wrap;">
                  ${m.idbKey
                    ? `<span class="badge badge-gold" style="font-size:11px; padding:3px 8px;">💾 Uploaded Audio (${m.fileName || 'Device File'})</span>`
                    : `<span class="badge" style="font-size:11px; padding:3px 8px;">🌐 Web Stream URL</span>`
                  }
                  <span style="font-size:11px; color:var(--text-muted);">Duration: ${m.duration || '3:00'}</span>
                </div>

                <div style="display:flex; align-items:center; gap:8px; margin-top:8px; flex-wrap:wrap;">
                  <label class="btn btn-secondary btn-sm" style="display:inline-flex; align-items:center; gap:6px; cursor:pointer; font-size:11px; padding:6px 12px;">
                    <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <span>Replace Audio</span>
                    <input type="file" accept="audio/*,.mp3,.m4a,.wav,.ogg,.aac" style="display:none;" onchange="handleReplaceMusicAudio(${idx}, this.files[0])">
                  </label>

                  <button class="btn btn-primary btn-sm" style="font-size:11px; padding:6px 14px;" onclick="previewMusicTrack(${idx})">
                    ▶ Play Now
                  </button>

                  <button class="admin-delete-btn" style="padding:6px 12px; font-size:11px;" onclick="deleteMusicTrack(${idx})">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  window.handleAddNewMusicTrack = async (file) => {
    if (!file) return;
    try {
      showToast('Uploading audio file from device...');
      const idbKey = 'audio_' + Date.now();
      await saveAudioBlob(idbKey, file);

      const durationStr = await getAudioDuration(file);
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Cherished Melody';

      const newTrack = {
        id: 'trk-' + Date.now(),
        title: cleanTitle,
        artist: UNIVERSE.settings.authorName || 'Forever Yours',
        url: '',
        idbKey: idbKey,
        fileName: file.name,
        duration: durationStr,
        cover: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop'
      };

      UNIVERSE.music.push(newTrack);
      window.saveAllUniverseData();
      renderAllComponents();
      window.switchAdminTab('music');

      const newIdx = UNIVERSE.music.length - 1;
      await loadTrack(newIdx);
      audioEl.play().catch(() => {});
      showToast(`🎶 "${cleanTitle}" uploaded and playing now!`);
    } catch (err) {
      alert('Audio upload failed: ' + err.message);
    }
  };

  window.handleReplaceMusicAudio = async (idx, file) => {
    if (!file || !UNIVERSE.music[idx]) return;
    try {
      showToast('Updating audio file...');
      const idbKey = UNIVERSE.music[idx].idbKey || ('audio_' + Date.now());
      await saveAudioBlob(idbKey, file);

      const durationStr = await getAudioDuration(file);
      UNIVERSE.music[idx].idbKey = idbKey;
      UNIVERSE.music[idx].fileName = file.name;
      UNIVERSE.music[idx].duration = durationStr;

      if (audioObjectUrls[idbKey]) {
        URL.revokeObjectURL(audioObjectUrls[idbKey]);
        delete audioObjectUrls[idbKey];
      }

      window.saveAllUniverseData();
      renderAllComponents();
      window.switchAdminTab('music');

      if (currentTrackIdx === idx) {
        await loadTrack(idx);
        audioEl.play().catch(() => {});
      }
      showToast(`✅ Audio updated for "${UNIVERSE.music[idx].title}"!`);
    } catch (err) {
      alert('Failed to replace audio: ' + err.message);
    }
  };

  window.deleteMusicTrack = async (idx) => {
    if (UNIVERSE.music.length <= 1) {
      alert('You must have at least one music track in the playlist.');
      return;
    }
    const track = UNIVERSE.music[idx];
    if (!confirm(`Delete "${track.title}" from the playlist?`)) return;

    if (track && track.idbKey) {
      await deleteAudioBlob(track.idbKey);
      if (audioObjectUrls[track.idbKey]) {
        URL.revokeObjectURL(audioObjectUrls[track.idbKey]);
        delete audioObjectUrls[track.idbKey];
      }
    }

    UNIVERSE.music.splice(idx, 1);
    if (currentTrackIdx >= UNIVERSE.music.length) {
      currentTrackIdx = 0;
    }
    window.saveAllUniverseData();
    renderAllComponents();
    window.switchAdminTab('music');
    await loadTrack(currentTrackIdx);
    showToast('Track removed from playlist.');
  };

  window.previewMusicTrack = async (idx) => {
    await loadTrack(idx);
    audioEl.play().catch(() => {});
    showToast(`▶ Playing: ${UNIVERSE.music[idx].title}`);
  };

  window.handleMusicCoverUpload = async (idx, file) => {
    if (!file) return;
    try {
      showToast('Updating song cover...');
      const dataUrl = await processImageFile(file, 400, 0.8);
      UNIVERSE.music[idx].cover = dataUrl;
      const img = document.getElementById(`adm-music-cover-${idx}`);
      if (img) img.src = dataUrl;
      window.saveAllUniverseData();
      renderAllComponents();
      if (currentTrackIdx === idx && dockCover) {
        dockCover.src = dataUrl;
      }
      showToast('✅ Song cover updated!');
    } catch (err) {
      alert('Cover upload failed: ' + err.message);
    }
  };

  window.updateMusicField = (idx, field, value) => {
    if (UNIVERSE.music[idx]) {
      UNIVERSE.music[idx][field] = value;
      renderAllComponents();
      if (currentTrackIdx === idx) {
        if (field === 'title' && dockTitle) dockTitle.textContent = value;
        if (field === 'artist' && dockArtist) dockArtist.textContent = value;
        if (field === 'title' && navMusicTitle) navMusicTitle.textContent = value;
      }
    }
  };

  // --- TAB 8: BACKUP & RESTORE ---
  function renderAdminBackup(container) {
    container.innerHTML = `
      <div class="admin-form-card">
        <h3 class="admin-section-title">💾 Save, Export & Restore Universe Data</h3>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">
          All your uploaded photos and customized texts are stored safely inside your browser. You can also download a permanent JSON backup file to keep on your computer or restore later.
        </p>

        <div style="display:flex; flex-direction:column; gap: 14px;">
          <button class="btn btn-primary w-full" onclick="saveAllUniverseData()" style="padding: 16px;">
            💾 Save All Changes Live Now
          </button>

          <button class="btn btn-secondary w-full" onclick="exportBackupJSON()" style="padding: 14px;">
            ⬇️ Download Backup File (sampa-universe-data.json)
          </button>

          <label class="btn btn-outline w-full" style="padding: 14px; text-align:center; cursor:pointer;">
            ⬆️ Restore / Import from Backup JSON
            <input type="file" accept=".json" style="display:none;" onchange="importBackupJSON(this.files[0])">
          </label>

          <button class="btn btn-tertiary w-full" onclick="resetUniverseToDefaults()" style="padding: 12px; margin-top: 10px;">
            ⚠️ Reset Everything to Initial Defaults
          </button>
        </div>
      </div>
    `;
  }

  window.saveAllUniverseData = async () => {
    try {
      // 1. Save to high-capacity IndexedDB (Unlimited quota for all photos & custom content!)
      await saveUniverseToDB(UNIVERSE);

      // 2. Safe localStorage cache without throwing quota errors
      try {
        localStorage.setItem('sampa_universe_data', JSON.stringify(UNIVERSE));
      } catch (storageErr) {
        // If localStorage is full, remove key so browser storage stays healthy
        try { localStorage.removeItem('sampa_universe_data'); } catch (_) {}
      }

      renderAllComponents();
      showToast('✨ All universe changes saved safely!');
    } catch (e) {
      console.error('Save error:', e);
      renderAllComponents();
      showToast('✨ Changes applied live.');
    }
  };

  window.exportBackupJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(UNIVERSE, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sampa-universe-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('📁 Backup JSON downloaded!');
  };

  window.importBackupJSON = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        UNIVERSE = imported;
        await window.saveAllUniverseData();
        window.switchAdminTab(currentAdminTab);
        showToast('✅ Data restored from backup!');
      } catch (err) {
        alert('Invalid backup JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  window.resetUniverseToDefaults = async () => {
    if (confirm('Are you sure you want to reset all changes and uploaded pictures back to initial default values?')) {
      try { localStorage.removeItem('sampa_universe_data'); } catch (_) {}
      await clearUniverseDB();
      UNIVERSE = JSON.parse(JSON.stringify(DEFAULT_UNIVERSE));
      renderAllComponents();
      window.switchAdminTab(currentAdminTab);
      showToast('🔄 Universe reset to factory defaults.');
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
      window.closeAdminModal();
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
