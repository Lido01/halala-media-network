import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineLockClosed, 
  HiOutlineCheckBadge, 
  HiOutlineEye, 
  HiOutlineEyeSlash 
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle for field 1
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for field 2
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // SUPABASE UPDATE LOGIC
      const { error } = await supabase.auth.updateUser({ password: password });
      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000); 
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop" 
          alt="Dawuro Highlands" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-[500px] px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20   p-8 md:p-12 shadow-2xl"
        >
          {success ? (
            <div className="text-center py-10">
              <div className="flex justify-center mb-6">
                <HiOutlineCheckBadge className="text-[#ffcc00] animate-bounce" size={60} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Password Updated</h2>
              <p className="text-white/60 text-xs uppercase tracking-widest leading-loose">
                Your credentials have been secured. Redirecting to login...
              </p>
            </div>
          ) : (
            <>
              <header className="text-center mb-10">
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                  New Password
                </h1>
                <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.3em]">Secure your DMN access</p>
              </header>

              <form onSubmit={handleUpdate} className="space-y-4">
                {/* FIELD 1: NEW PASSWORD */}
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input 
                    required 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 pr-12 rounded-xl text-white outline-none focus:border-[#ffcc00] focus:bg-white/10 transition-all text-sm placeholder:text-white/20" 
                    placeholder="NEW PASSWORD" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#ffcc00] transition-colors"
                  >
                    {showPassword ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
                  </button>
                </div>

                {/* FIELD 2: CONFIRM PASSWORD */}
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input 
                    required 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 pr-12 rounded-xl text-white outline-none focus:border-[#ffcc00] focus:bg-white/10 transition-all text-sm placeholder:text-white/20" 
                    placeholder="CONFIRM PASSWORD" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#ffcc00] transition-colors"
                  >
                    {showConfirmPassword ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
                  </button>
                </div>

                <button 
                  disabled={loading} 
                  className="w-full bg-[#ffcc00] hover:bg-white text-black py-5 rounded-xl font-black uppercase text-[10px] tracking-[0.3em] transition-all shadow-xl active:scale-[0.98] mt-4 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update & Sign In'}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UpdatePassword;