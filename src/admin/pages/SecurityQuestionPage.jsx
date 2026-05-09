import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import * as api from '../../services/api.js';

const inp = 'w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500';
const lbl = 'block text-xs font-semibold text-gray-400 mb-1';

export default function SecurityQuestionPage() {
  const { admin } = useAuth();
  const [currentQ, setCurrentQ] = useState(null);
  const [form, setForm] = useState({ password: '', security_question: '', security_answer: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  useEffect(() => {
    api.getSecurityQuestion()
      .then(d => setCurrentQ(d.security_question))
      .catch(() => setCurrentQ(null));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true); setMsg(null);
    try {
      await api.changeSecurityQuestion(form);
      setMsg({ text: 'Security question updated successfully!', ok: true });
      setCurrentQ(form.security_question);
      setForm({ password: '', security_question: '', security_answer: '' });
    } catch (err) { setMsg({ text: err.message, ok: false }); }
    finally { setSaving(false); }
  }

  return (
    <div className="max-w-md">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Security Question</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage your password recovery security question</p>
      </div>

      {currentQ && (
        <div className="bg-teal-900/20 border border-teal-700/50 rounded-xl p-4 mb-5">
          <p className="text-xs text-teal-400 font-semibold uppercase tracking-wide mb-1">Current Security Question</p>
          <p className="text-white text-sm">{currentQ}</p>
        </div>
      )}

      {!currentQ && admin?.has_security_question === false && (
        <div className="bg-amber-900/20 border border-amber-700/50 rounded-xl p-4 mb-5">
          <p className="text-amber-300 text-sm font-semibold">No security question set yet. Set one below to enable password recovery.</p>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={lbl}>Current Password (to verify) *</label>
            <input type="password" required className={inp} value={form.password} onChange={set('password')} />
          </div>
          <div>
            <label className={lbl}>New Security Question *</label>
            <input required className={inp} value={form.security_question} onChange={set('security_question')}
              placeholder="e.g. What was your first pet's name?" />
          </div>
          <div>
            <label className={lbl}>Security Answer *</label>
            <input required className={inp} value={form.security_answer} onChange={set('security_answer')}
              placeholder="Your answer (case-insensitive)" />
          </div>

          {msg && (
            <div className={`px-4 py-3 rounded-xl text-sm font-semibold ${msg.ok ? 'bg-teal-900/40 text-teal-300 border border-teal-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
              {msg.text}
            </div>
          )}

          <div className="pt-2">
            <p className="text-gray-600 text-xs mb-3">The security answer is case-insensitive and used to reset your password if you forget it.</p>
            <button type="submit" disabled={saving} className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors">
              {saving ? 'Updating...' : currentQ ? 'Update Security Question' : 'Set Security Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
