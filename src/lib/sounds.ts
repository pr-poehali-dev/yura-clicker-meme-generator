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