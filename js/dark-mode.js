var darkSwitch = document.getElementById("darkSwitch");

function initTheme() {
  console.log('init theme')
  
  var defaultSelected = localStorage.getItem("darkSwitch") !== null && localStorage.getItem("darkSwitch") === "default";
  var darkThemeSelected = localStorage.getItem("darkSwitch") !== null && localStorage.getItem("darkSwitch") === "dark";
  var prefersColorSchemeDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var activateDarkTheme = darkThemeSelected || prefersColorSchemeDark;

  console.log('default theme selected', defaultSelected)
  console.log('dark theme selected', darkThemeSelected)
  console.log('prefers color scheme: dark', prefersColorSchemeDark)
  
  activateDarkTheme ? document.body.setAttribute("data-theme", "dark") : document.body.removeAttribute("data-theme");

  if (defaultSelected) {
    document.body.removeAttribute("data-theme")
    darkSwitch.checked =  false;
  } else if (darkThemeSelected) {
    document.body.setAttribute("data-theme", "dark")
    darkSwitch.checked =  true;
  } else if (prefersColorSchemeDark) {
    document.body.setAttribute("data-theme", "dark")
    darkSwitch.checked =  true;
  }
}

function resetTheme() {
  console.log('reseting theme')

  if (darkSwitch.checked) {
    console.log('setting theme to dark')
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("darkSwitch", "dark");
  } else {
    console.log('setting theme to light')
    document.body.removeAttribute("data-theme");
    localStorage.setItem("darkSwitch", "default");
  }
}

window.addEventListener("load", function () {
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("change", function () {
      resetTheme();
    });
  }
});