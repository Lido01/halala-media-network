import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineUserGroup as HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineUser, 
  HiOutlineArrowLeft 
} from 'react-icons/hi2';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      
      {/* 1. STATIC BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop" 
          alt="Dawuro Highlands" 
          className="w-full h-full object-cover"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/40" /> {/* Dark tint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[2px]" /> {/* Subtle blur for focus */}
      </div>

      {/* 2. AUTH CARD */}
      <div className="relative z-10 w-full max-w-[600px] px-6">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)]">
          
          {/* Header */}
          <header className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-red-500 transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <HiOutlineArrowLeft size={14}/> Back to NDM
            </Link>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
              {isLogin ? 'Member Login' : 'Create Account'}
            </h1>
            <p className="text-white/60 mt-3 text-[10px] uppercase tracking-widest font-bold">
              Access the Dawuro Media Network
            </p>
          </header>

          {/* Social OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 bg-white hover:bg-gray-100 transition-all py-3 px-4 rounded-xl shadow-lg active:scale-95">
              <FcGoogle size={20} />
              <span className="text-black text-[10px] font-black uppercase tracking-wider">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] transition-all py-3 px-4 rounded-xl shadow-lg active:scale-95">
              <FaFacebook size={20} color="white" />
              <span className="text-white text-[10px] font-black uppercase tracking-wider">Facebook</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-full border-t border-white/10"></div>
            <span className="absolute bg-transparent px-4 text-[9px] font-black text-white/40 uppercase tracking-widest">Or with Email</span>
          </div>

          {/* Traditional Form */}
          <form className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <div className="relative">
                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-white outline-none focus:border-red-600 focus:bg-white/10 transition-all text-sm placeholder:text-white/20" 
                      placeholder="FULL NAME"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-white outline-none focus:border-red-600 focus:bg-white/10 transition-all text-sm placeholder:text-white/20" 
                  placeholder="EMAIL ADDRESS"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="password" 
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-white outline-none focus:border-red-600 focus:bg-white/10 transition-all text-sm placeholder:text-white/20" 
                  placeholder="PASSWORD"
                />
              </div>
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-xl font-black uppercase text-[10px] tracking-[0.3em] transition-all shadow-xl active:scale-[0.98] mt-4">
              {isLogin ? 'Sign In Now' : 'Join NDM'}
            </button>
          </form>

          {/* Toggle Member Status */}
          <div className="mt-10 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black text-white/50 hover:text-white transition-all uppercase tracking-widest border-b border-white/10 pb-1"
            >
              {isLogin ? "New to the network? Create Account" : "Already have access? Member Login"}
            </button>
          </div>
        </div>

        {/* Branding Footer */}
        <p className="mt-8 text-center text-[10px] text-white/30 font-bold uppercase tracking-[0.4em]">
          Powered by New Dawuro Media
        </p>
      </div>
    </div>
  );
};

export default Auth;