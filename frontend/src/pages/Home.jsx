import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLongRight, HiChevronRight, HiChevronLeft, HiPlus } from 'react-icons/hi2';
import Contact from './Contact';

import { products } from '../hooks/productData';

// Cultural and Media Data
const mediaSlides = [
  {
    id: 1,
    title: "Halala Kella",
    subtitle: "The Pride of Dawuro",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtoNl5BI2UBep0OTqs-dkKU0KbUma0wEkqg&s", // Representative of luxury/resort
    desc: "A breathtaking destination showcasing the natural beauty and hospitality of the South West Ethiopia Peoples' Region."
  },
  {
    id: 2,
    title: "Gebero Mountain",
    subtitle: "Historic Landmark",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&auto=format&fit=crop", // Representative of highlands
    desc: "Documenting the ancient history and cultural significance of the mountains that define our heritage."
  },
  {
    id: 3,
    title: "Cultural Rhythm",
    subtitle: "Music & Arts",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop", // Representative of media/music
    desc: "Nurturing the minds of our community through the vibrant sounds of Yitagesu Hoshu and local legends."
  }
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // For the overlay
  const navigate = useNavigate();

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mediaSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500">
      
      {/* --- HERO SECTION: IMAGE FIRST ON MOBILE --- */}
      <section 
        className="relative h-screen flex flex-col dark:text-white dark:bg-[#050505] lg:flex-row overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* IMAGE AREA (Top on Mobile, Right on Desktop) */}
        <div className="w-full lg:w-3/5 h-1/2 lg:h-full relative order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <img
                src={mediaSlides[index].image}
                className="w-full h-full object-cover"
                alt="Dawuro Media"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#050505] lg:to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-6 flex gap-2 z-20">
            {mediaSlides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setIndex(i)}
                className={`h-1 transition-all duration-500 ${index === i ? "w-12 bg-red-600" : "w-4 bg-white/30"}`} 
              />
            ))}
          </div>
        </div>

        {/* TEXT CONTENT (Bottom on Mobile, Left on Desktop) */}
        <div className="w-full lg:w-2/5 h-1/2 lg:h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 z-10 bg-[#050500] dark:bg-[#080808] order-2 lg:order-1">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="text-red-600 font-bold tracking-[0.5em] uppercase text-xs block">
              {mediaSlides[index].subtitle}
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter">
              {mediaSlides[index].title.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                {mediaSlides[index].title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="text-gray-400 max-w-sm text-sm md:text-lg italic">
              "{mediaSlides[index].desc}"
            </p>
            
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => navigate('/about')}
                className="bg-white text-black px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95"
              >
                Read More
              </button>
              <div className="flex">
                <button onClick={() => setIndex((index - 1 + mediaSlides.length) % mediaSlides.length)} className="p-4 border border-white/10 text-white hover:bg-white hover:text-black transition-all"><HiChevronLeft /></button>
                <button onClick={() => setIndex((index + 1) % mediaSlides.length)} className="p-4 border border-white/10 text-white hover:bg-white hover:text-black transition-all"><HiChevronRight /></button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="py-24 px-6 md:px-24 bg-white dark:bg-[#080808]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm font-bold text-red-600 tracking-[0.3em] uppercase mb-4">Our Purpose</h2>
            <h3 className="text-4xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mb-6">
              Nurturing Minds, <br/> Connecting Hearts.
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg mb-8">
              New Dawuro Media (NDM) is the digital bridge for the Dawuro Zone. We don't just share news; 
              we preserve the soul of the South West Regional State of Ethiopia.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 font-black uppercase text-xs tracking-widest dark:text-white hover:text-red-600 transition-colors">
              Explore Our History <HiOutlineArrowLongRight size={20} />
            </Link>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="h-64 bg-zinc-100 dark:bg-zinc-900 rounded-sm overflow-hidden">
               <img src="https://images.unsplash.com/photo-1523050335392-9bf5675f42e8?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Education" />
            </div>
            <div className="h-64 bg-zinc-100 dark:bg-zinc-900 rounded-sm mt-8 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Music" />
            </div>
          </div>
        </div>
      </section>

      {/* --- GRID LIST SECTION (INTERACTIVE) --- */}
      <section className="py-24 px-6 md:px-24 border-t border-gray-100 dark:border-white/5">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-red-600 font-black tracking-widest text-[10px] uppercase">NDM Features</span>
            <h2 className="text-4xl font-black dark:text-white uppercase tracking-tighter">Explore Dawuro</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <MediaCard 
            title="Music & Art" 
            category="Entertainment"
            img="https://images.unsplash.com/photo-1459749411177-042180ceea72?q=80&w=1470&auto=format&fit=crop"
            onClick={() => setSelectedItem({ title: "Music & Art", detail: "Featuring Dawuro artists like Yitagesu Hoshu and Asnake Lota. We bring new Ethiopian music to the global stage." })}
          />
          <MediaCard 
            title="One Pack One Child" 
            category="Community"
            img="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop"
            onClick={() => setSelectedItem({ title: "Social Initiative", detail: "Our campaign providing essential educational materials to students across the Dawuro Zone." })}
          />
          <MediaCard 
            title="Gebero Mountain" 
            category="Documentary"
            img="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop"
            onClick={() => setSelectedItem({ title: "Gebero History", detail: "Deep-dive documentaries featuring interviews with community elders about our sacred landmarks." })}
          />
        </div>
      </section>

      {/* --- OVERLAY MODAL --- */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 p-8 md:p-12 max-w-2xl w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 dark:text-white"><HiPlus className="rotate-45" size={24}/></button>
              <h3 className="text-red-600 font-black uppercase tracking-widest text-xs mb-2">Details</h3>
              <h2 className="text-3xl font-black dark:text-white uppercase mb-6">{selectedItem.title}</h2>
              <p className="text-gray-500 dark:text-gray-300 text-lg leading-relaxed">{selectedItem.detail}</p>
              <button 
                onClick={() => setSelectedItem(null)}
                className="mt-8 bg-black dark:bg-white dark:text-black text-white px-6 py-3 font-bold uppercase text-[10px] tracking-widest"
              >
                Close View
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRODUCT GRID PREVIEW */}
      <section className="py-24 px-6 md:px-10 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-red-600 font-black tracking-[0.3em] uppercase text-[10px]">Ready to View</span>
            <h2 className="text-4xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mt-2">Our Galleries?</h2>
          </div>
          <Link to="/items" className="text-black dark:text-white font-black uppercase text-[14px] tracking-widest flex items-center gap-2 hover:text-red-600 transition-colors">
            View All<HiOutlineArrowLongRight size={20} />
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
  <motion.div 
    whileHover={{ y: -10 }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-6 relative">
      <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={title} />
      <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="bg-white text-black p-4 rounded-full shadow-2xl">
          <HiPlus size={24} />
        </div>
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-black dark:text-white font-black uppercase text-sm tracking-tighter">{title}</h3>
      <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest">{category}</p>
    </div>
  </motion.div>
);

const ProductCard = ({ product, navigate }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    onClick={() => navigate('/items')}
    className="group cursor-pointer"
  >
    <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-6 relative rounded-sm">
      <img src={product.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={product.name} />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
        <span className="bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest shadow-2xl">View Details</span>
      </div>
    </div>
    <div className="flex justify-between items-start px-1">
      <div>
        <h3 className="text-black dark:text-white font-black uppercase text-xs tracking-tighter">{product.name}</h3>
        <p className="text-gray-400 text-[9px] mt-1 uppercase font-bold tracking-widest">{product.category}</p>
      </div>
      <p className="text-red-600 font-black text-sm">{product.price}</p>
    </div>
  </motion.div>
);

export default Home;