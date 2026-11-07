FINTRACK — GitHub Pages PWA package
==================================

UPLOAD INSTRUCTIONS
1. Download this ZIP and extract it on your computer.
2. Open your GitHub repository: vijaysarathimp-sketch/FinTrack
3. Upload the CONTENTS of the extracted folder to the repository ROOT.
   Do not upload the enclosing folder as a nested directory.
4. The repository root must contain:

   index.html
   manifest.webmanifest
   sw.js
   icons/icon.svg
   icons/icon-192.png
   icons/icon-512.png
   icons/icon-512-maskable.png

5. Commit the files to the branch configured in Settings > Pages.
6. Wait for the GitHub Pages deployment to finish.
7. Test these URLs (each must load; icons should display images):
   https://vijaysarathimp-sketch.github.io/FinTrack/manifest.webmanifest
   https://vijaysarathimp-sketch.github.io/FinTrack/sw.js
   https://vijaysarathimp-sketch.github.io/FinTrack/icons/icon-192.png
   https://vijaysarathimp-sketch.github.io/FinTrack/icons/icon-512.png

ANDROID CHROME INSTALLATION
1. Open https://vijaysarathimp-sketch.github.io/FinTrack/ in Chrome.
2. Refresh the page after deployment and wait for it to finish loading.
3. Open Chrome menu (three dots) and choose Install app or Add to Home screen.
4. If Chrome reports that the app is already installed but cannot open it,
   back up your transactions from the website first, then remove the broken
   home-screen/app installation and install again.

IMPORTANT DATA NOTE
FINTRACK stores its records locally in the browser on that device. This ZIP
and GitHub Pages do not upload or synchronize your transactions. Export a
JSON backup from FINTRACK before uninstalling the app, clearing browser data,
or changing devices. Do not clear Chrome site storage as a troubleshooting step
unless you have a verified backup.

PACKAGE STRUCTURE
This ZIP intentionally places index.html, manifest.webmanifest and sw.js at
its top level, with the icons inside the icons/ folder. Upload these contents
at the repository root so the icon URLs do not return 404.
