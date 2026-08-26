
import React, { useEffect, useState, useRef } from 'react';
import apiService from '../../../api/api';
import {
  HiOutlinePlus, HiOutlineTrash, HiOutlinePencilSquare,
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlinePhoto,
  HiOutlineVideoCamera, HiOutlineInformationCircle, HiOutlineXMark
} from 'react-icons/hi2';

const initialAlbumForm = { title: '', description: '', cover_image: null };
const initialAssetForm = { album: '', title: '', description: '', media_type: 'image', image_file: null, video_url: '', video_file: null, is_featured: false };

const AdminMediaManagement = () => {
  // --- States ---

  const [albums, setAlbums] = useState([]);
  const [assets, setAssets] = useState([]);
  // Removed unused loading state
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'error' | 'success'

  const [albumForm, setAlbumForm] = useState(initialAlbumForm);
  const [assetForm, setAssetForm] = useState(initialAssetForm);
  const [modals, setModals] = useState({ album: false, asset: false, albumDetails: null, assetDetails: null });
  const [editIds, setEditIds] = useState({ album: null, asset: null });
  const [formErrors, setFormErrors] = useState({});

  // Refs for scroll navigation
  const albumsRef = useRef(null);
  const assetsRef = useRef(null);

  // Toggle featured status for asset
  const handleToggleFeatured = async (asset) => {
    try {
      const formData = new FormData();
      formData.append('is_featured', !asset.is_featured);
      await apiService.patch(`/api/media/assets/${asset.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      showAlert('Featured status updated');
      fetchAssets();
    } catch {
      showAlert('Failed to update featured status', 'error');
    }
  };

  // --- Helpers ---
  const showAlert = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const fetchAlbums = async () => {
    try {
      const res = await apiService.get('/api/media/albums/');
      setAlbums(res.data);
    } catch {
      showAlert('Failed to load albums.', 'error');
    }
  };

  const fetchAssets = async () => {
    try {
      const res = await apiService.get('/api/media/assets/');
      setAssets(res.data);
    } catch {
      showAlert('Failed to load media assets.', 'error');
    }
  };
  // Asset delete handler (was missing)
  const handleAssetDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;
    try {
      await apiService.delete(`/api/media/assets/${id}/`);
      showAlert('Asset removed');
      fetchAssets();
    } catch {
      showAlert('Delete failed', 'error');
    }
  };

  useEffect(() => {
    fetchAlbums();
    fetchAssets();
  }, []);

  // --- Album Handlers ---
  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    const formData = new FormData();
    if (albumForm.title) formData.append('title', albumForm.title);
    if (albumForm.description) formData.append('description', albumForm.description);
    // Only append cover_image if it's a File (new upload)
    if (albumForm.cover_image instanceof File) {
      formData.append('cover_image', albumForm.cover_image);
    }

    try {
      if (editIds.album) {
        await apiService.put(`/api/media/albums/${editIds.album}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showAlert('Album updated successfully');
      } else {
        await apiService.post('/api/media/albums/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showAlert('Album created successfully');
      }
      setModals({ ...modals, album: false });
      setAlbumForm(initialAlbumForm);
      setEditIds({ ...editIds, album: null });
      fetchAlbums();
    } catch (err) {
      if (err.response && err.response.data) {
        setFormErrors(err.response.data);
        showAlert('Please fix the errors below.', 'error');
      } else {
        showAlert('Error saving album', 'error');
      }
    }
  };

  const handleAlbumDelete = async (id) => {
    if (!window.confirm('Are you sure? All media in this album will be affected.')) return;
    try {
      await apiService.delete(`/api/media/albums/${id}/`);
      showAlert('Album removed');
      fetchAlbums();
    } catch {
      showAlert('Delete failed', 'error');
    }
  };

  // --- Asset Handlers ---
  const handleAssetSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    const formData = new FormData();
    if (assetForm.album) formData.append('album', assetForm.album);
    if (assetForm.title) formData.append('title', assetForm.title);
    if (assetForm.description) formData.append('description', assetForm.description);
    if (assetForm.media_type) formData.append('media_type', assetForm.media_type);
    if (assetForm.media_type === 'image' && assetForm.image_file instanceof File) {
      formData.append('image_file', assetForm.image_file);
    }
    if (assetForm.media_type === 'video') {
      if (assetForm.video_url) formData.append('video_url', assetForm.video_url);
      if (assetForm.video_file instanceof File) formData.append('video_file', assetForm.video_file);
    }
    formData.append('is_featured', assetForm.is_featured);

    try {
      if (editIds.asset) {
        await apiService.put(`/api/media/assets/${editIds.asset}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showAlert('Media updated');
      } else {
        await apiService.post('/api/media/assets/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showAlert('Media uploaded');
      }
      setModals({ ...modals, asset: false });
      setAssetForm(initialAssetForm);
      setEditIds({ ...editIds, asset: null });
      fetchAssets();
    } catch (err) {
      if (err.response && err.response.data) {
        setFormErrors(err.response.data);
        showAlert('Please fix the errors below.', 'error');
      } else {
        showAlert('Error saving media', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto w-full overflow-x-hidden">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">Media Library</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Manage albums, gallery images, and video reels.</p>
          </div>
          {/* Global Messages */}
          {message.text && (
            <div className={`flex items-center gap-3 px-4 py-3 border shadow-sm animate-in fade-in slide-in-from-top-4 duration-300 ${
              message.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              {message.type === 'error' ? <HiOutlineXCircle size={20}/> : <HiOutlineCheckCircle size={20}/>}
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">{message.text}</span>
            </div>
          )}
        </header>

        {/* --- ALBUMS SECTION --- */}
        <section ref={albumsRef} className="mb-8 sm:mb-12 bg-white shadow-sm border border-gray-100 overflow-x-auto">
          <div className="p-4 sm:p-6 border-b border-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white gap-2">
            <h3 className="text-base sm:text-lg font-black uppercase tracking-widest flex items-center gap-2">
              <HiOutlinePhoto className="text-blue-600"/> Albums
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => { setEditIds({ ...editIds, album: null }); setAlbumForm(initialAlbumForm); setModals({ ...modals, album: true }); }}
                className="bg-black hover:bg-gray-800 text-white text-xs font-bold py-2 px-4 flex items-center gap-2 transition-all active:scale-95"
              >
                <HiOutlinePlus /> Create Album
              </button>
            </div>
          </div>

          {/* Album Cards with Assets Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {albums.map(album => (
              <div key={album.id} className="bg-gray-50 shadow hover:shadow-lg transition-all border border-gray-100 flex flex-col">
                <div className="relative cursor-pointer" onClick={() => setModals({ ...modals, albumDetails: album })}>
                  <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 flex items-center justify-center">
                    {album.cover_image ? (
                      <img src={album.cover_image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <HiOutlinePhoto size={48} className="text-gray-200" />
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/80 px-3 py-1 text-xs font-black text-blue-600 shadow">{album.title}</div>
                </div>
                {/* Asset Thumbnails Preview */}
                <div className="flex -space-x-3 px-4 py-2 overflow-x-auto">
                  {assets.filter(a => a.album === album.id).slice(0, 5).map(asset => (
                    <div key={asset.id} className="w-10 h-10 border-2 border-white shadow -ml-2 bg-gray-100 flex items-center justify-center">
                      {asset.media_type === 'image' ? (
                        <img src={asset.image_file} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <HiOutlineVideoCamera className="text-red-400 w-6 h-6 mx-auto" />
                      )}
                    </div>
                  ))}
                  {assets.filter(a => a.album === album.id).length === 0 && (
                    <span className="text-xs text-gray-400 ml-2">No assets</span>
                  )}
                </div>
                <div className="flex justify-between items-center px-4 pb-4 pt-2">
                  <button onClick={() => { setEditIds({ ...editIds, album: album.id }); setAlbumForm(album); setModals({ ...modals, album: true }); }} className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><HiOutlinePencilSquare size={18}/></button>
                  <button onClick={() => handleAlbumDelete(album.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><HiOutlineTrash size={18}/></button>
                  <button onClick={() => setModals({ ...modals, albumDetails: album })} className="p-2 text-blue-500 hover:text-blue-700 transition-colors">View</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- ASSETS SECTION --- */}
        <section ref={assetsRef} className="bg-white shadow-sm border border-gray-100 overflow-x-auto">
          <div className="p-4 sm:p-6 border-b border-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-black uppercase tracking-widest flex items-center gap-2">
              <HiOutlineVideoCamera className="text-red-600"/> Media Assets
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => { setEditIds({ ...editIds, asset: null }); setAssetForm(initialAssetForm); setModals({ ...modals, asset: true }); }}
                className="bg-black hover:bg-gray-800 text-white text-xs font-bold py-2 px-4 flex items-center gap-2 transition-all active:scale-95"
              >
                <HiOutlinePlus /> Add Media
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 bg-gray-50/50">
                  <th className="px-2 sm:px-6 py-4 font-black">Preview</th>
                  <th className="px-2 sm:px-6 py-4 font-black">Title & Info</th>
                  <th className="px-2 sm:px-6 py-4 font-black">Type</th>
                  <th className="px-2 sm:px-6 py-4 font-black text-center">Status</th>
                  <th className="px-2 sm:px-6 py-4 font-black text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-2 sm:px-6 py-4">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 overflow-hidden border bg-gray-100">
                        {asset.media_type === 'image' ? (
                          <img src={asset.image_file} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-red-50 text-red-500"><HiOutlineVideoCamera /></div>
                        )}
                      </div>
                    </td>
                    <td className="px-2 sm:px-6 py-4">
                      <div className="text-xs font-bold uppercase flex items-center gap-2">{asset.title}
                        <button onClick={() => setModals({ ...modals, assetDetails: asset })} className="text-blue-500 hover:text-blue-700" title="View Details"><HiOutlineInformationCircle size={16}/></button>
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
                        {albums.find(a => a.id === asset.album)?.title || 'Unassigned'}
                      </div>
                    </td>
                    <td className="px-2 sm:px-6 py-4">
                      <span className={`text-[9px] font-black px-2 py-1 uppercase tracking-tighter ${asset.media_type === 'video' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                        {asset.media_type}
                      </span>
                    </td>
                    <td className="px-2 sm:px-6 py-4 text-center">
                      <button onClick={() => handleToggleFeatured(asset)} className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 border transition-colors ${asset.is_featured ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-100'}`}>{asset.is_featured ? 'Featured' : 'Set Featured'}</button>
                    </td>
                    <td className="px-2 sm:px-6 py-4">
                      <div className="flex justify-center gap-2 sm:gap-3">
                        <button onClick={() => { setEditIds({ ...editIds, asset: asset.id }); setAssetForm(asset); setModals({ ...modals, asset: true }); }} className="text-gray-400 hover:text-blue-600"><HiOutlinePencilSquare size={18}/></button>
                        <button onClick={() => handleAssetDelete(asset.id)} className="text-gray-400 hover:text-red-600"><HiOutlineTrash size={18}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- DETAILS MODALS --- */}
        {modals.albumDetails && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[110] p-2 sm:p-4 animate-in fade-in duration-200" onClick={e => { if (e.target === e.currentTarget) setModals({ ...modals, albumDetails: null }); }}>
            <div className="bg-white w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-10">
                <h4 className="text-lg font-black uppercase tracking-tighter italic">Album: {modals.albumDetails.title}</h4>
                <button onClick={() => setModals({ ...modals, albumDetails: null })} className="p-2 hover:bg-gray-100 transition-colors"><HiOutlineXMark size={22}/></button>
              </div>
              <div className="p-6 space-y-3 overflow-y-auto flex-1">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="w-32 h-32  overflow-hidden border bg-gray-100 flex-shrink-0">
                    {modals.albumDetails.cover_image ? <img src={modals.albumDetails.cover_image} alt="" className="w-full h-full object-cover" /> : <HiOutlinePhoto size={40} className="text-gray-300 mx-auto"/>}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-gray-900 mb-1">{modals.albumDetails.title}</div>
                    <div className="text-xs text-gray-500 mb-2">{modals.albumDetails.description || 'No description'}</div>
                    <div className="text-xs text-gray-400 mb-2">Created: {new Date(modals.albumDetails.created_at).toLocaleString()}</div>
                    <button 
                      className="bg-black hover:bg-gray-800 text-white text-xs font-bold py-2 px-4 flex items-center gap-2 transition-all active:scale-95 mb-2"
                      onClick={() => { setEditIds({ ...editIds, asset: null }); setAssetForm({ ...initialAssetForm, album: modals.albumDetails.id }); setModals({ ...modals, asset: true }); }}
                    >
                      <HiOutlinePlus /> Add Asset
                    </button>
                  </div>
                </div>
                <hr className="my-4 border-gray-100" />
                <div>
                  <h5 className="font-black text-gray-700 mb-2 text-sm uppercase tracking-widest">Assets in this Album</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {assets.filter(a => a.album === modals.albumDetails.id).length === 0 && (
                      <div className="col-span-2 text-xs text-gray-400 italic">No assets in this album.</div>
                    )}
                    {assets.filter(a => a.album === modals.albumDetails.id).map(asset => (
                      <div key={asset.id} className="bg-gray-50 shadow border border-gray-100 flex flex-col items-center p-2 relative group">
                        <div className="w-20 h-20 overflow-hidden bg-gray-100 flex items-center justify-center mb-2">
                          {asset.media_type === 'image' ? (
                            <img src={asset.image_file} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <HiOutlineVideoCamera className="text-red-400 w-8 h-8 mx-auto" />
                          )}
                        </div>
                        <div className="text-xs font-bold text-gray-800 text-center line-clamp-2 mb-1 w-full">{asset.title}</div>
                        <div className="flex gap-1 w-full justify-center">
                          <button onClick={() => setModals({ ...modals, assetDetails: asset })} className="p-1 text-blue-500 hover:text-blue-700"><HiOutlineInformationCircle size={16}/></button>
                          <button onClick={() => { setEditIds({ ...editIds, asset: asset.id }); setAssetForm(asset); setModals({ ...modals, asset: true }); }} className="p-1 text-gray-400 hover:text-blue-600"><HiOutlinePencilSquare size={16}/></button>
                          <button onClick={() => handleAssetDelete(asset.id)} className="p-1 text-gray-400 hover:text-red-600"><HiOutlineTrash size={16}/></button>
                        </div>
                        {asset.is_featured && <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 ">FEATURED</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {modals.assetDetails && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4 animate-in fade-in duration-200" onClick={e => { if (e.target === e.currentTarget) setModals({ ...modals, assetDetails: null }); }}>
            <div className="bg-white w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <h4 className="text-lg font-black uppercase tracking-tighter italic">Media Details</h4>
                <button onClick={() => setModals({ ...modals, assetDetails: null })} className="p-2 hover:bg-gray-100 transition-colors"><HiOutlineXMark size={22}/></button>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 overflow-hidden border bg-gray-100">
                    {modals.assetDetails.media_type === 'image' ? (
                      <img src={modals.assetDetails.image_file} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <HiOutlineVideoCamera size={40} className="text-red-400 mx-auto"/>
                    )}
                  </div>
                  <div className="font-bold text-lg text-gray-900">{modals.assetDetails.title}</div>
                  <div className="text-xs text-gray-500">{modals.assetDetails.description || 'No description'}</div>
                  <div className="text-xs text-gray-400">Type: {modals.assetDetails.media_type}</div>
                  <div className="text-xs text-gray-400">Created: {new Date(modals.assetDetails.created_at).toLocaleString()}</div>
                  {modals.assetDetails.media_type === 'video' && modals.assetDetails.video_url && (
                    <a href={modals.assetDetails.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">View Video</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- SHARED MODAL COMPONENT --- */}
        {(modals.album || modals.asset) && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[120] p-2 sm:p-4 animate-in fade-in duration-200" onClick={e => { if (e.target === e.currentTarget) setModals({ album: false, asset: false }); }}>
            <div className="bg-white w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
              <div className="p-6 sm:p-8 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-10">
                <h4 className="text-lg sm:text-xl font-black uppercase tracking-tighter italic">
                  {modals.album ? (editIds.album ? 'Edit Album' : 'New Album') : (editIds.asset ? 'Edit Media' : 'Upload Media')}
                </h4>
                <button onClick={() => setModals({ album: false, asset: false })} className="p-2 hover:bg-gray-100 transition-colors"><HiOutlineXMark size={24}/></button>
              </div>
              {/* Show error summary at top if any */}
              {Object.keys(formErrors).length > 0 && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                  {Object.entries(formErrors).map(([field, error]) => (
                    <div key={field}>{field}: {Array.isArray(error) ? error.join(', ') : error}</div>
                  ))}
                </div>
              )}
              <form onSubmit={modals.album ? handleAlbumSubmit : handleAssetSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-1">
                {modals.album ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Album Title</label>
                      <input type="text" value={albumForm.title} onChange={e => setAlbumForm({...albumForm, title: e.target.value})} className={`w-full bg-gray-50 border-none px-4 py-3 focus:ring-2 focus:ring-black transition-all ${formErrors.title ? 'ring-2 ring-red-400' : ''}`} required />
                      {formErrors.title && <div className="text-xs text-red-500 mt-1">{formErrors.title}</div>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Description</label>
                      <textarea value={albumForm.description} onChange={e => setAlbumForm({...albumForm, description: e.target.value})} className={`w-full bg-gray-50 border-none px-4 py-3 focus:ring-2 focus:ring-black transition-all ${formErrors.description ? 'ring-2 ring-red-400' : ''}`} rows={2} />
                      {formErrors.description && <div className="text-xs text-red-500 mt-1">{formErrors.description}</div>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Cover Image</label>
                      <input type="file" accept="image/*" onChange={e => setAlbumForm({...albumForm, cover_image: e.target.files[0]})} className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-black file:text-white" />
                      {formErrors.cover_image && <div className="text-xs text-red-500 mt-1">{formErrors.cover_image}</div>}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Target Album</label>
                        <select value={assetForm.album} onChange={e => setAssetForm({...assetForm, album: e.target.value})} className={`w-full bg-gray-50 border-none px-4 py-3 focus:ring-2 focus:ring-black text-sm ${formErrors.album ? 'ring-2 ring-red-400' : ''}`} required>
                          <option value="">Select...</option>
                          {albums.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
                        </select>
                        {formErrors.album && <div className="text-xs text-red-500 mt-1">{formErrors.album}</div>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Media Type</label>
                        <select value={assetForm.media_type} onChange={e => setAssetForm({...assetForm, media_type: e.target.value})} className={`w-full bg-gray-50 border-none px-4 py-3 focus:ring-2 focus:ring-black text-sm ${formErrors.media_type ? 'ring-2 ring-red-400' : ''}`}>
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                          <option value="reel">Reel/Short</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Content Title</label>
                      <input type="text" value={assetForm.title} onChange={e => setAssetForm({...assetForm, title: e.target.value})} className={`w-full bg-gray-50 border-none px-4 py-3 focus:ring-2 focus:ring-black ${formErrors.title ? 'ring-2 ring-red-400' : ''}`} required />
                      {formErrors.title && <div className="text-xs text-red-500 mt-1">{formErrors.title}</div>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Description</label>
                      <textarea value={assetForm.description} onChange={e => setAssetForm({...assetForm, description: e.target.value})} className={`w-full bg-gray-50 border-none px-4 py-3 focus:ring-2 focus:ring-black ${formErrors.description ? 'ring-2 ring-red-400' : ''}`} rows={2} />
                      {formErrors.description && <div className="text-xs text-red-500 mt-1">{formErrors.description}</div>}
                    </div>
                    {assetForm.media_type === 'image' ? (
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Image File</label>
                        <input type="file" accept="image/*" onChange={e => setAssetForm({...assetForm, image_file: e.target.files[0]})} className="w-full text-xs file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2" />
                        {formErrors.image_file && <div className="text-xs text-red-500 mt-1">{formErrors.image_file}</div>}
                      </div>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Video URL</label>
                          <input type="url" placeholder="YouTube or Video URL" value={assetForm.video_url} onChange={e => setAssetForm({...assetForm, video_url: e.target.value})} className={`w-full bg-gray-50 border-none px-4 py-3 focus:ring-2 focus:ring-black ${formErrors.video_url ? 'ring-2 ring-red-400' : ''}`} />
                          {formErrors.video_url && <div className="text-xs text-red-500 mt-1">{formErrors.video_url}</div>}
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Video File (optional)</label>
                          <input type="file" accept="video/*" onChange={e => setAssetForm({...assetForm, video_file: e.target.files[0]})} className="w-full text-xs file:bg-red-600 file:text-white file:border-0 file:px-4 file:py-2" />
                          {formErrors.video_file && <div className="text-xs text-red-500 mt-1">{formErrors.video_file}</div>}
                        </div>
                      </>
                    )}
                  </>
                )}
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setModals({ album: false, asset: false })} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Dismiss</button>
                  <button type="submit" className="flex-1 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-black/10 hover:translate-y-[-2px] transition-all active:scale-95">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMediaManagement;