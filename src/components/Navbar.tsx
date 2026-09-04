import React, { useState } from 'react';
import { Sparkles, Heart, Menu, X, Music, Lock, Shield, Compass } from 'lucide-react';
import { SiteSettings, MusicTrack } from '../types';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  settings: SiteSettings;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  currentTrack?: MusicTrack | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  navigate,
  settings,
  isPlayingMusic,
  onToggleMusic,
  currentTrack,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Memories', path: '/memories' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Letters', path: '/love-letters' },
    { label: 'Reasons', path: '/reasons' },
    { label: 'Music', path: '/our-music' },
    { label: 'Future', path: '/our-future' },
    { label: 'Promises', path: '/promises' },
    { label: 'Secret Room', path: '/secret-room', icon: Lock },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E0D8CC] bg-[#F5F2ED]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <button
          id="nav-brand-button"
          onClick={() => handleNavigate('/')}
          className="group flex items-center gap-3 text-left transition-transform active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B5B4A] text-white font-sans text-xs font-bold tracking-tighter shadow-sm">
            {settings.partnerName ? settings.partnerName.slice(0, 1).toUpperCase() + '/U' : 'S/U'}
          </div>
          <div>
            <div className="flex items-center gap-2 font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#1A1A1A]">
              <span>{settings.partnerName.toUpperCase()}</span>
              <span className="hidden sm:inline font-light italic text-[#6B5B4A] opacity-60 text-sm">
                — My Forever Universe
              </span>
            </div>
            <p className="text-[9px] tracking-[0.2em] text-[#6B5B4A] uppercase font-sans sm:hidden">
              Forever Universe
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-5 lg:flex font-sans uppercase tracking-[0.16em] text-[11px] font-medium">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
            return (
              <button
                key={item.path}
                id={`nav-link-${item.path.replace(/[^a-zA-Z0-9]/g, '-')}`}
                onClick={() => handleNavigate(item.path)}
                className={`transition-all py-1 cursor-pointer ${
                  isActive
                    ? 'border-b-2 border-[#6B5B4A] text-[#1A1A1A] font-semibold opacity-100'
                    : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:opacity-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Music Toggle & Admin / Mobile menu */}
        <div className="flex items-center gap-2.5">
          {/* Quick Audio Pill */}
          <button
            id="nav-audio-pill"
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Mute Music' : 'Play Romantic Music'}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-sans transition-all ${
              isPlayingMusic
                ? 'border-[#6B5B4A] bg-[#EBE4D8] text-[#1A1A1A] font-semibold'
                : 'border-[#DED4C1] bg-white/70 text-[#6B5B4A] hover:bg-[#EBE4D8]'
            }`}
          >
            <Music className={`h-3.5 w-3.5 ${isPlayingMusic ? 'animate-spin text-[#6B5B4A]' : 'text-[#6B5B4A]'}`} />
            <span className="hidden sm:inline text-[11px] font-medium truncate max-w-[100px]">
              {isPlayingMusic ? (currentTrack?.title ? currentTrack.title : 'Playing') : 'Music'}
            </span>
          </button>

          {/* Admin shortcut styled as pill from Natural Tones theme */}
          <button
            id="nav-admin-button"
            onClick={() => handleNavigate('/admin')}
            title="Admin Dashboard"
            className="hidden sm:flex items-center gap-2 bg-[#EBE4D8] px-3.5 py-1.5 rounded-full border border-[#DED4C1] text-[#6B5B4A] hover:bg-[#DED4C1] transition-colors text-[10px] uppercase font-sans tracking-widest font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B5B4A]"></span>
            <span>Admin</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DED4C1] bg-white/80 text-[#1A1A1A] hover:bg-[#EBE4D8] lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-[#E0D8CC] bg-[#F5F2ED] px-4 py-4 shadow-lg lg:hidden">
          <div className="grid grid-cols-2 gap-2 pb-2 font-sans">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  id={`mobile-nav-${item.path.replace(/[^a-zA-Z0-9]/g, '-')}`}
                  onClick={() => handleNavigate(item.path)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#EBE4D8] text-[#1A1A1A] border border-[#6B5B4A]/30 font-semibold'
                      : 'border border-[#E0D8CC] bg-white/70 text-[#1A1A1A]/80 hover:bg-[#EBE4D8]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-[#E0D8CC] pt-3">
            <button
              onClick={() => handleNavigate('/admin')}
              className="flex items-center gap-2 text-xs text-[#6B5B4A] font-semibold hover:text-[#1A1A1A]"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Admin Management</span>
            </button>
            <span className="text-[11px] text-[#6B5B4A]/70 font-mono">
              {settings.customDomain || 'sampa-love.com'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
