import { useEffect, useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import AchievementsPanel from '@/components/AchievementsPanel';
import {
  LEVELS,
  ACHIEVEMENTS,
  getLevelForScore,
  getNextLevel,
} from '@/lib/gameData';
import {
  playMemeClick,
  playLevelUp,
  playAchievement,
  setMuted,
} from '@/lib/sounds';

interface FloatingScore {
  id: number;
  value: number;
  x: number;
  y: number;
}

const STORAGE_KEY = 'meme-clicker-save';

const Index = () => {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [floats, setFloats] = useState<FloatingScore[]>([]);
  const [pop, setPop] = useState(false);
  const [muted, setMutedState] = useState(false);
  const [toast, setToast] = useState<{ name: string; icon: string } | null>(null);
  const floatId = useRef(0);
  const prevLevel = useRef(1);
  const loaded = useRef(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const d = JSON.parse(raw);
        setScore(d.score || 0);
        setClicks(d.clicks || 0);
        setUnlocked(d.unlocked || []);
        prevLevel.current = getLevelForScore(d.score || 0).level;
      } catch {
        /* ignore */
      }
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ score, clicks, unlocked }));
  }, [score, clicks, unlocked]);

  const level = getLevelForScore(score);
  const nextLevel = getNextLevel(level);

  const progress = nextLevel
    ? Math.min(
        100,
        ((score - level.threshold) / (nextLevel.threshold - level.threshold)) * 100,
      )
    : 100;

  useEffect(() => {
    if (!loaded.current) return;
    if (level.level > prevLevel.current) {
      prevLevel.current = level.level;
      playLevelUp();
    }
  }, [level.level]);

  useEffect(() => {
    if (!loaded.current) return;
    const stats = { score, clicks, level: level.level };
    const newly = ACHIEVEMENTS.filter(
      (a) => !unlocked.includes(a.id) && a.check(stats),
    );
    if (newly.length) {
      setUnlocked((u) => [...u, ...newly.map((a) => a.id)]);
      playAchievement();
      const a = newly[0];
      setToast({ name: a.name, icon: a.icon });
      setTimeout(() => setToast(null), 2600);
    }
  }, [score, clicks, level.level]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      playMemeClick(level.level);
      setScore((s) => s + level.power);
      setClicks((c) => c + 1);
      setPop(true);
      setTimeout(() => setPop(false), 250);

      const rect = e.currentTarget.getBoundingClientRect();
      const id = floatId.current++;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setFloats((f) => [...f, { id, value: level.power, x, y }]);
      setTimeout(() => setFloats((f) => f.filter((fl) => fl.id !== id)), 900);
    },
    [level.power],
  );

  const toggleMute = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
  };

  const reset = () => {
    setScore(0);
    setClicks(0);
    setUnlocked([]);
    prevLevel.current = 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-400/40 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-400/40 rounded-full blur-3xl animate-glow-pulse" />

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-badge-in">
          <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/40">
            <Icon name={toast.icon} size={26} />
            <div>
              <div className="text-xs font-bold uppercase opacity-80">Достижение!</div>
              <div className="font-extrabold leading-tight">{toast.name}</div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 flex flex-col items-center gap-6">
        <header className="w-full flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg tracking-tight">
            МЕМ-КЛИКЕР
          </h1>
          <div className="flex gap-2">
            <button
              onClick={toggleMute}
              className="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur flex items-center justify-center text-white transition-colors"
              title={muted ? 'Включить звук' : 'Выключить звук'}
            >
              <Icon name={muted ? 'VolumeX' : 'Volume2'} size={22} />
            </button>
            <button
              onClick={reset}
              className="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur flex items-center justify-center text-white transition-colors"
              title="Сбросить прогресс"
            >
              <Icon name="RotateCcw" size={20} />
            </button>
          </div>
        </header>

        <div className="text-center">
          <div className="text-6xl sm:text-7xl font-black text-white drop-shadow-xl tabular-nums">
            {score.toLocaleString('ru-RU')}
          </div>
          <div className="text-white/80 font-semibold mt-1">очков мемности</div>
        </div>

        <div className="text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-white font-bold">
            <Icon name="Sparkles" size={18} className="text-yellow-300" />
            Ур. {level.level} · {level.name}
          </span>
        </div>

        <button
          onClick={handleClick}
          className={`relative select-none rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-white/40 active:ring-white/70 transition-transform ${
            pop ? 'animate-pop' : ''
          }`}
        >
          <img
            src={level.image}
            alt={level.name}
            draggable={false}
            className="w-72 h-72 sm:w-80 sm:h-80 object-cover pointer-events-none"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 text-violet-700 font-black px-4 py-1 rounded-full text-sm whitespace-nowrap">
            ТЫК! +{level.power}
          </span>
          {floats.map((f) => (
            <span
              key={f.id}
              className="absolute text-3xl font-black text-yellow-300 drop-shadow-lg pointer-events-none animate-float-up"
              style={{ left: f.x, top: f.y }}
            >
              +{f.value}
            </span>
          ))}
        </button>

        <div className="w-full max-w-md">
          <div className="flex justify-between text-white/90 text-sm font-bold mb-1">
            <span>Ур. {level.level}</span>
            <span>{nextLevel ? `Ур. ${nextLevel.level}` : 'МАКС'}</span>
          </div>
          <div className="h-4 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 to-pink-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {nextLevel && (
            <div className="text-center text-white/80 text-sm mt-1.5">
              До нового мема: {Math.max(0, nextLevel.threshold - score)} очков
            </div>
          )}
        </div>

        <div className="flex gap-3 w-full max-w-md">
          <div className="flex-1 bg-white/15 backdrop-blur rounded-2xl p-3 text-center text-white">
            <div className="text-2xl font-black tabular-nums">{clicks}</div>
            <div className="text-xs font-semibold opacity-80">всего кликов</div>
          </div>
          <div className="flex-1 bg-white/15 backdrop-blur rounded-2xl p-3 text-center text-white">
            <div className="text-2xl font-black tabular-nums">+{level.power}</div>
            <div className="text-xs font-semibold opacity-80">за клик</div>
          </div>
          <div className="flex-1 bg-white/15 backdrop-blur rounded-2xl p-3 text-center text-white">
            <div className="text-2xl font-black tabular-nums">
              {level.level}/{LEVELS.length}
            </div>
            <div className="text-xs font-semibold opacity-80">мемов открыто</div>
          </div>
        </div>

        <div className="w-full bg-white/10 backdrop-blur rounded-3xl p-5 border border-white/10 mt-2">
          <AchievementsPanel unlocked={unlocked} />
        </div>

        <footer className="text-white/60 text-sm pb-4">Кликай и открывай новые мемы!</footer>
      </div>
    </div>
  );
};

export default Index;