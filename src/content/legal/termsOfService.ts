import { LAST_UPDATED_DATE, LEGAL_VERSION } from './constants.js';
import { LegalDocument } from './privacyPolicy.js';

export const TERMS_OF_SERVICE: LegalDocument = {
  title: 'Terms of Service',
  subtitle: 'Rules and conditions for using the Jifuno learning platform',
  lastUpdated: LAST_UPDATED_DATE,
  version: LEGAL_VERSION,
  summary: [
    'Jifuno is an educational learning app designed for primary school learners in Kenya.',
    'Children need a parent or guardian’s permission to use Jifuno.',
    'Please treat our community and the learning tools with respect: no cheating, hacking, or abusing the AI tutor.',
    'Jifuno is aligned with the Competency-Based Curriculum (CBC), but it is not an official Ministry of Education product and does not replace regular school.',
    'All app questions, artwork, and characters belong to Jifuno for your personal, non-commercial learning.'
  ],
  sections: [
    {
      id: 'who-can-use',
      title: '1. Who Can Use Jifuno',
      paragraphs: [
        'Jifuno is created for Kenyan primary learners in Grades 3, 4, 5, and 6.',
        'Because our learners are young, every child must have the consent and supervision of a parent or legal guardian.',
        'By signing up for an account, you confirm that you are a parent or guardian, or that you have received your parent or guardian’s clear permission to use the app.'
      ]
    },
    {
      id: 'accounts-passwords',
      title: '2. Accounts, Passwords, and Roles',
      paragraphs: [
        'Jifuno supports three primary roles: learners, parents, and teachers.',
        'Parents and guardians are responsible for supervising their child’s account and keeping login credentials confidential.',
        'Teachers may set up and use classroom accounts only for learners actively enrolled in their school classes, and must have appropriate school or parental authorization.',
        'If you notice any unauthorized access to your account, please inform us immediately through the app.'
      ]
    },
    {
      id: 'acceptable-use',
      title: '3. Acceptable Use and Community Rules',
      paragraphs: [
        'We want Jifuno to be a safe, motivating, and fair learning environment for every child across Kenya. When using Jifuno, you agree that you will not:'
      ],
      bullets: [
        'Use automated bots, cheats, scripts, or score manipulators to earn points, XP, or streak days unfairly.',
        'Attempt to reverse engineer, hack, overload, or disrupt our systems or servers.',
        'Copy, scrape, or extract question banks, illustrations, or curriculum data without written authorization.',
        'Send harmful, abusive, obscene, or threatening messages to the AI tutor or any other user.',
        'Attempt to bypass account security or access another learner’s private progress without permission.'
      ]
    },
    {
      id: 'learning-content-ai',
      title: '4. Learning Content and AI Guidance',
      paragraphs: [
        'Jifuno’s practice quests in Mathematics, Science and Technology, Kiswahili, and English are carefully designed around the Kenyan Competency-Based Curriculum (CBC).',
        'However, Jifuno is an independent digital learning tool. It is not an official product of the Kenya Institute of Curriculum Development (KICD) or the Ministry of Education, and it is not a substitute for attending school or guidance from professional teachers.',
        'Our companion tutor, Mwalimu Rafiki, uses artificial intelligence to generate guiding hints and Socratic explanations. While we tune our AI specifically for primary learners, AI answers can occasionally contain errors, miscalculations, or omissions. Learners and parents should always check important facts against school textbooks and teacher instructions.'
      ]
    },
    {
      id: 'intellectual-property',
      title: '5. Ownership of Content and Limited License',
      paragraphs: [
        'All curriculum questions, game worlds, character designs, graphics, audio, animations, and software code in Jifuno belong to Jifuno and our licensors.',
        'We grant you a personal, limited, non-commercial, and non-transferable license to use Jifuno for your own household or classroom learning.',
        'You may not sell, rent, sublicense, broadcast, or commercially exploit any part of Jifuno or its curriculum materials.'
      ]
    },
    {
      id: 'availability-updates',
      title: '6. App Availability and Platform Updates',
      paragraphs: [
        'We continuously improve Jifuno by adding new quest missions, refining questions, and enhancing app performance.',
        'From time to time, the service may be temporarily unavailable for scheduled maintenance or due to internet network disruptions. We do not guarantee uninterrupted or error-free operation at all times.'
      ]
    },
    {
      id: 'limits-of-liability',
      title: '7. Limits of Liability',
      paragraphs: [
        'Jifuno is provided on an "as is" and "as available" basis for practice and learning purposes.',
        'To the fullest extent permitted by the laws of Kenya, Jifuno and its team are not liable for any indirect, incidental, or consequential damages resulting from your use of or inability to use the app.',
        'Nothing in these Terms excludes or limits any statutory liability that cannot be excluded under Kenyan consumer protection or data protection law.'
      ]
    },
    {
      id: 'suspension-deletion',
      title: '8. Account Suspension and Deletion',
      paragraphs: [
        'We reserve the right to suspend or close accounts that repeatedly violate these Terms, cheat the game engine, or endanger the safety of our young learners.',
        'Parents and guardians can close their account and permanently delete all student learning data at any time directly through the app settings.'
      ]
    },
    {
      id: 'governing-law',
      title: '9. Governing Law and Dispute Resolution',
      paragraphs: [
        'These Terms of Service are governed by and interpreted in accordance with the laws of the Republic of Kenya.',
        'Any dispute arising out of or related to these Terms will be subject to the jurisdiction of the courts of Kenya, following friendly informal efforts to resolve the matter.'
      ]
    },
    {
      id: 'changes-to-terms',
      title: '10. Changes to These Terms',
      paragraphs: [
        'We may revise these Terms as our app evolves or as legal standards require.',
        'Whenever we make important changes, we will update the "Last updated" date and post an announcement in the app. By continuing to use Jifuno after updates take effect, you agree to the revised Terms.'
      ]
    }
  ],
  contactLine: 'If you have any questions about these Terms of Service, please reach out using the Help option inside the app.'
};
