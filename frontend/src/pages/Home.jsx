import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLongRight, HiChevronRight, HiChevronLeft, HiPlus } from 'react-icons/hi2';
import Contact from './Contact';

import { products } from '../hooks/productData';

// Cultural and Media Data with Enhanced Descriptions
const mediaSlides = [
  {
    id: 1,
    title: "Halala Kella",
    subtitle: "Sacred Heritage",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtoNl5BI2UBep0OTqs-dkKU0KbUma0wEkqg&s",
    desc: "A breathtaking royal fortress showcasing the architectural mastery and hospitality of the Dawuro people."
  },
  {
    id: 2,
    title: "Gebero Mountain",
    subtitle: "Historical Peak",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&auto=format&fit=crop",
    desc: "The sentinel of our history, where the air carries stories of ancient kings and the spirit of South West Ethiopia."
  },
  {
    id: 3,
    title: "Dawuro Rhythm",
    subtitle: "Artistic Soul",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop",
    desc: "Preserving the vibrant sounds of the South West, echoing the legacy of legendary cultural icons."
  }
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mediaSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500">
      
      {/* --- HERO SECTION: DAWURO THEMED --- */}
      <section 
        className="relative h-screen w-full flex flex-col lg:flex-row dark:bg-[#050505] bg-white overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* TEXT CONTENT */}
        <div className="relative w-full lg:w-[45%] h-1/2 lg:h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 z-20 bg-white dark:bg-[#050505] order-2 lg:order-1">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="flex items-center gap-3">
              <span className="w-12 h-[3px] bg-[#cc0000]" />
              <span className="text-[#cc0000] dark:text-[#ffcc00] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
                {mediaSlides[index].subtitle}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black dark:text-white leading-[0.9] uppercase tracking-tighter">
              {mediaSlides[index].title.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cc0000] via-[#ffcc00] to-[#cc0000]">
                {mediaSlides[index].title.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <div className="max-w-md border-l-4 border-[#ffcc00]/30 pl-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg italic leading-relaxed">
                "{mediaSlides[index].desc}"
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <button 
                onClick={() => navigate('/about')}
                className="bg-black dark:bg-[#ffcc00] text-white dark:text-black px-10 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#cc0000] hover:text-white transition-all shadow-xl active:scale-95"
              >
                Discover Heritage
              </button>
              
              <div className="flex border border-gray-200 dark:border-white/10 rounded-full overflow-hidden">
                <button onClick={() => setIndex((index - 1 + mediaSlides.length) % mediaSlides.length)} className="p-4 text-black dark:text-white hover:bg-[#cc0000] hover:text-white transition-all"><HiChevronLeft size={20}/></button>
                <button onClick={() => setIndex((index + 1) % mediaSlides.length)} className="p-4 text-black dark:text-white hover:bg-[#cc0000] hover:text-white transition-all"><HiChevronRight size={20}/></button>
              </div>
            </div>
          </motion.div>

          {/* Progress Indicators (Dawuro Colors) */}
          <div className="absolute bottom-10 left-6 md:left-20 flex gap-3">
            {mediaSlides.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? "w-12 bg-[#cc0000]" : "w-4 bg-gray-200 dark:bg-white/10"}`} 
              />
            ))}
          </div>
        </div>

        {/* IMAGE AREA */}
        <div className="relative lg:absolute lg:right-0 w-full lg:w-[60%] h-1/2 lg:h-full z-10 order-1 lg:order-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img
                src={mediaSlides[index].image}
                className="w-full h-full object-cover"
                alt="Dawuro Media"
              />
              <div className="hidden lg:block absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-[#050505] to-transparent" />
              <div className="lg:hidden absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white dark:from-[#050505] to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- ABOUT SECTION with CULTURAL STRIPE --- */}
      <section className="py-24 px-6 md:px-24 bg-white dark:bg-[#080808] relative">
        <div className="absolute top-0 left-0 w-full h-1 flex">
          <div className="flex-1 bg-[#cc0000]" /><div className="flex-1 bg-[#ffcc00]" /><div className="flex-1 bg-black" /><div className="flex-1 bg-white" />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm font-bold text-[#cc0000] tracking-[0.3em] uppercase mb-4">Strength in Unity</h2>
            <h3 className="text-4xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mb-6">
              Ancient Wisdom, <br/> Modern Voice.
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg mb-8">
              New Dawuro Media (NDM) serves as the digital loom, weaving together the historic narratives 
              of the Dawuro Zone with the dynamic future of South West Ethiopia.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 font-black uppercase text-xs tracking-widest text-black dark:text-white hover:text-[#cc0000] transition-colors group">
              Explore Our History <HiOutlineArrowLongRight size={24} className="group-hover:translate-x-2 transition-transform text-[#cc0000]" />
            </Link>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="h-64 bg-zinc-100 dark:bg-zinc-900 rounded-sm overflow-hidden border-b-4 border-[#cc0000]">
               <img src="https://images.unsplash.com/photo-1523050335392-9bf5675f42e8?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Education" />
            </div>
            <div className="h-64 bg-zinc-100 dark:bg-zinc-900 rounded-sm mt-8 overflow-hidden border-b-4 border-[#ffcc00]">
               <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Music" />
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE FEATURES --- */}
      <section className="py-24 px-6 md:px-24 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#050505]">
        <div className="mb-16">
          <span className="text-[#cc0000] font-black tracking-widest text-[10px] uppercase">NDM Features</span>
          <h2 className="text-4xl font-black dark:text-white uppercase tracking-tighter">Dawuro Culture</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <MediaCard 
            title="Heritage Arts" 
            category="Cultural Archive"
            img="https://images.unsplash.com/photo-1459749411177-042180ceea72?q=80&w=1470&auto=format&fit=crop"
            onClick={() => setSelectedItem({ title: "Music & Art", detail: "Archiving the rhythmic essence of Dawuro, from traditional instruments like the 'Dinka' to modern icons." })}
          />
          <MediaCard 
            title="One Pack One Child" 
            category="Unity Initiative"
            img="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop"
            onClick={() => setSelectedItem({ title: "Social Initiative", detail: "Empowering the next generation of Dawuro leaders through collective community support." })}
          />
          <MediaCard 
            title="Sacred Peaks" 
            category="Exploration"
            img="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop"
            onClick={() => setSelectedItem({ title: "Gebero History", detail: "Uncovering the legends buried within the mountains of Dawuro." })}
          />
        </div>
      </section>

      {/* --- OVERLAY MODAL --- */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 p-8 md:p-12 max-w-2xl w-full relative border-t-8 border-[#cc0000]"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 dark:text-white hover:text-[#cc0000] transition-colors"><HiPlus className="rotate-45" size={28}/></button>
              <h3 className="text-[#cc0000] font-black uppercase tracking-widest text-xs mb-2">Heritage Detail</h3>
              <h2 className="text-3xl font-black dark:text-white uppercase mb-6">{selectedItem.title}</h2>
              <p className="text-gray-500 dark:text-gray-300 text-lg leading-relaxed">{selectedItem.detail}</p>
              <button onClick={() => setSelectedItem(null)} className="mt-8 bg-black dark:bg-[#ffcc00] dark:text-black text-white px-8 py-3 font-bold uppercase text-[10px] tracking-widest hover:bg-[#cc0000] hover:text-white transition-all">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GALLERY PREVIEW */}
      <section className="py-24 px-6 md:px-10 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-[#cc0000] font-black tracking-[0.3em] uppercase text-[10px]">Cultural Treasures</span>
            <h2 className="text-4xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mt-2">The Collection</h2>
          </div>
          <Link to="/items" className="text-black dark:text-white font-black uppercase text-[14px] tracking-widest flex items-center gap-2 hover:text-[#cc0000] transition-all group">
            Explore All <HiOutlineArrowLongRight size={24} className="text-[#cc0000] group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} navigate={navigate} />
          ))}
        </div>
      </section>

      <Contact />
    </div>
  );
};

const MediaCard = ({ title, category, img, onClick }) => (
  <motion.div whileHover={{ y: -10 }} className="group cursor-pointer" onClick={onClick}>
    <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-6 relative border-b-2 border-transparent group-hover:border-[#ffcc00] transition-all">
      <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={title} />
      <div className="absolute inset-0 bg-[#cc0000]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="bg-white dark:bg-[#ffcc00] text-black p-4 rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
          <HiPlus size={24} />
        </div>
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-black dark:text-white font-black uppercase text-sm tracking-tighter">{title}</h3>
      <p className="text-[#cc0000] dark:text-[#ffcc00] text-[10px] font-bold uppercase tracking-widest">{category}</p>
    </div>
  </motion.div>
);

const ProductCard = ({ product, navigate }) => (
  <motion.div whileHover={{ y: -10 }} onClick={() => navigate('/items')} className="group cursor-pointer">
    <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-6 relative rounded-sm shadow-sm group-hover:shadow-xl transition-all">
      <img src={product.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={product.name} />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-[2px]">
        <div className="h-1 w-12 bg-[#ffcc00] mb-4" />
        <span className="bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest">View Heritage</span>
      </div>
    </div>
    <div className="flex justify-between items-start px-1">
      <div>
        <h3 className="text-black dark:text-white font-black uppercase text-xs tracking-tighter">{product.name}</h3>
        <p className="text-gray-400 text-[9px] mt-1 uppercase font-bold tracking-widest">{product.category}</p>
      </div>
      <p className="text-[#cc0000] dark:text-[#ffcc00] font-black text-sm">{product.price}</p>
    </div>
  </motion.div>
);

export default Home;