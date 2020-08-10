# spotify-compact-web-player
Chrome extension to re-locate the Spotify web player's 'now playing bar' to the top of the page, and change to an alternate compact view.

Create a chrome shortcut to spotify and select 'Open as window' for optimal effect. Resize width as desired, and the shortcut will remember your dimensions:

![image](/image.png)

## Installation
1. Download the repo folder to your computer.
1. In chrome, navigate to `chrome://extensions/` or otherwise open your extensions page.
1. Ensure that `developer mode` is enabled, and click on `load unpacked`
1. Select your local copy of the downloaded repo folder.
1. Navigate to open.spotify.com, resize your browser window as desired and enjoy the compact `now playing bar`!

## Optional Chrome shortcut
*While not necessary, making a windowed Chrome shortcut is recommended for a more compact view and for the window to always remember dimensions.*  
1. In Chrome, navigate to open.spotify.com.
1. In the browser, click the `three dots` options icon, then 'More tools', then 'Create shortcut'.
1. Give the shortcut any name you like, and ensure `Open as window` is checked, then hit `Create`.
1. You should now have a desktop shortcut which will open a barebones chrome window directly to open.spotify.com in a dedicated window, which applies the extension if loaded correctly, and will persist window dimensions across sessions.  

### Disclaimer
*Use this software at your own risk. If you have any concerns about the behaviour of this software, I encourage you to view the source code. This is a rather innocent extension that does little more than manipulate position & style of existing DOM elements on the spotify web player.*