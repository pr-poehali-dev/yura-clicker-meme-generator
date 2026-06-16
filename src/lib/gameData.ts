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
  {
    level: 6,
    name: 'Сова в шоке',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/c35c0261-0e33-455e-9774-571535bdad30.jpg',
    threshold: 3000,
    power: 25,
  },
  {
    level: 7,
    name: 'Чилл Капибара',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/a43f5815-73a0-4a0a-8a6b-55a6a08f62a3.jpg',
    threshold: 6000,
    power: 40,
  },
  {
    level: 8,
    name: 'Плачу-смеюсь 💀',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/e4c11ebc-b6e5-453d-9226-5b5ac9ce5873.jpg',
    threshold: 12000,
    power: 65,
  },
  {
    level: 9,
    name: 'GIGA CHAD',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/202ff3f1-80ee-462f-b002-42aaa6fa6e8d.jpg',
    threshold: 25000,
    power: 100,
  },
  {
    level: 10,
    name: 'SKIBIDI TOILET БОГ',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/b75d88d3-5580-4f48-bd26-6750fa6a55ae.jpg',
    threshold: 50000,
    power: 180,
  },
  {
    level: 11,
    name: 'Брат 67',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/c5a3ade6-3cee-4863-91d9-8d80b98eae3a.jpg',
    threshold: 100000,
    power: 300,
  },
  {
    level: 12,
    name: 'Братишка 52',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/0718e9ec-98dc-4274-ad2e-cd4efa32c4ed.jpg',
    threshold: 200000,
    power: 500,
  },
  {
    level: 13,
    name: 'SKIBIDI TOILET УЛЬТРА',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/eb0f7df6-9045-4144-bdc2-4781471b785a.jpg',
    threshold: 400000,
    power: 800,
  },
  {
    level: 14,
    name: 'Села и дала 👸',
    image: 'https://cdn.poehali.dev/projects/537189a2-5499-448e-938e-d5577797daab/files/4b76835a-b67f-4cda-8987-2969a3cdbf4d.jpg',
    threshold: 800000,
    power: 1337,
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
  { id: 'click1000', name: 'Кликер-маньяк', desc: '1000 кликов', icon: 'MousePointer2', check: (s) => s.clicks >= 1000 },
  { id: 'lvl7', name: 'Чилл-мастер', desc: 'Достигни 7 уровня', icon: 'Headphones', check: (s) => s.level >= 7 },
  { id: 'lvl9', name: 'GIGA CHAD', desc: 'Достигни 9 уровня', icon: 'Shield', check: (s) => s.level >= 9 },
  { id: 'lvl10', name: 'SKIBIDI БОГ', desc: 'Достигни 10 уровня', icon: 'Sparkles', check: (s) => s.level >= 10 },
  { id: 'score50000', name: 'Мем-Вселенная', desc: '50 000 очков', icon: 'Infinity', check: (s) => s.score >= 50000 },
  { id: 'lvl11', name: 'Брат 67', desc: 'Достигни 11 уровня', icon: 'Music', check: (s) => s.level >= 11 },
  { id: 'lvl12', name: 'Братишка 52', desc: 'Достигни 12 уровня', icon: 'Radio', check: (s) => s.level >= 12 },
  { id: 'lvl13', name: 'SKIBIDI УЛЬТРА', desc: 'Достигни 13 уровня', icon: 'Bomb', check: (s) => s.level >= 13 },
  { id: 'lvl14', name: 'ФИНАЛЬНЫЙ БОСС', desc: 'Достигни 14 уровня', icon: 'Heart', check: (s) => s.level >= 14 },
  { id: 'score800000', name: 'МЕМ-АБСОЛЮТ', desc: '800 000 очков', icon: 'Globe', check: (s) => s.score >= 800000 },
];