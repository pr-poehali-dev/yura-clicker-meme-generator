let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext {
  if (!ctx) {
    const w = window as unknown as { AudioContext: typeof AudioContext; webkitAudioContext: typeof AudioContext };
    ctx = new (w.AudioContext || w.webkitAudioContext)();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function setMuted(value: boolean) {
  muted = value;
}

export function isMuted() {
  return muted;
}

function tone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.2, delay = 0) {
  if (muted) return;
  const audio = getCtx();
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const start = audio.currentTime + delay;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(start);
  osc.stop(start + duration);
}

export function playClick() {
  const freqs = [520, 560, 600, 640];
  const f = freqs[Math.floor(Math.random() * freqs.length)];
  tone(f, 0.12, 'triangle', 0.18);
}

function rand(arr: number[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function playMemeClick(level: number) {
  switch (level) {
    case 1:
      // Котик — нежное "мяу"
      tone(rand([660, 700, 740]), 0.1, 'sine', 0.16);
      tone(rand([480, 520]), 0.14, 'sine', 0.1, 0.06);
      break;
    case 2:
      // Дож — низкий уверенный "вуф"
      tone(rand([200, 230, 260]), 0.16, 'sawtooth', 0.16);
      break;
    case 3:
      // Лягуха — упругое "квак"
      tone(rand([340, 380]), 0.06, 'square', 0.15);
      tone(rand([180, 210]), 0.12, 'square', 0.14, 0.05);
      break;
    case 4:
      // Чимс — мощный бас-удар
      tone(rand([110, 130, 150]), 0.2, 'sawtooth', 0.2);
      tone(rand([220, 260]), 0.1, 'square', 0.1, 0.02);
      break;
    case 5:
      // Космо-кот — звёздный "бип-бип"
      tone(rand([880, 990]), 0.08, 'triangle', 0.16);
      tone(rand([1180, 1320, 1480]), 0.16, 'triangle', 0.16, 0.07);
      break;
    case 6:
      // Сова в шоке — резкий вскрик "вух!"
      tone(rand([1400, 1600, 1800]), 0.05, 'sawtooth', 0.18);
      tone(rand([600, 700]), 0.18, 'sine', 0.12, 0.04);
      break;
    case 7:
      // Чилл Капибара — медитативный lo-fi бас
      tone(rand([80, 90, 100]), 0.25, 'sine', 0.2);
      tone(rand([160, 180]), 0.15, 'triangle', 0.1, 0.1);
      break;
    case 8:
      // Плачу-смеюсь — хаотичный глитч
      tone(rand([440, 550, 660]), 0.04, 'square', 0.15);
      tone(rand([330, 280, 220]), 0.04, 'square', 0.15, 0.05);
      tone(rand([880, 770]), 0.1, 'sawtooth', 0.1, 0.09);
      break;
    case 9:
      // GIGA CHAD — эпичный низкий удар
      tone(rand([60, 70, 80]), 0.3, 'sawtooth', 0.22);
      tone(rand([300, 350]), 0.08, 'square', 0.12, 0.03);
      tone(rand([600, 700]), 0.06, 'triangle', 0.1, 0.08);
      break;
    case 10:
      // SKIBIDI TOILET — безумный рингтон
      tone(880, 0.06, 'square', 0.16, 0);
      tone(1100, 0.06, 'square', 0.16, 0.07);
      tone(880, 0.06, 'square', 0.16, 0.14);
      tone(1320, 0.12, 'triangle', 0.18, 0.21);
      break;
    case 11:
      // Брат 67 — рэп-удар, свэг
      tone(rand([80, 90]), 0.12, 'sawtooth', 0.2);
      tone(rand([440, 480]), 0.07, 'square', 0.14, 0.06);
      tone(rand([660, 720]), 0.05, 'triangle', 0.1, 0.12);
      break;
    case 12:
      // Братишка 52 — шок и непонимание
      tone(rand([1600, 1800]), 0.04, 'sawtooth', 0.17);
      tone(rand([400, 450]), 0.1, 'sine', 0.13, 0.05);
      tone(rand([200, 240]), 0.15, 'triangle', 0.1, 0.1);
      break;
    case 13:
      // SKIBIDI УЛЬТРА — двойной взрыв
      tone(rand([60, 70]), 0.15, 'sawtooth', 0.22);
      tone(rand([880, 990]), 0.06, 'square', 0.16, 0.03);
      tone(rand([1320, 1540]), 0.06, 'square', 0.16, 0.1);
      tone(rand([440, 550]), 0.12, 'triangle', 0.12, 0.16);
      break;
    case 14:
      // Села и дала — победный королевский звук
      tone(523, 0.08, 'triangle', 0.18, 0);
      tone(659, 0.08, 'triangle', 0.18, 0.07);
      tone(784, 0.08, 'triangle', 0.18, 0.14);
      tone(1046, 0.2, 'sine', 0.2, 0.21);
      break;
    case 15:
      // Шокированный Пикачу — удивлённый писк
      tone(rand([1200, 1400]), 0.04, 'sine', 0.18);
      tone(rand([600, 700]), 0.08, 'triangle', 0.15, 0.04);
      tone(rand([900, 1000]), 0.12, 'sine', 0.12, 0.1);
      break;
    case 16:
      // Отвлёкся — скользящий глиссандо
      tone(rand([500, 600]), 0.18, 'sine', 0.16);
      tone(rand([300, 350]), 0.1, 'triangle', 0.12, 0.08);
      break;
    case 17:
      // Взрыв мозга — нарастающий хаос
      tone(rand([200, 300]), 0.05, 'sawtooth', 0.15);
      tone(rand([600, 800]), 0.05, 'sawtooth', 0.15, 0.05);
      tone(rand([1000, 1400]), 0.05, 'sawtooth', 0.15, 0.1);
      tone(rand([1800, 2000]), 0.1, 'sawtooth', 0.15, 0.15);
      break;
    case 18:
      // STONKS — восходящий звук роста
      tone(330, 0.07, 'triangle', 0.16, 0);
      tone(440, 0.07, 'triangle', 0.16, 0.06);
      tone(550, 0.07, 'triangle', 0.16, 0.12);
      tone(660, 0.15, 'triangle', 0.2, 0.18);
      break;
    case 19:
      // Кот говорит НЕТ — резкий отказ
      tone(rand([150, 180]), 0.05, 'sawtooth', 0.2);
      tone(rand([100, 130]), 0.15, 'sawtooth', 0.18, 0.05);
      break;
    case 20:
      // Chad vs Virgin — эпичный дуэт
      tone(rand([80, 90]), 0.2, 'sawtooth', 0.2);
      tone(rand([1200, 1400]), 0.08, 'square', 0.16, 0.05);
      tone(rand([600, 700]), 0.12, 'triangle', 0.14, 0.12);
      break;
    case 21:
      // Бафф Губка Боб — подводный удар
      tone(rand([200, 240]), 0.06, 'sine', 0.18);
      tone(rand([400, 500]), 0.1, 'triangle', 0.16, 0.05);
      tone(rand([800, 900]), 0.2, 'sine', 0.14, 0.1);
      break;
    case 22:
      // Always Has Been — космический синтез
      tone(rand([440, 480]), 0.06, 'triangle', 0.14);
      tone(rand([880, 960]), 0.06, 'triangle', 0.14, 0.06);
      tone(rand([1320, 1440]), 0.14, 'sine', 0.18, 0.12);
      break;
    case 23:
      // This is Fine — спокойный трагичный звук
      tone(rand([300, 340]), 0.2, 'sine', 0.16);
      tone(rand([280, 320]), 0.2, 'sine', 0.12, 0.1);
      break;
    case 24:
      // GALAXY BRAIN — финальный космический взрыв
      tone(60, 0.1, 'sawtooth', 0.2, 0);
      tone(523, 0.08, 'square', 0.16, 0.05);
      tone(1046, 0.08, 'square', 0.16, 0.12);
      tone(2093, 0.06, 'triangle', 0.18, 0.18);
      tone(rand([880, 990, 1100]), 0.25, 'sine', 0.2, 0.22);
      break;
    case 25:
      // Черемша танцует — весёлый хруст-шелест
      tone(rand([900, 1000, 1100]), 0.05, 'sine', 0.14);
      tone(rand([700, 800]), 0.07, 'triangle', 0.12, 0.05);
      tone(rand([500, 600]), 0.1, 'sine', 0.14, 0.1);
      break;
    case 26:
      // Черемша в очках — свэгерный хруст
      tone(rand([300, 350]), 0.04, 'square', 0.15);
      tone(rand([600, 700]), 0.06, 'triangle', 0.15, 0.04);
      tone(rand([1200, 1400]), 0.08, 'sine', 0.12, 0.09);
      break;
    case 27:
      // Черемша-КОРОЛЬ — торжественный марш
      tone(392, 0.08, 'triangle', 0.18, 0);
      tone(523, 0.08, 'triangle', 0.18, 0.08);
      tone(659, 0.08, 'triangle', 0.18, 0.16);
      tone(784, 0.2, 'sine', 0.22, 0.24);
      break;
    case 28:
      // Газан на сцене — рэп-бит удар
      tone(rand([70, 80]), 0.15, 'sawtooth', 0.22);
      tone(rand([500, 600]), 0.05, 'square', 0.14, 0.05);
      tone(rand([1000, 1200]), 0.06, 'triangle', 0.12, 0.1);
      break;
    case 29:
      // Газан Thug Life — золотые цепи звенят
      tone(rand([400, 500]), 0.04, 'triangle', 0.18);
      tone(rand([600, 700]), 0.04, 'triangle', 0.18, 0.04);
      tone(rand([80, 90]), 0.2, 'sawtooth', 0.2, 0.07);
      tone(rand([1400, 1600]), 0.05, 'square', 0.14, 0.12);
      break;
    case 30:
      // ГАЗАН ОГОНЬ — финал с огнём и баттлом
      tone(rand([60, 70]), 0.08, 'sawtooth', 0.22, 0);
      tone(rand([440, 520]), 0.06, 'square', 0.18, 0.05);
      tone(rand([880, 1000]), 0.06, 'square', 0.18, 0.11);
      tone(rand([1760, 2000]), 0.08, 'triangle', 0.2, 0.17);
      tone(rand([300, 400]), 0.2, 'sine', 0.16, 0.24);
      break;
    default:
      playClick();
  }
}

export function playLevelUp() {
  tone(523, 0.15, 'square', 0.15, 0);
  tone(659, 0.15, 'square', 0.15, 0.1);
  tone(784, 0.25, 'square', 0.15, 0.2);
}

export function playAchievement() {
  tone(659, 0.12, 'triangle', 0.2, 0);
  tone(880, 0.12, 'triangle', 0.2, 0.1);
  tone(1046, 0.3, 'triangle', 0.2, 0.2);
}