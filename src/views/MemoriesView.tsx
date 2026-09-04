import React, { useState } from 'react';
import { Sparkles, Search, MapPin, Calendar, ArrowRight, Share2, Tag } from 'lucide-react';
import { UniverseData, Memory } from '../types';

interface MemoriesViewProps {
  data: UniverseData;
  navigate: (path: string) => void;
  onOpenShare: (memory: Memory) => void;
}

export const MemoriesView: React.FC<MemoriesViewProps> = ({ data, navigate, onOpenShare }) => {
  const { memories } = data;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(memories.map((m) => m.category)))];

  const filteredMemories = memories.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      m.title.toLowerCase().includes(query) ||
      m.summary.toLowerCase().includes(query) ||
      m.location.toLowerCase().includes(query) ||
      m.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3.5 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
          <span>Chapters of Eternity // Archival Log</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
          Our Shared Memories
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
          Every conversation, spontaneous adventure, and tender glance cataloged forever. Open any memory to view its full story or share it with Sampa.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#DED4C1] pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-sans font-medium tracking-wide transition-all capitalize ${
                selectedCategory === cat
                  ? 'bg-[#1A1A1A] text-[#F5F2ED] shadow-sm'
                  : 'border border-[#DED4C1] bg-white/80 text-[#6B5B4A] hover:bg-[#EBE4D8]'
              }`}
            >
              {cat === 'all' ? 'All Memories' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5B4A]" />
          <input
            type="text"
            placeholder="Search memories, locations, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-[#DED4C1] bg-white py-2 pl-10 pr-4 text-xs text-[#1A1A1A] placeholder-[#6B5B4A]/60 focus:border-[#6B5B4A] focus:outline-none"
          />
        </div>
      </div>

      {/* Memory MP4 Video Feature (Supports Multiple Videos) */}
      {(() => {
        const videoList = (data.settings.memoryVideos && data.settings.memoryVideos.length > 0)
          ? data.settings.memoryVideos
          : (data.settings.memoryVideoUrl ? [{ id: 'vid-1', title: 'Our Memory in Motion', caption: 'Cherished moments in starlight.', url: data.settings.memoryVideoUrl }] : []);

        if (videoList.length === 0) return null;

        return (
          <div className="overflow-hidden rounded-[32px] border border-[#DED4C1] bg-[#FAF7F2] p-6 sm:p-8 natural-card-shadow space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EBE4D8] border border-[#DED4C1] px-3 py-1 text-[10px] font-sans uppercase tracking-widest font-semibold text-[#6B5B4A]">
                  <Sparkles className="h-3 w-3 text-rose-500" />
                  <span>Romantic Motion Archive // {videoList.length > 1 ? `${videoList.length} Memory Videos` : 'Memory MP4'}</span>
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                  Our Memories in Motion
                </h2>
              </div>
            </div>

            <div className={`grid gap-6 ${videoList.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              {videoList.map((vid, idx) => (
                <div key={vid.id || idx} className="rounded-2xl border border-[#DED4C1] bg-white p-4 space-y-3 natural-card-shadow">
                  <div>
                    <span className="text-[10px] font-sans font-bold text-rose-600 uppercase tracking-widest">
                      Motion Chapter #{idx + 1}
                    </span>
                    <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">
                      {vid.title || 'Our Romantic Story'}
                    </h3>
                    {vid.caption && (
                      <p className="text-xs text-[#6B5B4A] font-serif italic">
                        “{vid.caption}”
                      </p>
                    )}
                  </div>
                  <div className="overflow-hidden rounded-xl bg-black shadow max-h-[420px]">
                    <video
                      src={vid.url}
                      controls
                      playsInline
                      className="w-full max-h-[420px] object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Memories Grid */}
      {filteredMemories.length === 0 ? (
        <div className="py-16 text-center text-[#6B5B4A]">
          <p className="text-base font-serif text-[#1A1A1A]">No memories matched your search.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs text-[#6B5B4A] underline font-sans"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              className="group flex flex-col justify-between overflow-hidden rounded-[32px] border border-[#DED4C1] bg-white natural-card-shadow transition-all duration-300 hover:border-[#6B5B4A]/60"
            >
              <div>
                {/* Photo preview */}
                <div
                  onClick={() => navigate(`/memory/${memory.slug}`)}
                  className="relative h-52 w-full cursor-pointer overflow-hidden bg-[#EBE4D8]"
                >
                  {memory.photoUrls && memory.photoUrls[0] ? (
                    <img
                      src={memory.photoUrls[0]}
                      alt={memory.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#6B5B4A] text-xs">
                      No photo attached
                    </div>
                  )}
                  <div className="absolute top-3 left-3 rounded-full bg-white/90 border border-[#E0D8CC] px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-wider font-semibold text-[#6B5B4A] backdrop-blur-md">
                    {memory.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#6B5B4A]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {memory.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate max-w-[120px]">{memory.location}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => navigate(`/memory/${memory.slug}`)}
                    className="cursor-pointer font-serif text-xl font-normal text-[#1A1A1A] group-hover:text-[#6B5B4A] transition-colors line-clamp-1"
                  >
                    {memory.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-[#1A1A1A]/70 line-clamp-3">
                    {memory.summary || memory.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {memory.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#E0D8CC] bg-[#F5F2ED] px-2 py-0.5 text-[10px] font-sans text-[#6B5B4A]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between border-t border-[#E0D8CC] p-4 px-6 bg-[#FAF7F2]">
                <button
                  onClick={() => onOpenShare(memory)}
                  className="flex items-center gap-1.5 text-xs font-sans text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share</span>
                </button>

                <button
                  onClick={() => navigate(`/memory/${memory.slug}`)}
                  className="flex items-center gap-1.5 text-xs font-sans font-semibold text-[#1A1A1A] hover:text-[#6B5B4A] transition-colors"
                >
                  <span>Open Story</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
