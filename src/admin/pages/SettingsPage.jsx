import { useState, useEffect } from 'react';
import * as api from '../../services/api.js';

const PRESET_KEYS = [
  { key: 'about_video_id', label: 'About Section YouTube Video ID', group: 'content', hint: 'YouTube video ID (11 chars) for the About section video player' },
  { key: 'site_name', label: 'Site Name', group: 'general', hint: 'Name of the website' },
  { key: 'contact_email', label: 'Contact Email', group: 'general', hint: 'Public contact email address' },
];

function Toast({ toast }) {
  if (!toast) return null;
  return <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-white font-semibold shadow-lg ${toast.type === 'error' ? 'bg-red-600' : 'bg-teal-600'}`}>{toast.msg}</div>;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState({});
  const [editValues, setEditValues] = useState({});
  const [saving, setSaving] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  useEffect(() => { fetchSettings(); }, []);

  async function fetchSettings() {
    setLoading(true);
    try {
      const d = await api.getAdminSettings();
      setSettings(d.data || []);
      setError(null);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  function startEdit(s) {
    setEditing(p => ({ ...p, [s.key]: true }));
    setEditValues(p => ({ ...p, [s.key]: s.value || '' }));
  }

  function cancelEdit(key) {
    setEditing(p => ({ ...p, [key]: false }));
  }

  async function handleSave(s) {
    setSaving(p => ({ ...p, [s.key]: true }));
    try {
      await api.updateSetting(s.key, { value: editValues[s.key] });
      showToast(`"${s.key}" updated`);
      setEditing(p => ({ ...p, [s.key]: false }));
      fetchSettings();
    } catch (err) { showToast(err.message, 'error'); }
    finally { setSaving(p => ({ ...p, [s.key]: false })); }
  }

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newGroup, setNewGroup] = useState('general');
  const [addingSetting, setAddingSetting] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);

  async function handleAddSetting(e) {
    e.preventDefault();
    if (!newKey.trim()) return;
    setAddingSetting(true);
    try {
      await api.updateSetting(newKey.trim(), { value: newValue, group: newGroup });
      showToast(`Setting "${newKey}" created`);
      setNewKey(''); setNewValue(''); setNewGroup('general'); setShowNewForm(false);
      fetchSettings();
    } catch (err) { showToast(err.message, 'error'); }
    finally { setAddingSetting(false); }
  }

  const existingKeys = new Set(settings.map(s => s.key));
  const suggestedPresets = PRESET_KEYS.filter(p => !existingKeys.has(p.key));

  const grouped = settings.reduce((acc, s) => {
    const g = s.group || 'general';
    if (!acc[g]) acc[g] = [];
    acc[g].push(s);
    return acc;
  }, {});

  return (
    <div>
      <Toast toast={toast} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Site Settings</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage global configuration key-value pairs</p>
        </div>
        <button onClick={() => setShowNewForm(v => !v)} className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold rounded-xl">+ New Setting</button>
      </div>

      {showNewForm && (
        <div className="bg-gray-900 border border-teal-700/50 rounded-2xl p-5 mb-6">
          <h3 className="text-white font-bold text-sm mb-4">Add New Setting</h3>
          {suggestedPresets.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-400 text-xs mb-2 font-semibold uppercase tracking-wide">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPresets.map(p => (
                  <button key={p.key} onClick={() => { setNewKey(p.key); setNewGroup(p.group); }}
                    className="px-3 py-1.5 bg-teal-900/50 border border-teal-700/50 text-teal-400 text-xs font-semibold rounded-lg hover:bg-teal-900 transition-colors">
                    {p.key}
                  </button>
                ))}
              </div>
              {newKey && PRESET_KEYS.find(p => p.key === newKey)?.hint && (
                <p className="text-gray-500 text-xs mt-2">💡 {PRESET_KEYS.find(p => p.key === newKey).hint}</p>
              )}
            </div>
          )}
          <form onSubmit={handleAddSetting} className="flex flex-col sm:flex-row gap-3">
            <input className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500" placeholder="Key (e.g. about_video_id)" value={newKey} onChange={e => setNewKey(e.target.value)} required />
            <input className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500" placeholder="Value" value={newValue} onChange={e => setNewValue(e.target.value)} />
            <input className="w-32 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500" placeholder="Group" value={newGroup} onChange={e => setNewGroup(e.target.value)} />
            <button type="submit" disabled={addingSetting} className="px-4 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg whitespace-nowrap">{addingSetting ? 'Adding...' : 'Add'}</button>
            <button type="button" onClick={() => setShowNewForm(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg">Cancel</button>
          </form>
        </div>
      )}

      {loading && <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div>}
      {error && <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-xl p-4 text-sm">{error}</div>}

      {!loading && !error && (
        <div className="space-y-6">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-700 bg-gray-800/50">
                <h2 className="text-sm font-black text-teal-400 uppercase tracking-widest">{group}</h2>
              </div>
              <div className="divide-y divide-gray-800">
                {items.map(s => (
                  <div key={s._id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-sm">{s.key}</span>
                        {s.label && <span className="text-gray-500 text-xs">— {s.label}</span>}
                      </div>
                      {!editing[s.key] && (
                        <p className="text-gray-400 text-sm mt-0.5 break-all">{s.value || <span className="italic text-gray-600">empty</span>}</p>
                      )}
                      {editing[s.key] && (
                        <div className="mt-2 flex gap-2">
                          <input
                            className="flex-1 px-3 py-1.5 bg-gray-800 border border-teal-500 rounded-lg text-white text-sm focus:outline-none"
                            value={editValues[s.key]}
                            onChange={e => setEditValues(p => ({ ...p, [s.key]: e.target.value }))}
                            onKeyDown={e => { if (e.key === 'Enter') handleSave(s); if (e.key === 'Escape') cancelEdit(s.key); }}
                            autoFocus
                          />
                          <button onClick={() => handleSave(s)} disabled={saving[s.key]} className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap">
                            {saving[s.key] ? '...' : 'Save'}
                          </button>
                          <button onClick={() => cancelEdit(s.key)} className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold rounded-lg transition-colors">Cancel</button>
                        </div>
                      )}
                    </div>
                    {!editing[s.key] && (
                      <button onClick={() => startEdit(s)} className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold rounded-lg transition-colors self-start sm:self-center">Edit</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(grouped).length === 0 && (
            <div className="text-center py-16 text-gray-500">No settings found</div>
          )}
        </div>
      )}
    </div>
  );
}
