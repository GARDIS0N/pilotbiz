import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, UserRole, Grade } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';
import { AVATARS } from '../../utils/avatars.js';
import { useReducedMotionPreference, springTransition } from '../../utils/motion.js';
import { signInWithEmail, signUpWithEmail, isSupabaseConfigured } from '../../services/supabaseClient.js';
import { LEGAL_VERSION } from '../../content/legal/constants.js';
import { getOnboardingState } from '../../services/onboardingStorage.js';

interface Props {
  currentUser: User | null;
  grades: Grade[];
  onLoginSuccess: (user: User) => void;
  onCancel?: () => void;
  onNavigateLegal?: (doc: 'privacy' | 'terms') => void;
}

const KENYAN_COUNTIES = [
  'Nairobi', 'Nakuru', 'Mombasa', 'Kisumu', 'Uasin Gishu',
  'Machakos', 'Kiambu', 'Nyeri', 'Kilifi', 'Kakamega', 'Meru'
];

type AuthTab = 'DEMO' | 'CREDENTIALS' | 'SIGNUP';

export const LoginPage: React.FC<Props> = ({
  currentUser,
  grades,
  onLoginSuccess,
  onCancel,
  onNavigateLegal
}) => {
  const reducedMotion = useReducedMotionPreference();
  const [activeTab, setActiveTab] = useState<AuthTab>('CREDENTIALS');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Credentials State
  const [loginMode, setLoginMode] = useState<'phone' | 'email'>('phone');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up State
  const [signUpRole, setSignUpRole] = useState<UserRole>('STUDENT');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpGradeId, setSignUpGradeId] = useState(grades[1]?.id || 'grade-4');
  const [signUpCounty, setSignUpCounty] = useState('Nakuru');
  const [signUpSchool, setSignUpSchool] = useState('Simba Primary Academy');
  const [signUpAvatar, setSignUpAvatar] = useState('cheetah');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const demoAccounts = [
    {
      role: 'STUDENT' as UserRole,
      title: 'Student / Learner',
      name: 'Amina Kiprono',
      email: 'amina@jifuno.ke',
      tag: 'Grade 4 • Nakuru',
      icon: '🐆',
      stats: '420 XP • Level 3 • 5 Hearts',
      badgeColor: 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300'
    },
    {
      role: 'PARENT' as UserRole,
      title: 'Parent Portal',
      name: 'Mama Amina (Grace)',
      email: 'parent@jifuno.ke',
      tag: 'Parent of Amina',
      icon: '🦉',
      stats: 'Competencies & Screen Time',
      badgeColor: 'border-purple-500/60 bg-purple-950/40 text-purple-300'
    },
    {
      role: 'TEACHER' as UserRole,
      title: 'Teacher Portal',
      name: 'Mwalimu Ochieng',
      email: 'teacher@jifuno.ke',
      tag: 'Simba Primary • Grade 4',
      icon: '🦁',
      stats: 'Assign Missions & Class Mastery',
      badgeColor: 'border-blue-500/60 bg-blue-950/40 text-blue-300'
    },
    {
      role: 'ADMIN' as UserRole,
      title: 'Curriculum Admin',
      name: 'Wanjala Wafula',
      email: 'admin@jifuno.ke',
      tag: 'KICD / CBE Standards',
      icon: '🦅',
      stats: 'Question Bank & Moderation',
      badgeColor: 'border-amber-500/60 bg-amber-950/40 text-amber-300'
    }
  ];

  const handleDemoLogin = async (targetRole: UserRole) => {
    try {
      sound.playClick();
      setLoading(true);
      setErrorMsg(null);
      const res = await cbeApi.switchRole(targetRole);
      sound.playCorrect();
      setSuccessMsg(`Karibu! Logged in as ${res.user.name}`);
      setTimeout(() => {
        onLoginSuccess(res.user);
      }, 400);
    } catch (err: any) {
      sound.playIncorrect();
      setErrorMsg(err.message || 'Failed to switch to demo account');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = loginPhone.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMsg('Please enter a valid Kenyan phone number (e.g. 0712...)');
      sound.playIncorrect();
      return;
    }
    if (!loginPin || loginPin.length < 4) {
      setErrorMsg('Please enter your 4-digit Parent PIN');
      sound.playIncorrect();
      return;
    }

    try {
      sound.playClick();
      setLoading(true);
      setErrorMsg(null);

      // Check against onboarding storage if this user previously saved progress on this device
      const onboardingState = getOnboardingState();
      const guestProgress = onboardingState.guestProgress;
      const registeredPhone = guestProgress?.parentPhone?.replace(/\s+/g, '');
      const registeredPin = guestProgress?.parentPin;

      // If registered locally and PIN does not match
      if (registeredPhone && registeredPhone === cleanPhone) {
        if (registeredPin && registeredPin !== loginPin) {
          setErrorMsg('Incorrect PIN. Please check your 4-digit PIN and try again.');
          sound.playIncorrect();
          setLoading(false);
          return;
        }
      }

      const fakeEmail = `${cleanPhone.replace(/[^0-9]/g, '')}@parent.jifuno.ke`;

      // Try login via CBE API
      const res = await cbeApi.login(fakeEmail);
      sound.playCorrect();
      const displayName = guestProgress?.learnerName || res.user.name || `Learner (${cleanPhone})`;
      setSuccessMsg(`Hongera! Welcome back, ${displayName}!`);
      setTimeout(() => {
        onLoginSuccess({
          ...res.user,
          name: displayName
        });
      }, 400);
    } catch (err: any) {
      sound.playIncorrect();
      setErrorMsg(err.message || 'Login failed. Please verify phone number and PIN.');
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = loginEmail.trim();
    if (!email) {
      setErrorMsg('Please enter your email or learner identifier');
      sound.playIncorrect();
      return;
    }

    try {
      sound.playClick();
      setLoading(true);
      setErrorMsg(null);

      // Attempt Supabase sign in if configured and password is provided
      if (isSupabaseConfigured() && loginPassword.trim().length >= 6) {
        const { data: sbData, error: sbError } = await signInWithEmail(email, loginPassword.trim());
        if (sbError) {
          // Check if this is a predefined demo account (e.g. for testing)
          const matchedDemo = demoAccounts.find(d => d.email.toLowerCase() === email.toLowerCase());
          if (matchedDemo) {
            const res = await cbeApi.switchRole(matchedDemo.role);
            sound.playCorrect();
            setSuccessMsg(`Karibu! Logged in as ${res.user.name}`);
            setTimeout(() => {
              onLoginSuccess(res.user);
            }, 400);
            return;
          }
          sound.playIncorrect();
          setErrorMsg(sbError.message || 'Login failed. Please verify credentials.');
          return;
        }

        if (sbData?.user) {
          const authMe = await cbeApi.getMe();
          sound.playCorrect();
          setSuccessMsg(`Hongera! Welcome back, ${authMe.user.name}!`);
          setTimeout(() => {
            onLoginSuccess(authMe.user);
          }, 400);
          return;
        }
      }

      // If demo email or offline fallback
      const matchedDemo = demoAccounts.find(d => d.email.toLowerCase() === email.toLowerCase());
      if (matchedDemo) {
        const res = await cbeApi.switchRole(matchedDemo.role);
        sound.playCorrect();
        setSuccessMsg(`Karibu! Logged in as ${res.user.name}`);
        setTimeout(() => {
          onLoginSuccess(res.user);
        }, 400);
        return;
      }

      const res = await cbeApi.login(email);
      sound.playCorrect();
      setSuccessMsg(`Hongera! Welcome back, ${res.user.name}!`);
      setTimeout(() => {
        onLoginSuccess(res.user);
      }, 400);
    } catch (err: any) {
      sound.playIncorrect();
      setErrorMsg(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim() || !signUpEmail.trim()) {
      setErrorMsg('Please enter your name and email address');
      sound.playIncorrect();
      return;
    }

    if (isSupabaseConfigured() && signUpPassword.trim().length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      sound.playIncorrect();
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg('Please confirm parental consent and agree to the Terms of Service and Privacy Policy to create an account.');
      sound.playIncorrect();
      return;
    }

    try {
      sound.playClick();
      setLoading(true);
      setErrorMsg(null);

      const consentTime = new Date().toISOString();

      // Sign up via Supabase if configured
      if (isSupabaseConfigured()) {
        const { data: sbData, error: sbError } = await signUpWithEmail(
          signUpEmail.trim(),
          signUpPassword.trim(),
          {
            fullName: signUpName.trim(),
            role: signUpRole,
            gradeId: signUpGradeId,
            county: signUpCounty,
            schoolName: signUpSchool.trim(),
            avatar: signUpAvatar,
            consentAgreedAt: consentTime,
            consentVersion: LEGAL_VERSION
          }
        );

        if (sbError) {
          sound.playIncorrect();
          setErrorMsg(sbError.message || 'Sign up failed. Please try again.');
          return;
        }

        // Sync with backend API to initialize profile and in-memory session
        const res = await cbeApi.register({
          name: signUpName.trim(),
          email: signUpEmail.trim(),
          role: signUpRole,
          gradeId: signUpGradeId,
          county: signUpCounty,
          schoolName: signUpSchool.trim(),
          avatar: signUpAvatar,
          consentAgreedAt: consentTime,
          consentVersion: LEGAL_VERSION
        });

        sound.playCorrect();
        setSuccessMsg(`Hongera! Welcome to Jifuno, ${res.user.name}!`);
        setTimeout(() => {
          onLoginSuccess(res.user);
        }, 500);
        return;
      }

      // Supabase unconfigured offline fallback
      const res = await cbeApi.register({
        name: signUpName.trim(),
        email: signUpEmail.trim(),
        role: signUpRole,
        gradeId: signUpGradeId,
        county: signUpCounty,
        schoolName: signUpSchool.trim(),
        avatar: signUpAvatar,
        consentAgreedAt: consentTime,
        consentVersion: LEGAL_VERSION
      });
      sound.playCorrect();
      setSuccessMsg(`Hongera! Welcome to Jifuno, ${res.user.name}!`);
      setTimeout(() => {
        onLoginSuccess(res.user);
      }, 500);
    } catch (err: any) {
      sound.playIncorrect();
      setErrorMsg(err.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Top Navbar */}
      <header className="border-b border-emerald-900/60 bg-slate-950/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950/60">
            🇰🇪
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white tracking-tight">Jifuno</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                CBC
              </span>
            </div>
            <p className="text-[10px] text-emerald-400 font-medium">Learn. Play. Level Up.</p>
          </div>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onCancel();
            }}
            className="text-xs font-bold px-3.5 py-1.5 rounded-xl border border-emerald-800/80 hover:border-emerald-500 bg-slate-900 text-emerald-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>⚡</span>
            <span>Explore as Guest →</span>
          </button>
        )}
      </header>

      {/* Main Content Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-2xl space-y-6">
          {/* Hero Greeting & Mascot */}
          <div className="text-center space-y-2">
            <motion.div
              initial={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={springTransition}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-inner"
            >
              <span>🇰🇪</span>
              <span>Kenyan Competency-Based Education (CBE)</span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Welcome to <span className="text-emerald-400">Jifuno</span>
            </h1>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Master Mathematics, Science, Kiswahili and English through exciting quests and Socratic AI tutoring.
            </p>
          </div>

          {/* Rafiki Mascot Speech Bubble */}
          <motion.div
            initial={reducedMotion ? {} : { y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={springTransition}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-slate-950 border border-emerald-500/30 shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shrink-0">
              🦉
            </div>
            <div className="text-xs space-y-0.5">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                Rafiki AI Companion
                <span className="text-[10px] text-gray-400 font-normal">CBC Learning Guide</span>
              </span>
              <p className="text-gray-300">
                &ldquo;Karibu tena! Choose your account or enter your details to resume your daily streak and earn XP!&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Main Card with Tabs */}
          <div className="bg-slate-900/90 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-sm space-y-6">
            {/* Tab Navigation */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-2xl border border-gray-800">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab('CREDENTIALS');
                  setErrorMsg(null);
                }}
                className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                  activeTab === 'CREDENTIALS'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🔑 Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab('SIGNUP');
                  setErrorMsg(null);
                }}
                className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                  activeTab === 'SIGNUP'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ✨ Sign Up
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab('DEMO');
                  setErrorMsg(null);
                }}
                className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                  activeTab === 'DEMO'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ⚡ 1-Tap Demo
              </button>
            </div>

            {/* Notifications */}
            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-2xl text-xs text-red-300 flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl text-xs text-emerald-300 flex items-center gap-2">
                <span>🎉</span>
                <span>{successMsg}</span>
              </div>
            )}

            {/* TAB 1: 1-Tap Demo Quick Login */}
            {activeTab === 'DEMO' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Select a Role Account
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold">Instant Access</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {demoAccounts.map(acc => (
                    <button
                      key={acc.role}
                      type="button"
                      disabled={loading}
                      onClick={() => handleDemoLogin(acc.role)}
                      className={`p-3.5 rounded-2xl border ${acc.badgeColor} hover:border-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all text-left flex items-start gap-3 cursor-pointer shadow-md`}
                    >
                      <div className="text-3xl shrink-0 mt-0.5">{acc.icon}</div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black truncate">{acc.name}</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-black/40">
                            {acc.role}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-300 truncate">{acc.tag}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{acc.email}</div>
                        <div className="text-[10px] text-emerald-400 font-semibold pt-1">
                          {acc.stats}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <p className="text-[11px] text-center text-gray-500 pt-1">
                  1-Tap Demo lets you test learner quests, parental analytics, or classroom grading instantly.
                </p>
              </div>
            )}

            {/* TAB 2: Credentials Login */}
            {activeTab === 'CREDENTIALS' && (
              <div className="space-y-4">
                {/* Mode Selector: Phone & PIN (Kenyan families) vs Email */}
                <div className="flex p-1 bg-slate-950 rounded-2xl border border-emerald-900/60">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setLoginMode('phone');
                      setErrorMsg(null);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      loginMode === 'phone'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm font-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>📱</span>
                    <span>Parent Phone & PIN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setLoginMode('email');
                      setErrorMsg(null);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      loginMode === 'email'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm font-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>✉️</span>
                    <span>Email & Password</span>
                  </button>
                </div>

                {loginMode === 'phone' ? (
                  <form onSubmit={handlePhoneLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300">
                        Parent / Guardian Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={loginPhone}
                        onChange={e => setLoginPhone(e.target.value)}
                        placeholder="e.g. 0712 345 678"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-emerald-900/60 focus:border-emerald-500 text-white text-sm outline-none transition-all placeholder:text-gray-600"
                      />
                      <p className="text-[11px] text-gray-400">
                        The phone number entered when saving progress during onboarding.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-300">4-Digit Parent PIN</label>
                        <button
                          type="button"
                          onClick={() => setShowPin(!showPin)}
                          className="text-[11px] text-emerald-400 hover:underline"
                        >
                          {showPin ? 'Hide PIN' : 'Show PIN'}
                        </button>
                      </div>
                      <input
                        type={showPin ? 'text' : 'password'}
                        required
                        inputMode="numeric"
                        maxLength={4}
                        value={loginPin}
                        onChange={e => setLoginPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                        placeholder="••••"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-emerald-900/60 focus:border-emerald-500 text-white text-sm tracking-widest text-center font-mono outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={e => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-500 bg-slate-950 border-gray-700"
                        />
                        <span>Remember on this device</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>LOG IN WITH PHONE & PIN</span>
                          <span>➔</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleCredentialsLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300">
                        Email Address or Learner ID
                      </label>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        placeholder="e.g. amina@jifuno.ke"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-emerald-900/60 focus:border-emerald-500 text-white text-sm outline-none transition-all placeholder:text-gray-600"
                      />
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span>💡 Quick tip: Use</span>
                        <button
                          type="button"
                          onClick={() => setLoginEmail('amina@jifuno.ke')}
                          className="text-emerald-400 hover:underline font-mono"
                        >
                          amina@jifuno.ke
                        </button>
                        <span>or</span>
                        <button
                          type="button"
                          onClick={() => setLoginEmail('teacher@jifuno.ke')}
                          className="text-emerald-400 hover:underline font-mono"
                        >
                          teacher@jifuno.ke
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-300">Password / PIN</label>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-[11px] text-emerald-400 hover:underline"
                        >
                          {showPassword ? 'Hide PIN' : 'Show PIN'}
                        </button>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="Enter learner PIN or password"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-emerald-900/60 focus:border-emerald-500 text-white text-sm outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={e => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-500 bg-slate-950 border-gray-700"
                        />
                        <span>Remember on this device</span>
                      </label>
                      <span className="text-emerald-400/80 hover:text-emerald-300 cursor-pointer">
                        Need help?
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>LOG IN TO JIFUNO</span>
                          <span>➔</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: Sign Up */}
            {activeTab === 'SIGNUP' && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300">Account Type</label>
                    <select
                      value={signUpRole}
                      onChange={e => setSignUpRole(e.target.value as UserRole)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-emerald-900/60 text-white text-xs outline-none"
                    >
                      <option value="STUDENT">🎓 Student / Learner</option>
                      <option value="PARENT">👨‍👩‍👧 Parent / Guardian</option>
                      <option value="TEACHER">👨‍🏫 Teacher / Educator</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300">CBE Grade</label>
                    <select
                      value={signUpGradeId}
                      onChange={e => setSignUpGradeId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-emerald-900/60 text-white text-xs outline-none"
                    >
                      {grades.map(g => (
                        <option key={g.id} value={g.id}>
                          {g.name} ({g.levelGroup.replace('_', ' ')})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={e => setSignUpName(e.target.value)}
                    placeholder="e.g. Wanjiku Kimani"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-emerald-900/60 text-white text-xs outline-none placeholder:text-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={e => setSignUpEmail(e.target.value)}
                    placeholder="e.g. wanjiku@jifuno.ke"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-emerald-900/60 text-white text-xs outline-none placeholder:text-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-300">Password / PIN (min 6 characters)</label>
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      className="text-[11px] text-emerald-400 hover:underline cursor-pointer"
                    >
                      {showSignUpPassword ? 'Hide PIN' : 'Show PIN'}
                    </button>
                  </div>
                  <input
                    type={showSignUpPassword ? 'text' : 'password'}
                    required={isSupabaseConfigured()}
                    value={signUpPassword}
                    onChange={e => setSignUpPassword(e.target.value)}
                    placeholder="Create a password or 6-digit PIN"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-emerald-900/60 text-white text-xs outline-none placeholder:text-gray-600 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300">County</label>
                    <select
                      value={signUpCounty}
                      onChange={e => setSignUpCounty(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-emerald-900/60 text-white text-xs outline-none"
                    >
                      {KENYAN_COUNTIES.map(c => (
                        <option key={c} value={c}>
                          {c} County
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300">School Name</label>
                    <input
                      type="text"
                      value={signUpSchool}
                      onChange={e => setSignUpSchool(e.target.value)}
                      placeholder="e.g. Moi Primary Academy"
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-emerald-900/60 text-white text-xs outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Avatar Selection */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-gray-300">Choose Your Safari Avatar</label>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.values(AVATARS).map(av => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setSignUpAvatar(av.id);
                        }}
                        className={`p-2 rounded-2xl border text-center transition-all cursor-pointer ${
                          signUpAvatar === av.id
                            ? 'border-emerald-400 bg-emerald-950/60 scale-105'
                            : 'border-gray-800 bg-slate-950 hover:border-gray-600'
                        }`}
                      >
                        <div className="text-2xl">{av.emoji}</div>
                        <div className="text-[10px] font-bold truncate mt-1 text-gray-300">{av.name.split(' ')[0]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Legal & Parental Consent Checkbox (Kenya Data Protection Act, 2019) */}
                <div className="pt-2 pb-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-left select-none">
                    <input
                      type="checkbox"
                      required
                      checked={agreedToTerms}
                      onChange={e => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-emerald-800 bg-slate-950 text-emerald-500 focus:ring-emerald-400 focus:ring-offset-slate-900 cursor-pointer accent-emerald-500 shrink-0"
                    />
                    <span className="text-[11px] leading-relaxed text-gray-300">
                      I am a parent or guardian, or I have my parent or guardian&apos;s permission, and I agree to the{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          sound.playClick();
                          if (onNavigateLegal) onNavigateLegal('terms');
                          else window.location.href = '/terms';
                        }}
                        className="text-emerald-400 hover:text-emerald-300 underline font-semibold cursor-pointer inline"
                      >
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          sound.playClick();
                          if (onNavigateLegal) onNavigateLegal('privacy');
                          else window.location.href = '/privacy';
                        }}
                        className="text-emerald-400 hover:text-emerald-300 underline font-semibold cursor-pointer inline"
                      >
                        Privacy Policy
                      </button>.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !agreedToTerms}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>START YOUR JIFUNO JOURNEY 🚀</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Child Safety & Educational Features Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-center text-xs text-gray-400">
            <div className="p-2.5 rounded-2xl bg-slate-900/50 border border-gray-800 flex items-center justify-center gap-1.5">
              <span>🔒</span>
              <span>100% Kid Safe</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-900/50 border border-gray-800 flex items-center justify-center gap-1.5">
              <span>📚</span>
              <span>CBC Aligned</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-900/50 border border-gray-800 flex items-center justify-center gap-1.5">
              <span>📱</span>
              <span>Low-Data Ready</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-900/50 border border-emerald-900/40 text-emerald-300 flex items-center justify-center gap-1.5">
              <span>🛡️</span>
              <span>Safe & Private</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with Legal Links */}
      <footer className="border-t border-emerald-950 bg-slate-950 px-4 py-4 text-center text-xs text-gray-500 space-y-2">
        <p>
          <strong className="text-gray-400">Jifuno</strong> • Learn. Play. Level Up. • Designed for Kenyan Competency-Based Education (CBE / CBC).
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              if (onNavigateLegal) onNavigateLegal('privacy');
              else window.location.href = '/privacy';
            }}
            className="hover:text-emerald-400 underline cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              if (onNavigateLegal) onNavigateLegal('terms');
              else window.location.href = '/terms';
            }}
            className="hover:text-emerald-400 underline cursor-pointer"
          >
            Terms of Service
          </button>
        </div>
        <p className="text-[11px] text-gray-600">
          Curriculum-aligned practice for Mathematics, Science & Tech, Kiswahili, and English.
        </p>
      </footer>
    </div>
  );
};
