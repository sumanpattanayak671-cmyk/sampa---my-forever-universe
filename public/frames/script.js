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
    "settings": {
      "partnerName": "Sampa",
      "authorName": "Forever Yours",
      "anniversaryDate": "2022-10-01T00:00:00Z",
      "heroTagline": "An entire universe created for one person.",
      "heroSubtext": "Every second, every galaxy, every heartbeat in this space belongs exclusively to Sampa.",
      "customDomain": "www.sampa-love.com",
      "spotlightPhotoUrl": "./photos/spotlight.jpg"
    },
    "photos": [
      {
        "id": "photo-1",
        "title": "Our first meetup after two years of being in a long-distance relationship",
        "url": "./photos/gallery_1.jpg",
        "thumbnailUrl": "./photos/gallery_1.jpg",
        "caption": "My heartbeat got faster at that moment. I was so nervous when I saw you for the first time and held your hand. Your eyes, your hair, everything about you looked like the beautiful dream I had always imagined at night before meeting you.  And then, suddenly, that dream was standing right in front of me. ❤️",
        "date": "2022-10-01",
        "category": "special-days",
        "album": "first meetup ",
        "isFavorite": true
      },
      {
        "id": "photo-2",
        "title": "porpesed by my world ",
        "url": "./photos/gallery_2.jpg",
        "thumbnailUrl": "./photos/gallery_2.jpg",
        "caption": "“Do you remember when you proposed to me for the first time, right after we met? That moment is still one of the most beautiful memories of my life. You came into my life like a dream, and that rose became the first little symbol of our love.” ❤️",
        "date": "2023-12-04",
        "category": "everyday",
        "album": "First Chapters",
        "isFavorite": true
      },
      {
        "id": "photo-3",
        "title": "Our first Durga Puja together.” ❤️",
        "url": "./photos/gallery_3.jpg",
        "thumbnailUrl": "./photos/gallery_3.jpg",
        "caption": "Our first Durga Puja together—the beginning of so many beautiful memories with you.” ❤️",
        "date": "2024-01-20",
        "category": "trips",
        "album": "puja ",
        "isFavorite": true
      },
      {
        "id": "photo-4",
        "title": "Our first long trip together — Cooch Behar Rajbari. ❤️”",
        "url": "./photos/gallery_4.jpg",
        "thumbnailUrl": "./photos/gallery_4.jpg",
        "caption": "“Our first long tour together, creating beautiful memories at Cooch Behar Rajbari. It was just the beginning of all the journeys I wish to take with you. ❤️”",
        "date": "2024-04-12",
        "category": "candid",
        "album": "Unfiltered Moments",
        "isFavorite": true
      },
      {
        "id": "photo-5",
        "title": "The day you gave me roses, and made my heart smile. 🌹❤️",
        "url": "./photos/gallery_5.jpg",
        "thumbnailUrl": "./photos/gallery_5.jpg",
        "caption": "“And then came the moment when you gave me this beautiful bouquet of roses. I still remember how special I felt receiving them from you. It wasn’t just a bouquet—it was a memory I’ll carry in my heart forever. ❤️”",
        "date": "2024-06-18",
        "category": "trips",
        "album": "special gift ever ",
        "isFavorite": true
      },
      {
        "id": "photo-6",
        "title": "one of my fav pic ever",
        "url": "./photos/gallery_6.jpg",
        "thumbnailUrl": "./photos/gallery_6.jpg",
        "caption": "The day you gave me those roses, and we captured this beautiful moment together. I had the bouquet in my arms, but my favorite part of that moment was having you by my side. ❤️🌹”",
        "date": "2024-08-30",
        "category": "candid",
        "album": "Unfiltered Moments",
        "isFavorite": true
      }
    ],
    "memories": [
      {
        "id": "mem-1",
        "title": "The Day the Universe Began",
        "date": "2022-10-01",
        "location": "Where Two Souls Became One",
        "category": "Milestone",
        "summary": "1 October 2022 — The sacred day we started loving each other and our forever story began.",
        "description": "October 1, 2022 will forever remain etched as the most significant date in my existence. The moment we knew we loved each other, the noise of the entire world quieted down, leaving only the warmth of your hand in mine. Every second counted since this day is a testament to eternal devotion.",
        "photoUrls": [
          "./photos/memory_1.jpg"
        ],
        "tags": [
          "1 October 2022",
          "Our Beginning",
          "Forever Love",
          "Milestone"
        ]
      },
      {
        "id": "mem-2",
        "title": "first hug ",
        "date": "2025-01-17",
        "location": "green house ",
        "category": "Special day ",
        "summary": "Our first hug — the moment I finally held you close and everything else seemed to disappear. I wish I could relive that moment over and over again. ❤️🫂”",
        "description": "I still remember the feeling of our first hug. After waiting so long to finally be close to you, holding you in my arms felt like a dream that had finally come true. I was nervous, happy, and honestly a little emotional because, at that moment, I realized that the person I had missed for so long was finally right there with me.\n\nFor a few seconds, everything around us disappeared—it was just you and me. I didn’t want that hug to end. It was a simple moment, but for me, it became one of the most precious memories of our relationship. ❤️🫂",
        "photoUrls": [
          "./photos/memory_2.jpg"
        ],
        "tags": [
          "Stargazing",
          "Hilltop",
          "Wishes",
          "Quiet Night"
        ]
      },
      {
        "id": "mem-3",
        "title": "“The first time you came to my hometown and arrived at my home. ❤️”",
        "date": "2025-04-01",
        "location": "barasat",
        "category": "travel",
        "summary": "“The day you came to my hometown and visited my home for the first time—a simple moment that became a beautiful memory forever. ❤️”",
        "description": "“The day you came all the way to my hometown and visited my home for the first time is a memory I’ll always keep close to my heart. Seeing you there, in my own little world, felt so special. It was more than just a visit—it felt like our two worlds were finally coming a little closer together. I was so happy to have you beside me, and that day became another beautiful chapter of our story. ❤️”\n",
        "photoUrls": [
          "./photos/memory_3.jpg"
        ],
        "tags": [
          "Monsoon",
          "Dancing",
          "Laughter",
          "Unplanned"
        ]
      },
      {
        "id": "mem-4",
        "title": "3rd Anniversary ",
        "date": "2022-10-01",
        "location": "Gayerkata tea Garden D",
        "category": "Anniversary",
        "summary": "Our 3rd anniversary—the first time we celebrated our love together after three long years of distance. Finally, a day where it wasn’t just calls and messages, but you and me, together. ❤️”",
        "description": "We tried flipping pancakes and accidentally stuck one to the ceiling edge. You laughed with your eyes crinkling and flour on your nose. Those gentle, ordinary mornings are what real forever is made of.",
        "photoUrls": [
          "./photos/memory_4.jpg"
        ],
        "tags": [
          "Breakfast",
          "Cozy",
          "Home",
          "Pancakes"
        ]
      }
    ],
    "memoryVideos": [
      {
        "id": "mem-vid-1",
        "title": "forever you ",
        "caption": "i love you for ever and ever and ever",
        "url": "",
        "idbKey": "mem_vid_1788525409240",
        "fileName": "document_6114033413558116452.mp4"
      },
      {
        "id": "vid-1788526067975-0",
        "title": "permanent ",
        "caption": "Darling you are permanent ",
        "url": "https://yvaeokluxlphnotexvlq.supabase.co/storage/v1/object/public/media/videos/memory_video_2.mp4",
        "idbKey": "mem_vid_1788526067974_0",
        "fileName": "document_6111781613744431375.mp4"
      }
    ],
    "letters": [
      {
        "id": "let-1",
        "title": "The Day I Finally Saw You",
        "date": "2024-01-01",
        "excerpt": "Two years of waiting, dreaming, and missing you finally came to an end when you stood in front of me.",
        "content": "My love,\n\nI still remember the moment I saw you for the first time after two long years of our relationship. ❤️ After spending so much time talking through calls and messages, imagining what it would feel like to finally stand beside you, suddenly you were actually there.\n\nMy heart started beating so fast. 🥹❤️ I was nervous, shy, and honestly didn’t know what to say. I had imagined that moment so many times, but nothing could have prepared me for how it actually felt.\n\nAnd then I held your hand for the first time. 🫂 Your eyes, your hair, your smile—everything about you looked exactly like the beautiful dream I had imagined so many nights before meeting you.\n\nFor those few moments, I forgot everything else. There was only you and me.\n\nAfter waiting for two years, I finally understood that some dreams really do come true. ❤️",
        "signature": "Forever Yours ❤️",
        "isLocked": false
      },
      {
        "id": "let-2",
        "title": "The First Rose I Gave You",
        "date": "2024-05-10",
        "excerpt": "Before I knew where our story would take us, there was a rose, a nervous heart, and a feeling I could never forget.",
        "content": "My love,\n\nDo you remember this moment? 🌹❤️ The first time I stood in front of you with a rose in my hand, my heart was full of emotions I couldn’t put into words.\n\nI was nervous, but at the same time, I was incredibly happy. 🥹 I didn’t know what the future would look like, but I knew that I wanted you to be a part of it.\n\nThat little rose may have looked simple, but for me, it carried so much meaning. It was my way of saying what my heart was struggling to express.\n\nLooking back at this picture now, I realize how beautiful the beginning of our story really was. 🌹\n\nWe didn’t know how many memories were waiting for us. We didn’t know about all the places we would visit, all the smiles we would share, or all the difficult days we would get through together.\n\nWe only knew that we had each other.\n\nAnd sometimes, that is all you need. ❤️",
        "signature": "Your safe harbor",
        "isLocked": false
      },
      {
        "id": "let-3",
        "title": "Our First Durga Puja Together",
        "date": "2025-11-15",
        "excerpt": "Among the lights, celebrations, and countless people, my favorite part of that Durga Puja was simply having you beside me.",
        "content": "My love,\n\nOur first Durga Puja together will always have a special place in my heart. ❤️✨\n\nDurga Puja already carries so much happiness, celebration, and beautiful memories, but that year it became even more special because I experienced it with you.\n\nWalking around together, seeing the decorations, spending time with you, taking pictures—it all felt different. 🥹❤️ Even an ordinary moment became special simply because you were there.\n\nWhen I look at this picture today, I don’t just see two people standing together.\n\nI see two people creating one of their first beautiful memories together.\n\nI wish I could go back to that day for just a few minutes—to see you again, stand beside you again, and feel that happiness all over again. 🫂✨\n\nOur first Durga Puja together was not just a festival.\n\nIt became a chapter in our love story. ❤️",
        "unlockDate": "2026-11-15",
        "signature": "Your Forever Soulmate",
        "isLocked": true
      }
    ],
    "reasons": [
      {
        "id": "rs-1",
        "num": 1,
        "title": "Your radiant, soul-warming smile",
        "desc": "The way your whole face lights up and crinkles at the corners when something genuinely amuses you.",
        "category": "Appearance & Spirit",
        "count": 142
      },
      {
        "id": "rs-2",
        "num": 2,
        "title": "How safe I feel in your presence",
        "desc": "In a noisy and exhausting world, simply hearing your voice quiets all internal chaos and brings me peace.",
        "category": "Soul Connection",
        "count": 98
      },
      {
        "id": "rs-3",
        "num": 3,
        "title": "Your immense kindness toward others",
        "desc": "The gentle empathy you extend toward strangers, animals, and anyone carrying a heavy burden.",
        "category": "Heart & Character",
        "count": 87
      },
      {
        "id": "rs-4",
        "num": 4,
        "title": "How your hand fits perfectly in mine",
        "desc": "As though the contours of our fingers were drafted by celestial architects to interlock without slipping.",
        "category": "Touches",
        "count": 115
      },
      {
        "id": "rs-5",
        "num": 5,
        "title": "Your cute determination when learning",
        "desc": "That adorable focus expression where you bite your lip slightly when concentrating on something new.",
        "category": "Quirks",
        "count": 76
      },
      {
        "id": "rs-6",
        "num": 6,
        "title": "The way you believe in my dreams",
        "desc": "Even when I doubt my own strength, your faith in me gives me the courage of a lion.",
        "category": "Partnership",
        "count": 104
      }
    ],
    "plans": [
      {
        "id": "plan-1",
        "title": "Northern Lights under glass igloos in Tromsø",
        "targetDate": "Winter 2026",
        "notes": "Sleeping beneath the dancing Aurora Borealis with warm blankets and hot cider."
      },
      {
        "id": "plan-2",
        "title": "Our cozy dream home with a sunny reading nook",
        "targetDate": "2027",
        "notes": "Floor to ceiling bookshelves, soft rugs, and a wide window facing a blooming garden."
      },
      {
        "id": "plan-3",
        "title": "Adopting a rescue golden retriever pup",
        "targetDate": "Spring 2027",
        "notes": "Teaching him to fetch our morning newspaper and take him on beach runs."
      },
      {
        "id": "plan-4",
        "title": "Sunset dinner in Santorini overlooking the caldera",
        "targetDate": "Summer 2026",
        "notes": "White houses, azure domes, Aegean sea breeze, and toast to our endless love."
      }
    ],
    "promises": [
      {
        "id": "prom-1",
        "title": "To always listen with an open, tender heart",
        "status": "forever",
        "desc": "Never just waiting for my turn to speak, but listening to understand your fears, hopes, and quiet sighs."
      },
      {
        "id": "prom-2",
        "title": "To never let the spark of romance fade into routine",
        "status": "forever",
        "desc": "To keep bringing you surprise flowers, writing spontaneous notes, and kissing your forehead just because."
      },
      {
        "id": "prom-3",
        "title": "To stand as your unshakeable shield and safe harbor",
        "status": "always",
        "desc": "Whenever storms rise or the world turns cold, my shoulder and arms will always be your unbreakable shelter."
      },
      {
        "id": "prom-4",
        "title": "To celebrate every one of your victories as my own",
        "status": "kept",
        "desc": "To cheer the loudest in the front row whenever you step into your brilliance."
      }
    ],
    "music": [
          {
                "id": "trk-1",
                "title": "Kalyani",
                "artist": "Shreya Ghoshal",
                "url": "https://yvaeokluxlphnotexvlq.supabase.co/storage/v1/object/public/media/audio/kalyani.mp3",
                "duration": "4:08",
                "cover": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop"
          },
          {
                "id": "trk-2",
                "title": "Mann Mera",
                "artist": "Gajendra Verma",
                "url": "https://yvaeokluxlphnotexvlq.supabase.co/storage/v1/object/public/media/audio/mann_mera.mp3",
                "duration": "5:51",
                "cover": "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=400&auto=format&fit=crop"
          },
          {
                "id": "trk-3",
                "title": "Teri Meri Kahaani",
                "artist": "Arijit Singh",
                "url": "https://yvaeokluxlphnotexvlq.supabase.co/storage/v1/object/public/media/audio/teri_meri_kahaani.mp3",
                "duration": "5:37",
                "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop"
          }
],
    "secretRoom": {
      "password": "foreverandsampa",
      "hint": "Our sacred word combining forever and your name",
      "title": "The Hidden Sanctuary of My Heart",
      "letter": "My dearest Sampa,\n\nIf you have unlocked this room, you hold the deepest key to my soul. Long before words existed, the universe wrote our story in stardust. No distance, no quiet night, and no passing year could ever diminish how intensely I love you.\n\nEvery day with you feels like discovering a new constellation. Thank you for your warmth, your laughter, your gentle gaze, and the way you make the whole chaotic world feel quiet and safe.\n\nThis secret corner will always be ours. Whenever you feel overwhelmed by the world, return here to remember: you are cherished beyond human comprehension.\n\nForever and always,\nYour soulmate.",
      "photos": [
        "./photos/secret_1.jpg",
        "./photos/secret_2.jpg",
        "./photos/secret_3.jpg",
        "./photos/secret_4.jpg",
        "./photos/secret_5.jpg",
        "./photos/secret_6.jpg",
        "./photos/secret_7.jpg",
        "./photos/secret_8.jpg",
        "./photos/secret_9.jpg",
        "./photos/secret_10.jpg",
        "./photos/secret_11.jpg",
        "./photos/secret_12.jpg",
        "./photos/secret_13.jpg",
        "./photos/secret_14.jpg",
        "./photos/secret_15.jpg",
        "./photos/secret_16.jpg",
        "./photos/secret_17.jpg",
        "./photos/secret_18.jpg",
        "./photos/secret_19.jpg",
        "./photos/secret_20.jpg",
        "./photos/secret_21.jpg",
        "./photos/secret_22.jpg",
        "./photos/secret_23.jpg",
        "./photos/secret_24.jpg",
        "./photos/secret_25.jpg",
        "./photos/secret_26.jpg",
        "./photos/secret_27.jpg",
        "./photos/secret_28.jpg",
        "./photos/secret_29.jpg",
        "./photos/secret_30.jpg",
        "./photos/secret_31.jpg",
        "./photos/secret_32.jpg",
        "./photos/secret_33.jpg",
        "./photos/secret_34.jpg",
        "./photos/secret_35.jpg",
        "./photos/secret_36.jpg",
        "./photos/secret_37.jpg",
        "./photos/secret_38.jpg",
        "./photos/secret_39.jpg",
        "./photos/secret_40.jpg",
        "./photos/secret_41.jpg",
        "./photos/secret_42.jpg",
        "./photos/secret_43.jpg",
        "./photos/secret_44.jpg",
        "./photos/secret_45.jpg",
        "./photos/secret_46.jpg",
        "./photos/secret_47.jpg",
        "./photos/secret_48.jpg",
        "./photos/secret_49.jpg",
        "./photos/secret_50.jpg",
        "./photos/secret_51.jpg",
        "./photos/secret_52.jpg",
        "./photos/secret_53.jpg",
        "./photos/secret_54.jpg",
        "./photos/secret_55.jpg",
        "./photos/secret_56.jpg",
        "./photos/secret_57.jpg",
        "./photos/secret_58.jpg",
        "./photos/secret_59.jpg",
        "./photos/secret_60.jpg",
        "./photos/secret_61.jpg",
        "./photos/secret_62.jpg",
        "./photos/secret_63.jpg",
        "./photos/secret_64.jpg",
        "./photos/secret_65.jpg",
        "./photos/secret_66.jpg",
        "./photos/secret_67.jpg",
        "./photos/secret_68.jpg",
        "./photos/secret_69.jpg",
        "./photos/secret_70.jpg",
        "./photos/secret_71.jpg",
        "./photos/secret_72.jpg",
        "./photos/secret_73.jpg",
        "./photos/secret_74.jpg",
        "./photos/secret_75.jpg",
        "./photos/secret_76.jpg",
        "./photos/secret_77.jpg",
        "./photos/secret_78.jpg",
        "./photos/secret_79.jpg",
        "./photos/secret_80.jpg",
        "./photos/secret_81.jpg",
        "./photos/secret_82.jpg",
        "./photos/secret_83.jpg",
        "./photos/secret_84.jpg",
        "./photos/secret_85.jpg",
        "./photos/secret_86.jpg",
        "./photos/secret_87.jpg",
        "./photos/secret_88.jpg",
        "./photos/secret_89.jpg",
        "./photos/secret_90.jpg",
        "./photos/secret_91.jpg",
        "./photos/secret_92.jpg",
        "./photos/secret_93.jpg",
        "./photos/secret_94.jpg",
        "./photos/secret_95.jpg",
        "./photos/secret_96.jpg",
        "./photos/secret_97.jpg",
        "./photos/secret_98.jpg",
        "./photos/secret_99.jpg"
]
    },
    "memoryVideo": {
      "id": "mem-vid-1",
      "title": "forever you ",
      "caption": "i love you for ever and ever and ever",
      "url": "https://yvaeokluxlphnotexvlq.supabase.co/storage/v1/object/public/media/videos/memory_video_1.mp4",
      "idbKey": "mem_vid_1788525409240",
      "fileName": "document_6114033413558116452.mp4"
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
      if (Array.isArray(parsed.memoryVideos)) {
        UNIVERSE.memoryVideos = parsed.memoryVideos;
      } else if (parsed.memoryVideo && (parsed.memoryVideo.idbKey || parsed.memoryVideo.url)) {
        UNIVERSE.memoryVideos = [parsed.memoryVideo];
      }
    } catch (e) {
      console.warn('Could not parse saved universe data, using defaults:', e);
    }
  }

  // ------------------------------------------------------------------------
  // 1b. SUPABASE REALTIME CLOUD INTEGRATION (INSTAGRAM-STYLE LIVE SYNC)
  // ------------------------------------------------------------------------
  const SUPABASE_URL = 'https://yvaeokluxlphnotexvlq.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2YWVva2x1eGxwaG5vdGV4dmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MTU3MjUsImV4cCI6MjEwNDA5MTcyNX0.NXUfrXZ0nUM5j8iJEGGCqwXVXK9Axcf_xTubTdzIj7A';
  let supabaseClient = null;

  try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('✨ Supabase Cloud client initialized!');
    }
  } catch (err) {
    console.warn('Could not initialize Supabase client:', err);
  }

  async function uploadFileToSupabaseStorage(file, folder = 'media') {
    if (!supabaseClient) return null;
    try {
      const cleanName = `${folder}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const { data, error } = await supabaseClient.storage.from('media').upload(cleanName, file, {
        cacheControl: '3600',
        upsert: true
      });
      if (error) {
        console.warn('Supabase storage upload error:', error);
        return null;
      }
      const { data: pubData } = supabaseClient.storage.from('media').getPublicUrl(cleanName);
      return pubData ? pubData.publicUrl : null;
    } catch (err) {
      console.warn('Supabase storage exception:', err);
      return null;
    }
  }

  async function syncUniverseFromCloud() {
    if (!supabaseClient) return;
    try {
      const { data, error } = await supabaseClient
        .from('universe_data')
        .select('data')
        .eq('id', 'sampa_universe')
        .maybeSingle();

      if (data && data.data) {
        const cloudData = data.data;
        UNIVERSE = { ...DEFAULT_UNIVERSE, ...cloudData };
        UNIVERSE.settings = { ...DEFAULT_UNIVERSE.settings, ...(cloudData.settings || {}) };
        UNIVERSE.secretRoom = { ...DEFAULT_UNIVERSE.secretRoom, ...(cloudData.secretRoom || {}) };
        if (Array.isArray(cloudData.memoryVideos)) {
          UNIVERSE.memoryVideos = cloudData.memoryVideos;
        }
        await saveUniverseToDB(UNIVERSE);
        renderAllComponents();
        if (typeof updateTimer === 'function') updateTimer();
        console.log('☁️ Synced fresh data from Supabase Cloud!');
      }

      // Realtime live subscription (Instagram style live sync!)
      supabaseClient
        .channel('realtime_universe_data')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'universe_data', filter: 'id=eq.sampa_universe' }, (payload) => {
          if (payload.new && payload.new.data) {
            const fresh = payload.new.data;
            UNIVERSE = { ...DEFAULT_UNIVERSE, ...fresh };
            UNIVERSE.settings = { ...DEFAULT_UNIVERSE.settings, ...(fresh.settings || {}) };
            UNIVERSE.secretRoom = { ...DEFAULT_UNIVERSE.secretRoom, ...(fresh.secretRoom || {}) };
            if (Array.isArray(fresh.memoryVideos)) {
              UNIVERSE.memoryVideos = fresh.memoryVideos;
            }
            renderAllComponents();
            if (typeof updateTimer === 'function') updateTimer();
            showToast('✨ Live update received from the stars!');
          }
        })
        .subscribe();
    } catch (err) {
      console.warn('Supabase sync failure:', err);
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
  const MASTER_DB_VERSION = 2;
  const DATA_STORE = 'universe_data_store';
  const AUDIO_STORE = 'audio_tracks';
  const VIDEO_STORE = 'video_tracks';

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
        if (!db.objectStoreNames.contains(VIDEO_STORE)) {
          db.createObjectStore(VIDEO_STORE);
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
      const tx = db.transaction([DATA_STORE, AUDIO_STORE, VIDEO_STORE], 'readwrite');
      tx.objectStore(DATA_STORE).clear();
      tx.objectStore(AUDIO_STORE).clear();
      tx.objectStore(VIDEO_STORE).clear();
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

  function extractYouTubeId(url) {
    if (!url || typeof url !== 'string') return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
  }

  window.extractYouTubeId = extractYouTubeId;

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

  async function saveVideoBlob(key, blob) {
    try {
      const db = await openMasterDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(VIDEO_STORE, 'readwrite');
        const store = tx.objectStore(VIDEO_STORE);
        const req = store.put(blob, key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('saveVideoBlob error:', e);
    }
  }

  async function getVideoBlob(key) {
    try {
      const db = await openMasterDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(VIDEO_STORE, 'readonly');
        const store = tx.objectStore(VIDEO_STORE);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('getVideoBlob error:', e);
      return null;
    }
  }

  async function deleteVideoBlob(key) {
    try {
      const db = await openMasterDB();
      const tx = db.transaction(VIDEO_STORE, 'readwrite');
      tx.objectStore(VIDEO_STORE).delete(key);
    } catch (e) {
      console.warn('deleteVideoBlob error:', e);
    }
  }

  const videoObjectUrls = {};

  async function resolveMemoryVideoUrl(videoData) {
    if (!videoData) return '';
    if (videoData.idbKey) {
      try {
        if (videoObjectUrls[videoData.idbKey]) {
          return videoObjectUrls[videoData.idbKey];
        }
        const blob = await getVideoBlob(videoData.idbKey);
        if (blob) {
          const url = URL.createObjectURL(blob);
          videoObjectUrls[videoData.idbKey] = url;
          return url;
        }
      } catch (e) {
        console.warn('Could not read video from IndexedDB, falling back to url', e);
      }
    }
    return videoData.url || '';
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

    // 6. Memories Grid & Memory MP4 Video
    renderMemoryVideo();
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
      musicList.innerHTML = UNIVERSE.music.map((trk, i) => {
        const ytId = extractYouTubeId(trk.url);
        const coverSrc = trk.cover || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop');
        return `
          <div class="track-item-card" onclick="selectMusicTrack(${i})">
            <img src="${coverSrc}" alt="${trk.title}" class="track-cover">
            <div class="track-details">
              <div class="track-name" style="display:flex; align-items:center; gap:6px;">
                <span>${trk.title}</span>
                ${ytId ? `<span class="badge" style="background:rgba(239, 68, 68, 0.2); color:#f87171; border:1px solid rgba(239, 68, 68, 0.4); font-size:9px; padding:2px 6px;">YouTube</span>` : ''}
              </div>
              <div class="track-artist">${trk.artist}</div>
              <div class="track-duration">${trk.duration || ''}</div>
            </div>
            <button class="btn btn-primary" style="padding: 8px 16px; font-size: 10px;">Play</button>
          </div>
        `;
      }).join('');
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

  async function renderMemoryVideo() {
    const container = document.getElementById('memory-mp4-container');
    if (!container) return;

    const list = Array.isArray(UNIVERSE.memoryVideos)
      ? UNIVERSE.memoryVideos
      : (UNIVERSE.memoryVideo ? [UNIVERSE.memoryVideo] : []);

    const activeVideos = list.filter((v) => v && (v.idbKey || v.url));
    if (activeVideos.length === 0) {
      container.innerHTML = '';
      container.style.display = 'none';
      return;
    }

    const resolved = await Promise.all(
      activeVideos.map(async (v) => {
        const src = await resolveMemoryVideoUrl(v);
        return src ? { ...v, src } : null;
      })
    );
    const validVideos = resolved.filter(Boolean);

    if (validVideos.length === 0) {
      container.innerHTML = '';
      container.style.display = 'none';
      return;
    }

    container.style.display = 'block';
    container.innerHTML = `
      <div class="memory-mp4-header">
        <div class="memory-mp4-badge">
          <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
          <span>ROMANTIC MOTION ARCHIVE // ${validVideos.length > 1 ? validVideos.length + ' MEMORY VIDEOS' : 'MEMORY MP4'}</span>
        </div>
        <h3 class="memory-mp4-title">Our Memories in Motion</h3>
        <p class="memory-mp4-caption">“Living moments captured in time, shining forever in our cosmic sanctuary.”</p>
      </div>

      <div class="memory-mp4-grid">
        ${validVideos.map((vid, idx) => `
          <div class="memory-mp4-card glass-card">
            <div class="memory-mp4-card-header">
              <span class="memory-mp4-card-num">MOTION CHAPTER #${idx + 1}</span>
              <h4 class="memory-mp4-card-title">${vid.title || 'Our Romantic Story in Motion'}</h4>
              ${vid.caption ? `<p class="memory-mp4-card-desc">“${vid.caption}”</p>` : ''}
            </div>
            <div class="memory-mp4-video-wrap">
              <video class="memory-mp4-video" controls playsinline preload="metadata" src="${vid.src}">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        `).join('')}
      </div>
    `;
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
      if (Array.isArray(saved.memoryVideos)) {
        UNIVERSE.memoryVideos = saved.memoryVideos;
      } else if (saved.memoryVideo && (saved.memoryVideo.idbKey || saved.memoryVideo.url)) {
        UNIVERSE.memoryVideos = [saved.memoryVideo];
      } else {
        UNIVERSE.memoryVideos = DEFAULT_UNIVERSE.memoryVideos || [];
      }
      renderAllComponents();
      if (typeof updateTimer === 'function') updateTimer();
      loadTrack(currentTrackIdx);
    }
    // Live Cloud Sync from Supabase (Instagram-style sync across all devices!)
    if (typeof syncUniverseFromCloud === 'function') {
      syncUniverseFromCloud();
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
  // 7. FLOATING AUDIO PLAYER (Unified HTML5 + YouTube IFrame API)
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
  let ytPlayer = null;
  let isYtReady = false;
  let pendingYtId = null;
  let ytPollInterval = null;

  function formatTime(s) {
    if (isNaN(s) || s < 0) return '0:00';
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // YouTube IFrame API Callback
  window.onYouTubeIframeAPIReady = function() {
    try {
      ytPlayer = new YT.Player('yt-player-container', {
        height: '200',
        width: '200',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0
        },
        events: {
          onReady: function() {
            isYtReady = true;
            console.log('✨ YouTube IFrame API Ready!');
            if (pendingYtId) {
              ytPlayer.loadVideoById(pendingYtId);
              pendingYtId = null;
            }
          },
          onStateChange: function(event) {
            if (typeof YT !== 'undefined') {
              if (event.data === YT.PlayerState.PLAYING) {
                isMusicPlaying = true;
                if (dockEl) dockEl.classList.add('playing');
                if (navMusicWave) navMusicWave.classList.add('playing');
                if (playPauseIcon) {
                  playPauseIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`;
                }
                startYtProgress();
              } else if (event.data === YT.PlayerState.PAUSED) {
                isMusicPlaying = false;
                if (dockEl) dockEl.classList.remove('playing');
                if (navMusicWave) navMusicWave.classList.remove('playing');
                if (playPauseIcon) {
                  playPauseIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
                }
                stopYtProgress();
              } else if (event.data === YT.PlayerState.ENDED) {
                stopYtProgress();
                window.nextTrack();
              }
            }
          },
          onError: function(err) {
            console.warn('YouTube Player Error:', err);
            stopYtProgress();
            showToast('⚠️ Could not stream YouTube track. Skipping to next song...');
            setTimeout(() => window.nextTrack(), 1500);
          }
        }
      });
    } catch (err) {
      console.warn('Could not init YT.Player:', err);
    }
  };

  function startYtProgress() {
    stopYtProgress();
    ytPollInterval = setInterval(() => {
      if (ytPlayer && ytPlayer.getCurrentTime && ytPlayer.getDuration) {
        const curr = ytPlayer.getCurrentTime() || 0;
        const dur = ytPlayer.getDuration() || 0;
        if (timeCurrent) timeCurrent.textContent = formatTime(curr);
        if (timeDuration && dur > 0) timeDuration.textContent = formatTime(dur);
        if (timeSlider && dur > 0) {
          timeSlider.value = (curr / dur) * 100;
        }
      }
    }, 500);
  }

  function stopYtProgress() {
    if (ytPollInterval) {
      clearInterval(ytPollInterval);
      ytPollInterval = null;
    }
  }

  async function loadTrack(idx) {
    if (!UNIVERSE.music || UNIVERSE.music.length === 0) return;
    currentTrackIdx = (idx + UNIVERSE.music.length) % UNIVERSE.music.length;
    const track = UNIVERSE.music[currentTrackIdx];
    if (!track) return;

    const ytId = extractYouTubeId(track.url);
    const isYouTube = !!ytId;

    if (isYouTube) {
      // YouTube Playback
      if (audioEl) {
        audioEl.pause();
        audioEl.removeAttribute('src');
        audioEl.load();
      }

      if (isYtReady && ytPlayer && ytPlayer.loadVideoById) {
        ytPlayer.loadVideoById(ytId);
        if (!isMusicPlaying) {
          ytPlayer.pauseVideo();
        }
      } else {
        pendingYtId = ytId;
      }
    } else {
      // HTML5 Audio Playback
      if (isYtReady && ytPlayer && ytPlayer.stopVideo) {
        ytPlayer.stopVideo();
      }
      stopYtProgress();

      const resolvedUrl = await resolveTrackUrl(track);
      if (audioEl) {
        audioEl.src = resolvedUrl;
      }
    }

    const defaultCover = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop';
    const coverUrl = track.cover || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : defaultCover);

    if (dockCover) dockCover.src = coverUrl;
    if (dockTitle) dockTitle.textContent = track.title;
    if (dockArtist) dockArtist.textContent = track.artist + (isYouTube ? ' (YouTube)' : '');
    if (navMusicTitle) navMusicTitle.textContent = track.title;
  }
  loadTrack(0);

  window.playCurrentTrack = () => {
    const track = UNIVERSE.music[currentTrackIdx];
    const ytId = track ? extractYouTubeId(track.url) : null;

    if (ytId) {
      if (audioEl) audioEl.pause();
      if (isYtReady && ytPlayer && ytPlayer.playVideo) {
        ytPlayer.playVideo();
      } else {
        pendingYtId = ytId;
      }
    } else {
      if (isYtReady && ytPlayer && ytPlayer.pauseVideo) {
        ytPlayer.pauseVideo();
      }
      stopYtProgress();
      if (audioEl) {
        audioEl.play().catch((err) => console.log('Autoplay issue:', err));
      }
    }
  };

  window.pauseCurrentTrack = () => {
    const track = UNIVERSE.music[currentTrackIdx];
    const ytId = track ? extractYouTubeId(track.url) : null;

    if (ytId) {
      if (isYtReady && ytPlayer && ytPlayer.pauseVideo) {
        ytPlayer.pauseVideo();
      }
    } else {
      if (audioEl) audioEl.pause();
    }
  };

  window.toggleMusicPlayback = () => {
    if (isMusicPlaying) {
      window.pauseCurrentTrack();
    } else {
      window.playCurrentTrack();
    }
  };

  if (navMusicBtn) {
    navMusicBtn.addEventListener('click', window.toggleMusicPlayback);
  }

  if (audioEl) {
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
  }

  window.handleSeek = (val) => {
    const track = UNIVERSE.music[currentTrackIdx];
    const ytId = track ? extractYouTubeId(track.url) : null;

    if (ytId && isYtReady && ytPlayer && ytPlayer.getDuration) {
      const dur = ytPlayer.getDuration() || 0;
      if (dur > 0) {
        ytPlayer.seekTo((val / 100) * dur, true);
      }
    } else {
      if (audioEl && audioEl.duration) {
        audioEl.currentTime = (val / 100) * audioEl.duration;
      }
    }
  };

  window.nextTrack = async () => {
    const nextIdx = (currentTrackIdx + 1) % UNIVERSE.music.length;
    const wasPlaying = isMusicPlaying;
    await loadTrack(nextIdx);
    if (wasPlaying) {
      window.playCurrentTrack();
    }
  };

  window.prevTrack = async () => {
    const prevIdx = (currentTrackIdx - 1 + UNIVERSE.music.length) % UNIVERSE.music.length;
    const wasPlaying = isMusicPlaying;
    await loadTrack(prevIdx);
    if (wasPlaying) {
      window.playCurrentTrack();
    }
  };

  window.selectMusicTrack = async (idx) => {
    await loadTrack(idx);
    window.playCurrentTrack();
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
        window.SECRET_ROOM_LIGHTBOX = UNIVERSE.secretRoom.photos.map((u, idx) => ({
          url: u,
          title: `Secret Sanctuary Moment #${idx + 1}`,
          caption: 'Our private memories, eternal in stardust.',
          album: 'Secret Vault'
        }));
        photosEl.innerHTML = UNIVERSE.secretRoom.photos.map((url, i) => `
          <div class="secret-photo-thumb" onclick="openLightbox(${i}, window.SECRET_ROOM_LIGHTBOX)">
            <img src="${url}" alt="Private Sanctuary Moment #${i + 1}" loading="lazy">
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
      case 'promises':
        renderAdminPromises(bodyEl);
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

        <!-- 🎬 Memory MP4 Multiple Videos Management Card -->
        <div class="admin-item-card" style="flex-direction: column; background: rgba(244, 63, 94, 0.06); border: 1px solid rgba(244, 63, 94, 0.3); margin-bottom: 24px; padding: 20px; border-radius: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 22px;">🎬</span>
              <div>
                <div style="font-weight: 700; font-size: 15px; color: #fff;">Memory MP4 Video Gallery (Multiple Videos)</div>
                <div style="font-size: 12px; color: var(--text-secondary);">Upload multiple romantic video memories (.mp4, .webm, .mov) directly from your device (phone/PC).</div>
              </div>
            </div>
            <div style="display:flex; gap: 8px; align-items:center;">
              <span style="font-size: 11px; padding: 4px 12px; background: rgba(244, 63, 94, 0.2); border: 1px solid rgba(244, 63, 94, 0.4); color: #ff758f; border-radius: 100px; font-weight: 600;">
                ${(UNIVERSE.memoryVideos || []).length} Video(s)
              </span>
            </div>
          </div>

          <!-- Video Multi-Upload Actions -->
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 16px;">
            <label class="btn btn-primary" style="cursor: pointer; display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px;">
              <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              <span>+ Upload Memory MP4 Videos (Select 1 or More)</span>
              <input type="file" multiple accept="video/mp4,video/webm,video/quicktime,video/*" style="display:none;" onchange="handleMemoryVideosMultiUpload(this.files)">
            </label>
            <button class="btn btn-secondary" onclick="addNewMemoryVideoSlot()" style="padding: 10px 16px;">
              + Add Video by URL
            </button>
            <span style="font-size: 11px; color: var(--text-secondary);">
              Saved in high-capacity storage without quota errors!
            </span>
          </div>

          <!-- Video Items List -->
          <div style="display:flex; flex-direction:column; gap: 16px; width: 100%;">
            ${(UNIVERSE.memoryVideos && UNIVERSE.memoryVideos.length > 0) ? UNIVERSE.memoryVideos.map((v, idx) => `
              <div class="admin-item-card" style="flex-direction: column; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 16px; border-radius: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 10px;">
                  <span style="font-size: 12px; font-weight: 700; color: var(--accent-rose); letter-spacing: 0.08em; text-transform: uppercase;">
                    🎬 Video #${idx + 1} ${(v.fileName ? `• ${v.fileName}` : '')}
                  </span>
                  <button class="admin-delete-btn" onclick="removeMemoryVideoItem('${v.id}')">Delete Video</button>
                </div>

                <div class="admin-grid-2" style="margin-bottom: 10px;">
                  <div>
                    <label class="admin-label">Video Title</label>
                    <input type="text" class="admin-input" value="${v.title || ''}" placeholder="e.g. Our First Trip Video" oninput="updateMemoryVideoItem('${v.id}', 'title', this.value)">
                  </div>
                  <div>
                    <label class="admin-label">Direct Video URL (Optional external link)</label>
                    <input type="text" class="admin-input" value="${v.url || ''}" placeholder="https://..." oninput="updateMemoryVideoItem('${v.id}', 'url', this.value)">
                  </div>
                </div>

                <div style="margin-bottom: 10px;">
                  <label class="admin-label">Romantic Caption / Story</label>
                  <input type="text" class="admin-input" value="${v.caption || ''}" placeholder="Short romantic caption for this video" oninput="updateMemoryVideoItem('${v.id}', 'caption', this.value)">
                </div>

                <div style="display:flex; gap: 10px; align-items:center; flex-wrap: wrap;">
                  <label class="btn btn-outline btn-sm" style="cursor: pointer; padding: 6px 14px; font-size: 11px;">
                    🔄 Replace This Video File
                    <input type="file" accept="video/mp4,video/webm,video/quicktime,video/*" style="display:none;" onchange="replaceMemoryVideoFile('${v.id}', this.files[0])">
                  </label>
                  <span style="font-size: 11px; color: var(--text-secondary);">
                    ${v.idbKey ? '✓ Stored in high-capacity storage' : (v.url ? '✓ Linked via URL' : 'Pending video source')}
                  </span>
                </div>

                <div id="admin-mem-vid-preview-${v.id}" style="margin-top: 10px;"></div>
              </div>
            `).join('') : `
              <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px; border: 1px dashed rgba(255,255,255,0.12); border-radius: 14px;">
                No memory videos uploaded yet. Click "+ Upload Memory MP4 Videos" above to add romantic videos!
              </div>
            `}
          </div>
        </div>

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

    // Asynchronously resolve previews for all videos
    if (Array.isArray(UNIVERSE.memoryVideos)) {
      UNIVERSE.memoryVideos.forEach((v) => {
        if (v.idbKey || v.url) {
          resolveMemoryVideoUrl(v).then((src) => {
            const el = document.getElementById(`admin-mem-vid-preview-${v.id}`);
            if (el && src) {
              el.innerHTML = `
                <div style="border-radius: 12px; overflow: hidden; background: #000; max-width: 480px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 6px 20px rgba(0,0,0,0.5);">
                  <video src="${src}" controls style="width: 100%; max-height: 240px; display: block; object-fit: contain;"></video>
                </div>
              `;
            }
          });
        }
      });
    }
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

  window.handleMemoryVideosMultiUpload = async (files) => {
    if (!files || files.length === 0) return;
    showToast(`Uploading ${files.length} video(s)...`);

    if (!Array.isArray(UNIVERSE.memoryVideos)) {
      UNIVERSE.memoryVideos = [];
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        let publicCloudUrl = null;
        // Try uploading directly to Supabase Storage for global instant playback
        if (supabaseClient) {
          showToast(`Uploading "${file.name}" to Cloud...`);
          publicCloudUrl = await uploadFileToSupabaseStorage(file, 'videos');
        }

        const vidKey = 'mem_vid_' + Date.now() + '_' + i;
        if (!publicCloudUrl) {
          // Fallback to high-capacity local IndexedDB
          await saveVideoBlob(vidKey, file);
        }

        const newVid = {
          id: 'vid-' + Date.now() + '-' + i,
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Our Memory in Motion',
          caption: 'A moving glimpse of our love preserved in starlight.',
          url: publicCloudUrl || '',
          idbKey: publicCloudUrl ? '' : vidKey,
          fileName: file.name,
        };
        UNIVERSE.memoryVideos.push(newVid);
      } catch (err) {
        console.error('Error uploading video:', file.name, err);
      }
    }

    await window.saveAllUniverseData();
    renderAllComponents();
    window.switchAdminTab('memories');
    showToast(`🎬 ${files.length} Memory MP4 video(s) uploaded successfully!`);
  };

  window.addNewMemoryVideoSlot = () => {
    if (!Array.isArray(UNIVERSE.memoryVideos)) {
      UNIVERSE.memoryVideos = [];
    }
    UNIVERSE.memoryVideos.push({
      id: 'vid-' + Date.now(),
      title: 'Our Romantic Memory in Motion',
      caption: 'Every motion, smile, and shared breath immortalized forever.',
      url: '',
      idbKey: '',
      fileName: '',
    });
    window.saveAllUniverseData();
    window.switchAdminTab('memories');
  };

  window.removeMemoryVideoItem = async (id) => {
    if (!confirm('Remove this Memory MP4 video?')) return;
    if (!Array.isArray(UNIVERSE.memoryVideos)) return;

    const vid = UNIVERSE.memoryVideos.find((v) => v.id === id);
    if (vid && vid.idbKey) {
      await deleteVideoBlob(vid.idbKey);
      if (videoObjectUrls[vid.idbKey]) {
        URL.revokeObjectURL(videoObjectUrls[vid.idbKey]);
        delete videoObjectUrls[vid.idbKey];
      }
    }

    UNIVERSE.memoryVideos = UNIVERSE.memoryVideos.filter((v) => v.id !== id);
    await window.saveAllUniverseData();
    renderAllComponents();
    window.switchAdminTab('memories');
    showToast('Memory MP4 video removed.');
  };

  window.replaceMemoryVideoFile = async (id, file) => {
    if (!file) return;
    try {
      showToast('Replacing video...');
      if (!Array.isArray(UNIVERSE.memoryVideos)) return;
      const vid = UNIVERSE.memoryVideos.find((v) => v.id === id);
      if (!vid) return;

      if (vid.idbKey) {
        await deleteVideoBlob(vid.idbKey);
        if (videoObjectUrls[vid.idbKey]) {
          URL.revokeObjectURL(videoObjectUrls[vid.idbKey]);
          delete videoObjectUrls[vid.idbKey];
        }
      }

      let publicCloudUrl = null;
      if (supabaseClient) {
        showToast('Uploading new video to Cloud...');
        publicCloudUrl = await uploadFileToSupabaseStorage(file, 'videos');
      }

      if (publicCloudUrl) {
        vid.url = publicCloudUrl;
        vid.idbKey = '';
      } else {
        const vidKey = 'mem_vid_' + Date.now();
        await saveVideoBlob(vidKey, file);
        vid.idbKey = vidKey;
        vid.url = '';
      }
      vid.fileName = file.name;

      await window.saveAllUniverseData();
      renderAllComponents();
      window.switchAdminTab('memories');
    } catch (err) {
      alert('Replace video failed: ' + err.message);
    }
  };

  window.updateMemoryVideoItem = (id, field, value) => {
    if (!Array.isArray(UNIVERSE.memoryVideos)) return;
    const vid = UNIVERSE.memoryVideos.find((v) => v.id === id);
    if (vid) {
      vid[field] = value;
      renderAllComponents();
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

  // --- TAB: PROMISES (Promises Written in Stardust) ---
  function renderAdminPromises(container) {
    container.innerHTML = `
      <div class="admin-form-card">
        <h3 class="admin-section-title">
          <span>💍 Promises Written in Stardust</span>
          <button class="btn btn-secondary btn-sm" onclick="addNewPromise()">+ Add New Promise</button>
        </h3>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 20px;">
          These sacred lifelong promises and vows are displayed on the public website under "Promises Written in Stardust".
        </p>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${(UNIVERSE.promises || []).map((p, idx) => `
            <div class="admin-item-card" style="flex-direction: column; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 18px; border-radius: 18px;">
              <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 10px;">
                <span style="font-size: 12px; font-weight: 700; color: var(--accent-gold); letter-spacing: 0.1em; text-transform: uppercase;">
                  💍 SACRED PROMISE #${idx + 1}
                </span>
                <button class="admin-delete-btn" onclick="deletePromise('${p.id}')">Delete Promise</button>
              </div>

              <div class="admin-grid-2" style="margin-bottom: 10px;">
                <div>
                  <label class="admin-label">Promise Title / Vow Headline</label>
                  <input type="text" class="admin-input" value="${p.title || ''}" placeholder="e.g. To always listen with an open, tender heart" oninput="updatePromiseField('${p.id}', 'title', this.value)">
                </div>
                <div>
                  <label class="admin-label">Status Badge (e.g. FOREVER / ALWAYS / KEPT)</label>
                  <input type="text" class="admin-input" value="${p.status || 'forever'}" placeholder="FOREVER, ALWAYS, or KEPT" oninput="updatePromiseField('${p.id}', 'status', this.value)">
                </div>
              </div>

              <div>
                <label class="admin-label">Vow Description / Romantic Commitment</label>
                <textarea class="admin-textarea" style="min-height: 70px;" placeholder="Write down your heartfelt promise here..." oninput="updatePromiseField('${p.id}', 'desc', this.value)">${p.desc || ''}</textarea>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  window.updatePromiseField = (id, field, value) => {
    if (!Array.isArray(UNIVERSE.promises)) return;
    const p = UNIVERSE.promises.find((item) => item.id === id);
    if (p) {
      p[field] = value;
      renderAllComponents();
    }
  };

  window.addNewPromise = () => {
    if (!Array.isArray(UNIVERSE.promises)) {
      UNIVERSE.promises = [];
    }
    UNIVERSE.promises.push({
      id: 'prom-' + Date.now(),
      title: 'To cherish and hold your hand through every chapter of life',
      status: 'forever',
      desc: 'Through every sunrise and every midnight star, my heart will remain devoted entirely to you.',
    });
    window.saveAllUniverseData();
    window.switchAdminTab('promises');
    showToast('💍 New promise added to Stardust!');
  };

  window.deletePromise = (id) => {
    if (confirm('Delete this sacred promise?')) {
      UNIVERSE.promises = UNIVERSE.promises.filter((p) => p.id !== id);
      window.saveAllUniverseData();
      window.switchAdminTab('promises');
      showToast('Promise removed.');
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

        <!-- Option 2: Add YouTube Song / Web Stream Link -->
        <div class="glass-card" style="padding: 18px; margin-bottom: 24px; border: 1px solid var(--card-border); border-radius: 16px; background: rgba(255,255,255,0.03);">
          <div style="font-size: 14px; font-weight: 600; color: var(--accent-gold); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span>🔴</span> Add YouTube Song or Web Audio Link
          </div>
          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
            Paste any YouTube video link (e.g. <code>https://www.youtube.com/watch?v=...</code> or <code>https://youtu.be/...</code>) or direct MP3 audio stream to play seamlessly in Sampa's universe.
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
            <input type="text" id="adm-yt-title" class="admin-input" style="flex: 1; min-width: 140px;" placeholder="Song Title (e.g. Tum Hi Ho)">
            <input type="text" id="adm-yt-artist" class="admin-input" style="flex: 1; min-width: 140px;" placeholder="Artist (e.g. Arijit Singh)">
            <input type="text" id="adm-yt-url" class="admin-input" style="flex: 2; min-width: 220px;" placeholder="Paste YouTube link (https://www.youtube.com/watch?v=...)">
            <button class="btn btn-primary btn-sm" onclick="handleAddYouTubeTrack()" style="padding: 8px 18px; font-weight: 600; white-space: nowrap;">
              + Add Song
            </button>
          </div>
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
                  ${(m.url && extractYouTubeId(m.url))
                    ? `<span class="badge" style="background:rgba(239, 68, 68, 0.2); color:#f87171; border:1px solid rgba(239, 68, 68, 0.4); font-size:11px; padding:3px 8px;">🔴 YouTube Audio</span>`
                    : m.idbKey
                    ? `<span class="badge badge-gold" style="font-size:11px; padding:3px 8px;">💾 Uploaded Audio (${m.fileName || 'Device File'})</span>`
                    : `<span class="badge" style="background:rgba(59, 130, 246, 0.2); color:#60a5fa; border:1px solid rgba(59, 130, 246, 0.4); font-size:11px; padding:3px 8px;">🌐 Cloud Audio CDN</span>`
                  }
                  <span style="font-size:11px; color:var(--text-muted);">Duration: ${m.duration || '3:30'}</span>
                </div>
                <div class="admin-item-row" style="margin-top: 6px;">
                  <input type="text" class="admin-input" style="flex:1; font-size:11px;" value="${m.url || ''}" placeholder="Stream URL or YouTube link" onchange="updateMusicField(${idx}, 'url', this.value)">
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

  window.handleAddYouTubeTrack = () => {
    const titleInput = document.getElementById('adm-yt-title');
    const artistInput = document.getElementById('adm-yt-artist');
    const urlInput = document.getElementById('adm-yt-url');

    if (!urlInput || !urlInput.value.trim()) {
      showToast('⚠️ Please enter a YouTube or audio URL');
      return;
    }

    const rawUrl = urlInput.value.trim();
    const ytId = extractYouTubeId(rawUrl);
    const title = (titleInput && titleInput.value.trim()) || (ytId ? 'YouTube Romantic Song' : 'Romantic Song');
    const artist = (artistInput && artistInput.value.trim()) || 'Beloved Melody';

    const defaultCover = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop';
    const cover = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : defaultCover;

    const newTrack = {
      id: 'trk-' + Date.now(),
      title: title,
      artist: artist,
      url: rawUrl,
      cover: cover,
      duration: ytId ? 'YouTube' : '4:00'
    };

    UNIVERSE.music.push(newTrack);
    window.saveAllUniverseData();
    renderAllComponents();
    window.switchAdminTab('music');

    const newIdx = UNIVERSE.music.length - 1;
    loadTrack(newIdx).then(() => {
      window.playCurrentTrack();
    });
    showToast(`🎶 Added "${title}" to universe player!`);
  };

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

      // 2. Sync to Supabase Cloud Database (Live across all devices without reload!)
      let cloudSynced = false;
      if (supabaseClient) {
        try {
          const { error } = await supabaseClient
            .from('universe_data')
            .upsert({ id: 'sampa_universe', data: UNIVERSE, updated_at: new Date().toISOString() });
          if (!error) {
            cloudSynced = true;
            console.log('☁️ Synced to Supabase Cloud live!');
          } else {
            console.warn('Supabase save warning:', error);
          }
        } catch (cloudErr) {
          console.warn('Supabase save error:', cloudErr);
        }
      }

      // 3. Safe localStorage cache without throwing quota errors
      try {
        localStorage.setItem('sampa_universe_data', JSON.stringify(UNIVERSE));
      } catch (storageErr) {
        // If localStorage is full, remove key so browser storage stays healthy
        try { localStorage.removeItem('sampa_universe_data'); } catch (_) {}
      }

      renderAllComponents();
      if (cloudSynced) {
        showToast('☁️ Saved to Cloud & Live for Sampa!');
      } else {
        showToast('✨ Changes saved locally!');
      }
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
