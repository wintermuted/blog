var darkSwitch = document.getElementById("darkSwitch");
var themeToggleLabel = document.querySelector(".theme-toggle-label");

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
  if (!themeToggleLabel || !darkSwitch) {
    return;
  }

  themeToggleLabel.textContent = darkSwitch.checked ? "Light" : "Dark";
}

function initTheme() {
  console.log('init theme')
  
  var defaultSelected = localStorage.getItem("darkSwitch") !== null && localStorage.getItem("darkSwitch") === "default";
  var darkThemeSelected = localStorage.getItem("darkSwitch") !== null && localStorage.getItem("darkSwitch") === "dark";
  var prefersColorSchemeDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var activateDarkTheme = darkThemeSelected || prefersColorSchemeDark;

  console.log('default theme selected', defaultSelected)
  console.log('dark theme selected', darkThemeSelected)
  console.log('prefers color scheme: dark', prefersColorSchemeDark)
  
  applyThemeState(activateDarkTheme);

  if (defaultSelected) {
    applyThemeState(false)
    darkSwitch.checked =  false;
  } else if (darkThemeSelected) {
    applyThemeState(true)
    darkSwitch.checked =  true;
  } else if (prefersColorSchemeDark) {
    applyThemeState(true)
    darkSwitch.checked =  true;
  }

  syncThemeToggleLabel();
}

function resetTheme() {
  console.log('reseting theme')

  if (darkSwitch.checked) {
    console.log('setting theme to dark')
    applyThemeState(true);
    localStorage.setItem("darkSwitch", "dark");
  } else {
    console.log('setting theme to light')
    applyThemeState(false);
    localStorage.setItem("darkSwitch", "default");
  }

  syncThemeToggleLabel();
}

window.addEventListener("load", function () {
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("change", function () {
      resetTheme();
    });
  }
});