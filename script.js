const sleep = (m) => new Promise((r) => setTimeout(r, m));

function selectOrThrow(selector, parent = document) {
  const el = parent.querySelector(selector);
  console.log(`el for selector ${selector}`, el);
  if (!el)
    throw new Error(`Unable to locate element using selector: ${selector}`);
  return el;
}

async function moveFooterToTop() {
  const footerEl = selectOrThrow("footer");
  const rootContainer = selectOrThrow("[data-testid='root']");

  rootContainer.insertBefore(footerEl, rootContainer.firstChild);
  return;
}

function fixSpacing(view = "column") {
  const footerEl = selectOrThrow("footer");
  const nowPlayingLeft = selectOrThrow("[data-testid='now-playing-widget']");
  const nowPlayingCenter = selectOrThrow(".player-controls");
  const nowPlayingRight = selectOrThrow(".ExtraControls");

  if (view === "column") {
    // column view
    const nowPlayingDetails = selectOrThrow(
      ".ellipsis-one-line",
      nowPlayingLeft
    );
    const body = selectOrThrow("body");
    body.style.minWidth = "0";

    // new div to hold elements
    let newDiv = document.querySelector("#myNewDiv");
    if (!newDiv) {
      newDiv = document.createElement("div");
      newDiv.id = "myNewDiv";
      footerEl.appendChild(newDiv);
    }
    newDiv.style.width = "100vw";
    newDiv.appendChild(nowPlayingLeft);
    newDiv.appendChild(nowPlayingCenter);
    newDiv.appendChild(nowPlayingRight);

    footerEl.style.height = "auto";
    footerEl.style.justifyContent = "flex-start";

    // remove fixed height from existing element
    footerEl.firstChild.style.height = "auto"

    nowPlayingLeft.style.width = "auto";

    nowPlayingDetails.style.flexGrow = 1;

    nowPlayingCenter.style.margin = "0.5em 0";
    nowPlayingCenter.style.width = "auto";
    nowPlayingCenter.style.maxWidth = "none";

    nowPlayingRight.style.width = "auto";
    nowPlayingRight.style.justifyContent = "center";
  } else {
    // row view
    footerEl.style.justifyContent = "flex-start";
    nowPlayingLeft.style.flexGrow = 1;
    nowPlayingCenter.style.width = "auto";
    nowPlayingRight.style.width = "auto";
  }
}

async function tryCallback(callback, retries = 3, retryDelay = 1000) {
  while (retries > 0) {
    try {
      await callback();
      retries = 0;
      return;
    } catch (err) {
      console.error(err);
      if (--retries) {
        console.info(
          `Retries remaining, ${retries}. Re-trying in ${retryDelay}ms...`
        );
        await sleep(retryDelay);
      }
    }
  }
  return;
}

async function main() {
  try {
    await tryCallback(moveFooterToTop);
    await tryCallback(fixSpacing);
  } catch (err) {
    console.error(`An unknown error has occurred: ${err}`);
  }
}

main();
