export interface Level {
  level: number;
  name: string;
  image: string;
  threshold: number;
  power: number;
}

export const LEVELS: Level[] = [
  {
    level: 1,
    name: 'Котик-новичок',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/724c5fba-594e-4fa6-bf82-de5de2654e88.jpg',
    threshold: 0,
    power: 1,
  },
  {
    level: 2,
    name: 'Крутой Дож',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/9f2f0751-4b32-4db7-a18b-9413bff9f567.jpg',
    threshold: 50,
    power: 2,
  },
  {
    level: 3,
    name: 'Качок-лягуха',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/c2bf288f-9908-45bf-9da8-e65f26bcad57.jpg',
    threshold: 200,
    power: 4,
  },
  {
    level: 4,
    name: 'Бафф Чимс',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/7ee05ce0-6c7e-421f-b26d-cf67b1e08d1c.jpg',
    threshold: 600,
    power: 8,
  },
  {
    level: 5,
    name: 'Космо-кот ЛЕГЕНДА',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/1f427ef2-911a-4920-ae62-b8e44d666a4a.jpg',
    threshold: 1500,
    power: 15,
  },
];

export function getLevelForScore(score: number): Level {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (score >= lvl.threshold) current = lvl;
  }
  return current;
}

export function getNextLevel(level: Level): Level | null {
  const idx = LEVELS.findIndex((l) => l.level === level.level);
  return LEVELS[idx + 1] ?? null;
}

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
  check: (s: GameStats) => boolean;
}

export interface GameStats {
  score: number;
  clicks: number;
  level: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first', name: 'Первый клик', desc: 'Кликни в первый раз', icon: 'MousePointerClick', check: (s) => s.clicks >= 1 },
  { id: 'click50', name: 'Разогрев', desc: '50 кликов', icon: 'Flame', check: (s) => s.clicks >= 50 },
  { id: 'click250', name: 'Машина', desc: '250 кликов', icon: 'Zap', check: (s) => s.clicks >= 250 },
  { id: 'score100', name: 'Сотка', desc: '100 очков', icon: 'Star', check: (s) => s.score >= 100 },
  { id: 'score500', name: 'Полтыщи', desc: '500 очков', icon: 'Trophy', check: (s) => s.score >= 500 },
  { id: 'lvl3', name: 'Качок', desc: 'Достигни 3 уровня', icon: 'Dumbbell', check: (s) => s.level >= 3 },
  { id: 'lvl5', name: 'ЛЕГЕНДА', desc: 'Достигни 5 уровня', icon: 'Rocket', check: (s) => s.level >= 5 },
  { id: 'score1500', name: 'Мем-бог', desc: '1500 очков', icon: 'Crown', check: (s) => s.score >= 1500 },
];
