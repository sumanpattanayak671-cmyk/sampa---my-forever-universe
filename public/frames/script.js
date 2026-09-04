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
        "title": "kalyani",
        "artist": "love ",
        "url": "https://yvaeokluxlphnotexvlq.supabase.co/storage/v1/object/public/media/audio/kalyani.mp3",
        "duration": "4:08",
        "cover": "data:image/jpeg;base64,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",
        "idbKey": "audio_1788518256900",
        "fileName": "KALYANI - with Shreya Ghoshal   ARJN  KDS  FIFY4 RONN  kya fitoor door raha kyun jaayena lyrical.mp3"
      },
      {
        "id": "trk-2",
        "title": "man mera ",
        "artist": "forever",
        "url": "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=gentle-piano-love-story-10878.mp3",
        "duration": "3:54",
        "cover": "data:image/jpeg;base64,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",
        "idbKey": "audio_1788518498377",
        "fileName": "Mann Mera (Official Video)  Table No 21  Rajeev Khandelwal & Tina Desai  Gajendra Verma.mp3"
      },
      {
        "id": "trk-3",
        "title": "Until I Found You",
        "artist": "Acoustic Soul",
        "url": "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c1e09968a5.mp3?filename=relaxing-romantic-acoustic-guitar-124905.mp3",
        "duration": "5:34",
        "cover": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCACzAZADASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAABAUDBgACBwEI/8QAQBAAAgEDAgQEBAQFAgQGAwEAAQIDAAQRBSEGEjFBEyJRYQdxgZEUIzKhQlKxwdEV4TNikvAIFkNyovEkgsLD/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQMEAgAFBv/EACcRAAICAgICAgICAwEAAAAAAAABAhEDIRIxBEEiURMyQnEUYYHw/9oADAMBAAIRAxEAPwDpXG+ifibc6hZpmZB+aoH6h61ybWFWa3cYG2+TX0SqrGWSUALg7kdq5F8TeHLlI5rjS7RhaSHLuSAB64HXH+9Qe7LFLVM4k1t4t20kjcqk9FO5o4FZCsRwE9APT+tPo9E5LZ3blabqMentSq8s2UiSInnQ5B96by5mODjs0d5bUhVAGTj5elD3l47uSGyT1Y/2o29lintuuHUDy9wPT6dv9qr/AD4JUnam+PFPckJzSa1FnWPgNbm54h1K5l/M8K25QWGcFmHT6A11jie0tYrY38ic1xEOVNhuex+lUP8A8OdqP9O1i65gTLKkQ9Rygn/+x9q6vf2cd9aPBKOo6+hpPk3KTod4tRSs4o7OzyMTgN15jk/emHBmnC2sbm5IHNIS2fbtW2saXNb3zWzKQxbl+9WeK2/BaMFj8obsfToP71P4ye5M9PypRfGMSman+ZM5xkfKlUkQHSnl0uXJ7fKgpI19MVht2MilQmnjwP0gg+1LHjEUviQ+IpB3AGRVlaAOPLQc9my5IGa5So5xsWyWtjqkBS4jQsf4gN6p2ucOvZJKtsgljYhg38S/KrnPasTzRkq/rQc08yArcxZH8wGabDI4u4iMmKM1Uim6JDflJXiEnhwjzE7HOegptDqJn/KnG/Tp1ph+SZOa3dopD1KnGfn60k1WGaK+EshDRykAuoxg+uKc2sj6EKMsS7tDEWayowUDftWWkDW1ypTICrg/OpNPMiyAOMY71YIrRZVDdaVKTjpjVjUnaDLKfKAMd8VK0YbOelCRqkZPNhT2r1rsIvXek1vRVdI0uoMkjtSS8gwDgbUZcavDGW53waBm1G3lBwwx86dGElsRPLDqyvajERnak0gyzAdqsmo8siEqQaRcqtI/LnOelW4ujz8yV6FjArID3qdAQeZe9ZdJiSsgPKQD0qj0Rew225XUk9uvt/kV48DW7Bl3jPcHIrxY2jYSJ96KSTYgqCp6r2rJp7IldXXkceXt7V6sBB23968MPmBjJ5fQ9qMt4ycZ60ubodijZpFCDtij4rUFRgVtFCCRgU0toM42qaUi6GMEhsQ2MCihpmVB3FN7S26bUelsKQ8jKoYV7KpJpWOg3NDSaaRnC1dmtR0FDTWeDkDejHKwTwJlDureS3JcKSvfHUVvazgFHjYK/Zux9qtdzZ8yny/Oqtf6a0Ds8IPKeq1ZjyKSpnn5sLg7Q6t2gvYzHMCH7g9/lUg09rdUKHKg5GfSqzDcMuEcnboe4+VWXStZKIsd5iSI9HA3FalBx6FRkpdh3hmcBo/y7mI5Un9wab6FO0UqpgqjnAU9Uf0qNY4plSSF1x0Rx0I/lNT2amRpI3UrKm4Py9fX/G1YbtDEqZ2DT0n1C0jZmCxso36mj7fTYIQHxzt6t/ikvAd/4+llHc88Zxv6U7l1OCNiObnP/KKlehyN5pDGCcA1zvjTiYyXLaVbMmWB8V03Kj0+dHcd8Tz2cCQWMatPOML/ABEdulUex066traWeZQ17KehP6fmfX29q3GNK2c5ekT2UMECNc3RCqDtnqTVh4J0X/V9RGpajEws4GzFG38b9vnit+HNChkMb3YM8o8/m/SvsBXQLC3Z+SOJQANgAMAfKg3WjDV7GV5A1zF4XNhSfMR1x6VvLDHdW7wXChlYYINTxfmK2zAqcEMMV74XOuU6isK0YtM4xxPwrJpd66RACKQ5t2Awrn+Q/wAreh6H96ouow5QvGCCpIkjPUH5V9KalZQalZy2t2nMjDBB7VxbizSZLHUjbXTKs5H5Nwxws69lc9j25vv60embTvTOX3EbRO5BBVhkZpLegrJnbfrVs1C2eOWRJUMbAkFD1U1VNVykpUjBq3FJNURZoOMr9HU//D/rq2erXOmSuFFyVeME9SAQcft9q+hCMP2wa+K9Av207W9PvUO8EyOfcA7/ALV9pW8izwxyL0YA0rNGnYzFK1Qs4gto7gW/NGpm5vK2NwKUawAyLEmBy7Yp7qLfmO2B5Fxk1WpnFzP5SQqn71hUo0UQtsrd5bcsmMUFJBvnAzT7VMeKeUbUtdRk42qPJ2elj6FhtyCdqikjwMGmTAbEjFQSKpGwpY2hNJEN9qEuIwRgrmnksYoKZAD0FFMy0Vi7sEk/9Pf2oP8ADeHzKwyhG4Jqzyx+XA/egZ7UNnGKapCpY12hPEMyeXf0qw2CssIU5ND2tiEbJ+9NY4wq5ztihOVmoQrsTamxhPKSCvXekl9f52Rt6m4lmd5vDUkEnciqreO8IflD5UZye9U4saa2SZ8ri2gq5jlmyQCc9KVPHNE5yrCi7C/mK85ywAyQu5H0xVhsLm1uIx4iKQdifT5+lUtyx+iNRhm6dMqcc8sbdSVprw7pzX9xcsmOVACR33pxfaNFLvChUn0FWXgDhu40jU2u9StnNnLEyKenLJjyk5+prX5IyVmZYp43vo53caVK93NGIiojfkLnpnpj71PcaGLbSJro58MZUFgQ2TggH3xj/qrt2i2XCOnFnu7uK6nEZUE9EznJA9feqb8TdWsZdBt7S1iDMERAyDC7YJ2+p9e1ZWW2kjEsdbOVwyOox1XON6mbHVM4O+DUSJg4IxnY0X4OV2p0nQuEeRrDkn0NNLaPIyftQEMEgbIG3SndnAdsrtSMkkWYIMntYfSm1rF0qK1gOOlMYY8VHKVnpQj7CYFx0otVyOgqGFNwKLWP9qUx6NAOtYVBXeiBH3rSUBdsjeshYE1vznpWkmkidD5cmmVvEXOQKc2dvlc4pik0LlFNbOT6zoTxSMVXFJFWS2bDglfeu3ajpkdzGQVGaouuaCYixUf71bi8i9M8/L4vuIl0bVJbV8K3NEf1I3SrzZTW2qW/PZyeHfxjmCH9Rxvt6/4rm72/hyYDGNxt5uh+tNdLuWhlTxlbY7Ohww+RpsoJ7RKpOLpnVNDmZYmkt8YdeblHY9CPvXmpXeoANIs0qQt1VEGV6d/fNe8G3Ed0/KZEZ26PjlbP/MP8U5l0q4iuJoiQ/ihWz1C7jb/eo8iceymMk0Iby5SyhjPIWmc8vmPmb3J7ChtPMmpz5RWWIHYIvar5pvA1rPdG51KLxHXAjVmOAPlV103SLW2UR2sCIo9FxihCktdglL7Kxw/p/irGixumNssDk+9XqwsYrSMBRlsdamgt0i3UDm9alqiGOtsmyZeWkV6yiMdqqybPjJBx/QAUSjAdKovEiL/5knfULe88IAKngD9QA9TtTXhnUWu1lhS3uUtoQBFJPsSPQ+4qd6JsPk8p/jaLBcRpL5l8sg/eqjxnplprGmm2vn8GVTzxyDqMdceu3arOZMb53x9xQt1Z2+o248ZA2P0sNiKCdsuo+ZUvYdQLW91IY7xByxvIfLIB0UnsfQ/Q1X9atDIXQryyoSMHsfSujcU8FTTcSajp1sEE/hi4tX/TzDuvp3qh3ttqWnyeBr1jc2wHl8d4jgfXowpsftAe1TKe3NGxVwVYdjX1l8P9cOocIaXOzgymBQ5J7gYP9K+cr3TzHCs7xpNbSjKyqcqfYHsfY7014e16/wBP06O2tnMcMeSq75GTnrTZy5oVCNM+jNRmLWTuTguxz8ht/aq6lzyMT3P7VNY3TXHBunTStl5Iss2e+aQtcbk5JzsKlySaPQwQ0E3k3Mc53oE3Ax5jUN1MeoNKLy4ZX8p2FTVyZYtIcyzrg5NBS3YU9aVS6hsObrQL3RkbANcoMPJDaXUMtgDNaG4yOZyAKgtbfxBkipIrM3szr/Cm2KOjts2N3btgBhWrKOoxvWl3pZiUnHT0rfTIWkjzJkgdKKqrR1NPZPBHtkjatplIQ0ZHAAN9hWlxHhDkVm9hoo+sQlronegpY2VMMuV6dKsGoxZnfavPwqtGrcuR0NVRnSI54+TKrJpUE5V40VSDuBsG+eKj1CKb8SJoLbw36MqHKtVln08xtzRY9ab8L6hbaXfJPe24l5DsOUNT45GTZMK/6Xf4RWWm3jl5Ss1jHBG/NOuGimJIaP3xj9xTn4rSrdSw6RaMsMMQ5pcL1JxgfQf1rT4c2cWuazda29v+HtzLzLAuysyj9RHc7/c1e5dPtpbiSZ7eMyOcsxQZNZk/oTu9nA14dzOkayyO+R+lRSb4m8PPo1pGZYzHIJFQDtjBP96+mY7KGPl5Y1GPauV/H21VuG7aUgki5AH1U1mD+aDJ3Fnz1DHkLkfWj0jxiiYLPFrFJjqa2VfPiqcjszhjRJaQZxTm1ticbVFYRAgE05g5QQDjFQ5JM9XFFURx25GNqMgt8EZ6VNHyEipgMZJHypNjzdVVFydqxpolx5gB70su7puZlGwxSW9llkbA3A7UyML7MSycSzXGowRg4YNt2pTJqqzvyoT86SpZT3Lg74PqdqZWeksjgHf2Xat8YR9i1Oc30WLSZ5FGWZGX1zkVa9OlEijIG/QjpVa02yZNt8e+9WOzgERBA+dJckUKDoMkh32pbqFkJkOVzT22KkgMB96MW1R+21cmZeuzjfEujKqM4TGPaqpZvLHLy451z0Nd84i0WOaxcqvmxXJJNNMN4wAyuexH96vwT1TPK8qO+SI4dWghmVIopY5MYbkO/wDiuk8K8QXN3YW0Vw0jTo5wZey5GAT965/p2nyS6mXkBdAM5BzirgbcQInLsBvttWPIml8RviYPybbO46afxMcbKQQR/DuPvTlECLhRVA+F+oNIslrI2TjIzXQaPj048ibyovHNwMrKysqgmOa6ibaaztprufVIyxI8SJyFUe/tQmgNfWmtXMUks0tqY+aIsedW3G/MNv8Av2qqrxkllJFEFE9s2Dkxkt1/TjtVk4P4ngkaSAQXC2Ea48CY5aFtzt3xsdq8rHyqpEeNqM1It4UzK7ZKt3FZECi+GCAeoz3rwOs0CTWz5QjOxBKg+uK28aML+eox/OOlM0j11JSVropXxC8ax1TRdYjBMdtL4U4BweR8A59qs0kUM0W6qyMP0kbGouJ7SDVdCurYsX5kJUDrkbjFJOFLx72xQqzcyr4bJ2BG3f6GjyNJWDaxwFomo87rbC3dhhvAbww3zUeUn3xXKeKfh3e6Gs9zY33j2kYLlZRhgo36jY/tXb/xMn4preVQP5W6feqv8T5DY8G37CQ5lURKM5BJ/wBga3Ce6MyjqwbguYX3w305gctGGRhnoQT/ALUumI5mA7GlHwY1MS6Df6bIwDxyeKo9Qdj/AEH3ppqGI5nxtk5rPkRplXizTiBXsmxAJqraxqRg23yaeXcvkPrVL11ZJicnFKxxTeyjJNqOgaTVGkkIeT6Cn2lNE5wGz79ap402UrlCQfWm3DjuzvAOVJ0/Up7+4qmcI8dEcJzUtnQ7ZlUADcYrV5JbeV5rMruNwaTpdSW5BZsYHQ1oNUXmJyAM+tScC1ZF7H7axCeVL9RCW6P/AAt9aZWKQOmIiMddqqNxeQz25SRQyt2Nb6VqKWMixqMRnYb9KDg60aWRWXRIgp8vaoNQiBjGBuTigV1QDOG3NPdCjgvHFzqcyQWcfdjgufQVmMW3QyUopWUTU1ZNUkjdcBTyjHyo61t+aPGNqP1fTTd3d7c2YLxKzSBvQVFphzgNin9oQlQI9mRtjKmoTpq+IuM4Jq1Lbqy7CpLHS/xV9FEu3Mw39K3juxWWkjoHBcP4LhJPBXcZA26kmmltLqDk5gJHYBDT7Q7UWmmwxAYwoo+nvC5bs85ZVG1ViBYr52GLfy/821Un4xaXNPwmviRAKs6k4OSOtdWqt/EO3Fzwneof4V5x8wM0ViUd2D8t6o+adT0qS04V06V4+VpZZgBvnytg59Nwap5Loxx619C6pocV98N7eGBBzWd3Kuw3ClmOP3FcbvNPFncstwAvKe9blJIOOLfQnguZ1O2cUxhvW2LZGPWt5L3T4UAYrzfQUM15azDEbCkSTf8AEsg1H+Q9tbwORvTFZ+ZcYwKp9rMY7gKTselW2x5DEGznap5xotxz5AN8VBJ5utL5JUjXLkACmuoxqxONqq2qRySXKwgOV6tyjt6VvGuWjGWXHZNNxLBbsEijeV+2K2tuJrySZFgsHJY8oJJxmodSsvx6W34WFbV4k8MnmzzD5CiNI0KSGRHe7KlTnyjH29KorEo77JFLyJS+OkNzxZdadOIr+0MUv8rCrPpPFUF0o542Qn60utdPs+YySJ40p6vJ5iaMtLKESjliVR7DFTS/G+kX4/yL9nZY7W88R/yw2PWrHp7FlGaT6TaIVGABVit4ORBjtSlEM5eie8iEtowIHSuP63pjJqMwP6Sciuyp5o2WqhxNpxaTmRRk9R60+EuOyWUFLTKZp8ItGGMbjJGaYX8wIjbOAR0pfdW729wTkkk5NH2lob+a1hY8ibs7HoBnr+1YySvbK8GJQaSH/BerR6Vci7nblVmCID/ET1/bNdtt5VnhSVDlWGRXzbr9o0GsFJpXWKIhYkHQe4Pvsa7N8P8AVfxFhHbTMOdVBUd6pwrgkvs8nzJ/lm5lvrKysqkiPl3WdKfTEtTJa+LHeR8i87FWB2PMvp0x6EGrTw1pWp6lZzzy6RFdWW4jmkkHMrDc82+c9N6ZR6JbTQSDWDfm/iUyW0KsSCGB/SMZyDgkZ6dqD4X1eLwLmGDxZHBYSRSxZUou2dhnOdq8vJaW1aI2ldAN7fanpBjKxzQczf8AqRnlcnfCn1Hp3pHa6xd6heB5HmllV+UZyQcnbGaufEEF1NocttZW9vcW8fkeBsM0a52YYxnrtjcVWOE9QTS7bUbeEpJLIq7sCVO4PLgjr9sdj6y4JcrWRUb41qJeuHra8i8f/VbiNfAXEschZWTpg8uMZoGBpdJ4tudOQgRSqLmBQNj/ADY+1OtWa11NIJJoLv8A1ULmR1QxgYGSuD1znbr1qvHUIrifSNTlMkX4K9NlIH6+G4wM532JG3vVScYz4Loow5XF8WWS8InuIjgAt3ArnfxvuPB0iytAcc7NIwz6DH9zV44ikk0maOe1kilLME8CRuUhiMj+/wBq4t8V9Zl1LUIxMyMI4Av5f6ck5OP6fSnYY3K0VZMnw0Vr4e372HE9uwJ5JfynHs1dS1pSJcnI3wa5r8MrE3vGNgoXmRJBK2ewXf8AtXTdfkzPIB170/yEmDxZNFauyxzy7+9J5bbxHyafMA2fQ0KY/MQKkqj0ouwI2a+GMCl2o6Szsl1b5SVO61ZmQKqmt7IK4bIBFZU3HZtwTVFbTVTEqrfx869Ofl2+teyx208YMHlB3BByKfXum27qxAAU9RVbbSZ7ebntTzKpJ5G3B+lMi4y30zDhJf7NHsriNMwv4gPUg9PpWRrJCpMpyP6VsZZ43BMTR+vLuKmk1KI4W4SFlO3XBNb+QtqK70ZbXpXoW+RNHiczEM7Nn1ySaUSJBKym3Jj+ZyDRcaXEMfO0bcg35h0xWuKMc3HvofQapNBZy26zyeFJjmU98UTpMyyNnO9VM6gkmVGSKcaC778vTO1aeF0BeSnKkXy1OQMVeOCdGLz/AImRdu1Vvg/RLjUnV2UiIdSeldg06zSzt0jjAGBiuxwFZ81qkFAAAAdBXteV7VJEZS3iC3FzpNxGTgFW/oaZVDdDNvICM+U0H0FOmc50KSVOFNXTkYqg8UEjB5wgBx7ZRq4fxrdS6tqzSRQlIsLzsoxjYZx7k5rvemMIL/iTTpEIVoXkX3HMx/8A9B9q4rqEPJJJyYwSRSrrY+EOdxKHLp7G6k/BQs0bgbybFfWpobKS3SQSC3MjkE4XHLt2xgCrD+DbuxA+dRzWyIuAMmsPM3opj4sVsRRowljUnmYdcVb9LDFBtVeWMRyFj1q0aJ5lBI+VIyu0V4FVkN3G5k3FBSWnOx5u9W2e1VkBwAaBmhVcdKWpUOlFMSQ6ag7H6GmVvYomDy71OoUDat1fHSucmzoxSJUQKAAMUws4ssNqEtxzEU6s4wCKyMQ104lCCKf275XtSW0XA3prbnGKKYuSGEG7dKX8RhIoFkYgAHqe1M7McxzSH4gTQ2+jB5zhObf3plWidupFFvl/F3LSxbWoP/EPSnGnxmG3aWNDzSYjQEdh1JqLh+a21jTbO3t1PKZjzgjdcevsc12nStIs7S1gC28RdV/WVBP3rvwyyPj0O/zoYKm1ZR+M9Dik0KxvYogGESK8ir5ht98VUeH9Tm0rV7ZyQPNyNynYrnY/2ruGoWqXllLbSAcrrj5V8/8AFVtPpN9OrZU+ZAD3ODg/erVjro8Z5ebdn0FZ3C3VtHMnRhmpq5z8KeIxfWYtZn/MG2/rXRq2voQznOn6JPq0l873zQWJkEhXOWVgNuUnoB0pDccCixtZrqO5exaLPM1zIcShjlTkHyn1z1NXThbVrGKC3sBdW6yLzNIXcZI6jfoff5UZrE2iXdtciW6S5Ygv4SXJIPLv+kHBA9Kn/FBq/YhwTOd6bMZo5opWieIMJJJFBVSo3Gc9fX617p/D0NzxCbiS8gtIrhlKkf8AqYGAME7kkb4pDpN5aQtci6kVGk80UCJ5HdmxjGCcAE4ye1XTQ4ZL+4RooIJZbaHKoe7Dp8uteUsTjlXtP0BWpUvRnEdvI0N3NLqMKakB4S+GMh8bbDPl27+9VSSxeLSLizuWjuXYuSVJzgrzKTjc4Ixn5GvdQ1m3uEne4JjuMcgWNeVcb5G3cbfOjtDVL4JO9xGiJEeYFSDn+H50uUnztr2Zh+yZNw/dRarp8E95aTTSLEhISMOztj+fqCd+vTbc5rkfxCk0+3167gNvI0UDCJFl8rqBv1U4J3P+a65wlPHacLSEzOJbbxJJGDZ3AycA9sbe+BXD9T0bVdZvJrudDAJZmeWe4BReZjnHTJ+QBxXqeMvlKy6c+HRdPg7Z2hj1LUYLd4njTwgxfIPNv09fLRPERZZmkXJ7HHvVk4V0McN8JJamUyTTHxpGxgZIGAPbAquaqeZ2B963mlTKvHjyVsUW8qlxk5B9/wBqJuYuU8w6GksrPBMxYkrtynOMU0tbvx4uSTZwcb1iUbjaGwlxlTPcFlwelQqzQyHG4qckcxGdqglGR2JPSkFq6PLm65hlGAz1FLTqIjfDgkeoo94VkTzjB9qTC2iuZ5Y4WdXj2ORtWoJGJuUehmt7A64blb57Ggr63trhTywrk9xUf4OWFhleYDuKJjIRRzE/3pi09GHNtVJADadFFGPCZg/eikSfwPDeWRoz1Vjt9qLiRpWyARgZzRdnp1xfThIFJXpnFOjJsmmorbE8WmmaQBE+1dI4Q4Ry0T3J5Y9sjv8ASrBwlwBdeSW4jVB15nH9K6fpWh21gA3/ABJR/E3b5U35SVEjcU7R7otgttbRgR+GgHlTv8zTSsr2tpUKbvZlZWVlEBleda9rK44p2sWSx8RzSeYPdWskagDZsKSfrsn2NcS1KPkuHU+pr6A4nizPpM42Md2qk46KwIP74ri3G1gbDX7mEggcxYfI1NkVFvjS+RWZlAG1L5lIyTTSWPqfWgbpcIamTPSfQqSJpZBt5ScVctDtQBGpqvWLKHhU7YJJq02lxHERvjvQyS2HFG0OdQtxBGObA8uaqWoT8hyDtVlGtxSryOVYDbBFIeLTbTQI1tiOZmC7dN6CkroLTWxYLwdARU8d0n8TChHsrS1h5pOeeTGwD4yfpS2K1lklLseUdlHQVqkDk16LZZ3CsfKdqsNjICBVOs4XAUBunYU0jnnjGzGsNI2psvVscICaPt5FfIRgSvUA9K5jdahfyDwxLIEPcGrHwtdC2jIDkSN1ycg/OjxX2c5Nro6JZf8AD360l47tre40yJL1Abfmy2TgUz0u6juYzy7SDqtUr42X/gadptioy0ztIxz0A2H9T9qbCN0iOcuLs1t73TtCtrY2FsqLO/lKn9W+5J7iu16dKZ7C3lbq8asfqK+eTKup2PDdhbsjSIjGQcoHIMgf0Un6+pr6F0yE2+n20LHJjiVT9BVOOPFkPkTcqsJNc3+Lmhm6slvoF8y7PgfY10ioL+1jvbOW3lAKSKQc04mPmrhXU30jWUZ25AW5W3x8q+j9IvVv7GOZSCSN/nXz3xVpbaZq09u8YWMt03yD23PWr78KuIOeIW07HK+Rgf2Nc/sLECaFHcwc7CYsUMOAnMQBvzDB2I6ZoybSP9PitVuJGkTlYQyFedoub9Xv6mrDpkiSWP4eO7uPwsWSxXC9yevXufvSHU+LLGC88JYBLy7c0jlunTvXmS8Scun/AO/4Ic7difhDhVbvicxK0xtkm8VZXGGjVSeXHQnOcZx9Kv8Ac8MT2tnqV2L0wXEwKoIyyIN9iQvX5dN6qNvxZJc3q/gbWGN1z+aFHMM9d+tCcQccXcMhhhlM0/Qu24X5VUsSr5dmW0yKHhy6Nv4zcsOSedpSAG7jlBH+aYaNorRLyvfoqK5kdISWyv8AKSen/Yqu29/d3QaSWR5JH6MxJ+1WG1xpmiTSynLuCST3pa8TH29g5OqAlvYxxFFo2jB7a3UG4vJEc85UEkKGz5ck9sbUg1G6GvfEextbs89rbhp2Q9G5egI9MkV78P2/E6lrl4+S0jCMHvjr/eq/e3P+mcfW1w+QsnNFn5//AFT/ANehuFcprkdV1u7zExyN+grn9+/M5+dWDVbsGIAHIxVUunJc1JklZ7mGFIBvIvEVjnDY9NqRXNzLZyHJY4YYI7irC7ZGDS2+iBUkDORjauxz46DmxckCprOc8zYA2pja6jHLjcEetUq9t5IJHAHXpj1NBRXc0ZypYY9KoeKM9ojjnnidM6kkyHB67+tbhYs80XKuetUCz12VFAkUkeopxba3E6gF8UiWCSK4+VCXZZ1UK242reHTBcHmx1PbeklvfpLLzGbA+eKc/wDmeDToALMg3BBKyMDyL8sd/fFdHHKwZM0fQzv4bXR4FS7GZmBIiU7j3arrwBdWFnC+pXaII0KpnruWwMDA+dcUuL57u6NxPK7szcx5j9vrimycRSy20dlEcW8biRz/ADMAQP61VGFHnZpurZ9Yw6haTSmKK4jaQKGKht8HvRQORkdK+dPhdrUsnEySTSM3OSu5ztirxFx/Jpet3VpcKJrNJSqj+JRnsabe6JlP7OqVlIrTijT7oI8RlMLdJQuVB9DjcH5imkN7azAGK4ifbOAwzRNWE1leKwYZUgj2r2uCZWVlZXHCziCF5tMl8MZeMiVR7qeYfuBVC+K+mC5srTV4V6qA+PQjINdPIyCD0NJJ9PS80i80uXflDKmfQ7r9un0pc42Mxz4tM+d5DmgLwgoexo/W7eTT76e2lUq0bFSDSW5lyKi47PZU01YBNMySAjamEF/I8ffPTIoGUgjFEWbKkR3+tGXRmDaejJrESKJnmnjkG+VkI+9B3LXTlFMhYIcgnvTMSeIOUHOOtaiIFtxWVP7Gcfo9t7whcNDg+1bPcBv4GFbrCBXkuBsBWbNktndFTvzAU0jugVyCG9qUwgYFFwLk0HQVGw5bpS2MYNG27YIYHBFDrpqzxBkysgGR717DzRMUfIYdQaFfR36vZadN1BosHODTTUrDTuKrUR3p8O7jQrFP15c+o6GqdHMNt6Ntr5onBDUYzcWCeOM0WH4c8EXGm6q8uo8rlSSGQ+UqP04Pv3B9veuu1zThjin8OwSc8yGuh2d3DdxCSBwyn0q3DkjL+zx/Jwzg7fQRXle1lUEpzr4s6GLqyW+jTLL5Xx+xrlXDmpjTdSAchd8Zr6Sv7WO9s5reYZSRSpr5m460eTTdVlXdXRsGjV6DdFv4v16DR9OOn2LgvjzsO5rlkdzJc3fOzkjO5oC/1Ka/uCMk5NNtN02VkXK4FKJqoe2N00cBjt8gnqRQv4SSW4yyHHcmnWlWSRx+cbdaG1O8RH5VOB/WuMjjR4Azxou9e8e362lmLZSOmMetT8KEeE1w/wClAW3rn3FWpPqGtsCxKhsAVx1Fg+HR8O1vs/qMuf8A4ikfxKs2EIvYQS8LBx9P+/3pxwv/APi380f8EsauPmNj/ames2q3trLE2DzDG9AZF07KlpmuLfWUZLZOBXssoZic1RZEn0LVZLWTmCZyme4p7a6iJUGTUuTG09HuYM6lEc9RvQ83zqD8VsPStHn5hSqZQ5pg11AkmRIoNLpNPhDB0Qc1MnkzvUTHJ2pkW0Jkk+xc9mGXDpgduWgn0+VG5gCwPTB3FPhyjrUckgHSmxyNCZ4ovsV29rIDzSFhntRjEKoUnYdMjpWs9wANzQ8UM96fKCkX83+K2m5diJOONHpleeURQ59z2ApmcW1tyJ969gto7WIKgGe5oe8fYjvTUQZJubLh8Np/D1SBj1AJqfiG8L61dyKdjIx/ekPClz+HuY2BweU1l3ceLM7nqSTQv5ALRoPEd3pk4e1mK52ZTurD0IroWn8SaXrUYW8iS2uR/wBLH2rh6TlTnNH292RjeiwHcbbUYdNk5oWIH8yORkVY9O4qtpcZn2PZ+31/+6+fYdWkROXnJHuc0VBrLqQQ2MelcFM+l7bUUlGeZCPUHH7Uajq48pB+tfOllxbdQYHinHuacQ/EK4i2ZhXWxiZ3WoJ42LCSPHOv7j0rjkHxRmRvMAR7UdH8WlU4eBW77mjYbBvjLooPLq9quVJ5JwBureprjE8mGrrHFfxUW5sZLU6XaziZCriQnZT03B2Pf2ritxfxyuygcjZ6Gkyhu0WYc2uLJ5rlIxksCT2qJNSAPKeVgexoV7RWAlHmYb4oi0MLHEiKCPalySoqxNydBn+omIDlCqvtUsWtEfqCt9K8RrcbeEufesaSFP0oM/Kka+i/hrsIGsQ4JZStDtrNvKwVXGflULx+P/xP0+lbLZQhcCMD6VpcSeblfxYxtbkFtiD8qe2OHZfSqokfhN5Kd6XI5wMnasyX0Nxyfst9uwQACimtY71eyy9m/wA0lSR1ADdTT/SwIkSSbufKPWl0bk9Cq9s5rNlE8ZTmGVbsw9qHSTfFX3iKWzk4bxdSRrNgvCGPmJG+39PrXN7qdF8w2o0YjLWwv8SYz5TTrQeKbqwlHLISvpmqbJdBu+1bWsuJM5opAk09HdtH4zhnRfxC9e47fOrZZ3cN5EJLeRXX2rg+jSlnUCrNpV7faTdiWDLRHqnYin487j2Q5vFjLcdM6zXM/jHoYnsV1GJPMvkkI/Y1ftM1KG/tlljOCeqnqDQ2qT2d9p91bXIcwsCjjl8w9wKsjNPaPPcJJ00fLvB+h+MPxVyux3Gewq1yhR5IwAo2ozwVsbRIl22yaTX14qYwfMD29KwShs1wltbE9arAk/FXeW6Z6VvfXhmUKTnAqXh+zNzex4BBLd+wrgMtOoXI07hnGeVph69q5daOZ9RLvvg9at3xBvwSsCN5EHKAKqOkqAeck47+9FALoMpFDcRglotyB3XvTYXAeIMpBGMgik+lzrIhTlI26HevHc2E/hsfyGOVx/CfSgEh4p0CLWrXykLcr+h65tNBc6bctb3aFJF+x9xXWhPjBznG9A63p1rrdryzLyzIPJIOooVfY3HleP8Ao55BdE4yd6MR+bvQ15o17p7nmjMkednTcVGniAbxuPoRS3Ci+GdNdh+aiaTBNaBJ3ACRSH5KTU6aTdS4MuIlPUsd/tWVBhl5EV2wOW55c7io4o7i6OIUYjpk7D708ttJtYiCwMr+rdPtR6qFA5VwOgwKYoUTz8q/1EltpKJh7g87enYUawWNSAMCp53Ea5PehhFJcbkEJ/Wtk0pOW2DSSE7Jv70BdA4NNWjVGC0FfoBH5QaJkm01iixsPSvJ5T4rAetT2kR8CI46KM0PcRjxXHcE1xxqHyaKhftQkadTU67EVxwYr1sJCD1qBGyK9HXFcEIE7Z61q8rY3NaKOprCuaJx4ZjnrWqyFnGTtnNelPvWQp+Y3oNqNnWa3BMhJY0qvbcSHmzhh0PpTuWPyk0DIvXPShYbF1peFG8KXZh+9Mobdbjp1PpS69s/FXmQ8rjdTW+j3zRy+HMCsi9Qe9IyR9o9Hxs3J8ZDT/Tn6hmxUsdiygecn2o5Jw8e+K2jkXBzipeTPT4Jg3hBB139DUbPg7UTOwYUG53oxMyVG0bDmyTj50+067s7dQ0reb0AzVc5CzKF6daLS3Zt9q04oEZNdD//AFyzE4dxKyDsq1NLxXGWLRQyM3bmIAFVz8MfStxBttWaia5SDrnWZ7mVpXUFyMZYk4HtQE00kxzI5JrDGyncVhXbFaVIEm32RiQg9dhTDTbmIXCLLnlJ6igjFU1vGFfPehJoEU7Ot8L2Njex5tZMSAdG71Z0sfCHK4BFcy4U1RbSZVc7H9qvx1JuQSRvzr3pUTWSL9DO2drKTnjzynqKaTmDVrIx85Rj0YHBHsfaq/HqCSgHbfrREM4VwYzj5U1SceieeJS7OT65qA8VlRhgbVUbu4LS+Y+X09aK1CfmY5OfrS0AyP3O+1XHgUGW48bHLirho0S2NlJO2zEYHtSPSLULysQCflTnVJvBseQNjI3oMBQ+Jrgz3bYbm361llGRbcwHm9+1B6iOe4JHUmnFsh/DBRvt0oha0SabMY5hjr671ZL2JLm2XIByO+aqcbcsnNVr09/FsgB2+dBgEYkuLRiOVpIx27gUVb30Uo/LYdMY7imSRrzkHv6CgL7R4Zm5lyjdMrsaPYNoFnk5X9ai/FouMoOaoptIv4/+Bcq6+jrv9xQk1nqSfqjjI+dcgaYVLfschMD6UP55Tl2wKgjtbwtuig/OiV0+5I/Mk5R/yiid/RtmONetaNMXOIlz71PDp0YOTl29TvRiwqgwAKBtWL4bMseeYlj6Vu5weVcD3qeaTBKD71EilN+Y5+VA0BTxDOSN/Wll+oOFBNO7nodsn3pRKpaZQRvmuCMYYsQIAcYApdeeW4cE43p1CM5GOlJtSUi/kz7Hf5UIgIwMDJ6VunnOe1Rx80j4PSjFTC7CtBNVIQHNbRfmHy1DIhZgO1MbSEogPeuZxpyY2rYJgbVPyb+/WsZQAB3NABBygBnPQDNe2EXNGCep8xrNQ8lry93IWi7dRHbM/QYrjgO6wDihRbNIdqOSMzyBcdTTpLNIVDEZwNhXWcViSwaPdutA3disygkYYdGHUVY74ggk9Kh061N1INsjNcFSorkc9zbsI5F5gdg3T707ksNTtI45bq0kSKQZSTYq3yIplquicxyi0fwwH/CyaXe80lhKc+GT+hv5l9DS5Y0+izH5cl2VpwcHnwo9yBQb3EKnduc/yr/mt+LdJn0fUWglyyEc0cmMB19aQiQg0tQRasrlssFtO006ZVVUbAAU6hkQDfrVSs7nlYb1YHnjkhVwcN3HrWJodCQyEqGvedPak0d1yOMAkA9DTHUNVt7rT4IYbBIbiNiTMp/WD2I/vWOI5zSROzx46ioJWj6AjNKJUaVd8j/2nFaxRFOhOfetKCMPJ/oZGUA9a9EwBoAB879KljUkjrQaQFJje0nIYYNXPQ76XlVSTVS0izMzgZxV2061W3ChxWGlY5SdDdCGGVypou1uCCA21RRhCuxqOZWXddxXMyjil1MXblB8x2o3T4iQuQD7ml1mplmLN8t6slimAMrsPavRPmGNbNCiqcjf2oDXLgFGGdvnRwchds9Kretzk83Kc70AJCKY81wM9qdW+TD60ogHNJ5uvvTyHKwkAAiiFgbDlcE469KsGiyeUqRgEUhn26E470x0yXwypBoM5D1tjsP614z9M7H0qM3EYIyw3+VeuwYHBH/f1oBMJByOp/79KikIAyVI+9aN+WCSSfnQE9xzHYAD6UTqQQ88ajGc+w/+qHMwk2GAPpUHMT0x9/8Aet4yA3mz96B2glQoTy9fpQ08hWP0bNTTzr4eFoJm59zROPFUs24+1buAF2J2r1PNsB0rxvMQu4FcABuHGNxg+5oKFee6X2OaMvsZAGcjrUFgp8ct6UX0EbW47Uk13K6gw7coP7U+swSw7ClPEaY1Jcj9UY/qazEANZJvmjGTbbpUUCcoFHNEQAR0ohsGih5nG3zo9VxsOlZEmO29TquAc4rgEHKS3sK0A55gKLMeFBNQ2iFpj37VxwBqu91axgdWz9qMnYrbBfWgr48+uxIOiISfvRN0T5V9a4IfodvzZlceUf1oy+cnyL171JZgW9ghOAMZNBCTnkZz0rgMVa3KIo44h+putWLhKz/IEj1TbuQ3mshFOQDiuiWJFrZRoNsCizJLqjQw2ksj42BoDg4C9uQzAcg3pFxlqZS0WBTguae/D1PC0/xn259s0PRpF34k4XtuJtBe1UKLuMc0EhHRvT5Gvni6spbS7ltrqNo5omKMrDBBHWvqPh2XmYHsBmqT8auEhPEuv6fF+YuFulUdR2f+xpEnTL/FlWmcNe2IGUpvpwZoUHXCjr+9RpHkbA5qdEkhUlR0GcUtyvR6KVbCPCwa2SHNAm7nJwkTk/KvY7y6Db2slZphTTGIhwOlehMdqGS/lA89tKPpWf6lEP1qyH/mFdTN3EKK7dK8A5TQ342J88jg1IsvNjG9dTByXod6ZciN1NXSyvkniAJ8w71QLNGZlxvVo06F0AyCKXJD4u0We3lII32o5XGNtx6UljzjbrRUExGxrroDjZxSyuJBygMOvoKf2t3MARzjH/tH+Kysr0z5gluLycRbSY+gqt6jdTc/6/2FZWUEAHtJ5PEHm/YU1N1Mtvs+PoKysohB2uJWlOW7egr21upg+A+wPoKysrmAPjupmYAv+wph+LnCDEnb0FZWUAim9v7nxAPE2/8AaP8AFQLdzk7v+wrKyiEna6mEf6/uBUH4qbIPP2z0FZWUGczd7qblzz/sKjW6m5D5/wBhWVlccbw3U2T5+3oK1e6mwx59/kKysogFs91MZBl+vsKn0+5lwfP+wrKyuYWNbK5mBJ59/kKXa/cynUYCW38P0HqaysoR7BRElzLt5/2FHi7m5R5/2FZWUWcSJdTYHn/YVKbqbH6/2FZWUEceyXc/hHz9vQVppdzN4jefv6CsrK4Iq/EynXrgl8kKB0FEyXMvjR+fv6CsrKJyHV5eT/hgOfbA2wKWteTiCTEn7CsrK5AE+gTyf6i7FhzZ64FXC5v7nwx+b/8AEVlZQYCkcSXc8mowB3yPTAq+6TezxabarG/KuBsFFZWUfQUXrh3UbpYtpcb/AMo/xVhbULm4tJYZ3DxOhVlKLggj5VlZU8ux8PR8/CVhPIARgMQNh60TbTOZUBIIJxuorKyk0rPav4kP424lmlkkfLFiM8o/xW63Muf1D7CsrK00rMJ6R7+Jl2837CoJ55GByQf/ANRWVlCK2Btiuc4fICg+wFT2k8gxhv2FZWUxmP5Fh0m5l8RfMPsKuNvdzmIecf8ASKyspVIfZv8AjZx0cf8ASP8AFai+uOb/AIn/AMR/isrK6kGz/9k=",
        "idbKey": "audio_1788518608492",
        "fileName": "Arijit Singh - Teri Meri Kahaani Hai Baarishon Ka Paani  Gabbar Is Back  Akshay Kumar & Kareena K.mp3"
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
        "./photos/secret_31.jpg"
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
