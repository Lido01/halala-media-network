import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../api/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categoryDisplayNames = {
  news: 'News',
  interview: 'Interview',
  documentary: 'Documentary',
  announcement: 'Announcement',
  projects: 'Projects',
  project: 'Projects', // Added fallback to handle singular backend queries seamlessly
};

const ContentCategoryPage = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Normalize category value to lowercase
    let backendCategory = category ? category.trim().toLowerCase() : '';

    // FIX MISMAPPED URL VALUE: Map 'projects' from URL string to singular 'project' expected by Django Choice values
    if (backendCategory === 'projects') {
      backendCategory = 'project';
    }

    apiService.get(`/api/content/posts/?category=${backendCategory}`)
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load content.');
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 overflow-x-hidden py-24 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter mb-10">
          {categoryDisplayNames[category?.toLowerCase()] || category}
        </h1>
        {loading && <div className="text-gray-500 dark:text-gray-400">Loading...</div>}
        {error && <div className="text-red-500 font-bold">{error}</div>}
        {!loading && !error && posts.length === 0 && (
          <div className="text-gray-400">No content found for this category.</div>
        )}
        <div className="flex flex-col gap-24">
          {posts.map((post, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row ${!isEven ? 'lg:flex-row-reverse' : ''} gap-12 items-center bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden border border-gray-100 dark:border-zinc-800`}
              >
                {/* Image */}
                {post.thumbnail && (
                  <div className="w-full lg:w-2/5 h-64 lg:h-80 flex-shrink-0 relative group overflow-hidden cursor-pointer" onClick={() => setModalImg(post.thumbnail)}>
                    <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</div>
                  </div>
                )}
                {/* Content */}
                <div className="w-full lg:w-3/5 p-8 flex flex-col h-full">
                  <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white uppercase tracking-tighter mb-4">{post.title}</h2>
                  <div className="mb-6">
                    <div className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                      {post.body && post.body.length > 200
                        ? <>
                            {post.body.slice(0, 200)}<span className="text-gray-400">...</span>
                          </>
                        : post.body}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-zinc-800">
                    <span className="text-xs text-gray-400 flex items-center gap-2">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#cc0000" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="#cc0000" /></svg>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    {/* FIXED NAVIGATION PARAMETER: Tries to route dynamically using clean URL slugs. Falls back to database integer ID safely if missing */}
                    <Link to={`/contents/${category}/${post.slug || post.id}`} className="text-[#cc0000] font-bold text-xs uppercase hover:underline transition-colors">Read More</Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Image Modal */}
        {modalImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setModalImg(null)}>
            <img src={modalImg} alt="Full Preview" className="max-h-[90vh] max-w-[90vw] shadow-2xl border-4 border-white" />
            <button className="absolute top-8 right-8 text-white text-3xl font-black bg-black/6 w-12 h-12 flex items-center justify-center hover:bg-black/90" onClick={e => { e.stopPropagation(); setModalImg(null); }}>&times;</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCategoryPage;
