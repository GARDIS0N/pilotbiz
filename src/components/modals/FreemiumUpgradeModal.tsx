import React, { useState } from 'react';
import { cbeApi } from '../../services/cbeApi.js';
import { SUBSCRIPTION_PLANS, SubscriptionPlanId } from '../../types/subscription.js';
import { sound } from '../../utils/soundEffects.js';

interface FreemiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: 'DAILY_LIMIT_EXCEEDED' | 'SUBJECT_REQUIRES_PREMIUM';
  studentId?: string;
  onUpgraded?: () => void;
}

export const FreemiumUpgradeModal: React.FC<FreemiumUpgradeModalProps> = ({
  isOpen,
  onClose,
  reason = 'DAILY_LIMIT_EXCEEDED',
  studentId,
  onUpgraded
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<SubscriptionPlanId>('MONTHLY');
  const [phoneNumber, setPhoneNumber] = useState('0712345678');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStkPush = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setStatusMsg(null);

    try {
      sound.playClick();
      setIsLoading(true);
      const res = await cbeApi.initiateMpesaStkPush(phoneNumber, selectedPlanId, studentId);

      if (res.success && res.checkoutRequestId) {
        setStatusMsg('STK Push prompt sent! Check your phone to enter M-Pesa PIN 📲');
        pollStatus(res.checkoutRequestId);
      } else {
        setErrorMsg(res.customerMessage || 'Failed to dispatch M-Pesa prompt.');
        setIsLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'M-Pesa payment initiation failed.');
      setIsLoading(false);
    }
  };

  const pollStatus = (checkoutId: string) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await cbeApi.checkPaymentStatus(checkoutId);
        if (res.status === 'SUCCESS') {
          clearInterval(interval);
          setIsLoading(false);
          sound.playCorrect();
          setStatusMsg('Payment received! Premium access unlocked 🎉');
          setTimeout(() => {
            onUpgraded?.();
            onClose();
          }, 1500);
        } else if (res.status === 'FAILED') {
          clearInterval(interval);
          setIsLoading(false);
          setErrorMsg(res.failureReason || 'Transaction was declined.');
        } else if (attempts >= 15) {
          clearInterval(interval);
          setIsLoading(false);
          setStatusMsg('If you completed the PIN prompt, your lessons will unlock in a moment.');
        }
      } catch {
        if (attempts >= 15) clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border-2 border-amber-400/50 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 my-6 text-center">
        {/* Header Icon & Title */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center mx-auto text-3xl shadow-lg shadow-amber-950/60">
          ⭐
        </div>

        <div>
          <h3 className="text-xl font-black text-white">
            {reason === 'DAILY_LIMIT_EXCEEDED'
              ? 'Great learning today! Daily Limit Reached'
              : 'Unlock All Kenyan CBC Subjects!'}
          </h3>
          <p className="text-xs text-amber-200/90 mt-1 max-w-md mx-auto">
            {reason === 'DAILY_LIMIT_EXCEEDED'
              ? "You've completed your 3 free daily lessons! Ask your parent or guardian to upgrade for unlimited learning."
              : 'Science, Social Studies, Agriculture and advanced quests require Jifuno Premium.'}
          </p>
        </div>

        {/* Value Proposition Pills */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-left space-y-2 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Unlimited lessons across all CBC subjects</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>All 8,700+ curriculum questions & quests</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Unlimited hearts refill (no waiting)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Weekly parent mastery & progress reports</span>
          </div>
        </div>

        {/* Plan Selector */}
        <div className="grid grid-cols-2 gap-2 text-left">
          <button
            type="button"
            onClick={() => setSelectedPlanId('WEEKLY')}
            className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
              selectedPlanId === 'WEEKLY'
                ? 'bg-purple-950 border-purple-400 text-white shadow'
                : 'bg-slate-950 border-slate-800 text-gray-400'
            }`}
          >
            <span className="font-bold block">Weekly Sprint</span>
            <span className="text-sm font-black text-white">KES 150</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPlanId('MONTHLY')}
            className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
              selectedPlanId === 'MONTHLY'
                ? 'bg-emerald-950 border-emerald-400 text-white shadow'
                : 'bg-slate-950 border-slate-800 text-gray-400'
            }`}
          >
            <span className="font-bold block text-emerald-300">Monthly Champion ⭐</span>
            <span className="text-sm font-black text-white">KES 450</span>
          </button>
        </div>

        {/* M-Pesa STK Push Form */}
        <form onSubmit={handleStkPush} className="space-y-3 pt-1">
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs font-bold text-emerald-400">🇰🇪 +254</span>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="07XXXXXXXX"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-18 pr-3 text-xs font-bold text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs md:text-sm shadow-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Waiting for M-Pesa PIN...</span>
              </>
            ) : (
              <span>Lipa KES {SUBSCRIPTION_PLANS[selectedPlanId]?.priceKes} na M-Pesa 🚀</span>
            )}
          </button>
        </form>

        {statusMsg && (
          <p className="text-xs text-emerald-300 font-bold animate-fade-in">{statusMsg}</p>
        )}
        {errorMsg && (
          <p className="text-xs text-rose-300 font-bold animate-fade-in">{errorMsg}</p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="text-xs text-gray-400 hover:text-white pt-2 cursor-pointer block mx-auto"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
};
