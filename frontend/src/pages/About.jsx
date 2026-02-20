import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineUserGroup, HiOutlineGlobeEuropeAfrica, HiOutlineHandRaised, HiOutlineCheckBadge, HiChevronRight, HiChevronLeft } from 'react-icons/hi2';

// Team Data
const teamMembers = [
  {
    id: 1,
    name: "Founder Name",
    role: "Founder & Executive Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
    bio: "Visionary leader dedicated to bridging Dawuro's ancient history with global digital media."
  },
  {
    id: 2,
    name: "Lidetu Tesfaye",
    role: "Creative Developer & Media Lead",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop",
    bio: "Architecting the digital presence of the South West Region through innovative storytelling."
  },
  {
    id: 3,
    name: "Cultural Archivist",
    role: "Head of Heritage Documentation",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
    bio: "Expert in regional history, ensuring every story told is authentic to our ancestors."
  }
];

const About = () => {
  const [teamIndex, setTeamIndex] = useState(0);

  // Auto-slide for Team
  useEffect(() => {
    const timer = setInterval(() => {
      setTeamIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1470" 
            className="w-full h-full object-cover grayscale opacity-50 contrast-125"
            alt="Dawuro Landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="w-12 h-[2px] bg-[#cc0000]" />
            <span className="text-[#ffcc00] font-black uppercase text-[10px] tracking-[0.6em]">Since 2026</span>
            <span className="w-12 h-[2px] bg-[#cc0000]" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-[10rem] font-black text-white uppercase leading-none tracking-tighter"
          >
            DAWURO<br/><span className="text-[#cc0000]">SOUL.</span>
          </motion.h1>
        </div>
      </section>

      {/* 2. OUR STORY (The Split Section) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-20 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter leading-tight">
              A Digital Bridge for <br/> <span className="text-[#cc0000] italic">The South West.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed border-l-4 border-[#ffcc00] pl-6">
              Founded in Tercha, New Dawuro Media (NDM) emerged to solve a single challenge: how to preserve our rich 
              history while embracing the digital future. We are the architects of Dawuro's modern narrative.
            </p>
            <div className="flex gap-10 pt-6">
              <Stat count="25k+" label="Community Reach" />
              <Stat count="100+" label="Cultural Archives" />
              <Stat count="South West" label="Home Base" />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 border-2 border-[#cc0000]/20 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
            <img 
              src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1470" 
              className="w-full aspect-[4/5] md:aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 relative z-10"
              alt="Cultural Gathering"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#cc0000] text-white p-8 z-20 hidden md:block">
               <p className="text-[10px] font-black tracking-widest uppercase">The Heritage Protocol</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="bg-gray-50 dark:bg-[#080808] py-32 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-24">
            <h3 className="text-[#cc0000] font-black tracking-[0.4em] uppercase text-[10px] mb-4">Foundation</h3>
            <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter">OUR DNA</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard Icon={HiOutlineCheckBadge} title="Authenticity" desc="Every documentary and news piece is verified by community elders for cultural accuracy." />
            <ValueCard Icon={HiOutlineGlobeEuropeAfrica} title="Global Voice" desc="We use modern media tools to project the Dawuro voice to the international stage." />
            <ValueCard Icon={HiOutlineUserGroup} title="Youth Impact" desc="Training the next generation of content creators through our 'One Pack' workshops." />
            <ValueCard Icon={HiOutlineHandRaised} title="Preservation" desc="Building a digital library of our sacred songs, dances, and historical landmarks." />
          </div>
        </div>
      </section>

      {/* 4. TEAM SECTION (Responsive Slider) */}
      <section className="py-32 px-6 lg:px-20 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <h3 className="text-[#cc0000] font-black tracking-[0.4em] uppercase text-[10px] mb-4">Behind the Lens</h3>
              <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter">THE LEADERSHIP</h2>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setTeamIndex((teamIndex - 1 + teamMembers.length) % teamMembers.length)} className="p-4 border border-gray-200 dark:border-white/10 text-black dark:text-white hover:bg-[#cc0000] hover:text-white transition-all"><HiChevronLeft size={24}/></button>
              <button onClick={() => setTeamIndex((teamIndex + 1) % teamMembers.length)} className="p-4 border border-gray-200 dark:border-white/10 text-black dark:text-white hover:bg-[#cc0000] hover:text-white transition-all"><HiChevronRight size={24}/></button>
            </div>
          </div>

          <div className="relative overflow-hidden min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={teamIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              >
                <div className="aspect-[4/5] bg-gray-100 dark:bg-zinc-900 overflow-hidden border-b-8 border-[#ffcc00]">
                  <img src={teamMembers[teamIndex].image} className="w-full h-full object-cover grayscale" alt={teamMembers[teamIndex].name} />
                </div>
                <div className="space-y-8">
                  <span className="bg-[#cc0000] text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">{teamMembers[teamIndex].role}</span>
                  <h3 className="text-5xl font-black text-black dark:text-white uppercase tracking-tighter">{teamMembers[teamIndex].name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xl italic leading-relaxed">"{teamMembers[teamIndex].bio}"</p>
                  <div className="flex gap-4">
                    {teamMembers.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setTeamIndex(i)}
                        className={`h-2 transition-all duration-500 ${teamIndex === i ? "w-12 bg-[#cc0000]" : "w-4 bg-gray-200 dark:bg-white/10"}`} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. MOOD QUOTE */}
      <section className="py-40 px-6 lg:px-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#cc0000]/5 -z-10 skew-y-3 translate-y-20" />
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="w-24 h-1 bg-[#ffcc00] mx-auto" />
          <h2 className="text-3xl md:text-5xl font-light italic text-black dark:text-white leading-snug">
            "We are not just documenting history; we are ensuring our ancestors speak through the screens of the future."
          </h2>
          <div>
            <p className="text-black dark:text-white font-black uppercase tracking-[0.5em] text-xs">Foundation Team</p>
            <p className="text-[#cc0000] uppercase font-bold tracking-widest text-[9px] mt-2">New Dawuro Media Network</p>
          </div>
        </div>
      </section>

    </div>
  );
};

/* --- HELPER COMPONENTS --- */

const Stat = ({ count, label }) => (
  <div>
    <h4 className="text-3xl font-black text-black dark:text-white tracking-tighter">{count}</h4>
    <p className="text-[10px] text-[#cc0000] uppercase tracking-widest font-black mt-1">{label}</p>
  </div>
);

const ValueCard = ({ Icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white dark:bg-[#0c0c0c] p-10 border border-gray-100 dark:border-white/5 hover:border-[#cc0000] transition-all group"
  >
    <div className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-full mb-8 group-hover:bg-[#cc0000] group-hover:text-white transition-colors">
      <Icon size={24} className="text-gray-400 group-hover:text-white" />
    </div>
    <h4 className="text-black dark:text-white font-black uppercase text-sm tracking-widest mb-4">{title}</h4>
    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed uppercase tracking-tighter font-medium">{desc}</p>
  </motion.div>
);

export default About;