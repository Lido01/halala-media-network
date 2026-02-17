import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineArrowLongRight, HiChevronRight, HiChevronLeft, HiPlus } from 'react-icons/hi2';

const mediaSlides = [
  {
    id: 1,
    title: "Halala Kella",
    subtitle: "The Pride of Dawuro",
    image: "https://images.unsplash.com/photo-1518005020250-68a0508b237d?q=80&w=1486&auto=format&fit=crop",
    desc: "A breathtaking destination showcasing the natural beauty and hospitality of the South West Ethiopia Peoples' Region."
  },
  {
    id: 2,
    title: "Gebero Mountain",
    subtitle: "Historic Landmark",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&auto=format&fit=crop",
    desc: "Documenting the ancient history and cultural significance of the mountains that define our heritage."
  }
];

// Data for the Auto-Moving Ticker
const tickerImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1523805081446-ed9a9c8cb7ff?q=80", label: "Culture" },
  { id: 2, url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80", label: "Community" },
  { id: 3, url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80", label: "Music" },
  { id: 4, url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80", label: "Education" },
  { id: 5, url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80", label: "Landscapes" },
  { id: 6, url: "https://images.unsplash.com/photo-1523050335392-9bf5675f42e8?q=80", label: "Youth" },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Hero Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mediaSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 overflow-x-hidden">
      
      {/* HERO SECTION (Image First Mobile) */}
      <section className="relative h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 h-1/2 lg:h-full relative order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={mediaSlides[index].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-2/5 h-1/2 lg:h-full flex flex-col justify-center px-6 md:px-20 bg-[#050505] order-2 lg:order-1">
          <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-red-600 font-bold tracking-[0.4em] uppercase text-[10px]">{mediaSlides[index].subtitle}</span>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase mt-4 mb-6 leading-none">
              {mediaSlides[index].title}
            </h1>
            <button onClick={() => navigate('/about')} className="bg-white text-black px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* AUTO-MOVING GALLERY TICKER */}
      <section className="py-20 bg-white dark:bg-[#080808]">
        <div className="px-6 md:px-20 mb-10 flex justify-between items-end">
          <div>
            <span className="text-red-600 font-bold uppercase text-[10px] tracking-[0.3em]">NDM Visuals</span>
            <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter">Live Gallery Feed</h2>
          </div>
          <Link to="/galleries" className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest dark:text-white hover:text-red-600 transition-colors">
            Full Gallery <HiOutlineArrowLongRight size={20}/>
          </Link>
        </div>

        {/* The Ticker Container */}
        <div className="relative flex overflow-hidden border-y border-gray-100 dark:border-white/5 py-10">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {/* Duplicate images to create a seamless loop */}
            {[...tickerImages, ...tickerImages].map((img, i) => (
              <div key={i} className="inline-block w-64 md:w-80 h-48 md:h-60 mx-4 relative group cursor-pointer overflow-hidden rounded-sm">
                <img src={img.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={img.label} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-white font-black uppercase text-[10px] tracking-widest">{img.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile-only View Full Button */}
        <div className="mt-10 px-6 md:hidden">
          <button onClick={() => navigate('/galleries')} className="w-full py-4 border border-black dark:border-white dark:text-white font-black uppercase text-[10px] tracking-widest">
            View All Collections
          </button>
        </div>
      </section>

      {/* REMAINDER OF HOME PAGE (Your existing FeatureCard/About parts)... */}
    </div>
  );
};

export default Home;