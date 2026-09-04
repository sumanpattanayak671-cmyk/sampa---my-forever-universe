import React, { useState, useEffect, useCallback } from 'react';
import { initialUniverseData } from './initialData';
import { UniverseData, Memory, Photo, LoveLetter } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AudioPlayerFloating } from './components/AudioPlayerFloating';
import { LightboxModal } from './components/LightboxModal';
import { LetterModal } from './components/LetterModal';
import { ShareModal } from './components/ShareModal';
import { ErrorRetryBanner } from './components/ErrorRetryBanner';
import { CanvasScrollBackground } from './components/CanvasScrollBackground';

// Views
import { HomeView } from './views/HomeView';
import { OurStoryView } from './views/OurStoryView';
import { MemoriesView } from './views/MemoriesView';
import { MemoryDetailView } from './views/MemoryDetailView';
import { GalleryView } from './views/GalleryView';
import { LoveLettersView } from './views/LoveLettersView';
import { ReasonsView } from './views/ReasonsView';
import { OurMusicView } from './views/OurMusicView';
import { OurFutureView } from './views/OurFutureView';
import { PromisesView } from './views/PromisesView';
import { SecretRoomView } from './views/SecretRoomView';
import { AdminView } from './views/AdminView';
import { NotFoundView } from './views/NotFoundView';

