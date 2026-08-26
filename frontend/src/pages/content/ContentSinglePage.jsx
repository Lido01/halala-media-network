import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../../api/api';
import { motion } from 'framer-motion';
import { 
  HiOutlineArrowLeft, 
  HiOutlineCalendarDays, 
  HiOutlineEye, 
  HiOutlineShare 
} from 'react-icons/hi2';

const ContentSinglePage = () => {
  const { category, id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiService.get(`/api/content/posts/${id}/`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load content.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#cc0000] border-t-transparent   animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white dark:bg-[#050505] flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-black text-red-600 uppercase mb-4">Error</h2>
      <p className="text-gray-500 font-bold uppercase tracking-widest">{error}</p>
      <Link to="/" className="mt-8 text-xs font-black uppercase tracking-[0.4em] border-b-2 border-black dark:border-white">Return Home</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 overflow-x-hidden">
      
      {/* --- HERO SECTION: FULL IMMERSION --- */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {post?.thumbnail ? (
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            src={post.thumbnail} 
            alt={post.title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-zinc-900" />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-20">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <Link to={`/contents/${category}`} className="bg-[#cc0000] text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                {category}
              </Link>
              <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                <HiOutlineCalendarDays size={14}/> {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8"
            >
              {post.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <section className="max-w-5xl mx-auto px-6 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-10 order-2 lg:order-1">
             <div className="border-t-4 border-black dark:border-white pt-6">
                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Stats & Info</span>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-black dark:text-white font-black uppercase text-xs">
                    <HiOutlineEye size={20} className="text-[#cc0000]"/> {post.views_count} Views
                  </div>
                  {post.is_featured && (
                    <div className="text-[#cc0000] font-black uppercase text-xs tracking-tighter border border-[#cc0000] px-3 py-1 w-fit">
                      Featured Piece
                    </div>
                  )}
                </div>
             </div>

             <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Actions</span>
                <button className="flex items-center gap-2 text-black dark:text-white font-black uppercase text-[10px] tracking-widest hover:text-[#cc0000] transition-colors">
                  <HiOutlineShare size={18}/> Share Story
                </button>
             </div>
          </div>

          {/* Body Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="prose prose-xl prose-zinc dark:prose-invert max-w-none 
                prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter
                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-[1.8]
                prose-strong:text-black dark:prose-strong:text-white"
            >
              {/* If your backend returns HTML, use dangerouslySetInnerHTML */}
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </motion.div>

            {/* Back Button Footer */}
            <div className="mt-20 pt-10 border-t border-gray-100 dark:border-white/5">
               <Link to={`/contents/${category}`} className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.5em] text-black dark:text-white">
                  <HiOutlineArrowLeft className="group-hover:-translate-x-2 transition-transform" /> 
                  Return to <span className="text-[#cc0000]">{category}</span> Archives
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION (Consistent with your styles) --- */}
      <section className="bg-zinc-100 dark:bg-zinc-900/50 py-24 px-6 text-center">
         <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter mb-4">Stay Informed</h3>
            <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.3em] mb-10">Get the latest Dawuro news delivered to your inbox.</p>
            <div className="flex flex-col md:flex-row gap-0 max-w-md mx-auto">
               <input type="email" placeholder="YOUR@EMAIL.COM" className="flex-1 bg-white dark:bg-black border-2 border-black dark:border-white px-6 py-4 text-xs font-bold outline-none uppercase" />
               <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-xs font-black uppercase tracking-widest">Join</button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default ContentSinglePage;