import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../../services/api.js';

export default function SetupPage() {
  const [form, setForm] = useState({ password: '', security_question: '', security_answer: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.setup(form);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Setup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">🔒</div>
          <h1 className="text-white text-2xl font-black tracking-tight">Security Setup</h1>
          <p className="text-gray-500 text-sm mt-1">Configure your security question for password recovery</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {error && (
            <div className="bg-red-900/40 border border-red-800/50 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-bold mb-1.5 tracking-wide uppercase">Current Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Verify your current password"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-bold mb-1.5 tracking-wide uppercase">Security Question</label>
              <input
                type="text"
                required
                value={form.security_question}
                onChange={e => setForm({ ...form, security_question: e.target.value })}
                placeholder="e.g. What was your first pet's name?"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-bold mb-1.5 tracking-wide uppercase">Security Answer</label>
              <input
                type="text"
                required
                value={form.security_answer}
                onChange={e => setForm({ ...form, security_answer: e.target.value })}
                placeholder="Your answer"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2">
              {loading ? 'Saving...' : 'Complete Setup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
