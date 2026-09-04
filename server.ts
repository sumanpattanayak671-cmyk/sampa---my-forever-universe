import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { INITIAL_UNIVERSE, INITIAL_SECRET_ROOM } from './src/initialData';

const app = express();
const PORT = 3000;

// Increase payload limit for photo uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure persistent data directories exist
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Static uploads serving
app.use('/uploads', express.static(UPLOADS_DIR));

const DB_FILE = path.join(DATA_DIR, 'universe.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

// Password hashing utilities using Node.js crypto
function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, generatedSalt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt: generatedSalt };
}

function verifyPassword(password: string, hash: string, salt: string): boolean {
  const computed = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return computed === hash;
}

// In-memory or persisted DB
interface StoredDatabase {
  universe: typeof INITIAL_UNIVERSE;
  secretRoom: typeof INITIAL_SECRET_ROOM;
  adminHash: string;
  adminSalt: string;
}

function loadDatabase(): StoredDatabase {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      if (data.universe && data.secretRoom && data.adminHash) {
        return data;
      }
    }
  } catch (err) {
    console.error('Error loading database, resetting to initial seed:', err);
  }

  // Default admin password: Suman@305
  const { hash, salt } = hashPassword('Suman@305');
  const defaultDb: StoredDatabase = {
    universe: JSON.parse(JSON.stringify(INITIAL_UNIVERSE)),
    secretRoom: JSON.parse(JSON.stringify(INITIAL_SECRET_ROOM)),
    adminHash: hash,
    adminSalt: salt,
  };
  saveDatabase(defaultDb);
  return defaultDb;
}

function saveDatabase(db: StoredDatabase) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save database:', err);
  }
}

let database = loadDatabase();

// Active Admin Sessions
const activeSessions = new Set<string>();

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.substring(7);
  if (!activeSessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
  }
  next();
}

// ----------------- PUBLIC API ENDPOINTS ----------------- //

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Get Public Universe Data
app.get('/api/universe', (req, res) => {
  const now = new Date();
  
  // Clone letters and conceal content if locked
  const publicLetters = database.universe.letters.map((letter) => {
    let isLocked = false;
    if (letter.unlockDate) {
      const unlockTime = new Date(letter.unlockDate);
      if (unlockTime > now) {
        isLocked = true;
      }
    }

    if (isLocked) {
      return {
        ...letter,
        isLocked: true,
        content: 'This romantic letter is sealed in a digital wax capsule until the scheduled unlock date.',
      };
    }

    return {
      ...letter,
      isLocked: false,
    };
  });

  res.json({
    settings: database.universe.settings,
    photos: database.universe.photos,
    memories: database.universe.memories,
    letters: publicLetters,
    reasons: database.universe.reasons,
    promises: database.universe.promises,
    plans: database.universe.plans,
    music: database.universe.music,
    secretRoom: {
      hint: database.secretRoom.hint,
      hasUnlockedContent: false,
    },
  });
});

// Get Individual Memory by Slug or ID
app.get('/api/memory/:slug', (req, res) => {
  const { slug } = req.params;
  const memory = database.universe.memories.find(
    (m) => m.slug === slug || m.id === slug
  );

  if (!memory) {
    return res.status(404).json({ error: 'Memory not found in this universe' });
  }

  res.json(memory);
});

// Unlock Secret Room
app.post('/api/secret-room/unlock', (req, res) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ success: false, message: 'Password is required.' });
  }

  const cleanInput = password.trim().toLowerCase();
  const cleanTarget = (database.secretRoom.password || 'foreverandsampa').trim().toLowerCase();

  if (cleanInput === cleanTarget) {
    return res.json({
      success: true,
      title: database.secretRoom.title,
      secretLetter: database.secretRoom.secretLetter,
      secretPhotos: database.secretRoom.secretPhotos,
      specialAudioUrl: database.secretRoom.specialAudioUrl,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'That is not the secret phrase, my love. Try consulting the clue.',
    });
  }
});

// Increment Reason Heart Reaction
app.post('/api/heart-reason', (req, res) => {
  const { id } = req.body;
  const reason = database.universe.reasons.find((r) => r.id === id);
  if (reason) {
    reason.heartCount = (reason.heartCount || 0) + 1;
    saveDatabase(database);
    return res.json({ success: true, heartCount: reason.heartCount });
  }
  res.status(404).json({ error: 'Reason not found' });
});

