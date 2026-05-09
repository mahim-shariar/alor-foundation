import { useState, useEffect } from 'react';
import * as api from '../../services/api.js';

function Toast({ toast }) {
  if (!toast) return null;
  return <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-white font-semibold shadow-lg ${toast.type === 'error' ? 'bg-red-600' : 'bg-teal-600'}`}>{toast.msg}</div>;
}

export default function ContactPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  useEffect(() => { fetchItems(); }, [filter]);

  async function fetchItems() {
    setLoading(true);
    try {
      const params = filter === 'unread' ? { is_read: false } : filter === 'read' ? { is_read: true } : {};
      const d = await api.getContactSubmissions(params);
      setItems(d.data || []);
      setError(null);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function handleMarkRead(id) {
    try { await api.markContactRead(id); showToast('Marked as read'); fetchItems(); }
    catch (err) { showToast(err.message, 'error'); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this submission?')) return;
    try { await api.deleteContact(id); showToast('Deleted'); if (expanded === id) setExpanded(null); fetchItems(); }
    catch (err) { showToast(err.message, 'error'); }
  }

  const unreadCount = items.filter(i => !i.is_read).length;

  return (
    <div>
      <Toast toast={toast} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Contact Submissions</h1>
          <p className="text-gray-400 text-sm mt-0.5">{unreadCount > 0 ? `${unreadCount} unread` : 'All messages read'}</p>
        </div>
        <div className="flex gap-2">
          {['all', 'unread', 'read'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${filter === f ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div>}
      {error && <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-xl p-4 text-sm">{error}</div>}

      {!loading && !error && (
        <div className="space-y-3">
          {items.length === 0 && <div className="text-center py-16 text-gray-500">No submissions found</div>}
          {items.map(item => (
            <div key={item._id} className={`bg-gray-900 border rounded-xl overflow-hidden transition-colors ${!item.is_read ? 'border-teal-700/60' : 'border-gray-700'}`}>
              <div
                className="px-5 py-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-gray-800/40 transition-colors"
                onClick={() => setExpanded(expanded === item._id ? null : item._id)}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {!item.is_read && <span className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />}
                    <span className="text-white font-semibold text-sm">{item.name}</span>
                    <span className="text-gray-500 text-xs">&lt;{item.email}&gt;</span>
                    {item.subject && <span className="text-teal-400 text-xs font-semibold">— {item.subject}</span>}
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{new Date(item.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!item.is_read && (
                    <button onClick={e => { e.stopPropagation(); handleMarkRead(item._id); }}
                      className="px-3 py-1.5 bg-teal-900/60 hover:bg-teal-700 text-teal-300 text-xs font-semibold rounded-lg transition-colors">
                      Mark Read
                    </button>
                  )}
                  <button onClick={e => { e.stopPropagation(); handleDelete(item._id); }}
                    className="px-3 py-1.5 bg-red-900/40 hover:bg-red-700 text-red-300 text-xs font-semibold rounded-lg transition-colors">
                    Delete
                  </button>
                </div>
              </div>
              {expanded === item._id && (
                <div className="px-5 pb-5 border-t border-gray-800">
                  <p className="text-gray-300 text-sm leading-relaxed mt-4 whitespace-pre-wrap">{item.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
