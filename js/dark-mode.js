var darkSwitch = document.getElementById("darkSwitch");
var themeToggleLabels = Array.from(document.querySelectorAll(".theme-toggle-label"));
var toneButtons = Array.from(document.querySelectorAll("[data-bg-tone]"));

var DARK_MODE_KEY = "darkSwitch";
var BG_TONE_KEY = "bgTone";
var BG_TONE_CLASSES = [
  "bg-tone-neutral",
  "bg-tone-grayscale",
  "bg-tone-warm",
  "bg-tone-cool",
  "bg-tone-gol"
];

function applyThemeState(isDark) {
  if (isDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.body.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
    document.body.removeAttribute("data-theme");
  }
}

function syncThemeToggleLabel() {
  if (!darkSwitch || !themeToggleLabels.length) {
    return;
  }

  themeToggleLabels.forEach(function (label) {
    label.textContent = darkSwitch.checked ? "Light" : "Dark";
  });
}

function normalizeTone(tone) {
  var allowed = ["neutral", "grayscale", "warm", "cool", "gol"];
  return allowed.indexOf(tone) !== -1 ? tone : "neutral";
}

function applyBackgroundTone(tone) {
  var normalizedTone = normalizeTone(tone);
  BG_TONE_CLASSES.forEach(function (className) {
    document.body.classList.remove(className);
  });
  document.body.classList.add("bg-tone-" + normalizedTone);

  toneButtons.forEach(function (button) {
    var isActive = button.getAttribute("data-bg-tone") === normalizedTone;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  return normalizedTone;
}

function initTheme() {
  var defaultSelected = localStorage.getItem(DARK_MODE_KEY) === "default";
  var darkThemeSelected = localStorage.getItem(DARK_MODE_KEY) === "dark";
  var prefersColorSchemeDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (darkThemeSelected || (!defaultSelected && prefersColorSchemeDark)) {
    applyThemeState(true);
    if (darkSwitch) darkSwitch.checked = true;
  } else {
    applyThemeState(false);
    if (darkSwitch) darkSwitch.checked = false;
  }

  syncThemeToggleLabel();

  var storedToneRaw = localStorage.getItem(BG_TONE_KEY);
  var storedTone = normalizeTone(storedToneRaw || "neutral");
  if (!storedToneRaw) {
    localStorage.setItem(BG_TONE_KEY, storedTone);
  }
  applyBackgroundTone(storedTone);
}

function resetTheme() {
  if (!darkSwitch) {
    return;
  }

  if (darkSwitch.checked) {
    applyThemeState(true);
    localStorage.setItem(DARK_MODE_KEY, "dark");
  } else {
    applyThemeState(false);
    localStorage.setItem(DARK_MODE_KEY, "default");
  }

  syncThemeToggleLabel();
}

window.addEventListener("load", function () {
  initTheme();

  if (darkSwitch) {
    darkSwitch.addEventListener("change", function () {
      resetTheme();
    });
  }

  toneButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var tone = normalizeTone(button.getAttribute("data-bg-tone"));
      applyBackgroundTone(tone);
      localStorage.setItem(BG_TONE_KEY, tone);
    });
  });
});