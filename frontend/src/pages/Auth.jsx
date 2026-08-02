import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineEnvelope as HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineUser, 
  HiOutlineArrowLeft,
  HiOutlineEye,
  HiOutlineEyeSlash
} from 'react-icons/hi2';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../api/api';
import { useAuth } from '../context/useAuth';

const Auth = () => {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', or 'forgot'
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // PASSWORD TOGGLE STATE
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(null); // For success/error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setMessageType('');
    try {
      if (authMode === 'login') {
        // Login with backend
        const res = await apiService.post('/api/accounts/login/', {
          username: username,
          password
        });
        if (res.status === 200 && res.data && res.data.access && res.data.refresh) {
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
            // Fetch user profile to get role
          try {
            const profileRes = await apiService.get('/api/accounts/profile/');
            if (profileRes.status === 200 && profileRes.data) {
              const user = profileRes.data;
              if (user.username) {
                localStorage.setItem('username', user.username);
              }
                // Store user role for ProtectedRoute
                if (user.role) {
                  localStorage.setItem('user_role', user.role);
                } else {
                  localStorage.setItem('user_role', 'user');
                }
              await refreshUser();
              setMessage('Login successful! Redirecting...');
              setMessageType('success');
              // Redirect based on role
              setTimeout(() => {
                  if (user.role === 'superadmin' || user.role === 'admin' || user.role === 'editor') {
                  navigate('/admin/dashboard');
                } else {
                  navigate('/admin/content/');
                }
              }, 1200);
            } else {
              setMessage('Login succeeded, but failed to fetch profile.');
              setMessageType('error');
            }
          } catch (profileErr) {
            setMessage('Login succeeded, but failed to fetch profile.');
            setMessageType('error');
          }
        } else {
          setMessage('Login failed. Please try again.');
          setMessageType('error');
        }
      } else if (authMode === 'signup') {
        // Register with backend
        const res = await apiService.post('/api/accounts/register/', {
          username,
          password,
          email,
          phone
        });
        if (res.status === 201) {
          setMessage('Registration successful! You can now log in.');
          setMessageType('success');
          setAuthMode('login');
        } else {
          setMessage('Registration failed. Please check your details.');
          setMessageType('error');
        }
      } else if (authMode === 'forgot') {
        setMessage('Password reset is not implemented.');
        setMessageType('error');
      }
    } catch (error) {
      // Improved error handling for backend responses
      if (error.response && error.response.data) {
        let errData = error.response.data;
        if (typeof errData === 'string') {
          setMessage(errData);
        } else if (typeof errData === 'object') {
          // Show all error fields if present
          const messages = Object.values(errData).flat().join(' ');
          setMessage(messages || JSON.stringify(errData));
        } else {
          setMessage(JSON.stringify(errData));
        }
      } else {
        setMessage(error.message || 'An error occurred.');
      }
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Social login not implemented for backend API
  const handleSocialLogin = async () => {
    setMessage('Social login is not available.');
    setMessageType('error');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop" 
          alt="Dawuro Highlands" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-[600px] px-6">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)]">
          
          <header className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-red-500 transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <HiOutlineArrowLeft size={14}/> Back to NDM
            </Link>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
              {authMode === 'login' && 'Member Login'}
              {authMode === 'signup' && 'Create Account'}
              {authMode === 'forgot' && 'Reset Access'}
            </h1>
          </header>

          {/* Social OAuth Buttons */}
          {authMode !== 'forgot' && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button onClick={() => handleSocialLogin('google')} className="flex items-center justify-center gap-3 bg-white hover:bg-gray-100 transition-all py-3 px-4 shadow-lg active:scale-95">
                  <FcGoogle size={20} />
                  <span className="text-black text-[10px] font-black uppercase tracking-wider">Google</span>
                </button>
                <button onClick={() => handleSocialLogin('facebook')} className="flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] transition-all py-3 px-4 shadow-lg active:scale-95">
                  <FaFacebook size={20} color="white" />
                  <span className="text-white text-[10px] font-black uppercase tracking-wider">Facebook</span>
                </button>
              </div>
              <div className="relative flex items-center justify-center mb-8">
                <div className="w-full border-t border-white/10"></div>
                <span className="absolute bg-transparent px-4 text-[9px] font-black text-white/40 uppercase tracking-widest">Or with Email</span>
              </div>
            </>
          )}

          {/* Show success/error message */}
          {message && (
            <div className={`mb-4 text-center text-sm font-bold py-2 px-3 ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>
          )}
          <form onSubmit={handleAuth} className="space-y-4">
            <AnimatePresence mode="wait">
              {authMode === 'signup' && (
                <>
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative">
                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 pl-12  text-white outline-none focus:border-red-600 focus:bg-white/10 transition-all text-sm placeholder:text-white/20" placeholder="USERNAME" />
                  </motion.div>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 pl-12  text-white outline-none focus:border-red-600 focus:bg-white/10 transition-all text-sm placeholder:text-white/20" placeholder="EMAIL ADDRESS" />
                  </div>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input required type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 pl-12  text-white outline-none focus:border-red-600 focus:bg-white/10 transition-all text-sm placeholder:text-white/20" placeholder="PHONE NUMBER" />
                  </div>
                </>
              )}
            </AnimatePresence>

            {authMode === 'login' && (
              <>
                <div className="relative">
                  <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 pl-12  text-white outline-none focus:border-red-600 focus:bg-white/10 transition-all text-sm placeholder:text-white/20" placeholder="USERNAME" />
                </div>
              </>
            )}

            {authMode !== 'forgot' && (
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 pr-12  text-white outline-none focus:border-red-600 focus:bg-white/10 transition-all text-sm placeholder:text-white/20" 
                  placeholder="PASSWORD" 
                />
                {/* VIEW/HIDE TOGGLE */}
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
                </button>
              </div>
            )}

            {authMode === 'login' && (
              <div className="text-right">
                <button type="button" onClick={() => setAuthMode('forgot')} className="text-[9px] font-bold text-white/40 hover:text-red-500 uppercase tracking-widest transition-colors">
                  Forgotten Password?
                </button>
              </div>
            )}

            <button disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-5  font-black uppercase text-[10px] tracking-[0.3em] transition-all shadow-xl active:scale-[0.98] mt-4 disabled:opacity-50">
              {loading ? 'Processing...' : (authMode === 'login' ? 'Sign In Now' : authMode === 'signup' ? 'Join NDM' : 'Send Reset Link')}
            </button>
          </form>

          <div className="mt-10 text-center space-y-4">
            <button 
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'signup' : 'login');
                setShowPassword(false);
              }}
              className="block w-full text-[12px] font-black text-white/50 hover:text-white transition-all uppercase tracking-widest"
            >
              {authMode === 'login' ? "New to the network? Create Account" : "Return to Login"}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-white/30 font-bold uppercase tracking-[0.4em]">
          Powered by New Dawuro Media
        </p>
      </div>
    </div>
  );
};

export default Auth;