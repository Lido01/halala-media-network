import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiService from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark, HiOutlineArrowRight } from "react-icons/hi2";

const FoundationPages = () => {
  const { type } = useParams();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiService
      .get("/api/foundation/programs/")
      .then((res) => {
        // Filter by type (case-insensitive)
        const filtered = res.data.filter(
          (item) => item.type && item.type.toLowerCase() === type?.toLowerCase()
        );
        setPrograms(filtered);
      })
      .catch((err) => {
        setError("Failed to load foundation programs.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pb-20 selection:bg-red-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://deosperavigroup.com/slide-3-2.jpg" 
            className="w-full h-full object-cover opacity-20 dark:opacity-20 grayscale dark:grayscale-0 "
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white dark:via-[#050505] to-white dark:to-[#050505]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-black dark:text-white uppercase tracking-tighter italic leading-none"
          >
            New Dawuro<br />
            <span className="text-[#cc0000] border-b-4 border-[#cc0000]"> Media Always</span>
          </motion.h1>
          <p className="mt-4 text-gray-500 uppercase tracking-[0.4em] font-bold text-xs">{type} Initiatives</p>
        </div>
      </section>

      {/* --- CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {loading ? (
          <div className="text-center py-20 text-[#cc0000] font-bold animate-pulse uppercase tracking-widest">Loading...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-600 font-bold uppercase tracking-widest">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <motion.div
                layoutId={`card-${program.id}`}
                key={program.id}
                className="group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedProgram(program)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                    {program.year}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-2 text-black dark:text-white uppercase tracking-tighter">
                    {program.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-6 uppercase tracking-wider font-medium">
                    {program.headline}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#cc0000] tracking-widest">View Details</span>
                    <HiOutlineArrowRight className="text-black dark:text-white group-hover:translate-x-2 transition-transform"/>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL FOR DETAILS --- */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProgram(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div 
              layoutId={`card-${selectedProgram.id}`}
              className="relative bg-white dark:bg-zinc-900 w-full max-w-6xl max-h-[90vh] overflow-hidden   shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Sticky Image Side */}
              <div className="w-full lg:w-1/2 h-[35vh] lg:h-auto overflow-hidden">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Scrollable Content Side */}
              <div className="w-full lg:w-1/2 p-8 md:p-16 overflow-y-auto bg-white dark:bg-zinc-900">
                <button
                  className="absolute top-6 right-6 z-10 p-2 bg-black text-white   hover:bg-red-600 transition-colors"
                  onClick={() => setSelectedProgram(null)}
                >
                  <HiOutlineXMark size={24} />
                </button>

                {selectedProgram.headline && (
                  <p className="text-[#cc0000] font-bold italic mb-4 text-xl leading-tight">
                    "{selectedProgram.headline}"
                  </p>
                )}

                <h3 className="text-4xl md:text-6xl font-black mb-8 text-black dark:text-white uppercase tracking-tighter leading-[0.9]">
                  {selectedProgram.title}
                </h3>
                
                <div className="grid grid-cols-2 gap-8 mb-10 border-y border-gray-100 dark:border-white/10 py-6">
                  <div>
                    <span className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Impact</span>
                    <span className="text-black dark:text-white font-black text-xl">{selectedProgram.impact}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Budget</span>
                    <span className="text-black dark:text-white font-black text-xl">{selectedProgram.budget}</span>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none mb-10">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                    {selectedProgram.description || selectedProgram.fullStory}
                  </p>
                </div>

                {selectedProgram.report_file && (
                  <button
                    onClick={() => window.open(selectedProgram.report_file, '_blank')}
                    className="inline-flex items-center gap-3 mb-8 bg-blue-600 text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all  "
                  >
                    Download Full Report
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 7.5L12 12m0 0l4.5-4.5M12 12V3" />
                    </svg>
                  </button>
                )}

                {selectedProgram.quote && (
                  <blockquote className="border-l-4 border-[#cc0000] pl-6 py-4 italic text-xl text-black dark:text-white font-medium mb-10 bg-gray-50 dark:bg-white/5">
                    "{selectedProgram.quote}"
                  </blockquote>
                )}

                <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/10">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex justify-between">
                    Location <span className="text-black dark:text-white">{selectedProgram.location}</span>
                  </p>
                  {selectedProgram.legacy && (
                    <p className="text-[10px] font-black text-[#cc0000] uppercase tracking-widest flex justify-between">
                      Legacy <span>{selectedProgram.legacy}</span>
                    </p>
                  )}
                </div>

                <Link 
                  to="/donate"
                  className="inline-flex items-center justify-center gap-4 mt-12 w-full bg-[#cc0000] text-white px-8 py-5 font-black uppercase text-xs tracking-[0.2em] hover:bg-black transition-all"
                >
                  Support This Initiative <HiOutlineArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoundationPages;