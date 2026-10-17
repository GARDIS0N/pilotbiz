import React, { useState, useEffect } from 'react';
import { cbeApi } from '../../services/cbeApi.js';
import { SUBSCRIPTION_PLANS, SubscriptionPlanId } from '../../types/subscription.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  parentUserId?: string;
  studentId?: string;
  onSubscriptionUpdated?: () => void;
}

export const ParentBillingSection: React.FC<Props> = ({
  parentUserId,
  studentId,
  onSubscriptionUpdated
}) => {
  const [plans, setPlans] = useState<any[]>(Object.values(SUBSCRIPTION_PLANS));
  const [selectedPlanId, setSelectedPlanId] = useState<SubscriptionPlanId>('MONTHLY');
  const [phoneNumber, setPhoneNumber] = useState('0712345678');
  const [subscription, setSubscription] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [referral, setReferral] = useState<any>(null);
  const [referralInput, setReferralInput] = useState('');
  const [referralFeedback, setReferralFeedback] = useState<string | null>(null);

  const [isSubmittingStk, setIsSubmittingStk] = useState(false);
  const [activeCheckoutId, setActiveCheckoutId] = useState<string | null>(null);
  const [stkStatusMessage, setStkStatusMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    loadBillingData();
  }, [parentUserId, studentId]);

  const loadBillingData = async () => {
    try {
      const subRes = await cbeApi.getCurrentSubscription(parentUserId || studentId);
      setSubscription(subRes.subscription);

      const txRes = await cbeApi.getPaymentHistory();
      setTransactions(txRes.transactions || []);

      const refRes = await cbeApi.getMyReferralCode();
      setReferral(refRes);
    } catch (err: any) {
      console.warn('Failed to load billing details:', err);
    }
  };

  const handleInitiateStkPush = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setStkStatusMessage(null);
    setPaymentSuccess(false);

    if (!phoneNumber.trim()) {
      setErrorMsg('Please enter a valid Safaricom phone number.');
      return;
    }

    try {
      sound.playClick();
      setIsSubmittingStk(true);
      const res = await cbeApi.initiateMpesaStkPush(phoneNumber, selectedPlanId, studentId);

      if (res.success && res.checkoutRequestId) {
        setActiveCheckoutId(res.checkoutRequestId);
        setStkStatusMessage(
          `STK Push sent to ${phoneNumber}! Please check your Safaricom phone and enter your M-Pesa PIN.`
        );

        // Start polling for payment completion
        pollPaymentStatus(res.checkoutRequestId);
      } else {
        setErrorMsg(res.customerMessage || 'Failed to dispatch M-Pesa prompt.');
        setIsSubmittingStk(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'M-Pesa payment initiation failed.');
      setIsSubmittingStk(false);
    }
  };

  const pollPaymentStatus = (checkoutId: string) => {
    let attempts = 0;
    const maxAttempts = 15; // 30 seconds max polling

    const interval = setInterval(async () => {
      attempts++;
      try {
        const statusRes = await cbeApi.checkPaymentStatus(checkoutId);

        if (statusRes.status === 'SUCCESS') {
          clearInterval(interval);
          setIsSubmittingStk(false);
          setActiveCheckoutId(null);
          setPaymentSuccess(true);
          sound.playCorrect();
          setStkStatusMessage(
            `Payment confirmed! M-Pesa Receipt: ${statusRes.mpesaReceiptNumber}. Jifuno Premium is now active! 🎉`
          );
          loadBillingData();
          onSubscriptionUpdated?.();
        } else if (statusRes.status === 'FAILED') {
          clearInterval(interval);
          setIsSubmittingStk(false);
          setActiveCheckoutId(null);
          setErrorMsg(statusRes.failureReason || 'M-Pesa transaction was cancelled or declined.');
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          setIsSubmittingStk(false);
          setStkStatusMessage('Still waiting for Safaricom confirmation. If you entered your PIN, access will unlock automatically in a few seconds.');
          loadBillingData();
        }
      } catch (pollErr) {
        if (attempts >= maxAttempts) clearInterval(interval);
      }
    }, 2000);
  };

  const handleApplyReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralInput.trim()) return;

    try {
      sound.playClick();
      setReferralFeedback(null);
      const res = await cbeApi.applyReferralCode(referralInput.trim());
      if (res.success) {
        sound.playCorrect();
        setReferralFeedback(res.message);
        setReferralInput('');
        loadBillingData();
        onSubscriptionUpdated?.();
      } else {
        setReferralFeedback(`Error: ${res.message}`);
      }
    } catch (err: any) {
      setReferralFeedback(`Error: ${err.message || 'Failed to apply code'}`);
    }
  };

  const daysRemaining = subscription?.expiryDate
    ? Math.max(0, Math.ceil((new Date(subscription.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
      {/* 1. Header & Current Status */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">💳</span>
            <h3 className="text-lg font-black text-white">Subscription & M-Pesa Billing</h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Empower your child with unlimited CBC curriculum lessons, offline quests, and personalized Socratic tutoring.
          </p>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2">
          {subscription?.status === 'ACTIVE' ? (
            <div className="px-4 py-2 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 flex items-center gap-2 text-xs font-black shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE PREMIUM ({daysRemaining} days left)</span>
            </div>
          ) : subscription?.status === 'GRACE_PERIOD' ? (
            <div className="px-4 py-2 rounded-2xl bg-amber-950/80 border border-amber-500 text-amber-300 flex items-center gap-2 text-xs font-black">
              <span>⚠️ 48-Hour Grace Period</span>
            </div>
          ) : (
            <div className="px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700 text-gray-300 text-xs font-bold">
              <span>Free Tier (3 lessons/day)</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Choose Subscription Plan */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-300 block">
          Select Subscription Plan (Kenyan Shillings - KES):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {plans.map((p) => {
            const isSelected = selectedPlanId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedPlanId(p.id);
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-purple-900/60 to-emerald-950/80 border-emerald-400 shadow-xl scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-gray-300'
                }`}
              >
                {p.isPopular && (
                  <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Most Popular
                  </span>
                )}
                <div>
                  <span className="text-xs font-bold text-purple-300 block">{p.name.en}</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-white">KES {p.priceKes}</span>
                    <span className="text-[10px] text-gray-400">/ {p.durationDays} days</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">{p.description.en}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 text-[10px] text-emerald-400 font-semibold space-y-1">
                  {p.features.slice(0, 2).map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span>✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Safaricom M-Pesa STK Push Form */}
      <form onSubmit={handleInitiateStkPush} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📲</span>
          <h4 className="text-sm font-bold text-white">Lipa na M-Pesa (Online STK Push)</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs text-gray-400 font-medium block">
              Safaricom Mobile Number (M-Pesa):
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-emerald-400">🇰🇪 +254</span>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="07XXXXXXXX or 01XXXXXXXX"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-18 pr-3 text-xs font-bold text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmittingStk}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmittingStk ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Prompting M-Pesa...</span>
              </>
            ) : (
              <span>Lipa KES {SUBSCRIPTION_PLANS[selectedPlanId]?.priceKes || 450} na M-Pesa 🚀</span>
            )}
          </button>
        </div>

        {/* Live Status Message / Alert */}
        {stkStatusMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/60 text-xs text-emerald-200 font-medium flex items-center gap-2 animate-fade-in">
            <span>📲</span>
            <span>{stkStatusMessage}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/60 text-xs text-rose-200 font-medium flex items-center gap-2 animate-fade-in">
            <span>❌</span>
            <span>{errorMsg}</span>
          </div>
        )}
      </form>

      {/* 4. Growth Loop: Refer a Parent (+7 Days Free) */}
      <div className="bg-gradient-to-r from-purple-950/50 via-slate-950 to-indigo-950/50 border border-purple-500/40 rounded-2xl p-5 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-black text-purple-300 flex items-center gap-2">
              <span>🎁</span>
              <span>Refer a Parent, Both Get +7 Days Free!</span>
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              Share your family referral code with friends and school parents. When they join, both of you earn 7 extra premium days.
            </p>
          </div>

          {referral && (
            <div className="bg-slate-900 border border-purple-500/60 px-4 py-2 rounded-xl text-center shrink-0">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Your Code</span>
              <span className="text-base font-black text-amber-300 font-mono tracking-wider">{referral.code}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleApplyReferral} className="flex gap-2 max-w-md">
          <input
            type="text"
            value={referralInput}
            onChange={(e) => setReferralInput(e.target.value)}
            placeholder="Have a referral code? (e.g. AMINA254)"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-purple-400"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer whitespace-nowrap"
          >
            Redeem
          </button>
        </form>

        {referralFeedback && (
          <p className="text-xs font-bold text-purple-200 mt-1">{referralFeedback}</p>
        )}
      </div>

      {/* 5. Payment Transaction History */}
      {transactions.length > 0 && (
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">M-Pesa Payment Receipts</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-300">
              <thead className="bg-slate-950 text-gray-400 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Date</th>
                  <th className="p-2.5">Receipt #</th>
                  <th className="p-2.5">Plan</th>
                  <th className="p-2.5">Amount</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-950/40">
                    <td className="p-2.5 text-gray-400 font-mono">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2.5 font-mono font-bold text-purple-300">
                      {tx.mpesaReceiptNumber || tx.checkoutRequestId.slice(0, 14)}
                    </td>
                    <td className="p-2.5 font-bold text-white">{tx.planId}</td>
                    <td className="p-2.5 font-black text-emerald-400">KES {tx.amountKes}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.status === 'SUCCESS'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : tx.status === 'PENDING'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
