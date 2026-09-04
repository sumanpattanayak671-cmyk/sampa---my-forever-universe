export interface Photo {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  date: string;
  category: string;
  album?: string;
  isFavorite: boolean;
  order: number;
}

export interface Memory {
  id: string;
  slug: string;
  title: string;
  date: string;
  location: string;
  category: string;
  summary: string;
  description: string;
  photoUrls: string[];
  featured: boolean;
  tags: string[];
}

export interface LoveLetter {
  id: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  unlockDate: string | null; // ISO date string or null
  isLocked?: boolean;
  signature: string;
  sealColor?: string;
}

export interface Reason {
  id: string;
  number: number;
  title: string;
  description: string;
  category: string;
  heartCount: number;
}

export interface PromiseItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'forever' | 'kept' | 'always';
  dateGiven: string;
}

export interface FuturePlan {
  id: string;
  title: string;
  category: string;
  targetDate?: string;
  isCompleted: boolean;
  notes: string;
  icon?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: string;
  mood: string;
  albumCover: string;
  specialNote?: string;
}

export interface SecretRoomData {
  password?: string;
  hint: string;
  title: string;
  secretLetter: string;
  secretPhotos: string[];
  specialAudioUrl?: string;
}

export interface MemoryVideoItem {
  id: string;
  title: string;
  caption?: string;
  url: string;
  idbKey?: string;
  fileName?: string;
}

export interface SiteSettings {
  partnerName: string;
  authorName: string;
  anniversaryDate: string; // ISO format
  heroTagline: string;
  heroSubtext: string;
  customDomain: string;
  disableSearchEngineIndexing: boolean;
  memoryVideoUrl?: string;
  memoryVideos?: MemoryVideoItem[];
}

export interface UniverseData {
  settings: SiteSettings;
  photos: Photo[];
  memories: Memory[];
  letters: LoveLetter[];
  reasons: Reason[];
  promises: PromiseItem[];
  plans: FuturePlan[];
  music: MusicTrack[];
  memoryVideos?: MemoryVideoItem[];
  secretRoom?: {
    hint: string;
    hasUnlockedContent?: boolean;
  };
}
