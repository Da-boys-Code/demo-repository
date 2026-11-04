# United Empire Website

Static site (HTML/CSS/JS), no build step, no backend. Works on GitHub Pages.
Pages use hash routing (`#/divisions`, `#/division/scp`), so every link works on Pages.

## Deploy
1. Create a GitHub repo (e.g. `united-empire`) and upload everything in this folder
   (GitHub web: *Add file -> Upload files*, or `git init && git add . && git commit -m "UE site" && git remote add origin <url> && git push -u origin main`).
2. Repo **Settings -> Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
3. After about a minute the site is live at `https://<username>.github.io/<repo>/`.
4. Optional: add a custom domain in the same Pages settings.

## Edit content (all in `data/`)
- `site.js`: tagline, intro, stats, values, recruitment requirements/steps, diplomacy registry, main Discord/Roblox links
- `divisions.js`: one object per division. **To add a division, copy an object and change `id`**; it gets a card and its own page automatically
- `leaders.js`: leadership (tiers: Emperor, High Command, Division Commanders, Senior Officers, Department Directors)
- `news.js`, `events.js`: announcements and events (use `YYYY-MM-DD` dates)
- Leave a link as `""` and its button shows "pending". Fill in a full `https://...` URL to activate it.
- Logos/banners: put images in `assets/img/` and reference them in the data. The page code currently shows letter/placeholder art; ask for image fields to be wired in once you have assets.
- Replace `assets/img/emblem.webp`, `flag.webp` (hero backdrop) and `favicon.png` with new art if the emblem changes.

## Notes
- All text marked `[PLACEHOLDER]` or `[Placeholder ...]` is sample content to replace.
- `404.html` auto-detects the repo path on `github.io`.
- Preview locally: open `index.html` in a browser.
