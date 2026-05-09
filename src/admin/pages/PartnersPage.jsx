import { useState, useEffect } from 'react';
import * as api from '../../services/api.js';

function Toast({ toast }) {
  if (!toast) return null;
  return <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-white font-semibold shadow-lg ${toast.type === 'error' ? 'bg-red-600' : 'bg-teal-600'}`}>{toast.msg}</div>;
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

const EMPTY = { name: '', logo_url: '', website: '', display_order: 0, is_active: true };
const inp = 'w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500';
const lbl = 'block text-xs font-semibold text-gray-400 mb-1';

export default function PartnersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    try { const d = await api.getPartners(); setItems(d.data || []); setError(null); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  function openAdd() { setForm(EMPTY); setEditItem(null); setShowForm(true); }
  function openEdit(item) {
    setForm({ name: item.name || '', logo_url: item.logo_url || '', website: item.website || '', display_order: item.display_order || 0, is_active: item.is_active !== false });
    setEditItem(item);
    setShowForm(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) { await api.updatePartner(editItem._id, form); showToast('Partner updated'); }
      else { await api.createPartner(form); showToast('Partner created'); }
      setShowForm(false); fetchItems();
    } catch (err) { showToast(err.message, 'error'); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this partner?')) return;
    try { await api.deletePartner(id); showToast('Partner deleted'); fetchItems(); }
    catch (err) { showToast(err.message, 'error'); }
  }

  return (
    <div>
      <Toast toast={toast} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Partners</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage partner organizations and logos</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-sm transition-colors">+ Add Partner</button>
      </div>

      {loading && <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div>}
      {error && <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-xl p-4 text-sm">{error}</div>}

      {!loading && !error && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-700">
              <th className="text-left px-4 py-3 text-gray-400 font-semibold">Logo</th>
              <th className="text-left px-4 py-3 text-gray-400 font-semibold">Name</th>
              <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden md:table-cell">Website</th>
              <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden sm:table-cell">Order</th>
              <th className="text-left px-4 py-3 text-gray-400 font-semibold">Active</th>
              <th className="text-left px-4 py-3 text-gray-400 font-semibold">Actions</th>
            </tr></thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={6} className="text-center py-12 text-gray-500">No partners yet</td></tr>}
              {items.map(item => (
                <tr key={item._id} className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors">
                  <td className="px-4 py-3">
                    {item.logo_url ? <img src={item.logo_url} alt={item.name} className="h-8 w-20 object-contain bg-white rounded p-0.5" /> : <span className="text-gray-600 text-xs">No logo</span>}
                  </td>
                  <td className="px-4 py-3 text-white font-semibold">{item.name}</td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                    {item.website ? <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline truncate block max-w-[160px]">{item.website}</a> : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{item.display_order}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.is_active !== false ? 'bg-teal-900/50 text-teal-400' : 'bg-red-900/50 text-red-400'}`}>{item.is_active !== false ? 'Yes' : 'No'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(item)} className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold rounded-lg transition-colors">Edit</button>
                      <button onClick={() => handleDelete(item._id)} className="px-3 py-1.5 bg-red-900/60 hover:bg-red-700 text-red-300 text-xs font-semibold rounded-lg transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <Modal title={editItem ? 'Edit Partner' : 'Add Partner'} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <div><label className={lbl}>Name *</label><input required className={inp} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div><label className={lbl}>Logo URL</label><input className={inp} value={form.logo_url} onChange={e => setForm(p => ({ ...p, logo_url: e.target.value }))} placeholder="https://..." /></div>
            {form.logo_url && <img src={form.logo_url} alt="preview" className="h-10 object-contain bg-white rounded p-1" />}
            <div><label className={lbl}>Website</label><input className={inp} value={form.website} onChange={e => setForm(p => ({ ...p, website: e.target.value }))} placeholder="https://..." /></div>
            <div><label className={lbl}>Display Order</label><input type="number" className={inp} value={form.display_order} onChange={e => setForm(p => ({ ...p, display_order: Number(e.target.value) }))} /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} className="rounded" />
              <label htmlFor="is_active" className="text-sm text-gray-300">Active (visible on site)</label>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors">{saving ? 'Saving...' : editItem ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
