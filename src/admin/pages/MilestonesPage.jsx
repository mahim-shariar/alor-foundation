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
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

const empty = { year: '', title: '', description: '', icon: '', display_order: 0 };

export default function MilestonesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(msg, type = 'success') { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); }

  async function load() {
    setLoading(true);
    try { const d = await api.getMilestones(); setItems(d.data || d.milestones || []); } catch { setItems([]); }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(empty); setModal('add'); }
  function openEdit(item) { setForm({ year: item.year || '', title: item.title || '', description: item.description || item.desc || '', icon: item.icon || '', display_order: item.display_order ?? 0 }); setModal(item._id); }

  async function handleSave(e) {
    e.preventDefault(); setSaving(true);
    const payload = { ...form, year: form.year ? Number(form.year) : undefined };
    try {
      if (modal === 'add') { await api.createMilestone(payload); showToast('Created'); }
      else { await api.updateMilestone(modal, payload); showToast('Updated'); }
      setModal(null); load();
    } catch (err) { showToast(err.message, 'error'); }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this milestone?')) return;
    try { await api.deleteMilestone(id); showToast('Deleted'); load(); } catch (err) { showToast(err.message, 'error'); }
  }

  const inp = 'w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500';
  const f = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div>
      <Toast toast={toast} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-black">Milestones</h1>
        <button onClick={openAdd} className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold rounded-xl">+ Add New</button>
      </div>
      {loading ? <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-700 text-gray-400 text-xs uppercase">
              <th className="text-left px-4 py-3">Year</th>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Icon</th>
              <th className="text-left px-4 py-3">Order</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr></thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={5} className="text-center text-gray-500 py-12">No milestones found</td></tr>}
              {items.map(item => (
                <tr key={item._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-teal-900/50 text-teal-400 text-xs font-bold rounded-full">{item.year}</span></td>
                  <td className="px-4 py-3 text-white font-semibold">{item.title}</td>
                  <td className="px-4 py-3 text-xl">{item.icon}</td>
                  <td className="px-4 py-3 text-gray-500">{item.display_order}</td>
                  <td className="px-4 py-3"><div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="text-xs px-3 py-1 bg-blue-900/50 text-blue-400 border border-blue-800 rounded-lg hover:bg-blue-900">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-xs px-3 py-1 bg-red-900/50 text-red-400 border border-red-800 rounded-lg hover:bg-red-900">Del</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modal && (
        <Modal title={modal === 'add' ? 'Add Milestone' : 'Edit Milestone'} onClose={() => setModal(null)}>
          <form onSubmit={handleSave} className="space-y-3">
            <div><label className="block text-gray-400 text-xs font-bold mb-1 uppercase">Year</label><input type="number" className={inp} value={form.year} onChange={e => f('year', e.target.value)} required placeholder="2023" /></div>
            <div><label className="block text-gray-400 text-xs font-bold mb-1 uppercase">Title</label><input className={inp} value={form.title} onChange={e => f('title', e.target.value)} required /></div>
            <div><label className="block text-gray-400 text-xs font-bold mb-1 uppercase">Description</label><textarea className={inp} rows={3} value={form.description} onChange={e => f('description', e.target.value)} /></div>
            <div><label className="block text-gray-400 text-xs font-bold mb-1 uppercase">Icon (emoji)</label><input className={inp} value={form.icon} onChange={e => f('icon', e.target.value)} /></div>
            <div><label className="block text-gray-400 text-xs font-bold mb-1 uppercase">Display Order</label><input type="number" className={inp} value={form.display_order} onChange={e => f('display_order', Number(e.target.value))} /></div>
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
