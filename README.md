# Biju Borah — Portfolio

A responsive, dependency-free portfolio based on my résumé. Built with HTML, CSS, and JavaScript for GitHub Pages.

Light mode is the default, regardless of the device's appearance setting. Visitors can use the theme toggle to switch modes; their explicit choice is remembered for future visits.

## Preview locally

From the repository folder, run:

```sh
python -m http.server 8000
```

Open http://localhost:8000. No install or build step is required. You can also open `index.html` directly; clipboard access works best on localhost or HTTPS.

## Publish with GitHub Pages

1. Commit and push these files to the `main` branch of `biju-borah/biju-borah.github.io`.
2. Open the repository on GitHub and go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **main** and **/ (root)**, then save.
5. After GitHub finishes deployment, visit **https://biju-borah.github.io/**.

The `.nojekyll` file allows GitHub Pages to serve this as a plain static website. No server, API keys, or external JavaScript services are required.

## Customize

- **Content and links:** `index.html`
- **Colors, layout, and responsive styles:** `assets/css/portfolio.css` (theme variables at the top)
- **Theme, mobile menu, filters, animations, and email copying:** `assets/js/portfolio.js`
- **Résumé download:** replace `assets/Resume_Biju_Borah.pdf` with the updated PDF, keeping the filename.
- **Portrait:** `assets/imgs/dp.jpeg`
- **Project illustrations:** `assets/imgs/floodsafe-preview.svg` and `assets/imgs/cardiosense-preview.svg`
- **Link preview image:** `assets/imgs/social-preview.png`

Project illustrations are original concept visuals, not screenshots of the applications. Experience dates and impact figures follow the supplied résumé (October 2026). Update them as your experience changes.

Manrope and IBM Plex Mono are self-hosted under the SIL Open Font License; license files are in `assets/fonts/`.

The original template/demo files are retained but are not loaded by the portfolio.
