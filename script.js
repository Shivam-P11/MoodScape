// MoodScape - improved build


// ---------- DOM ----------
const card = document.getElementById("card");
const quoteEl = document.getElementById("quote");
const heroEmoji = document.getElementById("heroEmoji");
const moodName = document.getElementById("moodName");
const buttonsWrap = document.getElementById("moodButtons");
const nextBtn = document.getElementById("nextBtn");
const copyBtn = document.getElementById("copyBtn");
const randomBtn = document.getElementById("randomBtn");
const toast = document.getElementById("toast");
const themeMeta = document.querySelector('meta[name="theme-color"]');

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const STORAGE_KEY = "moodscape:last";

// ---------- Mood data ----------
// c1, c2, c3 = animated background gradient | accent = dark text colour (kept readable)
const moods = {
  "😂": { name: "Joyful",     c1: "#ffe259", c2: "#ffa751", c3: "#ffd6a5", accent: "#8a4b00",
          quotes: ["Laughter is the best medicine!", "Today's plan: laugh until it hurts.", "Good vibes only, giggles included."] },
  "😍": { name: "In love",    c1: "#ff9a9e", c2: "#fad0c4", c3: "#fbc2eb", accent: "#a3124f",
          quotes: ["Love makes everything brighter.", "Fall for the little things today.", "Your heart knows the way."] },
  "😒": { name: "Meh",        c1: "#bdc3c7", c2: "#d7dde8", c3: "#e0e0e0", accent: "#3b3f45",
          quotes: ["Not every day is perfect, and that's okay.", "Meh days still count.", "Ignore the noise, keep your peace."] },
  "😁": { name: "Happy",      c1: "#f9d423", c2: "#ff4e50", c3: "#fff59d", accent: "#7a3b00",
          quotes: ["Keep smiling, it suits you!", "Happiness looks good on you.", "Smile first, the day will follow."] },
  "👌": { name: "All good",   c1: "#a8e063", c2: "#56ab2f", c3: "#d4fc79", accent: "#1b5e20",
          quotes: ["Everything is going just fine.", "Smooth and steady wins the day.", "You've got this under control."] },
  "👍": { name: "Confident",  c1: "#56ccf2", c2: "#2f80ed", c3: "#a1c4fd", accent: "#0d3b8c",
          quotes: ["You're doing great, keep it up!", "Progress, not perfection.", "Small wins add up fast."] },
  "❤️": { name: "Kind",       c1: "#ff5858", c2: "#f09819", c3: "#ffcdd2", accent: "#8e0e1a",
          quotes: ["Spread kindness and love today.", "Be the reason someone smiles.", "Love is always a good idea."] },
  "😎": { name: "Cool",       c1: "#00c6ff", c2: "#0072ff", c3: "#84fab0", accent: "#003c5e",
          quotes: ["Stay cool, you've got this.", "Calm confidence is unstoppable.", "Walk in like you own the day."] },
  "😉": { name: "Playful",    c1: "#a18cd1", c2: "#fbc2eb", c3: "#f3e5f5", accent: "#5a1a8a",
          quotes: ["A little wink can brighten the day.", "Mischief managed, spirits lifted.", "Keep them guessing."] },
  "😜": { name: "Silly",      c1: "#f093fb", c2: "#f5576c", c3: "#f8bbd0", accent: "#8a0f4a",
          quotes: ["Be playful, life's short!", "Normal is boring. Be silly.", "Dance like nobody's watching."] },
  "🤩": { name: "Starstruck", c1: "#fddb92", c2: "#d1fdff", c3: "#fff176", accent: "#8a5a00",
          quotes: ["Shine bright like a star.", "You were made to sparkle.", "Dream big, glow bigger."] },
  "😥": { name: "Down",       c1: "#789bb0", c2: "#b7c9d6", c3: "#cfd8dc", accent: "#263a47",
          quotes: ["It's okay to feel down, tomorrow is new.", "Be gentle with yourself today.", "This too shall pass."] },
  "😴": { name: "Sleepy",     c1: "#4facfe", c2: "#c2e9fb", c3: "#e1f5fe", accent: "#0a3d6b",
          quotes: ["Rest is productive too.", "Recharge. The world can wait.", "Sleep is a superpower."] },
  "😫": { name: "Drained",    c1: "#9e9e9e", c2: "#e6e6e6", c3: "#f5f5f5", accent: "#3d3d3d",
          quotes: ["Take a break, you deserve it.", "Pause. Breathe. Restart.", "You're allowed to rest."] },
  "🤑": { name: "Hustle",     c1: "#f7ff00", c2: "#00b09b", c3: "#c6ffdd", accent: "#05503f",
          quotes: ["Dream big, work smart.", "Build it, then watch it grow.", "Consistency pays the best."] },
  "😨": { name: "Scared",     c1: "#2c7a7b", c2: "#a8edea", c3: "#e0f2f1", accent: "#06403b",
          quotes: ["Fear is temporary, courage lasts.", "Do it scared.", "Brave isn't fearless, it's moving anyway."] },
  "😰": { name: "Anxious",    c1: "#6a8caf", c2: "#cfd9df", c3: "#cfd8dc", accent: "#22384d",
          quotes: ["Breathe, you're stronger than you think.", "One thing at a time.", "You've survived every hard day so far."] },
  "🥵": { name: "Hot",        c1: "#ff6a00", c2: "#ee0979", c3: "#ffccbc", accent: "#7d1500",
          quotes: ["Stay cool, hydrate!", "Water, shade, repeat.", "Too hot to handle? Take five."] },
  "🥶": { name: "Cold",       c1: "#74ebd5", c2: "#9face6", c3: "#e0f7fa", accent: "#0c3a6e",
          quotes: ["Bundle up, stay cozy.", "Warm drink, warm heart.", "Cold outside, cozy inside."] },
  "😵‍💫": { name: "Dizzy",    c1: "#c471f5", c2: "#fa71cd", c3: "#e1bee7", accent: "#43116b",
          quotes: ["Slow down, one step at a time.", "Ground yourself. Look around.", "Not everything needs solving today."] },
  "😡": { name: "Angry",      c1: "#e52d27", c2: "#b31217", c3: "#ffab91", accent: "#6d0a0a",
          quotes: ["Channel your energy into action.", "Cool down before you speak.", "Turn the fire into fuel."] },
  "😇": { name: "Angelic",    c1: "#e6dee9", c2: "#d4fc79", c3: "#f0f4c3", accent: "#4f5d00",
          quotes: ["Stay kind, it always comes back.", "Good deeds, quiet glow.", "Be someone's good luck today."] }
};

