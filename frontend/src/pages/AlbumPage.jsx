import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../api/api';
import { 
  HiOutlineChevronDown, 
  HiOutlineChevronUp, 
  HiOutlinePhotograph, 
  HiOutlineCalendar, 
  HiOutlineCollection, 
  HiOutlineFolderOpen,
  HiOutlineClock
} from 'react-icons/hi';

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const res = await apiService.get('/api/media/albums/');
        setAlbums(res.data);
      } catch (err) {
        setError('Unable to reach the gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const toggleExpand = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">Collections</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Explore our curated media archives. High-resolution captures from our latest events and projects.
          </p>
        </header>

        {loading ? (
          /* Skeleton Loader */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="inline-flex p-4 bg-red-100 dark:bg-red-900/30 text-red-600 mb-4">
              <HiOutlineCollection size={40} />
            </div>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {albums.map((album) => {
              const isExpanded = expanded === album.id;
              
              return (
                <div 
                  key={album.id}
                  className="group relative flex flex-col bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    {album.cover_image ? (
                      <img 
                        src={album.cover_image} 
                        alt={album.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                        <HiOutlinePhotograph size={60} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="backdrop-blur-md bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/30">
                        {album.title || 'General'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-yellow-400 transition-colors">
                        {album.name}
                      </h2>
                      <button 
                        onClick={(e) => toggleExpand(e, album.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        {isExpanded ? <HiOutlineChevronUp size={20} /> : <HiOutlineChevronDown size={20} />}
                      </button>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-6">
                      {album.description || "No description provided for this collection."}
                    </p>

                    {/* Expanded Details Section */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-60 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                      <div className="bg-slate-50 dark:bg-gray-800/50 p-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-400">Created:</span>
                          <span>{new Date(album.created_at).toLocaleDateString()}</span>
                        </div>
                        {album.updated_at && (
                           <div className="flex justify-between">
                            <span className="font-semibold text-gray-400">Last Update:</span>
                            <span>{new Date(album.updated_at).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/galleries/${encodeURIComponent(album.name)}`}
                      className="inline-flex items-center justify-center w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 font-bold hover:bg-red-600 dark:hover:bg-yellow-400 dark:hover:text-black transition-all duration-300 shadow-lg"
                    >
                      Open Collection
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumPage;