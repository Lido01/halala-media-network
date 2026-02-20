import React from 'react';
import { 
  FaInstagram, FaTwitter, FaFacebookF, FaYoutube, 
  FaCcVisa, FaCcMastercard, FaCcApplePay, FaCcPaypal 
} from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi2';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#080808] pt-20 border-t border-gray-100 dark:border-white/5 relative overflow-hidden">
      
      {/* 1. DAWURO CULTURAL STRIPE ACCENT */}
      <div className="absolute top-0 left-0 w-full h-[6px] flex">
        <div className="flex-1 bg-[#cc0000]" />
        <div className="flex-1 bg-[#ffcc00]" />
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-white dark:bg-zinc-800" />
        <div className="flex-1 bg-[#cc0000]" />
        <div className="flex-1 bg-[#ffcc00]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        
        {/* TOP SECTION: NEWSLETTER & BRAND */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-gray-100 dark:border-white/5">
          <div className="space-y-6">
            <div className="flex flex-col">
              <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                DAWURO MEDIA
              </h3>
              <span className="text-[#cc0000] dark:text-[#ffcc00] font-bold text-[10px] tracking-[0.4em] uppercase">
                Network • DMN
              </span>
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-xs tracking-widest uppercase max-w-sm leading-relaxed">
              Stay connected with the pulse of South West Ethiopia. Receive heritage updates and regional news.
            </p>
            
            <div className="relative max-w-md group">
              <input 
                type="email" 
                placeholder="JOIN THE COMMUNITY (EMAIL)" 
                className="w-full bg-transparent border-b border-gray-300 dark:border-white/10 py-3 text-[10px] font-bold tracking-widest focus:border-[#cc0000] outline-none transition-all dark:text-white"
              />
              <button className="absolute right-0 bottom-3 text-black dark:text-[#ffcc00] hover:text-[#cc0000] transition-colors">
                <HiOutlineArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:items-end justify-center space-y-6">
            <div className="flex gap-4">
              <SocialLink Icon={FaInstagram} />
              <SocialLink Icon={FaTwitter} />
              <SocialLink Icon={FaFacebookF} />
              <SocialLink Icon={FaYoutube} />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-black dark:text-white font-black uppercase tracking-[0.3em]">Tercha, Dawuro Zone</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">South West Regional State, Ethiopia</p>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: NAVIGATION GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16">
          <FooterColumn 
            title="Heritage" 
            links={["Traditional Wear", "Historical Sites", "Oral History", "Galleries"]} 
          />
          <FooterColumn 
            title="Media" 
            links={["News Feed", "Documentaries", "Music Videos", "Radio Stream"]} 
          />
          <FooterColumn 
            title="Network" 
            links={["About DMN", "Our Team", "Partnerships", "Careers"]} 
          />
          <div className="space-y-4">
            <h4 className="text-[#cc0000] dark:text-[#ffcc00] font-black text-[11px] uppercase tracking-[0.3em]">Contact Center</h4>
            <div className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-loose">
              <p className="hover:text-black dark:hover:text-white transition-colors cursor-pointer">Main Office, Block 04</p>
              <p className="hover:text-black dark:hover:text-white transition-colors cursor-pointer">Tercha, Ethiopia</p>
              <p className="mt-2 text-black dark:text-white border-b border-[#ffcc00] inline-block">info@dawuromedia.com</p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: BASEMENT */}
        <div className="py-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Decorative Cultural Icons / Payment */}
          <div className="flex gap-5 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
            <FaCcVisa size={24} className="dark:text-white hover:text-blue-600" />
            <FaCcMastercard size={24} className="dark:text-white hover:text-orange-500" />
            <FaCcApplePay size={24} className="dark:text-white hover:text-gray-400" />
            <FaCcPaypal size={24} className="dark:text-white hover:text-blue-400" />
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.4em]">
              © {currentYear} DAWURO MEDIA NETWORK. PRESERVING STRENGTH & UNITY.
            </p>
          </div>

          {/* Legal */}
          <div className="flex gap-6">
            <a href="#" className="text-[9px] text-gray-500 font-black uppercase tracking-widest hover:text-[#cc0000] transition-colors">Privacy Operation</a>
            <a href="#" className="text-[9px] text-gray-500 font-black uppercase tracking-widest hover:text-[#cc0000] transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
      
      {/* BACKGROUND DECOR (Subtle dark mode glow) */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#cc0000]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#ffcc00]/5 rounded-full blur-[100px] pointer-events-none" />
    </footer>
  );
};

/* --- CLEAN HELPER COMPONENTS --- */

const FooterColumn = ({ title, links }) => (
  <div className="space-y-6">
    <h4 className="text-black dark:text-white font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-[#cc0000] rounded-full" />
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-[#cc0000] dark:hover:text-[#ffcc00] text-[10px] font-bold uppercase tracking-widest transition-all hover:pl-2">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLink = ({ Icon }) => (
  <a
    href="#"
    className="h-11 w-11 flex items-center justify-center border border-gray-100 dark:border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-[#cc0000] hover:border-[#cc0000] shadow-sm hover:shadow-lg hover:shadow-[#cc0000]/20 transition-all duration-300"
  >
    <Icon size={18} />
  </a>
);

export default Footer;