export default function App() {
  const [data, setData] = useState<UniverseData>(initialUniverseData);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Path routing
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');

  // Audio player state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Modals state
  const [activeLightbox, setActiveLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);
  const [activeLetter, setActiveLetter] = useState<LoveLetter | null>(null);
  const [activeShareMemory, setActiveShareMemory] = useState<Memory | null>(null);

  // Fetch live universe data from Supabase Cloud
  const fetchUniverse = useCallback(async () => {
    try {
      setLoading(true);
      setFetchError(null);

      const SUPABASE_URL = 'https://yvaeokluxlphnotexvlq.supabase.co';
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2YWVva2x1eGxwaG5vdGV4dmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MTU3MjUsImV4cCI6MjEwNDA5MTcyNX0.NXUfrXZ0nUM5j8iJEGGCqwXVXK9Axcf_xTubTdzIj7A';

      try {
        const cloudRes = await fetch(`${SUPABASE_URL}/rest/v1/universe_data?id=eq.sampa_universe`, {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        });
        if (cloudRes.ok) {
          const rows = await cloudRes.json();
          if (rows && rows.length > 0 && rows[0].data) {
            setData(rows[0].data);
            return;
          }
        }
      } catch (cloudErr) {
        console.warn('Supabase fetch failed, using seeded data:', cloudErr);
      }

      // Optional fallback to local express server
      const localRes = await fetch('/api/universe').catch(() => null);
      if (localRes && localRes.ok) {
        const json: UniverseData = await localRes.json();
        setData(json);
      }
    } catch (err: any) {
      console.warn('Using seeded data:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUniverse();
  }, [fetchUniverse]);

  // Sync with browser back / forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Reveal each view's top-level content block as it enters the viewport.
  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>('main > * > *');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealTargets.forEach((target) => target.classList.add('scroll-reveal-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );

    revealTargets.forEach((target, index) => {
      target.classList.add('scroll-reveal');
      target.style.setProperty('--reveal-order', String(index));
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [currentPath]);

  // Custom client-side router
  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Audio control handlers
  const handleTogglePlay = () => {
    setIsPlayingMusic((prev) => !prev);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % data.music.length);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + data.music.length) % data.music.length);
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlayingMusic(true);
  };

  // Heart reaction API caller
  const handleHeartReason = async (reasonId: string) => {
    // Optimistic UI update
    setData((prev) => ({
      ...prev,
      reasons: prev.reasons.map((r) =>
        r.id === reasonId ? { ...r, heartCount: (r.heartCount || 0) + 1 } : r
      ),
    }));

    try {
      const res = await fetch('/api/heart-reason', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reasonId }),
      });
      const resData = await res.json();
      if (resData.success) {
        setData((prev) => ({
          ...prev,
          reasons: prev.reasons.map((r) =>
            r.id === reasonId ? { ...r, heartCount: resData.heartCount } : r
          ),
        }));
      }
    } catch (e) {
      console.error('Could not sync heart reaction:', e);
    }
  };

  // Lightbox navigation
  const handleNextLightbox = () => {
    if (!activeLightbox) return;
    setActiveLightbox({
      ...activeLightbox,
      index: (activeLightbox.index + 1) % activeLightbox.photos.length,
    });
  };

  const handlePrevLightbox = () => {
    if (!activeLightbox) return;
    setActiveLightbox({
      ...activeLightbox,
      index: (activeLightbox.index - 1 + activeLightbox.photos.length) % activeLightbox.photos.length,
    });
  };

  // Determine current active view
  const renderView = () => {
    // Memory detail route: /memory/:slug
    if (currentPath.startsWith('/memory/')) {
      const slug = currentPath.replace('/memory/', '').split('/')[0];
      return (
        <MemoryDetailView
          slug={slug}
          memories={data.memories}
          settings={data.settings}
          navigate={navigate}
          onOpenLightbox={(photos, index) => setActiveLightbox({ photos, index })}
        />
      );
    }

    switch (currentPath) {
      case '/':
        return (
          <HomeView
            data={data}
            navigate={navigate}
            onOpenLightbox={(photos, index) => setActiveLightbox({ photos, index })}
            onOpenShare={(memory) => setActiveShareMemory(memory)}
          />
        );
      case '/our-story':
        return (
          <OurStoryView
            data={data}
            navigate={navigate}
            onOpenShare={(memory) => setActiveShareMemory(memory)}
          />
        );
      case '/memories':
        return (
          <MemoriesView
            data={data}
            navigate={navigate}
            onOpenShare={(memory) => setActiveShareMemory(memory)}
          />
        );
      case '/gallery':
      case '/photos':
        return (
          <GalleryView
            photos={data.photos}
            settings={data.settings}
            onOpenLightbox={(photos, index) => setActiveLightbox({ photos, index })}
          />
        );
      case '/love-letters':
      case '/letters':
        return (
          <LoveLettersView
            letters={data.letters}
            onOpenLetter={(letter) => setActiveLetter(letter)}
          />
        );
      case '/reasons':
        return (
          <ReasonsView
            reasons={data.reasons}
            onHeartReason={handleHeartReason}
          />
        );
      case '/our-music':
      case '/music':
        return (
          <OurMusicView
            tracks={data.music}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlayingMusic}
            onSelectTrack={handleSelectTrack}
            onTogglePlay={handleTogglePlay}
          />
        );
      case '/our-future':
      case '/future':
        return <OurFutureView plans={data.plans} />;
      case '/promises':
        return <PromisesView promises={data.promises} />;
      case '/secret-room':
        return (
          <SecretRoomView
            data={data}
            onOpenLightbox={(photos, index) => setActiveLightbox({ photos, index })}
          />
        );
      case '/admin':
        return (
          <AdminView
            onDataUpdated={fetchUniverse}
            navigate={navigate}
          />
        );
      default:
        return <NotFoundView navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030008] text-[#1A1A1A] flex flex-col justify-between selection:bg-[#6B5B4A]/20 selection:text-[#1A1A1A] font-sans antialiased relative overflow-x-hidden">
      {/* 220-frame scroll-based canvas video background */}
      <CanvasScrollBackground />

      {/* Main App Layout */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Navigation bar */}
        <Navbar
          currentPath={currentPath}
          navigate={navigate}
          settings={data.settings}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={handleTogglePlay}
          currentTrack={data.music[currentTrackIndex]}
        />


        {/* View Body */}
        <main className="flex-1 w-full">{renderView()}</main>

        {/* Footer */}
        <Footer settings={data.settings} navigate={navigate} />
      </div>

      {/* Global Floating Music Player */}
      <AudioPlayerFloating
        tracks={data.music}
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlayingMusic}
        onTogglePlay={handleTogglePlay}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        onSelectTrack={handleSelectTrack}
      />

      {/* Lightbox Modal */}
      {activeLightbox && (
        <LightboxModal
          photos={activeLightbox.photos}
          currentIndex={activeLightbox.index}
          onClose={() => setActiveLightbox(null)}
          onNext={handleNextLightbox}
          onPrev={handlePrevLightbox}
        />
      )}

      {/* Love Letter Modal */}
      {activeLetter && (
        <LetterModal
          letter={activeLetter}
          onClose={() => setActiveLetter(null)}
        />
      )}

      {/* Share Memory Modal */}
      {activeShareMemory && (
        <ShareModal
          memory={activeShareMemory}
          settings={data.settings}
          onClose={() => setActiveShareMemory(null)}
        />
      )}
    </div>
  );
}
