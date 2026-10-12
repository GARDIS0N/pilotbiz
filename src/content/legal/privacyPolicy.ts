import { LAST_UPDATED_DATE, LEGAL_VERSION } from './constants.js';

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDocument {
  title: string;
  subtitle: string;
  lastUpdated: string;
  version: string;
  summary: string[];
  sections: LegalSection[];
  contactLine: string;
}

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy Policy',
  subtitle: 'How Jifuno protects your child’s learning information',
  lastUpdated: LAST_UPDATED_DATE,
  version: LEGAL_VERSION,
  summary: [
    'We built Jifuno for children in Grades 3 to 6 across Kenya.',
    'We collect only the basic information needed to run lessons, track quiz progress, and keep learning fun.',
    'We do not show ads, we do not track children across the web, and we never sell your data.',
    'A parent or guardian must give permission before a child uses Jifuno.',
    'Parents can review their child’s progress or ask us to permanently delete their data at any time from within the app.'
  ],
  sections: [
    {
      id: 'childrens-privacy',
      title: '1. Children’s Privacy and Parental Consent',
      paragraphs: [
        'Protecting young learners is our highest priority. Jifuno is created for primary school children between the ages of 8 and 12.',
        'A parent, guardian, or authorized teacher must give consent before a child creates an account. If you are under 18 years old, you must have your parent or guardian agree to this policy before using Jifuno.',
        'We follow the rules of the Kenya Data Protection Act, 2019. We collect only what is strictly necessary to deliver an engaging, safe learning experience. We never use a child’s data for marketing or commercial profiling.'
      ]
    },
    {
      id: 'what-we-collect',
      title: '2. What We Collect and What We Do Not Collect',
      paragraphs: [
        'We collect only the minimal details required to manage learning accounts and show lesson progress:'
      ],
      bullets: [
        'Account details: The learner’s name or nickname, an email address for login, the learner’s grade level (Grade 3 to Grade 6), a fun animal avatar, and an optional school name or county.',
        'Learning progress: Quiz questions answered, scores, stars, streak days, practice time, hearts remaining, and daily learning goals.',
        'Tutor messages: Questions the learner asks the AI tutor, along with the learner’s first name, grade, and current question, so the tutor can give helpful hints.',
        'Voice features: When a learner uses speech features or listens to read-aloud questions, the audio is handled directly on the device or processed momentarily through our trusted service providers strictly to turn speech into text. We do not store or keep audio recordings.',
        'Camera feature: If a learner uses the camera to scan a problem or question, the image is analyzed in real time through our trusted service providers. We do not keep, store, or share photos.'
      ]
    },
    {
      id: 'what-we-do-not-collect',
      title: '3. What We Do NOT Collect',
      paragraphs: [
        'To protect child safety, there are many things we deliberately do not collect:'
      ],
      bullets: [
        'We do not collect precise GPS or live physical location.',
        'We do not access the device contacts, address book, or phone numbers.',
        'We do not ask for or collect payment cards or money from children.',
        'We do not collect facial recognition scans, fingerprints, or biometric data.',
        'We do not track children across other apps or websites.'
      ]
    },
    {
      id: 'how-we-use-it',
      title: '4. How We Use Learning Information',
      paragraphs: [
        'We use the information we collect solely for educational and safety purposes:'
      ],
      bullets: [
        'To deliver personalized CBC lessons in Mathematics, Science, Kiswahili, and English.',
        'To save quiz results and show learners their streaks, badges, and progress.',
        'To show learning summaries to linked parents and teachers so they can help their children learn.',
        'To keep the platform safe, prevent cheating or abuse, and fix technical errors.'
      ]
    },
    {
      id: 'ai-tutor',
      title: '5. The AI Tutor (Mwalimu Rafiki)',
      paragraphs: [
        'Jifuno includes an AI companion named Mwalimu Rafiki. Mwalimu Rafiki guides learners step-by-step using Kenyan real-life examples like chapatis, shillings, and crops.',
        'When a learner asks Mwalimu Rafiki for help, the app shares only the student’s first name, grade, current lesson question, and the student’s question. This allows the tutor to provide gentle Socratic hints.',
        'Replies from Mwalimu Rafiki are generated automatically by artificial intelligence. While carefully designed for young learners, AI answers can sometimes contain mistakes. Learners should always confirm key facts with their school teachers and textbooks.',
        'Learners must never share private details like their full home address, phone numbers, or passwords when chatting with the AI tutor.'
      ]
    },
    {
      id: 'who-sees-data',
      title: '6. Who Sees the Data',
      paragraphs: [
        'Your child’s learning information is private and strictly protected:'
      ],
      bullets: [
        'Linked parents and guardians can view their child’s scores, study time, and skill masteries.',
        'Linked teachers can view classroom progress for students enrolled in their class.',
        'Our trusted service providers help us host the app and run the learning engine under strict confidentiality agreements. They are allowed to handle information only to provide the service and never for their own purposes.',
        'We never sell, rent, or trade student personal information to any third party.',
        'We will disclose information only if required by a valid court order or under Kenyan law.'
      ]
    },
    {
      id: 'data-retention-deletion',
      title: '7. How Long We Keep Data and How to Delete It',
      paragraphs: [
        'We keep learning progress only as long as the student account is active.',
        'A parent or guardian can ask us to delete their child’s account and all associated data at any time.',
        'You can permanently erase all learning data directly inside the app by opening the profile settings and tapping "Delete My Learning Data". When chosen, all quiz answers, scores, reports, and records are permanently removed from our active systems.'
      ]
    },
    {
      id: 'security',
      title: '8. Keeping Data Safe',
      paragraphs: [
        'We take data protection seriously. We use modern encryption when information travels over the internet and when it is stored.',
        'Only authorized systems and verified accounts can access student progress. We regularly check our systems to prevent unauthorized access, loss, or misuse.'
      ]
    },
    {
      id: 'kenyan-rights',
      title: '9. Your Rights Under the Kenya Data Protection Act',
      paragraphs: [
        'Under the Kenya Data Protection Act, 2019, parents and guardians have specific legal rights regarding their child’s personal data:'
      ],
      bullets: [
        'Right to be informed: You have the right to know what data we collect and how we use it.',
        'Right of access: You can view all learning information stored about your child.',
        'Right to correction: You can update or correct inaccurate details in your profile.',
        'Right to deletion: You can request the complete erasure of your child’s records at any time.',
        'Right to object: You can object to specific types of data processing.',
        'Right to withdraw consent: You may withdraw your consent at any time without penalty.',
        'Right to complain: You have the right to lodge a complaint with the Office of the Data Protection Commissioner (ODPC) of Kenya if you believe your privacy rights have been violated.'
      ]
    },
    {
      id: 'policy-changes',
      title: '10. Changes to This Privacy Policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time as we add new learning features or as legal requirements change.',
        'When we make updates, we will update the "Last updated" date at the top of this page. If changes are significant, we will notify parents and learners clearly within the app.'
      ]
    }
  ],
  contactLine: 'If you have any questions about your child’s privacy or wish to exercise your data rights, please use the Help option inside the app.'
};
