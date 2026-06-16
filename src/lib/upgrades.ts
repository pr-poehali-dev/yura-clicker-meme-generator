export interface Upgrade {
  id: string;
  name: string;
  desc: string;
  icon: string;
  baseCost: number;
  perSecond: number;
}

export const UPGRADES: Upgrade[] = [
  { id: 'bot1', name: 'Кот-кликер', desc: 'Тихонько тыкает лапкой', icon: 'Cat', baseCost: 50, perSecond: 1 },
  { id: 'bot2', name: 'Дож-помощник', desc: 'Wow. Much click. Very fast.', icon: 'Dog', baseCost: 300, perSecond: 5 },
  { id: 'bot3', name: 'Лягуха-качок', desc: 'Жмёт изо всех сил', icon: 'Dumbbell', baseCost: 2000, perSecond: 20 },
  { id: 'bot4', name: 'Капибара-чиллер', desc: 'Спокойно, но стабильно', icon: 'Coffee', baseCost: 15000, perSecond: 80 },
  { id: 'bot5', name: 'GIGA-кликер', desc: 'Эпичный автоудар', icon: 'Zap', baseCost: 100000, perSecond: 300 },
  { id: 'bot6', name: 'Газан-рэпер', desc: 'Кидает рифмы и очки', icon: 'Mic', baseCost: 1000000, perSecond: 1500 },
  { id: 'bot7', name: 'Черемша-завод', desc: 'Промышленная черемша', icon: 'Factory', baseCost: 10000000, perSecond: 8000 },
  { id: 'bot8', name: 'SKIBIDI-армия', desc: 'Целая армия унитазов', icon: 'Users', baseCost: 100000000, perSecond: 40000 },
];

export type OwnedUpgrades = Record<string, number>;

export function getUpgradeCost(upgrade: Upgrade, owned: number): number {
  return Math.floor(upgrade.baseCost * Math.pow(1.15, owned));
}

export function getTotalPerSecond(upgrades: OwnedUpgrades): number {
  return UPGRADES.reduce((sum, u) => sum + u.perSecond * (upgrades[u.id] || 0), 0);
}
