const sleep = (m) => new Promise((r) => setTimeout(r, m));

function selectOrThrow(selector, parent = document) {
  const el = parent.querySelector(selector);
  console.log(`el for selector ${selector}`, el);
  if (!el)
    throw new Error(`Unable to locate element using selector: ${selector}`);
  return el;
}

async function moveNowPlayingToTop() {
  const nowPlayingBar = selectOrThrow(".now-playing-bar");
  const rootContainer = selectOrThrow(".Root");

  rootContainer.insertBefore(nowPlayingBar, rootContainer.firstChild);
  return;
}

function fixSpacing(view = "column") {
  const nowPlayingBar = selectOrThrow(".now-playing-bar");
  const nowPlayingLeft = selectOrThrow(".now-playing-bar__left");
  const nowPlayingCenter = selectOrThrow(".now-playing-bar__center");
  const nowPlayingRight = selectOrThrow(".now-playing-bar__right");

  if (view === "column") {
    // column view
    const nowPlayingDetails = selectOrThrow(
      ".ellipsis-one-line",
      nowPlayingLeft
    );
    const body = selectOrThrow("body");
    body.style.minWidth = "0";
    let newDiv = document.querySelector("#myNewDiv");
    if (!newDiv) {
      newDiv = document.createElement("div");
      newDiv.id = "myNewDiv";
      nowPlayingBar.appendChild(newDiv);
    }
    newDiv.style.width = "100%";
    newDiv.appendChild(nowPlayingLeft);
    newDiv.appendChild(nowPlayingCenter);
    newDiv.appendChild(nowPlayingRight);

    nowPlayingBar.style.height = "auto";
    nowPlayingBar.style.justifyContent = "flex-start";

    nowPlayingLeft.style.width = "auto";

    nowPlayingDetails.style.flexGrow = 1;

    nowPlayingCenter.style.margin = "1em 0";
    nowPlayingCenter.style.width = "auto";

    nowPlayingRight.style.width = "auto";
    nowPlayingRight.style.justifyContent = "center";
  } else {
    // row view
    nowPlayingBar.style.justifyContent = "flex-start";
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
    await tryCallback(moveNowPlayingToTop);
    await tryCallback(fixSpacing);
  } catch (err) {
    console.error(`An unknown error has occurred: ${err}`);
  }
}

main();
