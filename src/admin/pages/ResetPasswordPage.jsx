import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as api from '../../services/api.js';

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function loadQuestion() {
    setError('');
    setLoading(true);
    try {
      const data = await api.getSecurityQuestion();
      setQuestion(data.security_question || data.question || '');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Could not load security question');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.verifySecurityAnswer(answer);
      setResetToken(data.reset_token);
      setStep(3);
    } catch (err) {
      setError(err.message || 'Incorrect answer');
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    setError('');
    setLoading(true);
    try {
      await api.resetPassword(resetToken, newPassword);
      navigate('/admin/login');
    } catch (err) {
      setError(err.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">🔑</div>
          <h1 className="text-white text-2xl font-black tracking-tight">Reset Password</h1>
          <p className="text-gray-500 text-sm mt-1">Step {step} of 3</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {error && (
            <div className="bg-red-900/40 border border-red-800/50 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="text-center space-y-4">
              <p className="text-gray-400 text-sm">Click below to load your security question.</p>
              <button
                onClick={loadQuestion}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-xl text-sm hover:opacity-90 disabled:opacity-50">
                {loading ? 'Loading...' : 'Get Security Question'}
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <p className="text-gray-300 text-sm font-semibold mb-4">{question}</p>
                <label className="block text-gray-400 text-xs font-bold mb-1.5 tracking-wide uppercase">Your Answer</label>
                <input
                  type="text"
                  required
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-xl text-sm hover:opacity-90 disabled:opacity-50">
                {loading ? 'Verifying...' : 'Verify Answer'}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1.5 tracking-wide uppercase">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Min 8 chars, upper, lower, number"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1.5 tracking-wide uppercase">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-xl text-sm hover:opacity-90 disabled:opacity-50">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          <div className="text-center mt-5">
            <Link to="/admin/login" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
