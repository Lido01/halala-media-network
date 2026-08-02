import React, { useEffect, useState, useRef } from 'react';
import apiService from '../../../api/api';
import {
  HiOutlineCalendar, HiOutlinePencilSquare, HiOutlineTrash, HiOutlinePlus, HiOutlineMagnifyingGlass,
  HiOutlineCheckCircle, HiOutlineXCircle as HiOutlineLocationMarker
} from 'react-icons/hi2';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [notify, setNotify] = useState({ message: '', type: '' });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit' | 'details'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form, setForm] = useState({ title: '', date: '', location: '', description: '', thumbnail: null });
  const [previewThumb, setPreviewThumb] = useState(null);
  const thumbInputRef = useRef();
  const [saving, setSaving] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.get('/api/foundation/events/');
      // Show newest first
      if (Array.isArray(res.data)) {
        setEvents(res.data.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } else {
        setEvents([]);
        setError('Unexpected response from server.');
        console.error('Unexpected response from server:', res);
      }
    } catch (err) {
      setEvents([]);
      setError(
        (err?.response?.data?.detail ||
        (err?.response?.data && typeof err.response.data === 'string' ? err.response.data : null) ||
        err?.message ||
        'System connection failed. Could not sync Events data.') +
        (err?.response ? ` [${JSON.stringify(err.response.data)}]` : '')
      );
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Modal open/close helpers
  const openModal = (mode, event = null) => {
    setError(null);
    setSuccess(null);
    setModalMode(mode);
    setSelectedEvent(event);
    if (mode === 'edit' && event) {
      setForm({
        title: event.title || '',
        date: event.date ? event.date.slice(0, 16) : '',
        location: event.location || '',
        description: event.description || '',
        thumbnail: null,
      });
      setPreviewThumb(event.thumbnail || null);
    } else if (mode === 'create') {
      setForm({ title: '', date: '', location: '', description: '', thumbnail: null });
      setPreviewThumb(null);
    } else if (mode === 'details' && event) {
      setPreviewThumb(event.thumbnail || null);
    }
    setShowModal(true);
  };

  // Form input handler
  const handleFormChange = (e) => {
    const { name, value, type: inputType, files } = e.target;
    if (inputType === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      if (name === 'thumbnail' && files[0]) {
        setPreviewThumb(URL.createObjectURL(files[0]));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Create
  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('date', form.date);
      formData.append('location', form.location);
      formData.append('description', form.description);
      if (form.thumbnail) formData.append('thumbnail', form.thumbnail);
      await apiService.post('/api/foundation/events/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setShowModal(false);
      setSuccess('Event created successfully!');
      setNotify({ message: 'Event created successfully!', type: 'success' });
      fetchEvents();
    } catch (err) {
      const msg = err?.response?.data?.detail || (err?.response?.data && typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err?.response?.data)) || 'Failed to create event';
      setError(msg);
      setNotify({ message: msg, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('date', form.date);
      formData.append('location', form.location);
      formData.append('description', form.description);
      // Only append thumbnail if a new file is chosen
      if (form.thumbnail instanceof File) {
        formData.append('thumbnail', form.thumbnail);
      }
      await apiService.put(`/api/foundation/events/${selectedEvent.id}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setShowModal(false);
      setSuccess('Event updated successfully!');
      setNotify({ message: 'Event updated successfully!', type: 'success' });
      fetchEvents();
    } catch (err) {
      const msg = err?.response?.data?.detail || (err?.response?.data && typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err?.response?.data)) || 'Failed to update event';
      setError(msg);
      setNotify({ message: msg, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await apiService.delete(`/api/foundation/events/${id}/`);
      setSuccess('Event deleted successfully!');
      setNotify({ message: 'Event deleted successfully!', type: 'success' });
      fetchEvents();
    } catch (err) {
      const msg = err?.response?.data?.detail || (err?.response?.data && typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err?.response?.data)) || 'Failed to delete event';
      setError(msg);
      setNotify({ message: msg, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  // Notification auto-dismiss
  useEffect(() => {
    if (notify.message) {
      const timer = setTimeout(() => setNotify({ message: '', type: '' }), 3500);
      return () => clearTimeout(timer);
    }
  }, [notify]);

  return (
    <div className="min-h-screen bg-[#f1f5f9] py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {success && <div className="mb-4 p-4 bg-green-50 text-green-700 border border-green-200 font-bold text-center animate-fadeIn">{success}</div>}
        {error && <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 font-bold text-center animate-fadeIn">{error}</div>}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Events <span className="text-red-600">Manager</span></h1>
            <p className="text-slate-500 font-medium">Manage and coordinate foundation events.</p>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-96">
              <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-12 pr-4 py-4 bg-white border-none shadow-sm outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button
              className="bg-slate-900 hover:bg-black text-white p-4 shadow-xl transition-all active:scale-95"
              onClick={() => openModal('create')}
            >
              <HiOutlinePlus size={24} />
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-20 bg-white animate-pulse">
              <div className="text-slate-300 font-black uppercase tracking-tighter text-xl">Synchronizing Events...</div>
            </div>
          ) : error ? (
            <div className="p-8 bg-red-50 text-red-600 font-bold border border-red-100">{error}</div>
          ) : (
            filteredEvents.length === 0 ? (
              <div className="text-center py-16 bg-white text-slate-400 font-bold text-lg border border-slate-100">
                No events found.
              </div>
            ) : (
              filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="bg-white hover:bg-slate-50 border border-slate-100 p-5 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-6 w-full lg:w-1/3">
                    {/* Thumbnail image */}
                    {event.thumbnail && (
                      <img
                        src={event.thumbnail.startsWith('/') ? event.thumbnail : previewThumb || event.thumbnail}
                        alt="Event Thumbnail"
                        className="w-16 h-16 object-cover border bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 shrink-0"
                      />
                    )}
                    {!event.thumbnail && (
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                        <HiOutlineCalendar size={28} />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-3 py-0.5 text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-600">
                          {event.date ? new Date(event.date).toLocaleDateString() : 'No Date'}
                        </span>
                        {event.created_at && (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold uppercase"><HiOutlineCheckCircle /> Created</span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-slate-800 leading-tight">{event.title}</h3>
                      <div className="text-xs text-slate-400 flex items-center gap-1"><HiOutlineLocationMarker /> {event.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-4 text-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                      onClick={() => openModal('details', event)}
                      title="View Details"
                    >
                      <HiOutlineMagnifyingGlass size={22} />
                    </button>
                    <button
                      className="p-4 text-slate-400 hover:text-red-600 hover:bg-red-50  transition-all"
                      onClick={() => openModal('edit', event)}
                      title="Edit"
                    >
                      <HiOutlinePencilSquare size={22} />
                    </button>
                    <button
                      className="p-4 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                      onClick={() => handleDelete(event.id)}
                      disabled={saving}
                      title="Delete"
                    >
                      <HiOutlineTrash size={22} />
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>
        <button
          className="lg:hidden fixed bottom-8 right-8 bg-red-600 text-white p-5 shadow-2xl z-50"
          onClick={() => openModal('create')}
        >
          <HiOutlinePlus size={28} />
        </button>
      </div>
    {/* Top-right notification */}
    {notify.message && (
      <div className={`fixed top-6 right-6 z-[9999] px-6 py-3 shadow-xl font-bold text-white text-sm transition-all animate-fadeIn ${notify.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
        {notify.message}
      </div>
    )}
    {/* Modal for create/edit/details */}
    {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white shadow-2xl p-0 w-full max-w-lg relative animate-fadeInUp border-4 border-blue-200 max-h-[90vh] flex flex-col overflow-y-auto">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-3xl font-black"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="overflow-y-auto p-8 flex-1">
            {modalMode === 'create' && (
              <>
                <h3 className="text-xl font-black mb-4 text-blue-800">Add Event</h3>
                <form onSubmit={handleCreate} className="space-y-4">
                  <input name="title" required value={form.title} onChange={handleFormChange} className="w-full border p-3" placeholder="Title" />
                  <input name="date" type="datetime-local" required value={form.date} onChange={handleFormChange} className="w-full border  p-3" placeholder="Date" />
                  <input name="location" required value={form.location} onChange={handleFormChange} className="w-full border p-3" placeholder="Location" />
                  <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full border p-3" placeholder="Description" />
                  <div>
                    <label className="block font-bold mb-1">Thumbnail</label>
                    <label className="flex items-center gap-3 cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2 w-fit transition">
                      <span className="text-slate-600 font-semibold">
                        {form.thumbnail ? form.thumbnail.name : 'Choose file'}
                      </span>
                      <input type="file" name="thumbnail" accept="image/*" ref={thumbInputRef} onChange={handleFormChange} className="hidden" />
                    </label>
                    {previewThumb && <img src={previewThumb} alt="Preview" className="w-24 h-24 object-cover border mt-2" />}
                  </div>
                  <button disabled={saving} className="w-full bg-gradient-to-tr from-blue-600 to-red-400 text-white font-bold py-3 shadow hover:scale-105 transition">{saving ? 'Saving...' : 'Create Event'}</button>
                </form>
              </>
            )}
            {modalMode === 'edit' && (
              <>
                <h3 className="text-xl font-black mb-4 text-red-700">Edit Event</h3>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <input name="title" required value={form.title} onChange={handleFormChange} className="w-full border p-3" placeholder="Title" />
                  <input name="date" type="datetime-local" required value={form.date} onChange={handleFormChange} className="w-full border p-3" placeholder="Date" />
                  <input name="location" required value={form.location} onChange={handleFormChange} className="w-full border p-3" placeholder="Location" />
                  <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full border p-3" placeholder="Description" />
                  <div>
                    <label className="block font-bold mb-1">Thumbnail</label>
                    <label className="flex items-center gap-3 cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2 w-fit transition">
                      <span className="text-slate-600 font-semibold">
                        {form.thumbnail ? form.thumbnail.name : 'Choose file'}
                      </span>
                      <input type="file" name="thumbnail" accept="image/*" ref={thumbInputRef} onChange={handleFormChange} className="hidden" />
                    </label>
                    {previewThumb && <img src={previewThumb} alt="Preview" className="w-24 h-24 object-cover border mt-2" />}
                  </div>
                  <button disabled={saving} className="w-full bg-gradient-to-tr from-red-400 to-blue-600 text-white font-bold py-3  shadow hover:scale-105 transition">{saving ? 'Saving...' : 'Update Event'}</button>
                </form>
              </>
            )}
            {modalMode === 'details' && selectedEvent && (
              <>
                <h3 className="text-xl font-black mb-4 text-gray-800">Event Details</h3>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="font-bold text-lg text-blue-900">{selectedEvent.title}</div>
                  <div className="text-xs text-gray-500">Date: {selectedEvent.date ? new Date(selectedEvent.date).toLocaleString() : 'N/A'}</div>
                  <div className="text-xs text-gray-500">Location: {selectedEvent.location}</div>
                  <div className="text-xs text-gray-500">Description: {selectedEvent.description}</div>
                  {selectedEvent.thumbnail && (
                    <img
                      src={selectedEvent.thumbnail.startsWith('/') ? selectedEvent.thumbnail : previewThumb || selectedEvent.thumbnail}
                      alt="Event Thumbnail"
                      className="w-32 h-32 object-cover border mt-2"
                    />
                  )}
                </div>
              </>
            )}
          </div>
          {/* Details modal code is now only above, not duplicated */}
        </div>
      </div>
    )}
    </div>
  );
};

export default AdminEvents;
