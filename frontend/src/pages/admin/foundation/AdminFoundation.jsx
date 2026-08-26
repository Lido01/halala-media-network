
import React, { useEffect, useState, useRef } from 'react';
import apiService from '../../../api/api';
import { 
  HiOutlineHeart, HiOutlinePencilSquare, HiOutlineTrash, 
  HiOutlinePlus, HiOutlineMagnifyingGlass, HiOutlineCurrencyDollar,
  HiOutlineUserGroup, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineEye
} from 'react-icons/hi2';

const AdminFoundation = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit' | 'details'
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [form, setForm] = useState({
    type: '',
    title: '',
    description: '',
    is_active: true,
    image: null,
    report_file: null,
    budget: '',
    impact: '',
    year: '',
    quote: '',
    location: '',
    legacy: '',
    headline: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [previewReport, setPreviewReport] = useState(null);
  const imageInputRef = useRef();
  const reportInputRef = useRef();

  // Foundation types from backend model
  const FOUNDATION_TYPES = [
    { value: 'child', label: 'One Child One Package' },
    { value: 'charity', label: 'Charity' },
    { value: 'community', label: 'Community Outreach' },
  ];
  const [saving, setSaving] = useState(false);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await apiService.get('/api/foundation/programs/');
      setPrograms(res.data);
    } catch (err) {
      setError('System connection failed. Could not sync Foundation data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Modal open/close helpers
  const openModal = (mode, program = null) => {
    setModalMode(mode);
    setSelectedProgram(program);
    if (mode === 'edit' && program) {
      setForm({
        type: program.type || '',
        title: program.title || '',
        description: program.description || '',
        is_active: program.is_active,
        image: null,
        report_file: null,
        budget: program.budget || '',
        impact: program.impact || '',
        year: program.year || '',
        quote: program.quote || '',
        location: program.location || '',
        legacy: program.legacy || '',
        headline: program.headline || '',
      });
      setPreviewImage(program.image || null);
      setPreviewReport(program.report_file || null);
    } else if (mode === 'create') {
      setForm({
        type: '',
        title: '',
        description: '',
        is_active: true,
        image: null,
        report_file: null,
        budget: '',
        impact: '',
        year: '',
        quote: '',
        location: '',
        legacy: '',
        headline: '',
      });
      setPreviewImage(null);
      setPreviewReport(null);
    } else if (mode === 'details' && program) {
      setPreviewImage(program.image || null);
      setPreviewReport(program.report_file || null);
    }
    setShowModal(true);
  };

  // Form input handler
  const handleFormChange = (e) => {
    const { name, value, type: inputType, checked, files } = e.target;
    if (inputType === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      if (name === 'image' && files[0]) {
        setPreviewImage(URL.createObjectURL(files[0]));
      }
      if (name === 'report_file' && files[0]) {
        setPreviewReport(files[0].name);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: inputType === 'checkbox' ? checked : value }));
    }
  };

  // Create
  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('type', form.type);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('is_active', form.is_active);
      if (form.image) formData.append('image', form.image);
      if (form.report_file) formData.append('report_file', form.report_file);
      formData.append('budget', form.budget);
      formData.append('impact', form.impact);
      formData.append('year', form.year);
      formData.append('quote', form.quote);
      formData.append('location', form.location);
      formData.append('legacy', form.legacy);
      formData.append('headline', form.headline);
      await apiService.post('/api/foundation/programs/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setShowModal(false);
      fetchPrograms();
    } catch {
      alert('Failed to create program');
    } finally {
      setSaving(false);
    }
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedProgram) return;
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('type', form.type);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('is_active', form.is_active);
      if (form.image) formData.append('image', form.image);
      if (form.report_file) formData.append('report_file', form.report_file);
      formData.append('budget', form.budget);
      formData.append('impact', form.impact);
      formData.append('year', form.year);
      formData.append('quote', form.quote);
      formData.append('location', form.location);
      formData.append('legacy', form.legacy);
      formData.append('headline', form.headline);
      await apiService.put(`/api/foundation/programs/${selectedProgram.id}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setShowModal(false);
      fetchPrograms();
    } catch {
      alert('Failed to update program');
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    setSaving(true);
    try {
      await apiService.delete(`/api/foundation/programs/${id}/`);
      fetchPrograms();
    } catch {
      alert('Failed to delete program');
    } finally {
      setSaving(false);
    }
  };


  // Extract unique categories and years from backend data
  const categories = Array.from(new Set(programs.map(p => p.type).filter(Boolean)));
  categories.unshift('all');
  const years = Array.from(new Set(programs.map(p => p.year).filter(Boolean))).sort((a, b) => b - a);
  years.unshift('all');

  // Filter by category, year, and search
  const filteredPrograms = programs.filter(p => {
    const matchesCategory = category === 'all' || p.type === category;
    const matchesYear = yearFilter === 'all' || String(p.year) === String(yearFilter);
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesYear && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f1f5f9] py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Foundation Programs Section */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Foundation Programs</h2>
            <p className="text-slate-500 font-medium mb-4">Manage and coordinate all foundation programs.</p>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`px-4 py-2  font-bold text-xs uppercase tracking-widest border transition-all shadow-sm ${
                      category === cat
                        ? 'bg-red-600 text-white border-red-600 scale-105'
                        : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
                    }`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 w-full lg:w-auto mt-2 lg:mt-0">
                {/* Year Filter */}
                <select
                  className="border  px-4 py-2 text-xs font-bold uppercase text-slate-700 bg-white shadow-sm focus:ring-2 focus:ring-red-500"
                  value={yearFilter}
                  onChange={e => setYearFilter(e.target.value)}
                >
                  {years.map(y => (
                    <option key={y} value={y}>{y === 'all' ? 'All Years' : y}</option>
                  ))}
                </select>
                <div className="relative flex-1 lg:w-72">
                  <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    className="w-full pl-12 pr-4 py-3  bg-white border-none shadow-sm outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <button
                  className="bg-slate-900 hover:bg-black text-white p-4  shadow-xl transition-all active:scale-95"
                  onClick={() => openModal('create')}
                >
                  <HiOutlinePlus size={24} />
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-20 bg-white animate-pulse">
                <div className="text-slate-300 font-black uppercase tracking-tighter text-xl">Synchronizing Programs...</div>
              </div>
            ) : error ? (
              <div className="p-8 bg-red-50 text-red-600  font-bold border border-red-100">{error}</div>
            ) : (
              filteredPrograms.map(program => (
                <div
                  key={program.id}
                  className="bg-white hover:bg-slate-50 border border-slate-100 p-5 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-6 w-full lg:w-1/3">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                      <HiOutlineHeart size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-3 py-0.5  text-[10px] font-black uppercase tracking-widest ${
                          program.type === 'grant' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {program.type || 'General'}
                        </span>
                        {program.is_active ? (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold uppercase"><HiOutlineCheckCircle /> Active</span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-slate-300 font-bold uppercase"><HiOutlineXCircle /> Suspended</span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-slate-800 leading-tight">{program.title}</h3>
                      <div className="text-xs text-slate-500 font-medium mt-1">{program.headline}</div>
                    </div>
                  </div>
                  <div className="hidden lg:flex flex-col w-1/4">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase mb-2">
                      <span>Completion Goal</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100  overflow-hidden">
                      <div className="h-full bg-red-600  w-[100%] shadow-[0_0_10px_rgba(220,38,38,0.3)]"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 px-6 border-x border-slate-50 min-w-[160px]">
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-tighter mt-2">Impact</div>
                    <div className="font-bold text-slate-700">{program.impact || '-'}</div>
                    {/* <div className="text-[10px] font-black text-slate-300 uppercase tracking-tighter mt-2">Year</div> */}
                    <div className="font-bold text-slate-700">{program.year || '-'}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-4 text-slate-400 hover:text-blue-600 hover:bg-blue-50  transition-all"
                      onClick={() => openModal('details', program)}
                      aria-label="View Details"
                    >
                      <HiOutlineEye size={22} />
                    </button>
                    <button
                      className="p-4 text-slate-400 hover:text-yellow-600 hover:bg-yellow-50  transition-all"
                      onClick={() => openModal('edit', program)}
                      aria-label="Edit"
                    >
                      <HiOutlinePencilSquare size={22} />
                    </button>
                    <button
                      className="p-4 text-slate-400 hover:text-red-600 hover:bg-red-50  transition-all"
                      onClick={() => handleDelete(program.id)}
                      disabled={saving}
                      aria-label="Delete"
                    >
                      <HiOutlineTrash size={22} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            className="lg:hidden fixed bottom-8 right-8 bg-red-600 text-white p-5  shadow-2xl z-50"
            onClick={() => openModal('create')}
          >
            <HiOutlinePlus size={28} />
          </button>
        {/* Modal for create/edit/details */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn p-2 sm:p-4">
            <div className="bg-white  sm: shadow-2xl w-full max-w-lg max-h-[95vh] relative animate-fadeInUp border-4 border-yellow-200 flex flex-col">
              {/* Sticky Close Button */}
              <button
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-600 text-3xl font-black z-20 bg-white  p-2 shadow"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-8 pt-14 sm:pt-8">
                {modalMode === 'create' && (
                  <>
                    <h3 className="text-xl font-black mb-4 text-red-800">Add Foundation Program</h3>
                    <form onSubmit={handleCreate} className="space-y-4">
                      <input name="title" required value={form.title} onChange={handleFormChange} className="w-full border  p-3" placeholder="Title" />
                      <input name="headline" value={form.headline} onChange={handleFormChange} className="w-full border  p-3" placeholder="Headline" />
                      <select name="type" required value={form.type} onChange={handleFormChange} className="w-full border  p-3">
                        <option value="">Select Type</option>
                        {FOUNDATION_TYPES.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full border  p-3" placeholder="Description" />
                      <input name="budget" value={form.budget} onChange={handleFormChange} className="w-full border  p-3" placeholder="Budget" />
                      <input name="impact" value={form.impact} onChange={handleFormChange} className="w-full border  p-3" placeholder="Impact" />
                      <input name="year" value={form.year} onChange={handleFormChange} className="w-full border  p-3" placeholder="Year" />
                      <input name="location" value={form.location} onChange={handleFormChange} className="w-full border  p-3" placeholder="Location" />
                      <input name="legacy" value={form.legacy} onChange={handleFormChange} className="w-full border  p-3" placeholder="Legacy" />
                      <textarea name="quote" value={form.quote} onChange={handleFormChange} className="w-full border  p-3" placeholder="Quote" />
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleFormChange} /> Active
                      </label>
                      {/* Image Input with Preview and Style */}
                      <div>
                        <label className="block font-bold mb-1">Image</label>
                        <label className="flex items-center gap-3 cursor-pointer bg-slate-50 border-2 border-dashed border-slate-200  p-3 hover:border-red-400 transition">
                          <span className="text-xs font-bold text-slate-500">{form.image ? (typeof form.image === 'string' ? form.image : form.image.name) : 'Choose image'}</span>
                          <input type="file" name="image" accept="image/*" ref={imageInputRef} onChange={handleFormChange} className="hidden" />
                        </label>
                        {previewImage && <img src={previewImage} alt="Preview" className="w-24 h-24 object-cover  border mt-2" />}
                      </div>
                      {/* Report File Input with Style */}
                      <div>
                        <label className="block font-bold mb-1">Report File</label>
                        <label className="flex items-center gap-3 cursor-pointer bg-slate-50 border-2 border-dashed border-slate-200  p-3 hover:border-yellow-400 transition">
                          <span className="text-xs font-bold text-slate-500">{form.report_file ? (typeof form.report_file === 'string' ? form.report_file : form.report_file.name) : 'Choose file'}</span>
                          <input type="file" name="report_file" accept=".pdf,.doc,.docx,.xls,.xlsx" ref={reportInputRef} onChange={handleFormChange} className="hidden" />
                        </label>
                        {previewReport && <div className="text-xs text-slate-600 mt-2">{typeof previewReport === 'string' ? previewReport : 'File selected'}</div>}
                      </div>
                      <button disabled={saving} className="w-full bg-gradient-to-tr from-red-600 to-yellow-400 text-white font-bold py-3  shadow hover:scale-105 transition">{saving ? 'Saving...' : 'Create Program'}</button>
                    </form>
                  </>
                )}
                {modalMode === 'edit' && (
                  <>
                    <h3 className="text-xl font-black mb-4 text-yellow-700">Edit Foundation Program</h3>
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <input name="title" required value={form.title} onChange={handleFormChange} className="w-full border  p-3" placeholder="Title" />
                      <input name="headline" value={form.headline} onChange={handleFormChange} className="w-full border  p-3" placeholder="Headline" />
                      <select name="type" required value={form.type} onChange={handleFormChange} className="w-full border  p-3">
                        <option value="">Select Type</option>
                        {FOUNDATION_TYPES.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full border  p-3" placeholder="Description" />
                      <input name="budget" value={form.budget} onChange={handleFormChange} className="w-full border  p-3" placeholder="Budget" />
                      <input name="impact" value={form.impact} onChange={handleFormChange} className="w-full border  p-3" placeholder="Impact" />
                      <input name="year" value={form.year} onChange={handleFormChange} className="w-full border  p-3" placeholder="Year" />
                      <input name="location" value={form.location} onChange={handleFormChange} className="w-full border  p-3" placeholder="Location" />
                      <input name="legacy" value={form.legacy} onChange={handleFormChange} className="w-full border  p-3" placeholder="Legacy" />
                      <textarea name="quote" value={form.quote} onChange={handleFormChange} className="w-full border  p-3" placeholder="Quote" />
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleFormChange} /> Active
                      </label>
                      {/* Image Input with Preview and Style */}
                      <div>
                        <label className="block font-bold mb-1">Image</label>
                        <label className="flex items-center gap-3 cursor-pointer bg-slate-50 border-2 border-dashed border-slate-200  p-3 hover:border-red-400 transition">
                          <span className="text-xs font-bold text-slate-500">{form.image ? (typeof form.image === 'string' ? form.image : form.image.name) : 'Choose image'}</span>
                          <input type="file" name="image" accept="image/*" ref={imageInputRef} onChange={handleFormChange} className="hidden" />
                        </label>
                        {previewImage && <img src={previewImage} alt="Preview" className="w-24 h-24 object-cover  border mt-2" />}
                      </div>
                      {/* Report File Input with Style */}
                      <div>
                        <label className="block font-bold mb-1">Report File</label>
                        <label className="flex items-center gap-3 cursor-pointer bg-slate-50 border-2 border-dashed border-slate-200  p-3 hover:border-yellow-400 transition">
                          <span className="text-xs font-bold text-slate-500">{form.report_file ? (typeof form.report_file === 'string' ? form.report_file : form.report_file.name) : 'Choose file'}</span>
                          <input type="file" name="report_file" accept=".pdf,.doc,.docx,.xls,.xlsx" ref={reportInputRef} onChange={handleFormChange} className="hidden" />
                        </label>
                        {previewReport && <div className="text-xs text-slate-600 mt-2">{typeof previewReport === 'string' ? previewReport : 'File selected'}</div>}
                      </div>
                      <button disabled={saving} className="w-full bg-gradient-to-tr from-yellow-400 to-red-600 text-white font-bold py-3  shadow hover:scale-105 transition">{saving ? 'Saving...' : 'Update Program'}</button>
                    </form>
                  </>
                )}
              </div>
              {modalMode === 'details' && selectedProgram && (
                <div className="p-2 sm:p-4 flex flex-col gap-2 animate-fadeIn max-h-[70vh] overflow-y-auto">
                  <h3 className="text-2xl font-black mb-2 text-blue-900 flex items-center gap-2">
                    <HiOutlineEye className="inline-block text-blue-500" />
                    {selectedProgram.title}
                  </h3>
                  <div className="text-sm text-slate-600 mb-2 italic">{selectedProgram.headline}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    <div><span className="font-bold">Type:</span> {FOUNDATION_TYPES.find(t => t.value === selectedProgram.type)?.label || selectedProgram.type}</div>
                    <div><span className="font-bold">Year:</span> {selectedProgram.year}</div>
                    <div><span className="font-bold">Budget:</span> {selectedProgram.budget}</div>
                    <div><span className="font-bold">Impact:</span> {selectedProgram.impact}</div>
                    <div><span className="font-bold">Location:</span> {selectedProgram.location}</div>
                    <div><span className="font-bold">Legacy:</span> {selectedProgram.legacy}</div>
                  </div>
                  <div className="mb-2"><span className="font-bold">Description:</span> <span className="whitespace-pre-line">{selectedProgram.description}</span></div>
                  <div className="mb-2"><span className="font-bold">Quote:</span> <span className="italic">{selectedProgram.quote}</span></div>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-0.5  uppercase">{FOUNDATION_TYPES.find(t => t.value === selectedProgram.type)?.label || selectedProgram.type}</span>
                    {selectedProgram.is_active === false && <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 ">Inactive</span>}
                  </div>
                  {previewImage && <img src={previewImage} alt="Program" className="w-32 h-32 object-cover  border mt-2" />}
                  {previewReport && <div className="text-xs text-slate-600 mt-2">Report: {typeof previewReport === 'string' ? previewReport : 'Available'}</div>}
                </div>
              )}
            </div>
          </div>
        )}
        </section>
      </div>
    </div>
  );
};

export default AdminFoundation;