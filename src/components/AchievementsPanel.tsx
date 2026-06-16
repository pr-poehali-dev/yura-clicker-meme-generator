import Icon from '@/components/ui/icon';
import { ACHIEVEMENTS } from '@/lib/gameData';

interface Props {
  unlocked: string[];
}

const AchievementsPanel = ({ unlocked }: Props) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-extrabold mb-4 text-white flex items-center gap-2">
        <Icon name="Trophy" className="text-yellow-300" size={28} />
        Достижения
        <span className="text-base font-medium text-white/60">
          {unlocked.length}/{ACHIEVEMENTS.length}
        </span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ACHIEVEMENTS.map((a) => {
          const got = unlocked.includes(a.id);
          return (
            <div
              key={a.id}
              className={`rounded-2xl p-3 flex flex-col items-center text-center gap-1 border transition-all ${
                got
                  ? 'bg-gradient-to-br from-yellow-400/90 to-pink-500/90 border-white/40 shadow-lg'
                  : 'bg-white/5 border-white/10 opacity-50'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  got ? 'bg-white/30' : 'bg-white/10'
                }`}
              >
                <Icon name={got ? a.icon : 'Lock'} className="text-white" size={22} />
              </div>
              <span className="text-sm font-bold text-white leading-tight">{a.name}</span>
              <span className="text-[11px] text-white/70 leading-tight">{a.desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPanel;
