import React, { useState } from 'react';
import { Sparkles, Heart, Filter, Calendar, Folder } from 'lucide-react';
import { Photo, SiteSettings } from '../types';

interface GalleryViewProps {
  photos: Photo[];
  settings: SiteSettings;
  onOpenLightbox: (photos: Photo[], index: number) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ photos, settings, onOpenLightbox }) => {
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const albums = ['all', ...Array.from(new Set(photos.map((p) => p.album).filter(Boolean)))];

  const filteredPhotos = photos.filter((photo) => {
    const matchesAlbum = selectedAlbum === 'all' || photo.album === selectedAlbum;
    const matchesFavorite = !showFavoritesOnly || photo.isFavorite;
    return matchesAlbum && matchesFavorite;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3.5 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
          <span>Visual Chronicles // Photo Archive</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
          Our Photograph Archive
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
          Curated snapshots of our life together. New photos uploaded through the Admin Dashboard automatically appear here.
        </p>
      </div>

      {/* Album Tabs & Favorite Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#DED4C1] pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {albums.map((album) => (
            <button
              key={album}
              onClick={() => setSelectedAlbum(album)}
              className={`rounded-full px-4 py-1.5 text-xs font-sans font-medium tracking-wide transition-all ${
                selectedAlbum === album
                  ? 'bg-[#1A1A1A] text-[#F5F2ED] shadow-sm'
                  : 'border border-[#DED4C1] bg-white/80 text-[#6B5B4A] hover:bg-[#EBE4D8]'
              }`}
            >
              {album === 'all' ? 'All Photographs' : album}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-sans font-semibold transition-all ${
            showFavoritesOnly
              ? 'bg-[#EBE4D8] text-[#1A1A1A] border border-[#6B5B4A]'
              : 'border border-[#DED4C1] bg-white/80 text-[#6B5B4A] hover:bg-[#EBE4D8]'
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${showFavoritesOnly ? 'fill-[#6B5B4A] text-[#6B5B4A]' : ''}`} />
          <span>Favorites Only</span>
        </button>
      </div>

      {/* Responsive Gallery Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="py-20 text-center text-[#6B5B4A]">
          <p className="font-serif text-base text-[#1A1A1A]">No photographs in this album yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(filteredPhotos, idx)}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[28px] border border-[#DED4C1] bg-white natural-card-shadow transition-all duration-300 hover:border-[#6B5B4A]"
            >
              <img
                src={photo.thumbnailUrl || photo.url}
                alt={photo.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Top badges */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                <span className="rounded-full bg-white/90 border border-[#E0D8CC] px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-wider font-semibold text-[#6B5B4A] backdrop-blur-md">
                  {photo.category}
                </span>
                {photo.isFavorite && (
                  <div className="rounded-full bg-[#1A1A1A] p-1.5 text-white shadow-sm backdrop-blur-sm">
                    <Heart className="h-3 w-3 fill-white" />
                  </div>
                )}
              </div>

              {/* Bottom gradient caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                <div className="font-serif text-sm font-normal text-[#F5F2ED] truncate">
                  {photo.title}
                </div>
                {photo.caption && (
                  <p className="mt-1 line-clamp-2 text-xs italic text-[#EBE4D8] font-serif">
                    “{photo.caption}”
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between text-[10px] font-sans text-[#DED4C1] border-t border-white/20 pt-2">
                  <span>{photo.date}</span>
                  <span className="truncate max-w-[120px]">{photo.album}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
