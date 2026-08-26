import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineCalendar, 
  HiOutlineMapPin, 
  HiOutlineClock, 
  HiOutlineXMark, 
  HiOutlineArrowLongRight 
} from "react-icons/hi2";

const EventPages = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiService
      .get("/api/foundation/events/")
      .then((res) => {
        const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sorted);
      })
      .catch((err) => {
        setError("Unable to retrieve upcoming events.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] selection:bg-[#cc0000] selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-24 pb-12 px-4 md:px-10 lg:px-20">
        <div className="max-w-screen-2xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-[10px] mb-4"
          >
            • Live Movements
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl lg:text-9xl font-black text-black dark:text-white uppercase tracking-tighter leading-[0.8]"
          >
            Events <span className="text-gray-200 dark:text-zinc-800">& Hubs</span>
          </motion.h1>
        </div>
      </section>

      {/* --- RESPONSIVE GRID --- */}
      <main className="max-w-screen-2xl mx-auto px-4 md:px-10 lg:px-20 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-gray-100 dark:bg-zinc-900 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-black tracking-widest uppercase">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <motion.div
                key={event.id}
                layoutId={`event-${event.id}`}
                onClick={() => setSelectedEvent(event)}
                className="bg-gray-50 dark:bg-zinc-900 overflow-hidden cursor-pointer group hover:ring-2 ring-[#cc0000] transition-all flex flex-col h-full"
              >
                <div className="w-full aspect-[4/3] bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
                  <img 
                    src={event.thumbnail} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-3 py-1">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                    </span>
                    <HiOutlineArrowLongRight className="group-hover:translate-x-2 transition-transform text-[#cc0000]" size={24} />
                  </div>
                  <h3 className="text-xl font-black text-black dark:text-white uppercase tracking-tighter mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* --- FULL DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div 
              layoutId={`event-${selectedEvent.id}`}
              className="relative bg-white dark:bg-zinc-900 w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Sticky Header with Close Button - mobile friendly */}
              <div className="absolute top-0 right-0 left-0 z-50 flex justify-end pointer-events-none">
                <button
                  className="m-4 sm:m-6 p-3 bg-white/10 backdrop-blur-md text-white hover:bg-[#cc0000] transition-colors pointer-events-auto"
                  onClick={() => setSelectedEvent(null)}
                  aria-label="Close details"
                >
                  <HiOutlineXMark size={28} />
                </button>
              </div>

              {/* Image Side - Responsive for mobile/desktop */}
              <div className="w-full h-48 sm:h-80 lg:w-1/2 lg:h-[80vh] sticky top-0 left-0 flex-shrink-0 bg-gray-100 dark:bg-black flex items-center justify-center">
                <img
                  src={selectedEvent.thumbnail}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Full Details Content Side with sticky header */}
              <div className="w-full lg:w-1/2 flex flex-col h-full max-h-[90vh] bg-white dark:bg-zinc-900">
                {/* Sticky Header - mobile responsive */}
                <div className="sticky top-0 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 sm:px-8 md:px-16 pt-6 sm:pt-8 pb-3 sm:pb-4 border-b border-gray-100 dark:border-white/5">
                  <span className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-[10px] block mb-2">
                    Official Event Details
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-black dark:text-white uppercase tracking-tighter leading-none mb-2">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 bg-gray-100 dark:bg-white/5 text-[#cc0000]">
                        <HiOutlineCalendar size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest">Date</p>
                        <p className="text-xs font-black dark:text-white">{new Date(selectedEvent.date).toDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 bg-gray-100 dark:bg-white/5 text-[#cc0000]">
                        <HiOutlineMapPin size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest">Location</p>
                        <p className="text-xs font-black dark:text-white">{selectedEvent.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scrollable Details - mobile friendly, sticky bottom action */}
                <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 md:px-16 pb-32 sm:pb-8">
                  <div className="max-w-prose mt-6 sm:mt-8">
                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Description</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-line mb-10">
                      {selectedEvent.description}
                    </p>
                  </div>
                </div>
                {/* Sticky bottom action area for mobile */}
                <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-zinc-900/95 px-4 sm:px-8 md:px-16 pt-4 pb-4 border-t border-gray-100 dark:border-white/5 flex flex-col gap-4">
                  <button className="w-full bg-[#cc0000] text-white py-4 sm:py-6 font-black uppercase text-xs tracking-[0.2em] hover:bg-black transition-all transform active:scale-95 shadow-lg shadow-red-600/20">
                    Register for Attendance
                  </button>
                  <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Organized by {selectedEvent.author_name || "Foundation Team"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventPages;