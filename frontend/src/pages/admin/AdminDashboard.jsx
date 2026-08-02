
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiOutlineDocumentText, 
  HiOutlineUserGroup, 
  HiOutlineCog, 
  HiOutlineHome,
  HiOutlineArchiveBox as  HiOutlinePhotograph,
  HiOutlineArrowTrendingUp,
  HiOutlineBell
} from 'react-icons/hi2';
import apiService from '../../api/api';
import { useAuth } from '../../context/useAuth';

const quickLinks = [
  {
    to: '/admin/content',
    label: 'Content',
    icon: <HiOutlineDocumentText size={28} />,
    color: 'bg-red-500',
    shadow: 'shadow-red-200',
    desc: 'Articles & Posts'
  },
  {
    to: '/admin/foundation',
    label: 'Foundation',
    icon: <HiOutlineHome size={28} />,
    color: 'bg-amber-500',
    shadow: 'shadow-amber-200',
    desc: 'Programs'
  },
  {
    to: '/admin/users',
    label: 'Users',
    icon: <HiOutlineUserGroup size={28} />,
    color: 'bg-blue-600',
    shadow: 'shadow-blue-200',
    desc: 'Community'
  },
  {
    to: '/admin/media_gallery',
    label: 'Gallery',
    icon: <HiOutlinePhotograph size={28} />,
    color: 'bg-emerald-500',
    shadow: 'shadow-emerald-200',
    desc: 'Digital Assets'
  },
  {
    to: '/admin/settings',
    label: 'Settings',
    icon: <HiOutlineCog size={28} />,
    color: 'bg-slate-700',
    shadow: 'shadow-slate-200',
    desc: 'System Config'
  },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    posts: null,
    users: null,
    media: null,
    programs: null,
    events: null,
  });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  const displayName = user?.username || user?.email?.split('@')[0] || 'Admin';

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        const [postsRes, usersRes, mediaRes, programsRes, eventsRes] = await Promise.all([
          apiService.get('/api/content/posts/'),
          apiService.get('/api/accounts/users/'),
          apiService.get('/api/media/assets/'),
          apiService.get('/api/foundation/programs/'),
          apiService.get('/api/foundation/events/'),
        ]);
        setStats({
          posts: postsRes.data.length,
          users: usersRes.data.length,
          media: mediaRes.data.length,
          programs: programsRes.data.length,
          events: eventsRes.data.length,
        });
        // For logs, use latest 5 posts and events
        const logsArr = [];
        postsRes.data.slice(0, 3).forEach(post => logsArr.push({
          user: post.author ? post.author : 'Unknown',
          act: `published "${post.title}"`,
          time: new Date(post.created_at).toLocaleString()
        }));
        eventsRes.data.slice(0, 2).forEach(event => logsArr.push({
          user: event.author ? event.author : 'System',
          act: `created event "${event.title}"`,
          time: new Date(event.created_at || event.date).toLocaleString()
        }));
        setLogs(logsArr);
      } catch {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
              {greeting}, <span className="text-red-600">{displayName}</span>
            </h2>
            <p className="text-slate-500 mt-2 font-medium">Here's what is happening with New Dawuro Media today.</p>
          </div>
        </header>

        {/* Loading/Error State */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-bold text-lg">Loading dashboard... Please try again later!</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold text-lg">{error}</div>
        ) : (
          <>
            {/* Dynamic Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total Posts</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-black text-slate-800">{stats.posts}</h4>
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-50 text-red-600 flex items-center gap-1">
                    <HiOutlineArrowTrendingUp />
                  </span>
                </div>
              </div>
              <div className="bg-white p-6 shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Active Programs</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-black text-slate-800">{stats.programs}</h4>
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-50 text-amber-600 flex items-center gap-1">
                    <HiOutlineArrowTrendingUp />
                  </span>
                </div>
              </div>
              <div className="bg-white p-6 shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total Users</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-black text-slate-800">{stats.users}</h4>
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-50 text-blue-600 flex items-center gap-1">
                    <HiOutlineArrowTrendingUp />
                  </span>
                </div>
              </div>
              <div className="bg-white p-6 shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Media Items</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-black text-slate-800">{stats.media}</h4>
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-50 text-emerald-600 flex items-center gap-1">
                    <HiOutlineArrowTrendingUp />
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Quick Links Section */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  Quick Management <div className="h-1 flex-1 bg-slate-100" />
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {quickLinks.map(link => (
                    <Link
                      to={link.to}
                      key={link.to}
                      className="group relative bg-white p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all flex flex-col items-center text-center overflow-hidden"
                    >
                      {/* Decorative Background Blob */}
                      <div className={`absolute -top-10 -right-10 w-24 h-24 ${link.color} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl`} />
                      <div className={`${link.color} ${link.shadow} text-white p-4 mb-4 group-hover:scale-110 transition-transform`}>
                        {link.icon}
                      </div>
                      <span className="font-black text-slate-800 uppercase tracking-tighter text-sm">{link.label}</span>
                      <span className="text-[10px] text-slate-400 font-bold mt-1">{link.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Activity / System Health */}
              <div className="lg:col-span-1">
                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  Logs <div className="h-1 flex-1 bg-slate-100" />
                </h3>
                <div className="bg-white p-8 border border-slate-100 shadow-sm">
                  <div className="space-y-6">
                    {logs.length === 0 ? (
                      <div className="text-slate-400 text-sm">No recent activity.</div>
                    ) : logs.map((log, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-2 h-2 bg-red-500 mt-2 shrink-0" />
                        <div>
                          <p className="text-sm text-slate-600 font-medium">
                            <span className="font-black text-slate-900">{log.user}</span> {log.act}
                          </p>
                          <span className="text-[10px] text-slate-400 uppercase font-black">{log.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest transition-colors">
                    View Full Audit Trail
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;