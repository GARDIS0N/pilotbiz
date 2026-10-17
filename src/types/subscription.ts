/**
 * Jifuno Kenya CBE Monetization & Subscription Types
 * Supports Safaricom Daraja M-Pesa STK Push, KES Pricing, and Freemium Gating.
 */

export type SubscriptionPlanId = 'WEEKLY' | 'MONTHLY' | 'TERMLY' | 'FAMILY_MONTHLY';

export type SubscriptionStatus = 'FREE' | 'ACTIVE' | 'GRACE_PERIOD' | 'EXPIRED';

export type PaymentMethod = 'MPESA' | 'CARD' | 'BANK_TRANSFER';

export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  name: { en: string; sw: string };
  priceKes: number;
  durationDays: number;
  description: { en: string; sw: string };
  features: string[];
  isPopular?: boolean;
  maxLearners: number;
}

export interface SubscriptionRecord {
  id: string;
  userId: string; // Parent or User ID
  studentIds: string[];
  planId: SubscriptionPlanId;
  status: SubscriptionStatus;
  startDate: string;
  expiryDate: string;
  gracePeriodExpiryDate: string; // 48h after expiryDate
  autoRenew: boolean;
  referralCodeUsed?: string;
  lastPaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentTransaction {
  id: string;
  checkoutRequestId: string;
  merchantRequestId?: string;
  userId: string;
  studentId?: string;
  planId: SubscriptionPlanId;
  amountKes: number;
  phoneNumber: string; // Normalized e.g. 2547XXXXXXXX
  mpesaReceiptNumber?: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  failureReason?: string;
  createdAt: string;
  completedAt?: string;
  rawCallback?: any;
}

export interface ReferralRecord {
  code: string;
  ownerUserId: string;
  totalReferrals: number;
  bonusDaysEarned: number;
  redeemedBy: { userId: string; redeemedAt: string }[];
  createdAt: string;
}

export interface DailyLessonUsage {
  date: string; // YYYY-MM-DD
  lessonCount: number;
  questionsAnswered: number;
}

export interface FreemiumAccessCheck {
  allowed: boolean;
  reason?: 'ACTIVE_SUBSCRIPTION' | 'WITHIN_DAILY_FREE_LIMIT' | 'DAILY_LIMIT_EXCEEDED' | 'SUBJECT_REQUIRES_PREMIUM';
  dailyLessonsRemaining: number;
  dailyLessonsUsed: number;
  dailyFreeLimit: number;
  isPremium: boolean;
  subscriptionStatus: SubscriptionStatus;
  expiryDate?: string;
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlanId, SubscriptionPlan> = {
  WEEKLY: {
    id: 'WEEKLY',
    name: { en: 'Weekly Sprint', sw: 'Kila Wiki' },
    priceKes: 150,
    durationDays: 7,
    description: {
      en: 'Perfect for exam prep and quick revision sprints.',
      sw: 'Inafaa kwa marudio ya mtihani ya haraka.'
    },
    features: [
      'Unlimited daily CBC lessons',
      'All subjects unlocked (Math, Sci, Eng, Swa, Agri)',
      'Unlimited hearts replenishment',
      'Parent weekly WhatsApp progress report'
    ],
    maxLearners: 1
  },
  MONTHLY: {
    id: 'MONTHLY',
    name: { en: 'Monthly Champion', sw: 'Kila Mwezi' },
    priceKes: 450,
    durationDays: 30,
    description: {
      en: 'Most popular! ~KES 15/day for continuous CBC mastery.',
      sw: 'Maarufu zaidi! Takriban KES 15 kwa siku kwa masomo yote.'
    },
    features: [
      'Unlimited daily CBC lessons',
      'All 8,700+ curriculum questions & quests',
      'Offline lesson caching enabled',
      'AI Socratic tutor guidance',
      'Parent analytics & mastery reports'
    ],
    isPopular: true,
    maxLearners: 1
  },
  TERMLY: {
    id: 'TERMLY',
    name: { en: 'Termly Scholar (3 Months)', sw: 'Muhula Mzima (Miezi 3)' },
    priceKes: 1200,
    durationDays: 90,
    description: {
      en: 'Save KES 150! Covers the entire 3-month school term.',
      sw: 'Okoa KES 150! Inatosheleza muhula mzima wa shule.'
    },
    features: [
      'Everything in Monthly Champion',
      'Full school term coverage (90 days)',
      'Priority customer & teacher support',
      'Printable CBE achievement certificates'
    ],
    maxLearners: 1
  },
  FAMILY_MONTHLY: {
    id: 'FAMILY_MONTHLY',
    name: { en: 'Family Bundle (Up to 3 Children)', sw: 'Kifurushi cha Familia (Watoto 3)' },
    priceKes: 750,
    durationDays: 30,
    description: {
      en: 'Covers up to 3 sibling learners under one parent account.',
      sw: 'Inashughulikia hadi watoto watatu kwenye akaunti moja ya mzazi.'
    },
    features: [
      'Up to 3 distinct student profiles',
      'Individual progress tracking for each child',
      'Unlimited lessons across all grades 3-6',
      'Family weekly comparison dashboard'
    ],
    maxLearners: 3
  }
};

export const FREE_TIER_DAILY_LESSON_CAP = 3;
export const FREE_TIER_ALLOWED_SUBJECTS = ['la-math-g4', 'la-eng-g4', 'math', 'english'];
