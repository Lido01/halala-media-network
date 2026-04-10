import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminSidebar from '../pages/admin/AdminSidebar';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminContent from '../pages/admin/content/AdminContent';
import AdminFoundation from '../pages/admin/foundation/AdminFoundation';
import UserManagement from '../pages/admin/UserManagement';
import AdminEvents from '../pages/admin/foundation/AdminEvents';

import apiService from '../api/api';

// Placeholders for missing pages
const AdminSettings = () => <div className="p-6">Settings page coming soon.</div>;

const AdminSidebarLayout = () => {
  const [user, setUser] = useState(null);
  const [userCount, setUserCount] = useState(undefined);
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
    <div className="flex">
      <AdminSidebar user={user} userCount={userCount} onLogout={handleLogout} />
      <div className="flex-1">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="foundation" element={<AdminFoundation />} />
          <Route path="users" element={<UserManagement />} />
          <Route path='events' element={<AdminEvents />} />
          <Route path="settings" element={<AdminSettings />} />
          {/* fallback for unknown admin subroutes */}
          <Route path="*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminSidebarLayout;
