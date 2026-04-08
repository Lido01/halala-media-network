import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLongRight, HiChevronRight, HiChevronLeft, HiPlus } from 'react-icons/hi2';
import Contact from './Contact';

import { products } from '../hooks/productData';

// Cultural and Media Data with Enhanced Amharic & English Descriptions
const mediaSlides = [
  {
    id: 1,
    title: "የዳውሮ ዜማ",
    subtitle: "Artistic Soul | ጥበባዊ ነፍስ",
    image: "https://pbs.twimg.com/media/GiDKGoNWwAA4St7.jpg",
    desc: "Preserving the vibrant sounds of the South West, echoing the legacy of cultural icons. / የደቡብ ምዕራብን ደማቅ ድምፆች በመጠበቅ የባህል አውራዎችን ቅርስ እናስተጋባለን።"
  },
  {
    id: 2,
    title: "ሃላላ ኬላ",
    subtitle: "Sacred Heritage | ቅዱስ ቅርስ",
    image: "https://www.researchgate.net/profile/Admasu-Haile/publication/280830360/figure/fig2/AS:284525247647744@1444847513041/a-Partial-view-of-the-Kati-Halala-walls-photo-by-the-researcher.png",
    desc: "A breathtaking royal fortress showcasing the architectural mastery of the Dawuro people. / የዳውሮ ህዝብን የስነ-ህንፃ ጥበብ እና መስተንግዶ የሚያሳይ አስደናቂ የንግስና ግንብ።"
  },
  {
    id: 3, // Fixed ID from 2 to 3
    title: "ገበሮ ተራራ",
    subtitle: "Historical Peak | ታሪካዊ ጫፍ",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&auto=format&fit=crop",
    desc: "The sentinel of our history, where the air carries stories of ancient kings. / የጥንት ነገስታትን ታሪክ እና የደቡብ ምዕራብ ኢትዮጵያን መንፈስ የተሸከመ የታሪካችን ዘበኛ።"
  },
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
      
      {/* --- HERO SECTION --- */}
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
              <span className="text-[#cc0000] dark:text-[#ffcc00] font-black tracking-[0.2em] uppercase text-[10px] md:text-xs">
                {mediaSlides[index].subtitle}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black dark:text-white leading-[0.9] uppercase tracking-tighter">
              {mediaSlides[index].title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cc0000] via-[#ffcc00] to-[#cc0000]">
                {index === 0 ? "Rhythm" : index === 1 ? "Fortress" : "Mountain"}
              </span>
            </h1>

            <div className="max-w-md border-l-4 border-[#ffcc00]/30 pl-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg italic leading-relaxed">
                "{mediaSlides[index].desc}"
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <button 
                onClick={() => navigate('/gallery')}
                className="bg-black dark:bg-[#ffcc00] text-white dark:text-black px-10 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#cc0000] hover:text-white transition-all shadow-xl active:scale-95"
              >
                Discover Heritage | ቅርሳችንን ይወቁ
              </button>
              
              <div className="flex border border-gray-200 dark:border-white/10 rounded-full overflow-hidden">
                <button onClick={() => setIndex((index - 1 + mediaSlides.length) % mediaSlides.length)} className="p-4 text-black dark:text-white hover:bg-[#cc0000] hover:text-white transition-all"><HiChevronLeft size={20}/></button>
                <button onClick={() => setIndex((index + 1) % mediaSlides.length)} className="p-4 text-black dark:text-white hover:bg-[#cc0000] hover:text-white transition-all"><HiChevronRight size={20}/></button>
              </div>
            </div>
          </motion.div>

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

      {/* --- ABOUT SECTION --- */}
      <section className="py-24 px-6 md:px-24 bg-white dark:bg-[#080808] relative">
        <div className="absolute top-0 left-0 w-full h-1 flex">
          <div className="flex-1 bg-[#cc0000]" /><div className="flex-1 bg-[#ffcc00]" /><div className="flex-1 bg-black" /><div className="flex-1 bg-white" />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm font-bold text-[#cc0000] tracking-[0.3em] uppercase mb-4">Strength in Unity | አንድነት ኃይል ነው</h2>
            <h3 className="text-4xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mb-6 leading-tight">
              Ancient Wisdom, <br/> Modern Voice. <br/>
              <span className="text-[#ffcc00] italic">ጥንታዊ ጥበብ፣ ዘመናዊ ድምፅ።</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg mb-8">
              New Dawuro Media (NDM) serves as the digital loom, weaving together the historic narratives 
              of the Dawuro Zone with the dynamic future. <br/>
            NDM የዳውሮ ዞን ታሪካዊ ትረካዎችን ከደቡብ ምዕራብ ኢትዮጵያ ተለዋዋጭ የወደፊት ዕጣ ፈንታ ጋር የሚያቆራኝ ዲጂታል ድልድይ ነው።
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 font-black uppercase text-xs tracking-widest text-black dark:text-white hover:text-[#cc0000] transition-colors group">
              Explore Our History | ታሪካችንን ይመርምሩ <HiOutlineArrowLongRight size={24} className="group-hover:translate-x-2 transition-transform text-[#cc0000]" />
            </Link>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="h-64 bg-zinc-100 dark:bg-zinc-900 rounded-sm overflow-hidden border-b-4 border-[#cc0000]">
                <img src="https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t1.6435-9/152726126_1950742805076274_8412325837325679559_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFkWydWCWuMGkGQTIOORz8hsohwfsEv-SqyiHB-wS_5Ktg2pSlT9V_bMR7F-J8F4q3ue5rAVZbhbPpxpKTbKdzd&_nc_ohc=e9PXNt4PQAYQ7kNvwEF2tK5&_nc_oc=AdlxE-uRPyFamkakAK6E613adrxvguWyA-HZVgRva_4fS37Ci5b4Bc_clLQ8TLdMB4o&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=3-Uvj__PDrT3iVxI7EbMuw&oh=00_AfsgqOTp4eI6fVgGXxCHi17yx60tGbO3-NVqh0oOnD2roA&oe=69C16E48" className="w-full h-full object-cover hover:scale-105 transition-all duration-700" alt="Education" />
            </div>
            <div className="h-64 bg-zinc-100 dark:bg-zinc-900 rounded-sm mt-8 overflow-hidden border-b-4 border-[#ffcc00]">
                <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-all duration-700" alt="Music" />
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE FEATURES --- */}
      <section className="py-24 px-6 md:px-24 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#050505]">
        <div className="mb-16">
          <span className="text-[#cc0000] font-black tracking-widest text-[10px] uppercase">NDM Features | ልዩ ገፅታዎች</span>
          <h2 className="text-4xl font-black dark:text-white uppercase tracking-tighter">Dawuro Culture | የዳውሮ ባህል</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <MediaCard 
            title="Heritage Arts | ጥንታዊ ጥበባት" 
            category="Cultural Archive | የባህል መዝገብ"
            img="https://pbs.twimg.com/media/GiDKGoNWwAA4St7.jpg"
            onClick={() => setSelectedItem({ 
              title: "Cultural Service | የባህል አገልግሎት", 
              detail: "Archiving the rhythmic essence of Dawuro, from traditional instruments like the 'Dinka' to modern icons. / የዳውሮን የዜማ ይዘት ከባህላዊ መሣሪያዎች እስከ ዘመናዊ ጥበብ ባለሙያዎች ድረስ መመዝገብ።" 
            })}
          />
          <MediaCard 
            title="One Pack One Child" 
            category="Unity Initiative | የአንድነት ተነሳሽነት"
            img="https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/556688472_1365428891629236_1508812832666703455_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFYmD4V-oukQ9pniK6oZUc_MTtjwtxOPGoxO2PC3E48aoTaRBD6x50-4v7UNG_qT4ofzzVcdc4fpdjTjXU3aprc&_nc_ohc=mnjyTpbrlX4Q7kNvwFalTTB&_nc_oc=Adm88QV6GC8vA-ECVKmGAO2xQdD67rbpssedB-Dhg0nhYeRgknI-mQXFOH9tGpkkNHY&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=-V0d4dyWxXvzmR3RXJwL5g&oh=00_Aftl6iADKzCwJ1gwiWpMMTB9L1EyTH73Pu9rXE7COkTfSw&oe=69A0256F"
            onClick={() => setSelectedItem({ 
              title: "Work On Generation | በትውልድ ላይ መስራት", 
              detail: "Empowering the next generation through collective community support. / በትብብር ማህበረሰባዊ ድጋፍ ቀጣዩን ትውልድ ማብቃት። 'አንድ ፓክ ለአንድ ልጅ' ተነሳሽነት እያንዳንዱ ተማሪ ስኬታማ እንዲሆን ግብዓቶችን ያቀርባል።" 
            })}
          />
          <MediaCard 
            title="Dawuro Food | የዳውሮ ምግብ" 
            category="Exploration | ፍለጋ"
            img="https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/486859975_1048748787289382_9146889712630562623_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGZq_ZzgtSM8sBT8iDMZfhs_I_GFH-uFdn8j8YUf64V2U7IwlFGtkPrdebHgWMY-H4MDplFPPFtmSXhmAYwOj1n&_nc_ohc=d3ibk7sCaOUQ7kNvwG41lGt&_nc_oc=AdmZdlDtDOmz65kcs0lL-lebI0XaDiQxSqreMFr6jSakfHBpkVpTWpchQRd6vbZYjvo&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=0I_63IEiVsQ-XFNHygl1fQ&oh=00_Aftal5lD87VsrnQVKGXRGUk_f5iuo3w1bgE3Ly5mdacwLQ&oe=69A04DEE"
            onClick={() => setSelectedItem({ 
              title: "Special Dawuro Food | ልዩ የዳውሮ ምግቦች", 
              detail: "Uncovering the legends buried within the hidden parts of Dawuro cultural food. / በዳውሮ የባህል ምግቦች ውስጥ ያሉ ድንቅ ጣዕሞችን እና ታሪኮችን ማውጣት።" 
            })}
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
              <h3 className="text-[#cc0000] font-black uppercase tracking-widest text-xs mb-2">Heritage Detail | የቅርስ ዝርዝር</h3>
              <h2 className="text-3xl font-black dark:text-white uppercase mb-6">{selectedItem.title}</h2>
              <p className="text-gray-500 dark:text-gray-300 text-lg leading-relaxed">{selectedItem.detail}</p>
              <button onClick={() => setSelectedItem(null)} className="mt-8 bg-black dark:bg-[#ffcc00] dark:text-black text-white px-8 py-3 font-bold uppercase text-[10px] tracking-widest hover:bg-[#cc0000] hover:text-white transition-all">Close | ዝጋ</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GALLERY PREVIEW */}
      <section className="py-24 px-6 md:px-10 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-[#cc0000] font-black tracking-[0.3em] uppercase text-[10px]">Cultural Treasures | የባህል ሀብቶች</span>
            <h2 className="text-4xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mt-2">The Collection | ስብስቡ</h2>
          </div>
          <Link to="/gallery" className="text-black dark:text-white font-black uppercase text-[14px] tracking-widest flex items-center gap-2 hover:text-[#cc0000] transition-all group">
            Explore All | ሁሉንም ይመልከቱ <HiOutlineArrowLongRight size={24} className="text-[#cc0000] group-hover:translate-x-2 transition-transform" />
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
      <img src={img} className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-1000" alt={title} />
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
  <motion.div whileHover={{ y: -10 }} onClick={() => navigate('/gallery')} className="group cursor-pointer">
    <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-6 relative rounded-sm shadow-sm group-hover:shadow-xl transition-all">
      <img src={product.img} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt={product.name} />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-[2px]">
        <div className="h-1 w-12 bg-[#ffcc00] mb-4" />
        <span className="bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest">View Heritage | እዩ</span>
      </div>
    </div>
    <div className="flex justify-between items-start px-1">
        <h3 className="text-black dark:text-white font-black uppercase text-xs tracking-tighter">{product.name}</h3>
        <p className="text-gray-400 text-[9px] mt-1 uppercase font-bold tracking-widest">{product.category}</p>
    </div>
  </motion.div>
);

export default Home;