// ----------------- ADMIN AUTH API ----------------- //

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  const isValid = verifyPassword(password, database.adminHash, database.adminSalt);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid administrator credentials' });
  }

  const sessionToken = crypto.randomBytes(32).toString('hex');
  activeSessions.add(sessionToken);

  res.json({
    success: true,
    token: sessionToken,
    message: 'Welcome back to the Universe Command Center',
  });
});

app.post('/api/admin/verify', authMiddleware, (req, res) => {
  res.json({ success: true, message: 'Token is valid' });
});

app.post('/api/admin/logout', authMiddleware, (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.substring(7);
    activeSessions.delete(token);
  }
  res.json({ success: true });
});

app.post('/api/admin/change-password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Both current and new password are required' });
  }

  const isValid = verifyPassword(currentPassword, database.adminHash, database.adminSalt);
  if (!isValid) {
    return res.status(400).json({ error: 'Current password does not match' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }

  const { hash, salt } = hashPassword(newPassword);
  database.adminHash = hash;
  database.adminSalt = salt;
  saveDatabase(database);

  res.json({ success: true, message: 'Administrator password updated successfully' });
});

// ----------------- ADMIN CRUD API (Protected) ----------------- //

// Full raw data for admin
app.get('/api/admin/data', authMiddleware, (req, res) => {
  res.json({
    universe: database.universe,
    secretRoom: database.secretRoom,
  });
});

