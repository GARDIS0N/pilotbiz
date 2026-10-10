// Jifuno Bilingual Localization Engine (English & Kiswahili)
// Persisted in localStorage and reactive to language toggles

export type Language = 'en' | 'sw';

const STORAGE_KEY = 'jifuno_preferred_lang';

export const translations = {
  en: {
    appName: 'Jifuno',
    tagline: 'Learn. Play. Level Up.',
    heroTitle: 'Learn. Play. Level Up.',
    heroSubtitle: 'Kenya’s Gamified CBC Learning Adventure for Grades 3–6',
    heroDesc: 'Master Mathematics, Science & Tech, Kiswahili, and English through thrilling quests, friendly animal companions, and instant feedback.',
    startPlaying: 'Start Playing Free',
    tryGuestQuest: 'Try One Quest (No Sign-Up)',
    demoTitle: 'Jump In with a Demo Learner',
    demoSubtitle: 'One-tap preview with real CBC quests, badges, and Shilingi coins',
    roleLearner: 'I’m a Learner',
    roleLearnerDesc: 'Explore exciting quest maps, earn coins, and level up your animal avatar.',
    roleParent: 'I’m a Parent',
    roleParentDesc: 'Track CBC strand mastery, manage screen time, and receive weekly WhatsApp insights.',
    roleTeacher: 'I’m a Teacher',
    roleTeacherDesc: 'Assign curriculum quests, monitor class competencies, and generate CBC rubrics.',
    login: 'Log In',
    signup: 'Sign Up',
    meetRafiki: 'Meet Rafiki AI',
    meetRafikiDesc: 'Rafiki is your personal Socratic tutor who guides you using authentic Kenyan examples like chapati fractions and Rift Valley wildlife.',
    cbcBadge: 'Aligned to Kenya KICD CBC Curriculum • Grades 3–6',
    previewTitle: 'Experience Jifuno in Action',
    previewSubtitle: 'Curriculum-aligned stories, hands-on questions, and joyful rewards',
    guestQuestPrompt: 'Guest Mode • Try Quest 1: Help Amina Plant Seedlings',
    switchLang: 'Kiswahili',
    footerCurriculum: 'Curriculum-aligned practice for Mathematics, Science & Tech, Kiswahili, English, Agriculture, and Creative Arts. Strictly engineered for child safety under Kenya Data Protection Act.',
    footerCopyright: 'Jifuno • Learn. Play. Level Up. • Nairobi, Kenya'
  },
  sw: {
    appName: 'Jifuno',
    tagline: 'Jifunze. Cheza. Shinda.',
    heroTitle: 'Jifunze. Cheza. Shinda.',
    heroSubtitle: 'Mchezo wa Kujifunzia Mtaala wa Umilisi (CBC) Kenya kwa Darasa la 3–6',
    heroDesc: 'Kuwa mahiri katika Hisabati, Sayansi, Kiswahili, na Kiingereza kupitia safari za kusisimua, marafiki wa wanyama, na usaidizi wa papo hapo.',
    startPlaying: 'Anza Kucheza Bure',
    tryGuestQuest: 'Jaribu Safari Moja (Bila Kujisajili)',
    demoTitle: 'Ingia Papo Hapo na Mwanafunzi wa Majaribio',
    demoSubtitle: 'Bofya mara moja kuona safari halisi za CBC, nishani, na sarafu za Shilingi',
    roleLearner: 'Mimi ni Mwanafunzi',
    roleLearnerDesc: 'Gundua ramani za kusisimua, jishindie sarafu, na uongeze kiwango cha mnyama wako.',
    roleParent: 'Mimi ni Mzazi',
    roleParentDesc: 'Fuatilia umahiri wa mwanao katika CBC, dhibiti muda wa skrini, na pokea ripoti ya WhatsApp.',
    roleTeacher: 'Mimi ni Mwalimu',
    roleTeacherDesc: 'Toa kazi za mtaala, fuatilia umilisi wa darasa zima, na toa tathmini za viwango vya CBC.',
    login: 'Ingia',
    signup: 'Jisajili',
    meetRafiki: 'Kutana na Rafiki AI',
    meetRafikiDesc: 'Rafiki ni mkufunzi wako wa AI anayekuelekeza akitumia mifano halisi ya Kenya kama chapati za sehemu na sarafu za shilingi.',
    cbcBadge: 'Kulingana na Mtaala wa Umilisi (CBC) wa KICD • Darasa la 3–6',
    previewTitle: 'Tazama Jinsi Jifuno Inavyofanya Kazi',
    previewSubtitle: 'Hadithi za mtaala, maswali shirikishi, na zawadi za kishindo',
    guestQuestPrompt: 'Hali ya Mgeni • Jaribu Safari ya 1: Msaidie Amina Kupanda Miche',
    switchLang: 'English',
    footerCurriculum: 'Mazoezi kulingana na mtaala wa Hisabati, Sayansi na Teknolojia, Kiswahili, Kiingereza, Kilimo, na Sanaa. Usalama wa mtoto unazingatiwa kulingana na Sheria ya Kulinda Data ya Kenya.',
    footerCopyright: 'Jifuno • Jifunze. Cheza. Shinda. • Nairobi, Kenya'
  }
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getSavedLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'sw' || saved === 'en') return saved;
  } catch {
    // fallback
  }
  return 'en';
}

export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // fallback
  }
}

export function t(key: TranslationKey, lang?: Language): string {
  const activeLang = lang || getSavedLanguage();
  return translations[activeLang][key] || translations.en[key] || key;
}
