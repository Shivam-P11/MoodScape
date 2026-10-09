// MoodScape Project - Professional JS Structure
// Author: Shivam (Test Build)

// Select DOM elements
const card = document.getElementById("card");
const quote = document.getElementById("quote");
const moodButtons = document.querySelectorAll(".mood-btn");

// Mood configuration object
const moods = {
  "😂": { text: "Laughter is the best medicine!", bg: "#fff9c4", color: "#f57f17" },
  "😍": { text: "Love makes everything brighter ❤️", bg: "#ffe0f0", color: "#d81b60" },
  "😒": { text: "Not every day is perfect, and that’s okay.", bg: "#e0e0e0", color: "#424242" },
  "😁": { text: "Keep smiling, it suits you!", bg: "#fff59d", color: "#fbc02d" },
  "👌": { text: "Everything is going just fine 👌", bg: "#c8e6c9", color: "#2e7d32" },
  "👍": { text: "You’re doing great, keep it up!", bg: "#bbdefb", color: "#1565c0" },
  "❤️": { text: "Spread kindness and love today.", bg: "#ffcdd2", color: "#b71c1c" },
  "😎": { text: "Stay cool, you’ve got this 😎", bg: "#e0f7fa", color: "#006064" },
  "😉": { text: "A little wink can brighten the day 😉", bg: "#f3e5f5", color: "#6a1b9a" },
  "😜": { text: "Be playful, life’s short!", bg: "#f8bbd0", color: "#ad1457" },
  "🤩": { text: "Shine bright like a star 🌟", bg: "#fffde7", color: "#f9a825" },
  "😥": { text: "It’s okay to feel down, tomorrow is new.", bg: "#cfd8dc", color: "#37474f" },
  "😴": { text: "Rest is productive too 😴", bg: "#e1f5fe", color: "#0277bd" },
  "😫": { text: "Take a break, you deserve it.", bg: "#f5f5f5", color: "#616161" },
  "🤑": { text: "Dream big, work smart 💰", bg: "#fff9c4", color: "#fbc02d" },
  "😨": { text: "Fear is temporary, courage lasts.", bg: "#e0f2f1", color: "#004d40" },
  "😰": { text: "Breathe, you’re stronger than you think.", bg: "#cfd8dc", color: "#455a64" },
  "🥵": { text: "Stay cool, hydrate! 🥵", bg: "#ffccbc", color: "#d84315" },
  "🥶": { text: "Bundle up, stay cozy 🥶", bg: "#e0f7fa", color: "#01579b" },
  "😵‍💫": { text: "Slow down, one step at a time.", bg: "#f3e5f5", color: "#4a148c" },
  "😡": { text: "Channel your energy into action 💥", bg: "#ffcdd2", color: "#c62828" },
  "😇": { text: "Stay kind, it always comes back 😇", bg: "#f0f4c3", color: "#827717" }
};

// Utility function: update card with selected mood
function setMood(moodKey) {
  const mood = moods[moodKey];
  if (!mood) return; // safety check

  // Smooth fade transition
  quote.style.opacity = 0;
  setTimeout(() => {
    quote.textContent = mood.text;
    card.style.background = mood.bg;
    card.style.color = mood.color;
    quote.style.opacity = 1;
  }, 300);
}

// Attach event listeners to all mood buttons
moodButtons.forEach(btn => {
  btn.addEventListener("click", () => setMood(btn.dataset.mood));
});

// Optional: Auto-test feature (developer mode)
// Cycles through moods every 2 seconds for testing
function autoTestMoods() {
  const keys = Object.keys(moods);
  let index = 0;
  setInterval(() => {
    setMood(keys[index]);
    index = (index + 1) % keys.length;
  }, 2000);
}

// Uncomment below line to run auto-test mode
// autoTestMoods();