// File Upload Handler (Base64 direct upload)
app.post('/api/upload', authMiddleware, (req, res) => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'No image data received' });
    }

    // Parse base64 header
    const matches = imageBase64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid image format. Expected data URI base64.' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // 40MB size limit for media/audio files
    if (buffer.length > 40 * 1024 * 1024) {
      return res.status(400).json({ error: 'File exceeds 40MB limit' });
    }

    let ext = '.jpg';
    if (mimeType === 'image/png') ext = '.png';
    else if (mimeType === 'image/webp') ext = '.webp';
    else if (mimeType === 'image/gif') ext = '.gif';
    else if (mimeType === 'image/svg+xml') ext = '.svg';
    else if (mimeType === 'audio/mpeg' || mimeType === 'audio/mp3') ext = '.mp3';
    else if (mimeType === 'audio/wav') ext = '.wav';
    else if (mimeType === 'audio/ogg') ext = '.ogg';
    else if (mimeType.includes('m4a') || mimeType.includes('mp4') || mimeType.includes('aac')) ext = '.m4a';
    else if (filename && path.extname(filename)) ext = path.extname(filename);

    const safeName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
    const filePath = path.join(UPLOADS_DIR, safeName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeName}`;
    res.json({
      success: true,
      url: publicUrl,
      thumbnailUrl: publicUrl,
      filename: safeName,
    });
  } catch (err: any) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to process file upload: ' + (err.message || 'Server error') });
  }
});

// Manage Photos
app.post('/api/admin/photo', authMiddleware, (req, res) => {
  const photo = req.body;
  if (!photo.url || !photo.title) {
    return res.status(400).json({ error: 'Photo URL and Title are required' });
  }

  const photos = database.universe.photos;
  const existingIdx = photos.findIndex((p) => p.id === photo.id);

  if (existingIdx >= 0) {
    photos[existingIdx] = { ...photos[existingIdx], ...photo };
  } else {
    const newPhoto = {
      id: photo.id || `photo-${Date.now()}`,
      order: photos.length + 1,
      isFavorite: photo.isFavorite ?? false,
      date: photo.date || new Date().toISOString().split('T')[0],
      category: photo.category || 'special-days',
      album: photo.album || 'Highlights',
      ...photo,
    };
    photos.unshift(newPhoto);
  }

  saveDatabase(database);
  res.json({ success: true, photos: database.universe.photos });
});

app.delete('/api/admin/photo/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  database.universe.photos = database.universe.photos.filter((p) => p.id !== id);
  saveDatabase(database);
  res.json({ success: true, photos: database.universe.photos });
});

// Manage Memories
app.post('/api/admin/memory', authMiddleware, (req, res) => {
  const memory = req.body;
  if (!memory.title || !memory.description) {
    return res.status(400).json({ error: 'Memory title and description are required' });
  }

  // Generate clean URL slug if not provided
  let slug = memory.slug || memory.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (!slug) slug = `memory-${Date.now()}`;

  const memories = database.universe.memories;
  const existingIdx = memories.findIndex((m) => m.id === memory.id);

  if (existingIdx >= 0) {
    memories[existingIdx] = { ...memories[existingIdx], ...memory, slug };
  } else {
    const newMemory = {
      id: memory.id || `mem-${Date.now()}`,
      title: memory.title || 'Untitled Chapter',
      slug,
      date: memory.date || new Date().toISOString().split('T')[0],
      location: memory.location || 'Everywhere With You',
      category: memory.category || 'Special Moments',
      summary: memory.summary || memory.title,
      description: memory.description,
      photoUrls: memory.photoUrls || [],
      featured: memory.featured ?? false,
      tags: memory.tags || [],
    };
    memories.unshift(newMemory);
  }

  saveDatabase(database);
  res.json({ success: true, memories: database.universe.memories });
});

app.delete('/api/admin/memory/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  database.universe.memories = database.universe.memories.filter((m) => m.id !== id);
  saveDatabase(database);
  res.json({ success: true, memories: database.universe.memories });
});

// Manage Love Letters
app.post('/api/admin/letter', authMiddleware, (req, res) => {
  const letter = req.body;
  if (!letter.title || !letter.content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const letters = database.universe.letters;
  const existingIdx = letters.findIndex((l) => l.id === letter.id);

  if (existingIdx >= 0) {
    letters[existingIdx] = { ...letters[existingIdx], ...letter };
  } else {
    const newLetter = {
      id: letter.id || `let-${Date.now()}`,
      date: letter.date || new Date().toISOString().split('T')[0],
      excerpt: letter.excerpt || letter.content.slice(0, 120) + '...',
      unlockDate: letter.unlockDate || null,
      signature: letter.signature || 'Forever Yours ❤️',
      sealColor: letter.sealColor || '#e11d48',
      ...letter,
    };
    letters.unshift(newLetter);
  }

  saveDatabase(database);
  res.json({ success: true, letters: database.universe.letters });
});

app.delete('/api/admin/letter/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  database.universe.letters = database.universe.letters.filter((l) => l.id !== id);
  saveDatabase(database);
  res.json({ success: true, letters: database.universe.letters });
});

// Manage Reasons
app.post('/api/admin/reason', authMiddleware, (req, res) => {
  const reason = req.body;
  if (!reason.title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const reasons = database.universe.reasons;
  const existingIdx = reasons.findIndex((r) => r.id === reason.id);

  if (existingIdx >= 0) {
    reasons[existingIdx] = { ...reasons[existingIdx], ...reason };
  } else {
    const maxNum = reasons.reduce((max, r) => Math.max(max, r.number || 0), 0);
    const newReason = {
      id: reason.id || `rs-${Date.now()}`,
      number: reason.number || maxNum + 1,
      description: reason.description || '',
      category: reason.category || 'Our Love',
      heartCount: reason.heartCount || 1,
      ...reason,
    };
    reasons.push(newReason);
  }

  saveDatabase(database);
  res.json({ success: true, reasons: database.universe.reasons });
});

app.delete('/api/admin/reason/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  database.universe.reasons = database.universe.reasons.filter((r) => r.id !== id);
  saveDatabase(database);
  res.json({ success: true, reasons: database.universe.reasons });
});

// Manage Promises
app.post('/api/admin/promise', authMiddleware, (req, res) => {
  const promise = req.body;
  if (!promise.title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const promises = database.universe.promises;
  const existingIdx = promises.findIndex((p) => p.id === promise.id);

  if (existingIdx >= 0) {
    promises[existingIdx] = { ...promises[existingIdx], ...promise };
  } else {
    const newPromise = {
      id: promise.id || `prom-${Date.now()}`,
      description: promise.description || '',
      category: promise.category || 'Vows',
      status: promise.status || 'forever',
      dateGiven: promise.dateGiven || new Date().toISOString().split('T')[0],
      ...promise,
    };
    promises.push(newPromise);
  }

  saveDatabase(database);
  res.json({ success: true, promises: database.universe.promises });
});

app.delete('/api/admin/promise/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  database.universe.promises = database.universe.promises.filter((p) => p.id !== id);
  saveDatabase(database);
  res.json({ success: true, promises: database.universe.promises });
});

// Manage Future Plans
app.post('/api/admin/plan', authMiddleware, (req, res) => {
  const plan = req.body;
  if (!plan.title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const plans = database.universe.plans;
  const existingIdx = plans.findIndex((p) => p.id === plan.id);

  if (existingIdx >= 0) {
    plans[existingIdx] = { ...plans[existingIdx], ...plan };
  } else {
    const newPlan = {
      id: plan.id || `plan-${Date.now()}`,
      category: plan.category || 'travel',
      targetDate: plan.targetDate || 'Soon',
      isCompleted: plan.isCompleted ?? false,
      notes: plan.notes || '',
      ...plan,
    };
    plans.push(newPlan);
  }

  saveDatabase(database);
  res.json({ success: true, plans: database.universe.plans });
});

app.delete('/api/admin/plan/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  database.universe.plans = database.universe.plans.filter((p) => p.id !== id);
  saveDatabase(database);
  res.json({ success: true, plans: database.universe.plans });
});

// Manage Music
app.post('/api/admin/music', authMiddleware, (req, res) => {
  const track = req.body;
  if (!track.title || !track.url) {
    return res.status(400).json({ error: 'Track title and URL are required' });
  }

  const music = database.universe.music;
  const existingIdx = music.findIndex((m) => m.id === track.id);

  if (existingIdx >= 0) {
    music[existingIdx] = { ...music[existingIdx], ...track };
  } else {
    const newTrack = {
      id: track.id || `trk-${Date.now()}`,
      artist: track.artist || 'Special Melody',
      duration: track.duration || '3:00',
      mood: track.mood || 'Romantic',
      albumCover: track.albumCover || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop',
      specialNote: track.specialNote || '',
      ...track,
    };
    music.push(newTrack);
  }

  saveDatabase(database);
  res.json({ success: true, music: database.universe.music });
});

app.delete('/api/admin/music/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  database.universe.music = database.universe.music.filter((m) => m.id !== id);
  saveDatabase(database);
  res.json({ success: true, music: database.universe.music });
});

// Manage Secret Room
app.post('/api/admin/secret-room', authMiddleware, (req, res) => {
  const updates = req.body;
  database.secretRoom = {
    ...database.secretRoom,
    ...updates,
  };
  saveDatabase(database);
  res.json({ success: true, secretRoom: database.secretRoom });
});

// Manage Settings
app.post('/api/admin/settings', authMiddleware, (req, res) => {
  const newSettings = req.body;
  database.universe.settings = {
    ...database.universe.settings,
    ...newSettings,
  };
  saveDatabase(database);
  res.json({ success: true, settings: database.universe.settings });
});

// Backup & Export (Section 69 requirement)
app.get('/api/admin/backup', authMiddleware, (req, res) => {
  const backup = {
    exportedAt: new Date().toISOString(),
    version: '1.0',
    data: {
      universe: database.universe,
      secretRoom: database.secretRoom,
    },
  };
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=sampa-universe-backup-${Date.now()}.json`);
  res.send(JSON.stringify(backup, null, 2));
});

