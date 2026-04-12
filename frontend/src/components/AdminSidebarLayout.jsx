import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminSidebar from '../pages/admin/AdminSidebar';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminContent from '../pages/admin/content/AdminContent';
import AdminFoundation from '../pages/admin/foundation/AdminFoundation';
import UserManagement from '../pages/admin/UserManagement';

import AdminEvents from '../pages/admin/foundation/AdminEvents';
import AdminMediaManagement from '../pages/admin/media_gallery/AdminMediaManagement';

import apiService from '../api/api';

// Placeholders for missing pages
const AdminSettings = () => <div className="p-6">Settings page coming soon.</div>;

const AdminSidebarLayout = () => {
  const [user, setUser] = useState(null);
  const [userCount, setUserCount] = useState(undefined);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch current user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiService.get('/api/accounts/profile/');
        setUser(res.data);
        // If admin, fetch user count
        if (res.data.role === 'admin' || res.data.role === 'superadmin') {
          try {
            // Replace with real endpoint for all users if available
            // const usersRes = await apiService.get('/api/accounts/users/');
            // setUserCount(usersRes.data.length);
            setUserCount(1); // Placeholder: only current user
          } catch {
            setUserCount(undefined);
          }
        }
      } catch {
        setUser(null);
      }
    };
    fetchProfile();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-[80] bg-gradient-to-r from-red-700 via-red-800 to-black text-white flex items-center px-4 h-16 shadow-xl">
        <button
          className="mr-4 bg-red-700 text-white rounded-full p-2 shadow-2xl"
          onClick={() => setMobileOpen(true)}
          aria-label="Open sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <span className="font-black text-lg tracking-widest uppercase">Admin Panel</span>
      </div>
      <AdminSidebar user={user} userCount={userCount} onLogout={handleLogout} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="flex-1 h-full overflow-y-auto bg-gray-50 pt-16 lg:pt-0">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="foundation" element={<AdminFoundation />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="media" element={<AdminMediaManagement />} />
          <Route path="settings" element={<AdminSettings />} />
          {/* fallback for unknown admin subroutes */}
          <Route path="*" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminSidebarLayout;
