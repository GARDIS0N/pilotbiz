import React, { useState } from 'react';
import { User, UserRole } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';
import { Language } from '../../utils/i18n.js';
import { SavannaBackground } from './SavannaBackground.js';
import { WelcomeHero } from './WelcomeHero.js';
import { SubjectChips } from './SubjectChips.js';
import { DemoAccountPicker } from './DemoAccountPicker.js';
import { RolePathCards } from './RolePathCards.js';
import { PreviewStrip } from './PreviewStrip.js';

interface Props {
  language: Language;
  onLoginSuccess: (user: User) => void;
  onOpenLoginPage: () => void;
  onStartQuest: (questId: string) => void;
}

export const WelcomeView: React.FC<Props> = ({
  language,
  onLoginSuccess,
  onOpenLoginPage,
  onStartQuest
}) => {
  const [loading, setLoading] = useState(false);

  const handleSelectDemo = async (role: UserRole) => {
    try {
      setLoading(true);
      sound.playClick();
      const res = await cbeApi.switchRole(role);
      sound.playCorrect();
      onLoginSuccess(res.user);
    } catch (err) {
      console.error('Failed to login demo account:', err);
      sound.playIncorrect();
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRole = (role: 'LEARNER' | 'PARENT' | 'TEACHER') => {
    sound.playClick();
    if (role === 'LEARNER') {
      handleSelectDemo('STUDENT');
    } else if (role === 'PARENT') {
      handleSelectDemo('PARENT');
    } else if (role === 'TEACHER') {
      handleSelectDemo('TEACHER');
    }
  };

  const handleTryGuestQuest = () => {
    sound.playClick();
    // Launch quest 1 (seedlings) in guest mode
    onStartQuest('mission-01-seedlings');
  };

  return (
    <div className="relative min-h-screen text-gray-100 flex flex-col justify-between overflow-x-hidden">
      {/* Lightweight Savanna Background */}
      <SavannaBackground />

      {/* Main Content Sections */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-12 md:space-y-16">
        {/* 1. Hero Section */}
        <WelcomeHero
          language={language}
          onStartPlaying={() => handleSelectDemo('STUDENT')}
          onTryGuestQuest={handleTryGuestQuest}
        />

        {/* 2. Subject Chips & KICD Trust Pill */}
        <SubjectChips language={language} />

        {/* 3. One-Tap Demo Account Picker */}
        <DemoAccountPicker
          language={language}
          loading={loading}
          onSelectDemo={handleSelectDemo}
        />

        {/* 4. Interactive Live Quest Preview */}
        <PreviewStrip
          language={language}
          onTryGuestQuest={handleTryGuestQuest}
        />

        {/* 5. Role Paths (Learner, Parent, Teacher) */}
        <RolePathCards
          language={language}
          onSelectRole={handleSelectRole}
        />
      </div>
    </div>
  );
};
