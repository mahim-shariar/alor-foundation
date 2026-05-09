import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import * as api from '../../services/api.js';

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <div className={`w-2 h-2 rounded-full ${color}`} />
      </div>
      <div className="text-3xl font-black text-white mb-1">{value ?? '—'}</div>
      <div className="text-gray-500 text-sm font-semibold">{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { admin } = useAuth();
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.getProjects({ limit: 1 }),
      api.getGallery({ limit: 1 }),
      api.getNews({ limit: 1 }),
      api.getStories({ limit: 1 }),
      api.getAllTeamMembers(),
      api.getContactSubmissions({ limit: 1 }),
      api.getNewsletterSubscribers(),
    ]).then(([projects, gallery, news, stories, team, contact, newsletter]) => {
      setCounts({
        projects: projects.value?.total ?? projects.value?.data?.length ?? 0,
        gallery: gallery.value?.total ?? gallery.value?.data?.length ?? 0,
        news: news.value?.total ?? news.value?.data?.length ?? 0,
        stories: stories.value?.total ?? stories.value?.data?.length ?? 0,
        team: Array.isArray(team.value) ? team.value.length : 0,
        contact: contact.value?.total ?? contact.value?.data?.length ?? 0,
        contactUnread: (contact.value?.data || []).filter(c => !c.is_read).length,
        newsletter: newsletter.value?.data?.length ?? newsletter.value?.total ?? 0,
      });
    }).finally(() => setLoading(false));
  }, []);

  const cards = [
    { icon: '🌾', label: 'Projects', value: counts.projects, color: 'bg-teal-500' },
    { icon: '🖼️', label: 'Gallery Items', value: counts.gallery, color: 'bg-emerald-500' },
    { icon: '📰', label: 'News Articles', value: counts.news, color: 'bg-blue-500' },
    { icon: '📖', label: 'Stories', value: counts.stories, color: 'bg-purple-500' },
    { icon: '👥', label: 'Team Members', value: counts.team, color: 'bg-amber-500' },
    { icon: '✉️', label: 'Contact Submissions', value: counts.contact, color: 'bg-rose-500' },
    { icon: '📬', label: 'Unread Messages', value: counts.contactUnread, color: 'bg-red-500' },
    { icon: '📧', label: 'Newsletter Subscribers', value: counts.newsletter, color: 'bg-cyan-500' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-black tracking-tight">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back, <span className="text-teal-400 font-semibold">{admin?.username || 'Admin'}</span>
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>
      )}

      {/* Quick links */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-bold text-base mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: '/admin/projects', label: 'Add Project', icon: '🌾' },
            { href: '/admin/news', label: 'Add News', icon: '📰' },
            { href: '/admin/stories', label: 'Add Story', icon: '📖' },
            { href: '/admin/contact', label: 'View Messages', icon: '✉️' },
          ].map(({ href, label, icon }) => (
            <a key={href} href={href}
              className="flex flex-col items-center gap-2 p-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-750 hover:border-teal-700 transition-all text-center">
              <span className="text-2xl">{icon}</span>
              <span className="text-gray-300 text-xs font-semibold">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
