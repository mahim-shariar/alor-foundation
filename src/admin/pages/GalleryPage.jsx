import { useState, useEffect } from 'react';
import * as api from '../../services/api.js';

function extractYoutubeId(input) {
  if (!input) return '';
  const m = input.match(/(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  if (/^[A-Za-z0-9_-]{11}$/.test(input.trim())) return input.trim();
  return input;
}

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
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

const empty = { title: '', category: '', type: 'image', url: '', youtube_id: '', display_order: 0, is_active: true };

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(msg, type = 'success') { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); }

  async function load() {
    setLoading(true);
    try { const d = await api.getGallery({ limit: 100 }); setItems(d.data || []); } catch { setItems([]); }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(empty); setModal('add'); }
  function openEdit(item) {
    setForm({
      title: item.title || '',
      category: item.category || '',
      type: item.type || 'image',
      url: item.url || '',
      youtube_id: item.youtube_id || '',
      display_order: item.display_order ?? 0,
      is_active: item.is_active !== false,
    });
    setModal(item._id);
  }

  async function handleSave(e) {
    e.preventDefault(); setSaving(true);
    try {
      if (modal === 'add') { await api.createGalleryItem(form); showToast('Created'); }
      else { await api.updateGalleryItem(modal, form); showToast('Updated'); }
      setModal(null); load();
    } catch (err) { showToast(err.message, 'error'); }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this item?')) return;
    try { await api.deleteGalleryItem(id); showToast('Deleted'); load(); } catch (err) { showToast(err.message, 'error'); }
  }

  const inp = 'w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500';
  const f = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div>
      <Toast toast={toast} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-black">Gallery</h1>
        <button onClick={openAdd} className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold rounded-xl">+ Add New</button>
      </div>
      {loading ? <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead><tr className="border-b border-gray-700 text-gray-400 text-xs uppercase">
                <th className="text-left px-4 py-3">Preview</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Active</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr></thead>
              <tbody>
                {items.length === 0 && <tr><td colSpan={6} className="text-center text-gray-500 py-12">No items found</td></tr>}
                {items.map(item => (
                  <tr key={item._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="px-4 py-3">
                      {item.type === 'image' && item.url ? <img src={item.url} alt="" className="w-12 h-9 object-cover rounded-lg" /> : <div className="w-12 h-9 bg-red-900/50 rounded-lg flex items-center justify-center text-xs text-red-400 font-bold">YT</div>}
                    </td>
                    <td className="px-4 py-3 text-white font-semibold max-w-[180px] truncate">{item.title}</td>
                    <td className="px-4 py-3 text-gray-400">{item.category}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-bold ${item.type === 'video' ? 'bg-red-900/50 text-red-400' : 'bg-blue-900/50 text-blue-400'}`}>{item.type}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-bold ${item.is_active !== false ? 'bg-green-900/50 text-green-400' : 'bg-gray-800 text-gray-500'}`}>{item.is_active !== false ? 'Yes' : 'No'}</span></td>
                    <td className="px-4 py-3"><div className="flex gap-2">
                      <button onClick={() => openEdit(item)} className="text-xs px-3 py-1 bg-blue-900/50 text-blue-400 border border-blue-800 rounded-lg hover:bg-blue-900">Edit</button>
                      <button onClick={() => handleDelete(item._id)} className="text-xs px-3 py-1 bg-red-900/50 text-red-400 border border-red-800 rounded-lg hover:bg-red-900">Del</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {modal && (
        <Modal title={modal === 'add' ? 'Add Gallery Item' : 'Edit Gallery Item'} onClose={() => setModal(null)}>
          <form onSubmit={handleSave} className="space-y-3">
            <div><label className="block text-gray-400 text-xs font-bold mb-1 uppercase">Title</label><input className={inp} value={form.title} onChange={e => f('title', e.target.value)} required /></div>
            <div><label className="block text-gray-400 text-xs font-bold mb-1 uppercase">Category</label><input className={inp} value={form.category} onChange={e => f('category', e.target.value)} /></div>
            <div><label className="block text-gray-400 text-xs font-bold mb-1 uppercase">Type</label>
              <select className={inp} value={form.type} onChange={e => f('type', e.target.value)}><option value="image">Image</option><option value="video">Video</option></select>
            </div>
            <div><label className="block text-gray-400 text-xs font-bold mb-1 uppercase">Image URL</label><input className={inp} value={form.url} onChange={e => f('url', e.target.value)} placeholder="https://..." /></div>
            <div><label className="block text-gray-400 text-xs font-bold mb-1 uppercase">YouTube URL (if video)</label><input className={inp} placeholder="Paste YouTube URL or ID" value={form.youtube_id} onChange={e => f('youtube_id', extractYoutubeId(e.target.value))} /></div>
            <div><label className="block text-gray-400 text-xs font-bold mb-1 uppercase">Display Order</label><input type="number" className={inp} value={form.display_order} onChange={e => f('display_order', Number(e.target.value))} /></div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer"><input type="checkbox" checked={form.is_active} onChange={e => f('is_active', e.target.checked)} className="accent-teal-500" /> Active</label>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-sm disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2.5 bg-gray-700 text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-600">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
