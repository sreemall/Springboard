
async function loadConfig () {
    const themeModule = await import ("./theme.mjs");
    const hour = new Date().getHours ();
    if (hour < 18) {
        themeModule.setLightTheme ();
    }
    else
        themeModule.setDarkTheme ();
}

loadConfig ();