import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const NAV = [
  { section: 'Overview', items: [
    { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  ]},
  { section: 'Content', items: [
    { to: '/admin/stats', icon: '📈', label: 'Stats' },
    { to: '/admin/projects', icon: '🌾', label: 'Projects' },
    { to: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
    { to: '/admin/news', icon: '📰', label: 'News' },
    { to: '/admin/stories', icon: '📖', label: 'Stories' },
    { to: '/admin/team', icon: '👤', label: 'Team Members' },
    { to: '/admin/departments', icon: '🏢', label: 'Departments' },
    { to: '/admin/milestones', icon: '🏆', label: 'Milestones' },
    { to: '/admin/values', icon: '💎', label: 'Core Values' },
    { to: '/admin/faqs', icon: '❓', label: 'FAQs' },
    { to: '/admin/partners', icon: '🤝', label: 'Partners' },
  ]},
  { section: 'Settings', items: [
    { to: '/admin/settings', icon: '⚙️', label: 'Site Settings' },
  ]},
  { section: 'Messages', items: [
    { to: '/admin/contact', icon: '✉️', label: 'Contact Submissions' },
    { to: '/admin/newsletter', icon: '📧', label: 'Newsletter' },
  ]},
  { section: 'Account', items: [
    { to: '/admin/change-password', icon: '🔑', label: 'Change Password' },
    { to: '/admin/security-question', icon: '🔒', label: 'Security Question' },
  ]},
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-black text-sm">A</div>
          <div>
            <div className="text-white font-black text-sm leading-tight">Alor Foundation</div>
            <div className="text-gray-500 text-xs">Admin Portal</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV.map((section) => (
          <div key={section.section}>
            <p className="text-gray-600 text-[10px] font-bold tracking-widest uppercase px-2 mb-2">{section.section}</p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-teal-500/15 text-teal-400 border border-teal-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-gray-800 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            {admin?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold truncate">{admin?.username || 'Admin'}</p>
            <p className="text-gray-500 text-xs">Administrator</p>
          </div>
          <button onClick={handleLogout} title="Logout"
            className="text-gray-500 hover:text-red-400 transition-colors text-lg">
            ⏻
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col flex-shrink-0 bg-gray-900 border-r border-gray-800">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col z-50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          <button className="lg:hidden text-gray-400 hover:text-white transition-colors text-xl"
            onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm hidden sm:block">
              Welcome, <span className="text-white font-semibold">{admin?.username || 'Admin'}</span>
            </span>
            <button onClick={handleLogout}
              className="px-3 py-1.5 bg-red-900/40 border border-red-800/50 text-red-400 text-xs font-bold rounded-lg hover:bg-red-900/60 transition-all">
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
