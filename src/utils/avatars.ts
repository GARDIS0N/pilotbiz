export interface AvatarOption {
  id: string;
  name: string;
  swahiliName: string;
  title: string;
  emoji: string;
  color: string;
  bgGradient: string;
  description: string;
}

export const AVATARS: Record<string, AvatarOption> = {
  cheetah: {
    id: 'cheetah',
    name: 'Kip the Cheetah',
    swahiliName: 'Duma Kip',
    title: 'Speed & Agility',
    emoji: '🐆',
    color: '#F59E0B',
    bgGradient: 'from-amber-400 to-orange-500',
    description: 'Fast thinker and swift problem solver from the Maasai Mara.'
  },
  lion: {
    id: 'lion',
    name: 'Simba the Lion',
    swahiliName: 'Simba Jasiri',
    title: 'Courage & Leadership',
    emoji: '🦁',
    color: '#EA580C',
    bgGradient: 'from-orange-500 to-red-600',
    description: 'Brave and determined champion of the Kenyan savannas.'
  },
  owl: {
    id: 'owl',
    name: 'Wanjiku the Owl',
    swahiliName: 'Bundi Mwerevu',
    title: 'Wisdom & Knowledge',
    emoji: '🦉',
    color: '#8B5CF6',
    bgGradient: 'from-purple-500 to-indigo-600',
    description: 'Patient scholar who loves books, nature, and deep questions.'
  },
  eagle: {
    id: 'eagle',
    name: 'Baraka the Eagle',
    swahiliName: 'Tai Baraka',
    title: 'Vision & Focus',
    emoji: '🦅',
    color: '#0EA5E9',
    bgGradient: 'from-sky-400 to-blue-600',
    description: 'Sharp-eyed explorer soaring over Mount Kenya.'
  },
  elephant: {
    id: 'elephant',
    name: 'Tembo the Elephant',
    swahiliName: 'Tembo Mpole',
    title: 'Memory & Kindness',
    emoji: '🐘',
    color: '#10B981',
    bgGradient: 'from-emerald-400 to-teal-600',
    description: 'Strong memory and gentle protector of Amboseli forests.'
  },
  gazelle: {
    id: 'gazelle',
    name: 'Amani the Gazelle',
    swahiliName: 'Swala Amani',
    title: 'Grace & Peace',
    emoji: '🦌',
    color: '#EC4899',
    bgGradient: 'from-pink-400 to-rose-600',
    description: 'Quick on her feet and always eager to learn with friends.'
  },
  monkey: {
    id: 'monkey',
    name: 'Juma the Vervet',
    swahiliName: 'Tumbili Juma',
    title: 'Curiosity & Wit',
    emoji: '🐒',
    color: '#14B8A6',
    bgGradient: 'from-teal-400 to-emerald-600',
    description: 'Playful explorer with a boundless appetite for discovery.'
  }
};

export function getAvatar(id: string): AvatarOption {
  return AVATARS[id] || AVATARS.cheetah;
}
