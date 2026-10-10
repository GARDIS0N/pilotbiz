import React, { useState } from 'react';
import { User, UserRole, Grade } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';
import { AVATARS } from '../../utils/avatars.js';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  grades: Grade[];
  onAuthSuccess: (user: User) => void;
  onOpenLoginPage?: () => void;
  onLogout?: () => void;
}

const KENYAN_COUNTIES = [
  'Nairobi', 'Nakuru', 'Mombasa', 'Kisumu', 'Uasin Gishu', 
  'Machakos', 'Kiambu', 'Nyeri', 'Kilifi', 'Kakamega', 'Meru'
];

export const AuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  grades,
  onAuthSuccess,
  onOpenLoginPage,
  onLogout
}) => {
  const [mode, setMode] = useState<'QUICK_SWITCH' | 'REGISTER' | 'LOGIN'>('QUICK_SWITCH');
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gradeId, setGradeId] = useState(grades[1]?.id || 'grade-4');
  const [county, setCounty] = useState('Nakuru');
  const [schoolName, setSchoolName] = useState('Simba Primary Academy');
  const [selectedAvatar, setSelectedAvatar] = useState('cheetah');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickSwitch = async (targetRole: UserRole) => {
    try {
      sound.playClick();
      setLoading(true);
      setErrorMsg(null);
      const res = await cbeApi.switchRole(targetRole);
      sound.playCorrect();
      onAuthSuccess(res.user);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to switch role');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sound.playClick();
      setLoading(true);
      setErrorMsg(null);
      const res = await cbeApi.register({
        name: name.trim(),
        email: email.trim(),
        role,
        gradeId,
        county,
        schoolName: schoolName.trim(),
        avatar: selectedAvatar
      });
      sound.playCorrect();
      onAuthSuccess(res.user);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sound.playClick();
      setLoading(true);
      setErrorMsg(null);
      const res = await cbeApi.login(email.trim());
      sound.playCorrect();
      onAuthSuccess(res.user);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5 my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦁</span>
            <div>
              <h3 className="text-lg font-black text-white">Welcome to Jifuno</h3>
              <p className="text-xs text-emerald-400">Start your Jifuno journey • Learn. Play. Level Up.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-gray-400 hover:text-white font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-2xl border border-emerald-950">
          <button
            type="button"
            onClick={() => setMode('QUICK_SWITCH')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'QUICK_SWITCH' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Demo Accounts
          </button>
          <button
            type="button"
            onClick={() => setMode('REGISTER')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'REGISTER' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            New Student Sign Up
          </button>
          <button
            type="button"
            onClick={() => setMode('LOGIN')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'LOGIN' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Log In
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs text-center font-bold">
            {errorMsg}
          </div>
        )}

        {/* Mode 1: Quick Role Switcher for Test / Demo */}
        {mode === 'QUICK_SWITCH' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400">
              Select any pre-configured Kenyan CBE demo persona to test that role's complete experience:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickSwitch('STUDENT')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                  currentUser?.role === 'STUDENT'
                    ? 'border-emerald-400 bg-emerald-950/80 ring-2 ring-emerald-400/40'
                    : 'border-slate-800 bg-slate-950/60 hover:border-emerald-700'
                }`}
              >
                <span className="text-3xl">🐆</span>
                <div>
                  <h4 className="text-xs font-black text-white">Amina Kiprono</h4>
                  <span className="text-[10px] text-emerald-400 font-bold block">STUDENT • Grade 4</span>
                  <span className="text-[10px] text-gray-400">Simba Academy, Nakuru</span>
                </div>
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickSwitch('PARENT')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                  currentUser?.role === 'PARENT'
                    ? 'border-teal-400 bg-teal-950/80 ring-2 ring-teal-400/40'
                    : 'border-slate-800 bg-slate-950/60 hover:border-teal-700'
                }`}
              >
                <span className="text-3xl">🦉</span>
                <div>
                  <h4 className="text-xs font-black text-white">Mama Amina</h4>
                  <span className="text-[10px] text-teal-400 font-bold block">PARENT PORTAL</span>
                  <span className="text-[10px] text-gray-400">Home coaching & progress</span>
                </div>
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickSwitch('TEACHER')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                  currentUser?.role === 'TEACHER'
                    ? 'border-blue-400 bg-blue-950/80 ring-2 ring-blue-400/40'
                    : 'border-slate-800 bg-slate-950/60 hover:border-blue-700'
                }`}
              >
                <span className="text-3xl">🦁</span>
                <div>
                  <h4 className="text-xs font-black text-white">Mwalimu Ochieng</h4>
                  <span className="text-[10px] text-blue-400 font-bold block">TEACHER PORTAL</span>
                  <span className="text-[10px] text-gray-400">Grade 4 Simba Champions</span>
                </div>
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickSwitch('ADMIN')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                  currentUser?.role === 'ADMIN'
                    ? 'border-purple-400 bg-purple-950/80 ring-2 ring-purple-400/40'
                    : 'border-slate-800 bg-slate-950/60 hover:border-purple-700'
                }`}
              >
                <span className="text-3xl">🦅</span>
                <div>
                  <h4 className="text-xs font-black text-white">CBE Admin Wanjala</h4>
                  <span className="text-[10px] text-purple-400 font-bold block">CONTENT ADMIN</span>
                  <span className="text-[10px] text-gray-400">Curriculum approval pipeline</span>
                </div>
              </button>
            </div>

            {currentUser && onLogout && (
              <div className="pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onLogout();
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl border border-rose-500/40 hover:bg-rose-950/40 text-rose-300 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>🚪</span>
                  <span>Log Out to Welcome Screen / Ondoka</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mode 2: Register New Student */}
        {mode === 'REGISTER' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Student Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Juma Mwangi"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Email / Parent Contact</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. juma@jifuno.ke"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-300 font-bold block mb-1">Select Grade</label>
                <select
                  value={gradeId}
                  onChange={(e) => setGradeId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
                >
                  {grades.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-300 font-bold block mb-1">Kenyan County</label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
                >
                  {KENYAN_COUNTIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g. Nairobi Primary School"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>

            {/* Choose Avatar */}
            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1.5">Choose Your Mascot Avatar</label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {Object.values(AVATARS).map(av => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setSelectedAvatar(av.id)}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-all ${
                      selectedAvatar === av.id
                        ? 'border-2 border-amber-400 bg-amber-500/20 scale-110 shadow-md'
                        : 'border border-slate-700 bg-slate-950 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {av.emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl transition-all cursor-pointer"
            >
              START YOUR JIFUNO JOURNEY 🚀
            </button>
          </form>
        )}

        {/* Mode 3: Log In */}
        {mode === 'LOGIN' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Account Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. amina@jifuno.ke"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl transition-all cursor-pointer"
            >
              LOG IN TO JIFUNO ➔
            </button>
          </form>
        )}

        {onOpenLoginPage && (
          <div className="pt-2 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLoginPage();
              }}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1.5 mx-auto cursor-pointer hover:underline"
            >
              <span>🔑</span>
              <span>Open Dedicated Log In Page ➔</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
