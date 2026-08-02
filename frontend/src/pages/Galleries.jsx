import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineXMark, 
  HiOutlineQueueList, 
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineArrowUpRight,
  HiOutlineArrowLongRight
} from 'react-icons/hi2';
import { Link, useParams } from 'react-router-dom';
import apiService from '../api/api';
import { getGalleryRoute, getMediaUrl, getYouTubeEmbedUrl, normalizeGalleryType } from '../utils/gallery';

void motion;

const Galleries = () => {
  const { mediaType } = useParams();
  const [mediaAssets, setMediaAssets] = useState([]);
  const [categories, setCategories] = useState(['ALL']);
  const [filter, setFilter] = useState('ALL');
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssets() {
      setLoading(true);
      try {
        const res = await apiService.get('/api/media/assets/');
        setMediaAssets(res.data);
        const cats = Array.from(new Set(res.data.map((asset) => normalizeGalleryType(asset.media_type)).filter(Boolean)));
        setCategories(['ALL', ...cats]);
      } catch {
        setMediaAssets([]);
      }
      setLoading(false);
    }
    fetchAssets();
  }, []);

  // Filter by media_type (category)
  const activeFilter = normalizeGalleryType(mediaType) || normalizeGalleryType(filter) || 'ALL';

  const filteredItems = activeFilter === 'ALL'
    ? mediaAssets
    : mediaAssets.filter((asset) => normalizeGalleryType(asset.media_type) === activeFilter);

  const activeItem = filteredItems[activeIdx] || filteredItems[0];


  function renderMedia(item, isThumbnail = false) {
    if (!item) return null;
    if (item.media_type === 'image' && item.image_file) {
      return <img src={getMediaUrl(item.image_file)} className="w-full h-full object-cover" alt={item.title} />;
    }
    if ((item.media_type === 'video' || item.media_type === 'reel') && item.video_url) {
      if (isThumbnail) {
        return (
          <a
            href={item.video_url}
            target="_blank"
            rel="noreferrer"
            className="flex h-full w-full items-center justify-center bg-zinc-950 text-white"
            aria-label={`Open ${item.title} video`}
          >
            <span className="flex h-10 w-10 items-center justify-center   border border-white/30 bg-white/10 backdrop-blur-sm">
              <HiOutlineArrowUpRight size={16} />
            </span>
          </a>
        );
      }

      const embedUrl = getYouTubeEmbedUrl(item.video_url);
      if (embedUrl) {
        return (
          <div className="relative h-full w-full">
            <iframe
              src={embedUrl}
              title={item.title}
              className="w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <a
              href={item.video_url}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 left-4 inline-flex items-center gap-2   bg-black/70 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-red-600"
            >
              Open Video
            </a>
          </div>
        );
      }

      return (
        <a
          href={item.video_url}
          target="_blank"
          rel="noreferrer"
          className="flex h-full w-full items-center justify-center bg-black text-white px-4 text-center"
        >
          Open Video Link
        </a>
      );
    }
    if ((item.media_type === 'video' || item.media_type === 'reel') && item.video_file) {
      return <video src={getMediaUrl(item.video_file)} controls className="w-full h-full object-cover" />;
    }
    return <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-500">No Preview</div>;
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20 pb-10 transition-colors duration-500 overflow-x-hidden">
      <div className="max-w-[1700px] mx-auto px-4 md:px-12">
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-16 gap-6 md:gap-8">
          <header className="max-w-3xl">
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-red-600 font-black tracking-[0.4em] uppercase text-[9px] md:text-[10px] mb-2 md:mb-4"
            >
              Documenting Our Legacy • New Dawuro Media
            </motion.p>
            <h1 className="text-4xl md:text-9xl font-black text-black dark:text-white uppercase tracking-tighter leading-[0.9]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Living</span> Archive
            </h1>
          </header>

          {/* Dynamic Category Filter */}
          <div className="w-full lg:w-auto space-y-3">
            <div className="flex items-center justify-between gap-4 px-1">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-red-500">Selected category</p>
                <p className="text-sm md:text-base font-black uppercase tracking-widest text-black dark:text-white">
                  {activeFilter}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-gray-400">Items</p>
                <p className="text-sm md:text-base font-black text-black dark:text-white">{filteredItems.length}</p>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={getGalleryRoute(cat)}
                onClick={() => {
                  setFilter(cat);
                  setActiveIdx(0);
                }}
                className={`group relative flex items-center gap-2 text-[9px] font-black uppercase tracking-widest px-6 py-3 md:px-8 md:py-4 border-2 transition-all shrink-0  ${
                  activeFilter === normalizeGalleryType(cat)
                    ? 'bg-red-600 text-white border-red-600 shadow-[0_18px_40px_-20px_rgba(220,38,38,0.95)]'
                    : 'border-gray-100 bg-white/70 text-gray-700 hover:border-red-300 hover:text-red-600 dark:bg-white/5 dark:border-white/10 dark:text-white'
                }`}
              >
                {activeFilter === normalizeGalleryType(cat) && <span className="h-2 w-2  bg-white" />}
                {cat}
              </Link>
            ))}
          </div>
          </div>
          {/* <div className="mt-4 flex flex-wrap gap-2">
            {['image', 'video', 'reel'].map((type) => (
              <Link
                key={type}
                to={getGalleryRoute(type)}
                onClick={() => {
                  setFilter(type);
                  setActiveIdx(0);
                }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border  transition-all ${
                  activeFilter === type
                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                    : 'border-black/10 text-black/70 hover:border-black/30 dark:border-white/20 dark:text-white/70 dark:hover:border-white/50'
                }`}
              >
                <span className={`h-1.5 w-1.5  ${activeFilter === type ? 'bg-current' : 'bg-current opacity-40'}`} />
                {type}
              </Link>
            ))}
          </div> */}
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* FEATURED STORY AREA */}
          <div className="lg:col-span-8 group relative aspect-[4/5] md:aspect-[16/10] lg:aspect-auto lg:h-[70vh] overflow-hidden  bg-zinc-900 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem?.id}
                initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                {renderMedia(activeItem)}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
              <motion.div key={activeItem?.id + "text"} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <span className="text-red-500 font-black uppercase text-[10px] tracking-widest block mb-1">{activeItem?.media_type}</span>
                <h2 className="text-3xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">{activeItem?.title}</h2>
                <p className="text-white/70 text-sm md:text-lg max-w-2xl mt-3 md:mt-4 leading-relaxed font-light line-clamp-3 md:line-clamp-none italic">"{activeItem?.description}"</p>
                <button 
                  onClick={() => setSelectedItem(activeItem)}
                  className="mt-6 md:mt-8 w-full md:w-auto bg-white text-black px-8 py-4 md:px-12 md:py-5 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-2xl"
                >
                  Read Full Story <HiOutlineArrowUpRight size={18}/>
                </button>
                {/* <div className="mt-4 flex flex-wrap gap-2">
                  {['image', 'video', 'reel'].map((type) => (
                    <Link
                      key={type}
                      to={getGalleryRoute(type)}
                      className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border  transition-all ${normalizeGalleryType(activeItem?.media_type) === type ? 'bg-white text-black border-white' : 'border-white/20 text-white/80 hover:border-white/50'}`}
                    >
                      {type}
                    </Link>
                  ))}
                </div> */}
              </motion.div>
            </div>
          </div>

          {/* SIDE/BOTTOM SCROLLABLE LIST */}
          <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center justify-between px-2">
              <span className="flex items-center gap-2"><HiOutlineQueueList size={16} className="text-red-600"/> Discover Stories</span>
              <span className="lg:hidden text-[8px] animate-pulse">Swipe Left →</span>
            </h3>
            {/* Horizontal Scroll on Mobile, Vertical on Desktop */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar pb-6 lg:pb-0 lg:max-h-[65vh] lg:pr-4 custom-scrollbar snap-x snap-mandatory">
              {filteredItems.map((item, idx) => (
                <div 
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`snap-center min-w-[85%] md:min-w-[45%] lg:min-w-full p-4 md:p-6 cursor-pointer border-l-4 transition-all duration-500 flex items-center gap-4 md:gap-6 ${
                    activeIdx === idx 
                    ? 'bg-zinc-100 dark:bg-zinc-900 border-red-600' 
                    : 'border-transparent bg-gray-50 dark:bg-zinc-900/40'
                  }`}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20  overflow-hidden shrink-0 border dark:border-white/5">
                    {renderMedia(item, true)}
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-red-600 text-[8px] font-black uppercase tracking-widest block truncate">{item.media_type}</span>
                    <h4 className="text-sm md:text-lg font-black dark:text-white uppercase tracking-tight truncate">{item.title}</h4>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase mt-1 flex items-center gap-1 group">
                       View Details <HiOutlineArrowLongRight className="group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- STORY MODAL (STORYTELLING FOCUS) --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[500] flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
            />
            <motion.div 
              initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl h-full lg:h-[90vh] bg-white dark:bg-[#0c0c0c] overflow-hidden lg: flex flex-col shadow-2xl"
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-3 bg-black/40 text-white  hover:bg-red-600 transition-all">
                <HiOutlineXMark size={28}/>
              </button>

              <div className="overflow-y-auto h-full scroll-smooth">
                {/* Modal Cover Media */}
                <div className="h-[45vh] md:h-[55vh] w-full relative shrink-0">
                  {renderMedia(selectedItem)}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/20 to-transparent" />
                  <div className="absolute bottom-10 left-6 right-6 lg:left-20">
                    <span className="bg-red-600 text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest">{selectedItem.media_type}</span>
                    <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter mt-4 leading-none">
                      {selectedItem.title}
                    </h2>
                  </div>
                </div>

                {/* Long Description Content */}
                <div className="p-6 md:p-12 lg:p-20">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
                    <div className="lg:col-span-8 space-y-10 md:space-y-16">
                      {/* Large Font Intro */}
                      <p className="text-2xl md:text-5xl font-serif dark:text-white leading-[1.2] italic text-gray-800 tracking-tight">
                        {selectedItem.description}
                      </p>
                      {/* Body Content */}
                      <div className="space-y-6 md:space-y-8 text-gray-600 dark:text-gray-400 text-lg md:text-2xl leading-[1.6] md:leading-[1.8] font-light">
                        {selectedItem.story}
                      </div>
                      <div className="h-px w-20 bg-red-600" />
                      <p className="text-gray-400 dark:text-zinc-600 text-sm md:text-base leading-relaxed uppercase tracking-widest font-black">
                        Documentation by New Dawuro Media • {new Date().getFullYear()}
                      </p>
                    </div>
                    {/* Interaction Side Column */}
                    <div className="lg:col-span-4 space-y-6">
                       <div className="p-6 md:p-10 bg-zinc-50 dark:bg-zinc-900/50  border dark:border-white/5 space-y-6">
                          <h4 className="text-[10px] font-black uppercase text-red-600 tracking-[0.3em]">Direct Impact</h4>
                          <p className="text-sm md:text-lg dark:text-gray-300 font-medium">Your support helps us continue documenting these powerful stories in the Dawuro Zone.</p>
                          <Link to="/donate" className="w-full py-4 md:py-5 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all shadow-xl">
                            <HiOutlineHeart size={18}/> Support This Work
                          </Link>
                       </div>
                       <div className="flex flex-col gap-4 px-4 pt-4">
                         <h5 className="text-[8px] font-black uppercase text-gray-500 tracking-widest">Connect with Hub</h5>
                         <SocialAction icon={<HiOutlineGlobeAlt/>} text="Official Website" />
                         <SocialAction icon={<HiOutlineQueueList/>} text="Related Archives" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SocialAction = ({ icon, text }) => (
  <div className="flex items-center gap-4 text-gray-500 hover:text-red-600 cursor-pointer transition-colors group">
    <div className="p-2 md:p-3 bg-gray-100 dark:bg-zinc-900  group-hover:bg-red-600 group-hover:text-white transition-all">{icon}</div>
    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{text}</span>
  </div>
);

export default Galleries;