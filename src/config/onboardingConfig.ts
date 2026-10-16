/**
 * Jifuno Config-Driven Onboarding Flow Configuration
 * 
 * Allows A/B testing step order, enabling/disabling steps,
 * and modifying copy without altering screen components.
 */

export type OnboardingStepId =
  | 'WELCOME'
  | 'GRADE'
  | 'INTERESTS'
  | 'LEVEL_CHECK'
  | 'FIRST_LESSON'
  | 'DAILY_GOAL'
  | 'SAVE_PROGRESS'
  | 'PARENT_STEP'
  | 'HOME';

export interface OnboardingStepConfig {
  id: OnboardingStepId;
  enabled: boolean;
  skippable: boolean;
  allowBack: boolean;
  showProgressBar: boolean;
  title: {
    en: string;
    sw: string;
  };
  subtitle?: {
    en: string;
    sw: string;
  };
}

export interface InterestSubjectOption {
  id: string;
  code: string; // Used to match learningArea in curriculum
  nameEn: string;
  nameSw: string;
  taglineEn: string;
  taglineSw: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export interface DailyGoalOption {
  minutes: number;
  labelEn: string;
  labelSw: string;
  tierEn: string;
  tierSw: string;
  icon: string;
  xpExpected: number;
}

export const ONBOARDING_STEPS_CONFIG: OnboardingStepConfig[] = [
  {
    id: 'WELCOME',
    enabled: true,
    skippable: false,
    allowBack: false,
    showProgressBar: false,
    title: {
      en: "Hi! I'm Rafiki",
      sw: "Jambo! Mimi ni Rafiki"
    },
    subtitle: {
      en: "Learn Kenya's CBC curriculum through fun games and daily quests!",
      sw: "Jifunze mtaala wa CBC wa Kenya kupitia michezo na changamoto za kila siku!"
    }
  },
  {
    id: 'GRADE',
    enabled: true,
    skippable: false,
    allowBack: true,
    showProgressBar: true,
    title: {
      en: "Which grade are you in?",
      sw: "Uko gredi gani?"
    },
    subtitle: {
      en: "We'll pick the right quests for your CBC curriculum.",
      sw: "Tutachagua masomo sahihi kulingana na mtaala wako."
    }
  },
  {
    id: 'INTERESTS',
    enabled: true,
    skippable: false,
    allowBack: true,
    showProgressBar: true,
    title: {
      en: "What do you love exploring?",
      sw: "Unapenda kujifunza nini zaidi?"
    },
    subtitle: {
      en: "Pick 2 or 3 subjects to start your journey.",
      sw: "Chagua masomo 2 au 3 kuanza safari yako."
    }
  },
  {
    id: 'LEVEL_CHECK',
    enabled: true,
    skippable: true,
    allowBack: true,
    showProgressBar: true,
    title: {
      en: "Quick level check!",
      sw: "Jaribio fupi la kuanzia!"
    },
    subtitle: {
      en: "Answer 3 quick questions. Rafiki knows you've got this!",
      sw: "Jibu maswali 3 mafupi. Rafiki anajua unaweza!"
    }
  },
  {
    id: 'FIRST_LESSON',
    enabled: true,
    skippable: false,
    allowBack: false, // The lesson itself is immersive
    showProgressBar: true,
    title: {
      en: "Your First Quest!",
      sw: "Somo Lako la Kwanza!"
    },
    subtitle: {
      en: "5 fun questions to earn your first XP and start your streak.",
      sw: "Maswali 5 ya kufurahisha ili kupata XP yako ya kwanza."
    }
  },
  {
    id: 'DAILY_GOAL',
    enabled: true,
    skippable: false,
    allowBack: true,
    showProgressBar: true,
    title: {
      en: "Pick your daily learning target",
      sw: "Chagua lengo lako la kila siku"
    },
    subtitle: {
      en: "Just a few minutes each day keeps your streak flame burning!",
      sw: "Dakika chache tu kila siku huwasha moto wa ushindi wako!"
    }
  },
  {
    id: 'SAVE_PROGRESS',
    enabled: true,
    skippable: true,
    allowBack: true,
    showProgressBar: true,
    title: {
      en: "Save your progress!",
      sw: "Hifadhi ushindi wako!"
    },
    subtitle: {
      en: "You earned XP and started your streak. Keep it safe with a parent.",
      sw: "Umepata XP na kuanza mfululizo. Hifadhi matokeo yako na mzazi."
    }
  },
  {
    id: 'PARENT_STEP',
    enabled: true,
    skippable: true,
    allowBack: true,
    showProgressBar: true,
    title: {
      en: "Parent / Guardian Save",
      sw: "Mzazi / Mlezi Kuhifadhi"
    },
    subtitle: {
      en: "Enter a phone number and 4-digit PIN to lock in your child's progress.",
      sw: "Weka nambari ya simu na PIN ya tarakimu 4 ili kulinda maendeleo ya mwanao."
    }
  },
  {
    id: 'HOME',
    enabled: true,
    skippable: false,
    allowBack: false,
    showProgressBar: false,
    title: {
      en: "Welcome to Jifuno!",
      sw: "Karibu Jifuno!"
    }
  }
];

export const INTEREST_SUBJECTS: InterestSubjectOption[] = [
  {
    id: 'math',
    code: 'math',
    nameEn: 'Numbers & Puzzles',
    nameSw: 'Hesabu na Mafumbo',
    taglineEn: 'Shapes, money, and fast problem solving',
    taglineSw: 'Maumbo, pesa, na hesabu za haraka',
    icon: '🔢',
    colorClass: 'text-emerald-400',
    bgClass: 'bg-emerald-950/40 hover:bg-emerald-900/40',
    borderClass: 'border-emerald-500/40 hover:border-emerald-400'
  },
  {
    id: 'english',
    code: 'english',
    nameEn: 'Stories & Words',
    nameSw: 'Hadithi na Maneno',
    taglineEn: 'Reading, vocabulary, and confident speaking',
    taglineSw: 'Kusoma, msamiati, na kuzungumza kwa ujasiri',
    icon: '📖',
    colorClass: 'text-amber-400',
    bgClass: 'bg-amber-950/40 hover:bg-amber-900/40',
    borderClass: 'border-amber-500/40 hover:border-amber-400'
  },
  {
    id: 'kiswahili',
    code: 'kiswahili',
    nameEn: 'Kiswahili Fasaha',
    nameSw: 'Kiswahili Fasaha',
    taglineEn: 'Lugha yetu, methali, na ngeli za Kiswahili',
    taglineSw: 'Lugha yetu, methali, na ngeli za Kiswahili',
    icon: '🇰🇪',
    colorClass: 'text-rose-400',
    bgClass: 'bg-rose-950/40 hover:bg-rose-900/40',
    borderClass: 'border-rose-500/40 hover:border-rose-400'
  },
  {
    id: 'science',
    code: 'science',
    nameEn: 'Science & Discovery',
    nameSw: 'Sayansi na Ugunduzi',
    taglineEn: 'Plants, animals, tech, and the human body',
    taglineSw: 'Mimea, wanyama, teknolojia, na mwili wa binadamu',
    icon: '🔬',
    colorClass: 'text-cyan-400',
    bgClass: 'bg-cyan-950/40 hover:bg-cyan-900/40',
    borderClass: 'border-cyan-500/40 hover:border-cyan-400'
  },
  {
    id: 'social',
    code: 'social',
    nameEn: 'Our Community',
    nameSw: 'Jamii Yetu',
    taglineEn: 'Our culture, resources, and Kenyan heroes',
    taglineSw: 'Utamaduni, mazingira, na mashujaa wetu',
    icon: '🌍',
    colorClass: 'text-purple-400',
    bgClass: 'bg-purple-950/40 hover:bg-purple-900/40',
    borderClass: 'border-purple-500/40 hover:border-purple-400'
  }
];

export const DAILY_GOAL_OPTIONS: DailyGoalOption[] = [
  {
    minutes: 5,
    labelEn: '5 min / day',
    labelSw: 'Dakika 5 / siku',
    tierEn: 'Easy',
    tierSw: 'Rahisi',
    icon: '🌱',
    xpExpected: 25
  },
  {
    minutes: 10,
    labelEn: '10 min / day',
    labelSw: 'Dakika 10 / siku',
    tierEn: 'Regular',
    tierSw: 'Kawaida',
    icon: '⚡',
    xpExpected: 50
  },
  {
    minutes: 15,
    labelEn: '15 min / day',
    labelSw: 'Dakika 15 / siku',
    tierEn: 'Serious',
    tierSw: 'Makini',
    icon: '🔥',
    xpExpected: 80
  }
];
