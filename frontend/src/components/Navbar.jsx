import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '../../supabaseClient';
import { 
  HiBars3BottomRight as HiMenuAlt3,
  HiXMark as HiX,
  HiChevronDown, 
  HiChevronRight,
  HiSun, 
  HiMoon,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineCpuChip,
  HiOutlineCubeTransparent,
  HiOutlineArrowRight,
  HiOutlineUserCircle as HiOutlineLogout,
  HiOutlineHeart,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineSparkles,
} from 'react-icons/hi2';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubSub, setActiveSubSub] = useState(null); 
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [mobileSubSub, setMobileSubSub] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // AUTH LOGIC
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setIsLoggedIn(true);
      }
    };
    checkUser();

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
    setActiveSubSub(null);
    setMobileAccordion(null);
    setMobileSubSub(null);
    window.scrollTo(0, 0);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      href: '/services',
      subItems: [
        { title: 'Service', desc: 'Digital heartbeat of Dawuro.', icon: <HiOutlineGlobeAlt />, href: '/services' },
        { title: 'News', desc: 'Real-time media updates.', icon: <HiOutlineDocumentText />, href: '/services/news' },
        { title: 'Entertainment', desc: 'Cultural & modern shows.', icon: <HiOutlineCpuChip />, href: '/services/entertainment' },
        { title: 'Interview', desc: 'Profiles of influence.', icon: <HiOutlineShieldCheck />, href: '/services/interview' },
        { 
          title: 'NDM Foundation', 
          desc: 'Philanthropic outreach.', 
          icon: <HiOutlineHeart />, 
          href: '/services/foundation',
          sub_subItems: [
            { title: 'One Child One Package', icon: <HiOutlineSparkles />, href: '/services/foundation/package' },
            { title: 'Blood Charity', icon: <HiOutlineHeart />, href: '/services/foundation/blood' },
            { title: 'Events', icon: <HiOutlineCubeTransparent />, href: '/services/foundation/events' },
            { title: 'Reports', icon: <HiOutlineDocumentText />, href: '/services/foundation/reports' },
            { title: 'Community', icon: <HiOutlineUserGroup />, href: '/services/foundation/community' },
          ]
        },
        { title: 'Documentary', desc: 'Historical visual archives.', icon: <HiOutlineShieldCheck />, href: '/services/documentary' },
        { title: 'Dawuro Zone', desc: "Wealth and heritage.", icon: <HiOutlineGlobeAlt />, href: '/services/foundation/dawuro-zone' },
      ] 
    },
    { 
      name: 'Galleries', 
      href: '/gallery',
      subItems: [
        { title: 'All', desc: 'Complete visual assets.', icon: <HiOutlineCpuChip />, href: '/gallery' },
        { title: 'Education', desc: 'Learning materials.', icon: <HiOutlineCubeTransparent />, href: '/gallery/education' },
        { title: 'Full Catalog', desc: 'Heritage gallery.', icon: <HiOutlineArrowRight />, href: '/gallery' }
      ]
    },
    { name: 'Projects', href: '/our-projects' },
    { name: 'About', href: '/about' },
    { name: 'Donate', href: '/donate' },
  ];

  return (
    <div className="w-full font-sans selection:bg-red-500/30">
      {/* DAWURO ACCENT TOP BAR */}
      <div className="h-[5px] w-full flex fixed top-0 z-[110]">
        <div className="flex-1 bg-[#cc0000]" /><div className="flex-1 bg-[#ffcc00]" /><div className="flex-1 bg-black" /><div className="flex-1 bg-white" /><div className="flex-1 bg-[#cc0000]" />
      </div>

      {/* TOP UTILITY */}
      <div className={`bg-[#0c0c0c] text-white/40 py-2 text-[9px] tracking-[0.3em] uppercase transition-all duration-500 hidden lg:block ${scrolled ? 'opacity-0 -translate-y-full' : 'opacity-100'}`}>
        <div className="max-w-[1440px] mx-auto px-10 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#ffcc00] rounded-full animate-ping" /> Heritage Node: Active</span>
            <span className="text-white/60">South West Dawuro Ethiopia Office</span>
          </div>
          <span className="italic font-bold text-white/80">New Dawuro Media • Global Presence</span>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav 
        onMouseLeave={() => { setActiveMenu(null); setActiveSubSub(null); }}
        className={`w-full z-[100] transition-all duration-500 border-b ${
          scrolled 
          ? 'fixed top-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-gray-200 dark:border-white/5 py-3 shadow-2xl' 
          : 'relative bg-white dark:bg-[#0a0a0a] border-gray-100 dark:border-white/5 py-6'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-10 flex items-center justify-between">
          
          <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3 group">
            <div className="relative">
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG1T9H15Jzn7wldUe9Rf_EgcMa-5XILOSRn8BHYkKKbg&s" alt="Logo" className="w-11 h-11 rounded-xl shadow-lg border border-gray-200 dark:border-white/10" />
               <div className="absolute -inset-1 bg-gradient-to-tr from-red-600 to-yellow-500 blur opacity-0 group-hover:opacity-40 transition-opacity rounded-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-black dark:text-white font-black text-2xl tracking-tighter uppercase leading-none">NDM</span>
              <span className="text-[#cc0000] dark:text-[#ffcc00] font-bold text-[8px] tracking-[0.5em] uppercase">Dawuro Media</span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                className="relative py-2 group/navitem"
                onMouseEnter={() => {
                    setActiveMenu(item.name);
                    // Default to first subitem if it has sub-sub items
                    const firstWithSubs = item.subItems?.find(s => s.sub_subItems);
                    if(firstWithSubs) setActiveSubSub(firstWithSubs.title);
                }}
              >
                <Link 
                  to={item.href} 
                  onClick={handleLinkClick}
                  className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.15em] transition-all ${
                    location.pathname === item.href ? 'text-[#cc0000] dark:text-[#ffcc00]' : 'text-gray-500 dark:text-gray-400 hover:text-[#cc0000] dark:hover:text-[#ffcc00]'
                  }`}
                >
                  {item.name}
                  {item.subItems && <HiChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === item.name ? 'rotate-180' : ''}`} />}
                </Link>
                {location.pathname === item.href && (
                  <motion.div layoutId="nav-pill" className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-red-600 via-yellow-500 to-transparent" />
                )}
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-yellow-500 border border-transparent hover:border-yellow-600/20 transition-all">
              {isDarkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
            </button>

            <div className="hidden md:flex items-center border-l border-gray-200 dark:border-white/10 pl-4 ml-2 gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-1.5 pr-4 rounded-full border border-gray-100 dark:border-white/5">
                  <div className="w-8 h-8 bg-[#ffcc00] rounded-full flex items-center justify-center font-black text-black text-xs shadow-inner">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <button onClick={handleLogout} className="text-[#cc0000] hover:scale-110 transition-transform"><HiOutlineLogout size={20} /></button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center gap-3 bg-black dark:bg-[#ffcc00] dark:text-black text-white text-[10px] font-black px-6 py-2.5 uppercase tracking-widest transition-all hover:bg-[#cc0000] hover:text-white group rounded-sm shadow-xl shadow-black/10">
                  Access Hub <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-900 dark:text-white transition-transform active:scale-90">
              <HiMenuAlt3 size={32} />
            </button>
          </div>
        </div>

        {/* --- PROFESSIONAL MEGA MENU (Desktop) --- */}
        <AnimatePresence>
          {activeMenu && menuItems.find(m => m.name === activeMenu)?.subItems && (
            <>
              {/* Overlay Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 top-[110px] bg-black/20 backdrop-blur-sm z-[-1] hidden lg:block" 
              />
              
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 w-full bg-white dark:bg-[#0c0c0c] border-b border-gray-200 dark:border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] z-50 hidden lg:block"
              >
                <div className="max-w-[1440px] mx-auto flex">
                  {/* Left Hero Sidebar */}
                  <div className="w-1/4 p-8 bg-gray-50/50 dark:bg-white/[0.02] border-r border-gray-100 dark:border-white/5">
                    <span className="text-[#cc0000] dark:text-[#ffcc00] font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Department</span>
                    <h3 className="text-black dark:text-white font-black text-5xl uppercase tracking-tighter mb-6">{activeMenu}</h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-[#cc0000] to-transparent mb-6" />
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed uppercase tracking-wider italic">
                      "Empowering the Dawuro community through digital innovation and heritage preservation."
                    </p>
                  </div>
                  
                  {/* Middle Sub-Items Grid */}
                  <div className="flex-1 px-6 grid grid-cols-2 gap-x-6 gap-y-2">
                    {menuItems.find(m => m.name === activeMenu).subItems.map((sub) => (
                      <div 
                        key={sub.title} 
                        onMouseEnter={() => sub.sub_subItems && setActiveSubSub(sub.title)}
                        className={`group/sub px-4 rounded-2xl transition-all duration-300 border ${
                            activeSubSub === sub.title 
                            ? 'bg-white dark:bg-white/5 border-[#cc0000]/20 shadow-xl scale-[1.02]' 
                            : 'border-transparent hover:bg-gray-50 dark:hover:bg-white/[0.03]'
                        }`}
                      >
                        <Link to={sub.href} onClick={handleLinkClick} className="flex items-start gap-4">
                          <div className={`p-1 rounded-xl transition-colors ${activeSubSub === sub.title ? 'bg-[#cc0000] text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-400 group-hover/sub:text-[#cc0000]'}`}>
                            {React.cloneElement(sub.icon, { size: 16 })}
                          </div>
                          <div className="flex-1">
                             <div className="flex justify-between items-center mb-1">
                                <h4 className={`font-black text-xs uppercase tracking-widest ${activeSubSub === sub.title ? 'text-[#cc0000] dark:text-[#ffcc00]' : 'text-gray-900 dark:text-white'}`}>
                                    {sub.title}
                                </h4>
                                {sub.sub_subItems && <HiChevronRight size={14} className={`transition-transform ${activeSubSub === sub.title ? 'translate-x-1 text-[#cc0000]' : 'text-gray-300'}`} />}
                             </div>
                             <p className="text-[8px] text-gray-400 dark:text-gray-500 leading-snug">{sub.desc}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Right Preview Panel (Conditional) */}
                  <div className="w-1/3 bg-gray-50/80 dark:bg-black/40 p-2 border-l border-gray-100 dark:border-white/5">
                    <AnimatePresence mode='wait'>
                      {activeSubSub ? (
                        <motion.div 
                          key={activeSubSub}
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                          className="h-full flex flex-col"
                        >
                          <div className="flex items-center gap-1">
                             <div className="w-6 h-6 rounded-full bg-[#cc0000]/10 flex items-center justify-center text-[#cc0000]">
                                {menuItems.find(m => m.name === activeMenu).subItems.find(s => s.title === activeSubSub)?.icon}
                             </div>
                             <h5 className="text-[8px] font-black text-black dark:text-white uppercase tracking-[0.1em]">{activeSubSub}</h5>
                          </div>

                          <div className="space-y-2 flex-1">
                            {menuItems.find(m => m.name === activeMenu).subItems.find(s => s.title === activeSubSub)?.sub_subItems?.map((ss) => (
                              <Link 
                                key={ss.title} 
                                to={ss.href} 
                                onClick={handleLinkClick} 
                                className="flex items-center justify-between p-4 rounded-sm bg-white dark:bg-white/5 border border-transparent hover:border-[#cc0000]/20 hover:shadow-lg transition-all group/ss"
                              >
                                <div className="flex items-center gap-3">
                                    <span className="text-[#cc0000] group-hover/ss:scale-110 transition-transform">{ss.icon}</span>
                                    <span className="text-[8px] font-black dark:text-white uppercase tracking-tighter group-hover/ss:text-[#cc0000] transition-colors">{ss.title}</span>
                                </div>
                                <HiOutlineArrowRight size={12} className="opacity-0 group-hover/ss:opacity-100 -translate-x-2 group-hover/ss:translate-x-0 transition-all text-[#cc0000]" />
                              </Link>
                            ))}
                          </div>

                          <div className="mt-4 p-4 rounded-2xl bg-[#ffcc00]/10 border border-[#ffcc00]/20">
                             <p className="text-[9px] font-bold text-[#ffcc00] uppercase tracking-widest text-center">Featured Internal Portal</p>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                             <HiOutlineSparkles size={60} className="mb-4 text-gray-400" />
                             <p className="text-[10px] font-black uppercase tracking-[0.3em]">Explore Our Sub-Departments</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[200]" />
            <motion.aside 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[90%] bg-white dark:bg-[#050505] z-[210] p-7 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l-8 border-[#cc0000]"
            >
              <div className="flex justify-between items-center mb-10">
                 <div className="flex flex-col">
                  <span className="text-black dark:text-white font-black text-3xl uppercase tracking-tighter leading-none">NDM</span>
                  <span className="text-[#cc0000] font-bold text-[8px] tracking-[0.3em] uppercase">የዳውሮ ቅርስ አውታረ መረብ</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-4 bg-gray-100 dark:bg-white/5 rounded-full dark:text-white active:bg-red-600 transition-colors"><HiX size={24} /></button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 dark:border-white/5 pb-2">
                    <div className="flex justify-between items-center py-2" onClick={() => item.subItems && setMobileAccordion(mobileAccordion === item.name ? null : item.name)}>
                      <span className={`text-sm font-black uppercase tracking-tighter ${location.pathname === item.href ? 'text-[#cc0000]' : 'text-gray-900 dark:text-white'}`}>
                        {item.subItems ? item.name : <Link to={item.href} onClick={handleLinkClick}>{item.name}</Link>}
                      </span>
                      {item.subItems && <HiChevronDown className={`transition-transform duration-300 dark:text-white ${mobileAccordion === item.name ? 'rotate-180 text-[#cc0000]' : ''}`} />}
                    </div>
                    
                    <AnimatePresence>
                      {item.subItems && mobileAccordion === item.name && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-2 mt-2 ml-2">
                          {item.subItems.map((sub) => (
                            <div key={sub.title} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4">
                              <div className="flex justify-between items-center" onClick={() => sub.sub_subItems && setMobileSubSub(mobileSubSub === sub.title ? null : sub.title)}>
                                <Link to={sub.href} onClick={handleLinkClick} className="flex items-center gap-3">
                                  <span className="p-2 bg-white dark:bg-black rounded-lg text-[#cc0000] shadow-sm">{sub.icon}</span>
                                  <span className="text-[11px] font-black dark:text-white uppercase tracking-widest">{sub.title}</span>
                                </Link>
                                {sub.sub_subItems && <HiChevronRight className={`transition-transform ${mobileSubSub === sub.title ? 'rotate-90 text-[#cc0000]' : 'text-gray-400'}`} />}
                              </div>
                              
                              {sub.sub_subItems && mobileSubSub === sub.title && (
                                <div className="mt-4 ml-8 space-y-4 border-l-2 border-[#ffcc00] pl-4">
                                  {sub.sub_subItems.map(ss => (
                                    <Link key={ss.title} to={ss.href} onClick={handleLinkClick} className="flex items-center gap-2 text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.1em] hover:text-[#cc0000]">
                                      <span className="w-1.5 h-1.5 bg-[#cc0000] rounded-full" /> {ss.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100 dark:border-white/5 space-y-4">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/10 flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#ffcc00] rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-lg">
                        <HiOutlineLogout size={32} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-[#cc0000] uppercase tracking-widest leading-none mb-1">Welcome</span>
                        <span className="text-sm font-black dark:text-white uppercase truncate max-w-[120px]">
                          {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                        </span>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="w-full py-3 bg-red-50 dark:bg-red-500/10 text-[#cc0000] font-black uppercase text-xs tracking-widest rounded-2xl border border-red-100 dark:border-red-500/20 transition-all flex items-center justify-center gap-2">Sign Out</button>
                  </div>
                ) : (
                  <Link to="/login" onClick={handleLinkClick} className="flex items-center justify-between py-2 px-4 bg-black dark:bg-[#ffcc00] rounded-[1rem] text-white dark:text-black shadow-xl active:scale-95 transition-all">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase tracking-[0.1em] opacity-70 mb-1">Member Login</span>
                      <span className="text-sm font-black uppercase tracking-tighter">Access Hub</span>
                    </div>
                    <div className="w-8 h-8 bg-white/20 dark:bg-black/10 rounded-full flex items-center justify-center">
                      <HiOutlineArrowRight size={18} />
                    </div>
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