// Restore from Backup (Section 69 requirement)
app.post('/api/admin/restore', authMiddleware, (req, res) => {
  try {
    const { backupData } = req.body;
    if (!backupData || !backupData.universe) {
      return res.status(400).json({ error: 'Invalid backup file structure' });
    }

    database.universe = backupData.universe;
    if (backupData.secretRoom) {
      database.secretRoom = backupData.secretRoom;
    }
    saveDatabase(database);

    res.json({ success: true, message: 'Universe successfully restored from backup' });
  } catch (err: any) {
    res.status(500).json({ error: 'Restore failed: ' + (err.message || 'Unknown error') });
  }
});

// ----------------- SEO & METADATA ----------------- //

// Dynamic robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  if (database.universe.settings.disableSearchEngineIndexing) {
    return res.send(`User-agent: *\nDisallow: /\n`);
  }
  return res.send(
    `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /secret-room\nDisallow: /api/\nSitemap: https://${database.universe.settings.customDomain || 'www.sampa-love.com'}/sitemap.xml\n`
  );
});

// Dynamic sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const domain = database.universe.settings.customDomain || 'www.sampa-love.com';
  const baseUrl = `https://${domain}`;
  const now = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    '',
    '/our-story',
    '/memories',
    '/gallery',
    '/love-letters',
    '/reasons',
    '/our-music',
    '/our-future',
    '/promises',
  ];

  const memoryRoutes = database.universe.memories.map((m) => `/memory/${m.slug}`);

  const allUrls = [...staticRoutes, ...memoryRoutes];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.type('application/xml');
  res.send(sitemapXml);
});

// ----------------- VITE / STATIC SERVING ----------------- //

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Sampa's Universe Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