const keys = Object.keys(moods);
let currentKey = null;
let quoteIndex = 0;
let swapTimer = null;

// ---------- Build buttons ----------
keys.forEach((emoji) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "mood-btn";
  btn.dataset.mood = emoji;
  btn.textContent = emoji;
  btn.title = moods[emoji].name;
  btn.setAttribute("aria-label", moods[emoji].name);
  btn.setAttribute("aria-pressed", "false");
  buttonsWrap.appendChild(btn);
});

// ---------- Helpers ----------
function setTheme(mood) {
  const root = document.documentElement.style;
  root.setProperty("--c1", mood.c1);
  root.setProperty("--c2", mood.c2);
  root.setProperty("--c3", mood.c3);
  root.setProperty("--accent", mood.accent);
  if (themeMeta) themeMeta.setAttribute("content", mood.c1);
}

function setQuote(text) {
  quoteEl.classList.add("swap");
  clearTimeout(swapTimer);
  swapTimer = setTimeout(() => {
    quoteEl.textContent = text;
    quoteEl.classList.remove("swap");
  }, reduceMotion ? 0 : 250);
}

function burst(originEl) {
  if (reduceMotion) return;
  const rect = originEl.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const emoji = originEl.dataset.mood || currentKey;
  const count = 14;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 60 + Math.random() * 90;
    p.className = "particle";
    p.textContent = emoji;
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    p.style.setProperty("--dy", Math.sin(angle) * dist + "px");
    p.style.setProperty("--rot", (Math.random() * 360 - 180) + "deg");
    p.addEventListener("animationend", () => p.remove());
    document.body.appendChild(p);
  }
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove("show"), 1600);
}

// ---------- Main: set mood ----------
function setMood(key, { origin = null, save = true } = {}) {
  const mood = moods[key];
  if (!mood) return;

  const changed = key !== currentKey;
  currentKey = key;
  quoteIndex = changed ? Math.floor(Math.random() * mood.quotes.length) : quoteIndex;

  setTheme(mood);
  moodName.textContent = mood.name;
  setQuote(mood.quotes[quoteIndex]);

  heroEmoji.textContent = key;
  heroEmoji.classList.remove("pop");
  void heroEmoji.offsetWidth; // restart animation
  heroEmoji.classList.add("pop");

  buttonsWrap.querySelectorAll(".mood-btn").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.mood === key));
  });

  if (origin) burst(origin);

  if (save) {
    try { localStorage.setItem(STORAGE_KEY, key); } catch (e) { /* storage unavailable */ }
  }
}

// ---------- Events ----------
buttonsWrap.addEventListener("click", (e) => {
  const btn = e.target.closest(".mood-btn");
  if (btn) setMood(btn.dataset.mood, { origin: btn });
});

nextBtn.addEventListener("click", () => {
  if (!currentKey) return setMood(keys[0], { origin: nextBtn });
  const list = moods[currentKey].quotes;
  quoteIndex = (quoteIndex + 1) % list.length;
  setQuote(list[quoteIndex]);
});

randomBtn.addEventListener("click", () => {
  let next;
  do { next = keys[Math.floor(Math.random() * keys.length)]; } while (next === currentKey);
  setMood(next, { origin: randomBtn });
});

copyBtn.addEventListener("click", async () => {
  const text = `${currentKey || ""} ${quoteEl.textContent}`.trim();
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied!");
  } catch (e) {
    showToast("Copy not supported here");
  }
});

// Subtle 3D tilt on pointer devices
if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
  });
  card.addEventListener("pointerleave", () => { card.style.transform = ""; });
}

// ---------- Init: restore last mood ----------
(function init() {
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  if (saved && moods[saved]) setMood(saved, { save: false });
})();

// ---------- Optional dev mode: cycles moods every 2s ----------
// function autoTestMoods() {
//   let i = 0;
//   setInterval(() => { setMood(keys[i]); i = (i + 1) % keys.length; }, 2000);
// }
// autoTestMoods();