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