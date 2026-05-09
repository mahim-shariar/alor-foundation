import { useState, useEffect } from 'react';
import * as api from '../../services/api.js';

function Toast({ toast }) {
  if (!toast) return null;
  return <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-white font-semibold shadow-lg ${toast.type === 'error' ? 'bg-red-600' : 'bg-teal-600'}`}>{toast.msg}</div>;
}

export default function NewsletterPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    try { const d = await api.getNewsletterSubscribers(); setItems(d.data || []); setError(null); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Remove this subscriber?')) return;
    try { await api.deleteNewsletterSubscriber(id); showToast('Subscriber removed'); fetchItems(); }
    catch (err) { showToast(err.message, 'error'); }
  }

  const filtered = items.filter(i => i.email.toLowerCase().includes(search.toLowerCase()));
  const active = items.filter(i => i.is_active !== false).length;

  return (
    <div>
      <Toast toast={toast} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Newsletter Subscribers</h1>
          <p className="text-gray-400 text-sm mt-0.5">{items.length} total · {active} active</p>
        </div>
        <input
          className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-xl text-white text-sm focus:outline-none focus:border-teal-500 w-full sm:w-60"
          placeholder="Search by email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading && <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div>}
      {error && <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-xl p-4 text-sm">{error}</div>}

      {!loading && !error && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-700">
              <th className="text-left px-4 py-3 text-gray-400 font-semibold">Email</th>
              <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden sm:table-cell">Status</th>
              <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden md:table-cell">Subscribed</th>
              <th className="text-left px-4 py-3 text-gray-400 font-semibold">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={4} className="text-center py-12 text-gray-500">No subscribers found</td></tr>}
              {filtered.map(item => (
                <tr key={item._id} className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{item.email}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.is_active !== false ? 'bg-teal-900/50 text-teal-400' : 'bg-gray-800 text-gray-500'}`}>
                      {item.is_active !== false ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                    {new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(item._id)} className="px-3 py-1.5 bg-red-900/40 hover:bg-red-700 text-red-300 text-xs font-semibold rounded-lg transition-colors">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
