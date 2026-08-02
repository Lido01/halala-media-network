import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineRocketLaunch, 
  HiOutlineArrowLeft,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineCpuChip
} from 'react-icons/hi2';

const DefaultPage = ({ pageTitle = "Service" }) => {
  // These are the "other added pages" to redirect users to
  const alternativeLinks = [
    { name: 'Latest News', href: '/services/contents/news', icon: <HiOutlineGlobeAlt /> },
    { name: 'Foundation', href: '/services/foundation/child', icon: <HiOutlineHeart /> },
    { name: 'Entertainment', href: '/services/media/images', icon: <HiOutlineCpuChip /> },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-red-600/5 to-yellow-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {/* Main Content */}
          <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white uppercase tracking-tighter mb-6 italic">
            {pageTitle} <span className="text-transparent stroke-text">Hub</span>
            <br />
            ይቅርታ ይህ ገጽ አላለቀም እባኮ ለላ ገጽ ይጠቀሙ 
          </h1>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base uppercase tracking-widest leading-loose max-w-2xl mx-auto mb-12">
            We are currently digitizing this sector of the New Dawuro Media. 
            The full experience is scheduled for deployment shortly.
          </p>

          {/* Icon/Graphic Section */}
          <div className="relative w-24 h-24 mx-auto mb-16">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-yellow-500/30  "
            />
            <div className="absolute inset-0 flex items-center justify-center text-[#cc0000]">
              <HiOutlineRocketLaunch size={40} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center border-t border-gray-100 dark:border-white/5 pt-12">
            <div className="text-left">
              <h3 className="text-black dark:text-white font-black uppercase tracking-widest text-xs mb-4">
                Active Nodes
              </h3>
              <div className="space-y-3">
                {alternativeLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.href}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group"
                  >
                    <span className="text-[#cc0000] group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300">
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
               <Link to="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#cc0000] transition-colors">
                 <HiOutlineArrowLeft /> Return Home
               </Link>
               <button className="px-10 py-4 bg-black dark:bg-[#ffcc00] text-white dark:text-black font-black uppercase text-[10px] tracking-[0.2em]   shadow-2xl">
                 Notify Me On Launch
               </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px #cc0000;
        }
        @media (prefers-color-scheme: dark) {
          .stroke-text {
            -webkit-text-stroke: 1px #ffcc00;
          }
        }
      `}</style>
    </div>
  );
};

export default DefaultPage;