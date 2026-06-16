import Icon from '@/components/ui/icon';
import { UPGRADES, OwnedUpgrades, getUpgradeCost } from '@/lib/upgrades';

interface Props {
  score: number;
  owned: OwnedUpgrades;
  perSecond: number;
  onBuy: (id: string) => void;
}

const UpgradeShop = ({ score, owned, perSecond, onBuy }: Props) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-extrabold mb-1 text-white flex items-center gap-2">
        <Icon name="ShoppingCart" className="text-cyan-300" size={28} />
        Автокликеры
      </h2>
      {perSecond > 0 && (
        <div className="mb-4 inline-flex items-center gap-1.5 bg-cyan-400/20 border border-cyan-300/30 text-cyan-200 px-3 py-1 rounded-full text-sm font-bold">
          <Icon name="TrendingUp" size={15} />
          +{perSecond.toLocaleString('ru-RU')} очков/сек
        </div>
      )}
      <div className="flex flex-col gap-2">
        {UPGRADES.map((u) => {
          const count = owned[u.id] || 0;
          const cost = getUpgradeCost(u, count);
          const canAfford = score >= cost;
          return (
            <button
              key={u.id}
              onClick={() => canAfford && onBuy(u.id)}
              disabled={!canAfford}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all text-left ${
                canAfford
                  ? 'bg-white/15 border-white/30 hover:bg-white/25 active:scale-95 cursor-pointer'
                  : 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${canAfford ? 'bg-cyan-400/30' : 'bg-white/10'}`}>
                <Icon name={u.icon} className="text-white" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">{u.name}</span>
                  {count > 0 && (
                    <span className="bg-yellow-400 text-black text-xs font-black px-1.5 py-0.5 rounded-full">
                      ×{count}
                    </span>
                  )}
                </div>
                <div className="text-white/60 text-xs">{u.desc} · +{u.perSecond}/сек</div>
              </div>
              <div className="text-right shrink-0">
                <div className={`font-black text-sm ${canAfford ? 'text-yellow-300' : 'text-white/40'}`}>
                  {cost.toLocaleString('ru-RU')}
                </div>
                <div className="text-white/50 text-xs">очков</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradeShop;
