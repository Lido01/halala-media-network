import React, { useState, useEffect } from 'react';
import apiService from '../../api/api';
import { 
  HiOutlineUserAdd, HiOutlineTrash, HiOutlinePencil, 
  HiOutlineX, HiOutlineUserCircle, HiOutlineSearch, 
  HiOutlineEye, HiOutlineDotsVertical, HiOutlineMail, HiOutlinePhone
} from 'react-icons/hi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit' | 'details'
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', phone: '', role: 'user', password: '' });
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.get('/api/accounts/users/');
      setUsers(res.data);
    } catch (err) {
      setError('System was unable to synchronize user records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (mode, user = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    if (mode === 'edit' && user) {
      setForm({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'user',
        password: '',
      });
    } else if (mode === 'create') {
      setForm({ username: '', email: '', phone: '', role: 'user', password: '' });
    }
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAction = async (e, type) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form };
    if (type === 'update' && !payload.password) delete payload.password;

    try {
      if (type === 'create') await apiService.post('/api/accounts/users/', payload);
      else await apiService.put(`/api/accounts/users/${selectedUser.id}/`, payload);
      setShowModal(false);
      fetchUsers();
    } catch {
      alert(`Critical error during user ${type}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('PERMANENT ACTION: Are you sure you want to delete this account?')) return;
    try {
      await apiService.delete(`/api/accounts/users/${userId}/`);
      fetchUsers();
    } catch {
      alert('Delete operation failed.');
    }
  };

  const filteredUsers = users.filter(user =>
    !search || 
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Glassmorphism Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">
              Staff <span className="text-red-600">Directory</span>
            </h1>
            <p className="text-slate-500 font-medium">Manage permissions and account security for Halala Media.</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Find a user..."
                className="w-full pl-12 pr-4 py-4 bg-white border-none shadow-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => openModal('create')}
              className="bg-red-600 hover:bg-red-700 text-white p-4 shadow-lg shadow-red-200 transition-all active:scale-95"
            >
              <HiOutlineUserAdd size={28} />
            </button>
          </div>
        </div>

        {/* User List Layout */}
        <div className="space-y-4">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white w-full" />)}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-20 bg-white shadow-sm">
              <HiOutlineUserCircle size={80} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 text-lg font-bold">No users match your criteria.</p>
            </div>
          ) : (
            filteredUsers.map(user => (
              <div 
                key={user.id} 
                className="group bg-white hover:bg-slate-50 border border-slate-100 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-md"
              >
                {/* User Info Block */}
                <div className="flex items-center gap-6 w-full md:w-1/3">
                  <div className="relative">
                    {user.profile_image ? (
                      <img src={user.profile_image} className="w-16 h-16 object-cover ring-4 ring-slate-50" alt="" />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-inner">
                        <span className="text-white font-black text-xl">{user.username.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                    <span className={`absolute -bottom-1 -right-1 w-5 h-5 border-4 border-white ${user.is_active !== false ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">{user.username}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                      <span className="flex items-center gap-1"><HiOutlineMail /> {user.email || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Role & Contact */}
                <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-1/3">
                   <div className={`px-4 py-1.5 text-[11px] font-black uppercase tracking-widest ${
                     user.role === 'admin' ? 'bg-red-100 text-red-600' : 
                     user.role === 'editor' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'
                   }`}>
                     {user.role}
                   </div>
                   <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
                     <HiOutlinePhone className="text-red-400" /> {user.phone || 'No Phone'}
                   </div>
                </div>

                {/* Actions Control Center */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openModal('details', user)}
                    className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <HiOutlineEye size={22} />
                  </button>
                  <button 
                    onClick={() => openModal('edit', user)}
                    className="p-3 text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
                  >
                    <HiOutlinePencil size={22} />
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <HiOutlineTrash size={22} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Unified Modal System */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-xl shadow-2xl relative overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-300">
              
              <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900">
                      {modalMode === 'create' ? 'Enroll New Staff' : modalMode === 'edit' ? 'Modify Account' : 'Security Brief'}
                    </h2>
                    <p className="text-slate-400 font-medium">Ensure all information is verified.</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="p-2 bg-slate-100 text-slate-400 hover:bg-red-600 hover:text-white transition-all">
                    <HiOutlineX size={24} />
                  </button>
                </div>

                {modalMode === 'details' ? (
                  <div className="space-y-8">
                    <div className="flex items-center gap-6 p-6 bg-slate-50">
                       {selectedUser?.profile_image ? (
                        <img src={selectedUser.profile_image} className="w-24 h-24 object-cover" alt="" />
                       ) : (
                        <div className="w-24 h-24 bg-red-600 flex items-center justify-center text-white text-3xl font-black">{selectedUser?.username.charAt(0)}</div>
                       )}
                       <div>
                         <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Global Identity</p>
                         <h4 className="text-2xl font-black text-slate-900">{selectedUser?.username}</h4>
                         <span className="text-red-600 font-bold">{selectedUser?.role}</span>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 border border-slate-100">
                         <p className="text-slate-400 text-xs font-bold mb-1">Email</p>
                         <p className="text-slate-800 font-bold">{selectedUser?.email}</p>
                       </div>
                       <div className="p-6 border border-slate-100">
                         <p className="text-slate-400 text-xs font-bold mb-1">Phone</p>
                         <p className="text-slate-800 font-bold">{selectedUser?.phone || 'Not Listed'}</p>
                       </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleAction(e, modalMode === 'create' ? 'create' : 'update')} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <input name="username" required placeholder="Display Name" value={form.username} onChange={handleFormChange} className="col-span-2 p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white outline-none font-bold" />
                      <input name="email" type="email" required placeholder="Primary Email" value={form.email} onChange={handleFormChange} className="col-span-2 p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white outline-none font-bold" />
                      <input name="phone" placeholder="Contact Phone" value={form.phone} onChange={handleFormChange} className="p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white outline-none font-bold" />
                      <select name="role" value={form.role} onChange={handleFormChange} className="p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white outline-none font-bold">
                        <option value="user">Standard User</option>
                        <option value="editor">Platform Editor</option>
                        <option value="admin">Administrator</option>
                      </select>
                      <input name="password" type="password" required={modalMode === 'create'} placeholder={modalMode === 'edit' ? "Password (Hidden)" : "Create Password"} value={form.password} onChange={handleFormChange} className="col-span-2 p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white outline-none font-bold" />
                    </div>
                    <button disabled={saving} className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black shadow-xl shadow-red-200 transition-all">
                      {saving ? 'Processing...' : modalMode === 'create' ? 'Confirm Registration' : 'Sync Changes'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;