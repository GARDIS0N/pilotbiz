import React from 'react';
import {
  Calculator,
  BookOpen,
  Feather,
  Sun,
  Palette,
  MessageSquare,
  Microscope,
  Compass,
  Sprout,
  Music,
  Globe,
  Award,
  Sparkles,
  Layers,
  Leaf,
  Activity,
  Trees,
  Church,
  Scroll,
  HelpCircle,
  Heart,
  Moon,
  Hash,
  Flame,
  Trophy,
  Star,
  Languages,
  TreePine
} from 'lucide-react';

interface Props {
  name: string;
  className?: string;
  size?: number;
}

// Explicit map of known curriculum icon names to Lucide components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Calculator,
  calculator: Calculator,
  BookOpen,
  'book-open': BookOpen,
  bookopen: BookOpen,
  Feather,
  feather: Feather,
  Sun,
  sun: Sun,
  Palette,
  palette: Palette,
  MessageSquare,
  'message-square': MessageSquare,
  messagesquare: MessageSquare,
  Microscope,
  microscope: Microscope,
  Compass,
  compass: Compass,
  Sprout,
  sprout: Sprout,
  Music,
  music: Music,
  Globe,
  globe: Globe,
  Award,
  award: Award,
  Sparkles,
  sparkles: Sparkles,
  Layers,
  layers: Layers,
  Leaf,
  leaf: Leaf,
  Activity,
  activity: Activity,
  Trees,
  trees: Trees,
  Church,
  church: Church,
  Scroll,
  scroll: Scroll,
  Heart,
  heart: Heart,
  Moon,
  moon: Moon,
  Hash,
  hash: Hash,
  Flame,
  flame: Flame,
  Trophy,
  trophy: Trophy,
  Star,
  star: Star,
  Languages,
  languages: Languages,
  TreePine,
  treepine: TreePine,
  'tree-pine': TreePine
};

// Check if string is an emoji
function isEmoji(str: string): boolean {
  return /\p{Extended_Pictographic}/u.test(str);
}

export const CurriculumIcon: React.FC<Props> = ({
  name,
  className = 'w-5 h-5 text-current',
  size = 20
}) => {
  if (!name) {
    return <Sparkles className={className} size={size} />;
  }

  // If it's an emoji (e.g., '🧮', '🌱', '🦁'), render as a styled span
  if (isEmoji(name)) {
    return (
      <span
        className={`inline-flex items-center justify-center select-none leading-none ${className}`}
        style={{ fontSize: `${size}px` }}
        role="img"
        aria-hidden="true"
      >
        {name}
      </span>
    );
  }

  // Look up Lucide component in explicit map
  const Component = ICON_MAP[name] || ICON_MAP[name.trim()];

  if (Component) {
    return <Component className={className} size={size} />;
  }

  // Fallback icon: NEVER render raw text like "Calculator" or "BookOpen"
  return <Sparkles className={className} size={size} />;
};
