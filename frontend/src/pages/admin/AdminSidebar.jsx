import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { Link, useLocation } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineCog,
  HiOutlineMenuAlt2,
  HiOutlineX,
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineHeart,
	HiFolder,
	HiOutlineChartBar,
} from 'react-icons/hi';

const AdminSidebar = ({ onLogout, mobileOpen, setMobileOpen }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

	const links = [
	{ to: '/admin/dashboard', label: 'Dashboard', icon: <HiOutlineHome size={22} /> },
	{ to: '/admin/users', label: 'Users', icon: <HiOutlineUserGroup size={22} /> },
	{ to: '/admin/content', label: 'Content', icon: <HiOutlineDocumentText size={22} /> },
	{ to: '/admin/foundation', label: 'Foundation', icon: <HiFolder size={22} /> },
	{ to: '/admin/media', label: 'Media Gallery', icon: <HiOutlineDocumentText size={22} /> },
	{ to: '/admin/events', label: 'Events', icon: <HiOutlineUserCircle size={22} /> },
	{ to: '/admin/reports', label: 'Reports', icon: <HiOutlineChartBar size={22} /> },
	{ to: '/admin/settings', label: 'Settings', icon: <HiOutlineCog size={22} /> },
];

  return (
    <>
      {/* Mobile Hamburger Toggle moved to header bar */}

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden transition-opacity" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* Sidebar Component */}
      <aside
        className={`fixed top-0 left-0 h-screen z-[70] bg-gradient-to-b from-red-700 via-red-800 to-black text-white shadow-2xl transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-72'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static flex flex-col`}
        style={{ minHeight: '100vh' }}
      >
        {/* Header Block */}
        <div className="flex flex-col gap-2 px-6 py-8 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between w-full">
            {!collapsed && (
              <span className="font-black text-2xl tracking-[0.2em] uppercase animate-in fade-in duration-500">
                {user?.role || 'Admin'}
              </span>
            )}
            {/* Mobile Close Button */}
            <button className="lg:hidden text-white" onClick={() => setMobileOpen(false)}>
              <HiOutlineX size={28} />
            </button>
            {/* Desktop Collapse Toggle */}
            <button
              className="hidden lg:block text-white/70 hover:text-white transition-colors"
              onClick={() => setCollapsed(!collapsed)}
            >
              <HiOutlineMenuAlt2 size={24} className={collapsed ? 'rotate-180 transition-transform' : ''} />
            </button>
          </div>
          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 mt-2" title={JSON.stringify(user)}>
              <div className="w-9 h-9 bg-gradient-to-tr from-red-600 to-red-400 flex items-center justify-center text-white font-black text-lg">
                {user.user_metadata?.full_name?.charAt(0)
                  || user.email?.charAt(0)
                  || user.email?.[0]
                  || user.username?.charAt(0)
                  || 'A'}
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white/70 leading-tight">
                    {user.user_metadata?.full_name
                      || user.email?.split('@')[0]
                      || user.email
                      || user.username
                      || 'Admin'}
                  </span>
                  <span className="text-[10px] uppercase text-white/40 font-black tracking-widest">Logged In</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="mt-6 flex-1 px-3 space-y-2 overflow-y-auto no-scrollbar">
          {links.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-4 py-4 font-bold uppercase tracking-widest text-xs transition-all
                  ${isActive 
                    ? 'bg-white text-red-800 shadow-lg shadow-black/20' 
                    : 'hover:bg-white/10 text-white/80 hover:text-white'}
                  ${collapsed ? 'justify-center px-0' : 'px-6'}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className={`${isActive ? 'scale-110' : ''} transition-transform`}>
                  {link.icon}
                </span>
                {!collapsed && <span className="truncate">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer/Logout Section */}
        <div className="p-4 border-t border-white/10 shrink-0 bg-black/20">
          <button
            className={`flex items-center gap-4 py-4 font-black uppercase tracking-widest text-xs transition-all 
              bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white w-full border border-red-600/30
              ${collapsed ? 'justify-center' : 'px-6'}`}
            onClick={onLogout}
          >
            <HiOutlineLogout size={24} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;