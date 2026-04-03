import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '../../supabaseClient';
import { 
  HiBars3BottomRight as HiMenuAlt3,
  HiXMark as HiX,
  HiChevronDown, 
  HiSun, 
  HiMoon,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineCpuChip,
  HiOutlineCubeTransparent,
  HiOutlineArrowRight,
  HiOutlineUserCircle as HiOutlineLogout
} from 'react-icons/hi2';

const Navbar = () => {
  // --- UPDATED AUTH LOGIC ---
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 1. Check current session on mount
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setIsLoggedIn(true);
      }
    };
    checkUser();

    // 2. Listen for Auth Changes (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
    handleLinkClick();
  };
  // ---------------------------

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // THEME LOGIC
  useEffect(() => {
    const savedTheme = localStorage.getItem('dmn-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('dmn-theme', newMode ? 'dark' : 'light');
  };

  // SCROLL LOGIC
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = useCallback(() => {
    setIsSidebarOpen(false);
    setActiveMenu(null);
    setMobileAccordion(null);
    window.scrollTo(0, 0);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      href: '/services',
      subItems: [
        { title: 'DMN-Offer', desc: 'Cultural protocol and media suites.', icon: <HiOutlineShieldCheck />, href: '/services' },
        { title: 'Donate', desc: "Let's make it happen.", icon: <HiOutlineGlobeAlt />, href: '/services/donate' },
        { title: 'Partners', desc: 'Exclusive cultural allocations.', icon: <HiOutlineCpuChip />, href: '/services/partners' }
      ] 
    },
    { 
      name: 'Galleries', 
      href: '/gallery',
      subItems: [
        { title: 'All', desc: 'Authentic Dawuro handwoven wear.', icon: <HiOutlineCpuChip />, href: 'gallery' },
        { title: 'Modern-Mix', desc: 'Contemporary heritage designs.', icon: <HiOutlineCubeTransparent />, href: '/items/modern' },
        { title: 'Catalog', desc: 'Unified sector solutions.', icon: <HiOutlineArrowRight />, href: 'gallery' }
      ] 
    },
    { name: 'About', href: '/about' },
    { name: 'Our Projects', href: '/our-projects' },
    // { name: 'Donate', href: '/donate' }
  ];

  return (
    <div className="w-full font-sans selection:bg-yellow-500/30">
      {/* 1. DAWURO STRIPED ACCENT TOP BAR */}
      <div className="h-[5px] w-full flex">
        <div className="flex-1 bg-[#cc0000]" title="Red: Strength" />
        <div className="flex-1 bg-[#ffcc00]" title="Yellow: Unity" />
        <div className="flex-1 bg-black" title="Black: Heritage" />
        <div className="flex-1 bg-white border-b border-gray-100" title="White: Purity" />
        <div className="flex-1 bg-[#cc0000]" />
        <div className="flex-1 bg-[#ffcc00]" />
      </div>

      {/* TOP UTILITY */}
      <div className={`bg-[#0c0c0c] text-white/40 py-1.5 text-[9px] tracking-[0.3em] uppercase transition-all duration-500 hidden md:block ${scrolled ? 'opacity-0 -translate-y-full' : 'opacity-100'}`}>
        <div className="max-w-[1440px] mx-auto px-10 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-2"><span className="w-1 h-1 bg-[#ffcc00] rounded-full animate-pulse" /> Heritage Node: Active</span>
            <span className="text-white/60">Dawuro, South West Ethiopia</span>
          </div>
          <span className="italic font-bold text-white/80 tracking-widest">Dawuro Media Network • DMN</span>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav 
        onMouseLeave={() => setActiveMenu(null)}
        className={`w-full z-[100] transition-all duration-500 border-b ${
          scrolled 
          ? 'fixed top-0 bg-white/90 dark:bg-black/95 backdrop-blur-xl border-yellow-600/10 py-3 shadow-xl' 
          : 'relative bg-white dark:bg-[#0a0a0a] border-gray-100 dark:border-white/5 py-6'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-10 flex items-center justify-between">
          
          <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3 group">
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG1T9H15Jzn7wldUe9Rf_EgcMa-5XILOSRn8BHYkKKbg&s" alt="Logo" className="w-10 h-10 rounded-lg shadow-lg group-hover:shadow-yellow-600/20 transition-all border border-gray-200 dark:border-white/10" />
               <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-yellow-500 blur opacity-0 group-hover:opacity-40 transition-opacity rounded-lg" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-black dark:text-white font-black text-2xl tracking-tighter uppercase leading-none">DMN</span>
              <span className="text-[#cc0000] dark:text-[#ffcc00] font-bold text-[8px] tracking-[0.5em] uppercase">Dawuro Network</span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                className="relative py-2"
                onMouseEnter={() => setActiveMenu(item.name)}
              >
                <Link 
                  to={item.href} 
                  onClick={handleLinkClick}
                  className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.15em] transition-all ${
                    location.pathname === item.href ? 'text-[#cc0000] dark:text-[#ffcc00]' : 'text-gray-500 dark:text-gray-400 hover:text-[#cc0000] dark:hover:text-[#ffcc00]'
                  }`}
                >
                  {item.name}
                  {item.subItems && <HiChevronDown size={14} className={`transition-transform ${activeMenu === item.name ? 'rotate-180' : ''}`} />}
                </Link>
                {location.pathname === item.href && (
                  <motion.div layoutId="nav-pill" className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-gradient-to-r from-red-600 via-yellow-500 to-black" />
                )}
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-yellow-500 border border-transparent hover:border-yellow-600/20 transition-all">
              {isDarkMode ? <HiSun size={18} /> : <HiMoon size={18} />}
            </button>

            {/* CONDITIONAL LOGIN/LOGOUT UI */}
            <div className="hidden md:flex items-center border-l border-gray-200 dark:border-white/10 pl-4 ml-2 gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase tracking-tighter text-gray-400 font-bold leading-none">Verified User</span>
                    <span className="text-xs font-black dark:text-[#ffcc00] text-black uppercase">
                        {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2.5 rounded-full bg-red-50 dark:bg-red-500/10 text-[#cc0000] hover:bg-[#cc0000] hover:text-white transition-all flex items-center justify-center group"
                    title="Logout"
                  >
                    <HiOutlineLogout size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center gap-3 bg-black dark:bg-[#ffcc00] dark:text-black text-white text-[10px] font-black px-6 py-2.5 uppercase tracking-widest transition-all hover:bg-[#cc0000] hover:text-white group"
                >
                  Access Hub
                  <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-900 dark:text-white hover:text-red-600 transition-colors">
              <HiMenuAlt3 size={28} />
            </button>
          </div>
        </div>

        {/* MEGA MENU (kept as is) */}
        <AnimatePresence>
          {activeMenu && menuItems.find(m => m.name === activeMenu)?.subItems && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute left-0 w-full bg-white dark:bg-[#0c0c0c] border-b-4 border-[#ffcc00] shadow-2xl z-50 overflow-hidden"
            >
              <div className="max-w-[1440px] mx-auto px-10 py-12 grid grid-cols-4 gap-12">
                <div className="col-span-1 border-r border-gray-100 dark:border-white/5">
                  <h3 className="text-[#cc0000] dark:text-[#ffcc00] font-black text-3xl uppercase italic tracking-tighter mb-4">{activeMenu}</h3>
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest leading-loose max-w-[200px]">
                    Exploring the intersection of Dawuro heritage and global digital storytelling. 
                  </p>
                </div>
                
                <div className="col-span-3 grid grid-cols-3 gap-6">
                  {menuItems.find(m => m.name === activeMenu).subItems.map((sub, i) => (
                    <motion.div key={sub.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <Link to={sub.href} onClick={handleLinkClick} className="group/item flex flex-col gap-4 p-5 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-[#ffcc00] rounded-xl group-hover/item:bg-[#cc0000] group-hover/item:text-white transition-all duration-300">
                          {sub.icon}
                        </div>
                        <div>
                          <h4 className="text-gray-900 dark:text-white font-black text-xs uppercase tracking-widest flex items-center justify-between group-hover/item:text-[#cc0000] transition-colors">
                            {sub.title}
                            <HiOutlineArrowRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-all text-[#cc0000]" />
                          </h4>
                          <p className="text-gray-400 text-[10px] mt-2 leading-relaxed">{sub.desc}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]" />
            <motion.aside 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-[85%] bg-white dark:bg-[#050505] z-[210] p-10 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l-4 border-[#ffcc00]"
            >
              <div className="flex justify-between items-center mb-10">
                 <div className="flex flex-col">
                  <span className="text-black dark:text-white font-black text-2xl uppercase tracking-tighter leading-none">DMN</span>
                  <span className="text-[#cc0000] font-bold text-[8px] tracking-[0.5em] uppercase">Dawuro Heritage</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-gray-100 dark:bg-white/5 rounded-full dark:text-white hover:bg-red-600 hover:text-white transition-all"><HiX size={24} /></button>
              </div>

              {/* MOBILE USER PROFILE */}
              {isLoggedIn && (
                <div className="mb-10 p-5 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#ffcc00] text-black flex items-center justify-center rounded-full font-black text-xl">
                    {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Logged In</span>
                    <span className="text-black dark:text-white font-black uppercase text-sm">
                        {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex-1 space-y-6 overflow-y-auto">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <div className="flex justify-between items-center py-2" onClick={() => item.subItems && setMobileAccordion(mobileAccordion === item.name ? null : item.name)}>
                      <span className={`text-xl font-black uppercase tracking-tighter ${location.pathname === item.href ? 'text-[#cc0000]' : 'text-gray-900 dark:text-white'}`}>
                        {item.subItems ? item.name : <Link to={item.href} onClick={handleLinkClick}>{item.name}</Link>}
                      </span>
                      {item.subItems && <HiChevronDown className={`transition-transform duration-300 dark:text-white ${mobileAccordion === item.name ? 'rotate-180 text-red-600' : ''}`} />}
                    </div>
                    {item.subItems && mobileAccordion === item.name && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden bg-gray-50 dark:bg-white/5 rounded-xl mt-2 p-4 grid gap-4">
                        {item.subItems.map((sub) => (
                          <Link key={sub.title} to={sub.href} onClick={handleLinkClick} className="flex items-center gap-3">
                            <span className="p-2 bg-white dark:bg-black rounded-lg text-[#cc0000]">{sub.icon}</span>
                            <span className="text-xs font-bold dark:text-white uppercase tracking-widest">{sub.title}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-8">
                 {isLoggedIn ? (
                   <button 
                    onClick={handleLogout} 
                    className="flex w-full items-center justify-center gap-3 py-5 bg-gray-900 dark:bg-white dark:text-black text-white font-black uppercase text-xs tracking-[.2em]"
                   >
                     Logout <HiOutlineLogout size={16} />
                   </button>
                 ) : (
                   <Link 
                    to="/login" 
                    onClick={handleLinkClick} 
                    className="block w-full py-5 bg-[#cc0000] text-white font-black text-center uppercase text-xs tracking-[.2em] shadow-xl"
                   >
                     Secure Access Hub
                   </Link>
                 )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;