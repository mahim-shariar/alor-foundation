import { useState } from 'react';
import * as api from '../../services/api.js';

const inp = 'w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500';
const lbl = 'block text-xs font-semibold text-gray-400 mb-1';

export default function ChangePasswordPage() {
  const [form, setForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.new_password !== form.confirm_password) { setMsg({ text: 'New passwords do not match', ok: false }); return; }
    setSaving(true); setMsg(null);
    try {
      await api.changePassword({ current_password: form.current_password, new_password: form.new_password });
      setMsg({ text: 'Password changed successfully!', ok: true });
      setForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) { setMsg({ text: err.message, ok: false }); }
    finally { setSaving(false); }
  }

  return (
    <div className="max-w-md">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Change Password</h1>
        <p className="text-gray-400 text-sm mt-0.5">Update your admin account password</p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={lbl}>Current Password *</label>
            <input type="password" required className={inp} value={form.current_password} onChange={set('current_password')} />
          </div>
          <div>
            <label className={lbl}>New Password *</label>
            <input type="password" required className={inp} value={form.new_password} onChange={set('new_password')} placeholder="Min 8 chars, uppercase, lowercase, number" />
          </div>
          <div>
            <label className={lbl}>Confirm New Password *</label>
            <input type="password" required className={inp} value={form.confirm_password} onChange={set('confirm_password')} />
          </div>

          {msg && (
            <div className={`px-4 py-3 rounded-xl text-sm font-semibold ${msg.ok ? 'bg-teal-900/40 text-teal-300 border border-teal-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
              {msg.text}
            </div>
          )}

          <div className="pt-2">
            <p className="text-gray-600 text-xs mb-3">Password must be at least 8 characters and contain uppercase, lowercase, and a number.</p>
            <button type="submit" disabled={saving} className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors">
              {saving ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
