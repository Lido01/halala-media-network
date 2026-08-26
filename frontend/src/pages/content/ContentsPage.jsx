import React from 'react';

import { motion } from 'framer-motion';
import { HiOutlineNewspaper, HiOutlineUserGroup, HiOutlineAcademicCap as HiOutlineCollection, HiOutlineCamera, HiOutlineDocumentText, HiOutlineArrowRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const categories = [
  { key: 'news', label: 'News', desc: 'Latest news and updates.', icon: <HiOutlineNewspaper size={32} className="text-[#cc0000]" /> },
  { key: 'interview', label: 'Interview', desc: 'Exclusive interviews.', icon: <HiOutlineUserGroup size={32} className="text-[#ffcc00]" /> },
  { key: 'documentary', label: 'Documentary', desc: 'Documentary features.', icon: <HiOutlineCamera size={32} className="text-[#cc0000]" /> },
  { key: 'announcement', label: 'Announcement', desc: 'Official announcements.', icon: <HiOutlineDocumentText size={32} className="text-[#ffcc00]" /> },
  { key: 'projects', label: 'Projects', desc: 'Our projects and impact.', icon: <HiOutlineCollection size={32} className="text-[#cc0000]" /> },
];


const ContentsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 overflow-x-hidden py-24 px-4 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white uppercase tracking-tighter mb-10">
          Content Categories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map(cat => (
            <motion.div
              key={cat.key}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white dark:bg-zinc-900 shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 dark:border-zinc-800"
            >
              <div className="p-8 flex flex-col items-center text-center flex-1">
                {cat.icon}
                <h2 className="text-2xl font-bold mt-4 mb-2 text-black dark:text-white uppercase">{cat.label}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{cat.desc}</p>
                <Link to={`/contents/${cat.key}`} className="mt-auto inline-flex items-center gap-2 text-[#cc0000] font-bold text-xs uppercase hover:underline">
                  View {cat.label} <HiOutlineArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentsPage;
