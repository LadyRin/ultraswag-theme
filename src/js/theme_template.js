(function () {
  // Grab body node
  const bodyNode = document.querySelector("body");

  // Replace the styles with the glow theme
  const initNeonDreams = (disableGlow, obs) => {
    var themeStyleTag = document.querySelector(".vscode-tokens-styles");

    if (!themeStyleTag) {
      return;
    }

    var initialThemeStyles = themeStyleTag.innerText;

    var updatedThemeStyles = initialThemeStyles;

    if (!disableGlow) {


      /* replace light blue */
      updatedThemeStyles = updatedThemeStyles.replace(
        /color: #00ccff;/gi,
        "color: #fdfdfd; text-shadow: 0 0 2px #001716, 0 0 3px #03edf9[NEON_BRIGHTNESS], 0 0 5px #03edf9[NEON_BRIGHTNESS], 0 0 8px #03edf9[NEON_BRIGHTNESS]; backface-visibility: hidden;"
      );

      /* replace pink */
      updatedThemeStyles = updatedThemeStyles.replace(
        /color: #e990e1;/gi,
        "color: #eec4ea; text-shadow: 0 0 2px #001716, 0 0 3px #ff00ff[NEON_BRIGHTNESS], 0 0 5px #ff00ff[NEON_BRIGHTNESS], 0 0 8px #ff00ff[NEON_BRIGHTNESS]; backface-visibility: hidden;"
      );

      /* replace purple */
      updatedThemeStyles = updatedThemeStyles.replace(
        /color: #b657ff;/gi,
        "color: #988aa3; text-shadow: 0 0 2px #001716, 0 0 2px #b657ff[NEON_BRIGHTNESS], 0 0 3px #b657ff[NEON_BRIGHTNESS], 0 0 4px #b657ff[NEON_BRIGHTNESS]; backface-visibility: hidden;"
      );


      }

    /* append the remaining styles */
    updatedThemeStyles = `${updatedThemeStyles}[CHROME_STYLES]`;

    const newStyleTag = document.createElement("style");
    newStyleTag.setAttribute("id", "synthwave-84-theme-styles");
    newStyleTag.innerText = updatedThemeStyles.replace(/(\r\n|\n|\r)/gm, "");
    document.body.appendChild(newStyleTag);

    console.log("Synthwave '84: NEON DREAMS initialised!");

    // disconnect the observer because we don't need it anymore
    if (obs) {
      obs.disconnect();
      obs = null;
    }
  };

  // Callback function to execute when mutations are observed
  const watchForBootstrap = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "attributes") {
        // only init if we're using a Synthwave 84 subtheme
        const isUsingSynthwave = document.querySelector(
          '[class*="LadyRin-ultraswag-theme-themes"]'
        );
        // does the style div exist yet?
        const tokensLoaded = document.querySelector(".vscode-tokens-styles");
        // does it have content ?
        const tokenStyles =
          document.querySelector(".vscode-tokens-styles").innerText &&
          document.querySelector(".vscode-tokens-styles").innerText !== "";

        if (isUsingSynthwave && tokensLoaded) {
          if (!tokenStyles) {
            // sometimes VS code takes a while to init the styles content, so if there stop this observer and add an observer for that
            observer.disconnect();
            observer.observe(tokensLoaded, { childList: true });
          } else {
            // If everything we need is ready, then initialise
            initNeonDreams([DISABLE_GLOW], observer);
          }
        }
      }
      if (mutation.type === "childList") {
        const isUsingSynthwave = document.querySelector(
          '[class*="LadyRin-ultraswag-theme-themes"]'
        );
        const tokensLoaded = document.querySelector(".vscode-tokens-styles");
        const tokenStyles =
          document.querySelector(".vscode-tokens-styles").innerText &&
          document.querySelector(".vscode-tokens-styles").innerText !== "";

        // Everything we need is ready, so initialise
        if (isUsingSynthwave && tokensLoaded && tokenStyles) {
          initNeonDreams([DISABLE_GLOW], observer);
        }
      }
    }
  };

  // try to initialise the theme
  initNeonDreams([DISABLE_GLOW]);

  // Use a mutation observer to check when we can bootstrap the theme
  const observer = new MutationObserver(watchForBootstrap);
  observer.observe(bodyNode, { attributes: true });
})();
