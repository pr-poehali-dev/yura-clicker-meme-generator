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