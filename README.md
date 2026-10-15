# Dhaaga — Handmade with intention

Responsive React + Vite catalogue website.

## Run locally
Requires Node.js 18+.

```bash
npm install
npm run dev
```

## Product management
Edit `src/data/products.json`. Each product contains an `id`, `name`, `collections`, `description`, `available` flag and `formats`. Each format has an `id`, `label`, `price` in INR (use `null` until known), and an array of image paths relative to `public/`.

Place real photographs under `public/images/<product-folder>/` and update the matching paths in JSON. The SVGs currently included are clearly marked placeholders and must be replaced before launch. WebP is recommended for real photographs.

## Instagram
In `src/App.jsx`, replace `INSTAGRAM_URL` with the public URL of the Dhaaga Instagram profile. The enquiry button copies selected product, format and price, then opens Instagram. Instagram does not reliably support prefilled arbitrary DM text from a generic website link; the customer pastes and sends the copied text.

## Build
`npm run build` outputs the static site to `dist/`.

## GitHub Pages deployment
A GitHub Actions workflow is included. For a project repository (for example `username.github.io/dhaaga/`), configure the Vite base path as `/dhaaga/` using `VITE_BASE_PATH` in the workflow or edit `vite.config.js`. For a username.github.io root repository, `/` is correct. Enable GitHub Pages with GitHub Actions in repository Settings. Verify image paths, mobile layout, Instagram URL and clipboard behaviour before launch.

## Before launch
- Replace hero/story/product placeholders with real photographs.
- Add real format prices and verify availability.
- Replace Instagram URL.
- Set the correct GitHub Pages base path.
- Test the site on mobile and desktop.
