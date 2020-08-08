function selectNowPlayingBar(){
    return document.querySelector(".now-playing-bar");
}

function selectRootContainer(){
    return document.querySelector(".Root");
}

function moveNowPlayingToTop(){
    const nowPlayingBar = selectNowPlayingBar();
    const rootContainer = selectRootContainer();

    let errMsg = "";
    if (!nowPlayingBar) {
        errMsg += "Unable to locate now playing bar element.";
    }
    if (!rootContainer) {
        errMsg += `${errMsg ? '\n' : ''}Unable to locate root container element.`;
    }
    if (errMsg) throw new Error(errMsg);

    rootContainer.insertBefore(nowPlayingBar, rootContainer.firstChild);
}

function main(retries=3, retryDelay=1000) {
    try {
        moveNowPlayingToTop();
    } catch(err) {
        console.error(`Error trying to relocate Spotify now playing bar to top of page: ${err}`);
        if (retries > 0) {
            console.info(`Re-trying in ${retryDelay}ms...`);
            setTimeout(() => {
                main(--retries, retryDelay);
            }, retryDelay)
        }
    }
}

main();