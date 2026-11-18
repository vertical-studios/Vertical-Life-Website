# Vertical Life website

Astro static site with the TinaCMS editor (click-to-edit), deployed on Vercel. Content lives in `/content` as JSON (pages, settings) and Markdown (blog posts). Every edit, by a person or by AI, is a Git commit, so anything can be rolled back.

The design and structure follow the Vertical Life Site Foundation board, signed off Nov 18, 2026: black ground with strong grain, Bold Yellow headlines and buttons, Bebas Neue Pro (mixed case, -0.02em tracking) for headlines up to six words, Roboto body at 18px, square corners, 8px box shadows, no gray, no circles.

## Go live

1. **GitHub.** Create the repo (for example `vertical-studios/Vertical-Life-Website`) and push this folder. A public repo lets Tina saves deploy on Vercel's free plan; a private repo in an organization needs Vercel Pro.
2. **Vercel.** Import the repo. Build command `npm run build`.
3. **TinaCMS.** Create a Tina Cloud project for the repo, then add `TINA_CLIENT_ID` and `TINA_TOKEN` in Vercel environment variables and redeploy. The editor appears at `/admin`.
4. **Analytics.** Add Shawn's Vertical Life Google Tag Manager ID as `PUBLIC_GTM_ID`. Tags fire on thevertical.life, and on previews only when Tag Assistant is open.
5. **Fonts.** Bebas Neue Pro loads from the Adobe Fonts kit `qyr8bcu` ("Vertical Life Website"), licensed for thevertical.life, www.thevertical.life, *.vercel.app and localhost. Add any new domain at fonts.adobe.com.
6. **Domain.** Point thevertical.life at Vercel once images are moved off Squarespace (see below).

## Before switching the domain

- [ ] Move images, logos and PDFs off Squarespace's CDN into `public/uploads/` (they disappear when Squarespace is cancelled), then swap the URLs in `/content`.
- [ ] Confirm the private office credits (108 a quarter, or monthly like the other packages).
- [ ] Re-submit the sitemap in Google Search Console after launch.

## Running locally

```
npm install
npm run dev        # site + editor at localhost:4321/admin (local mode saves to your files)
npm run build      # full static build (runs inside `tinacms build`)
```

## Adding a new section type

1. Add a template in `tina/config.ts`
2. Add a component in `src/components/blocks/`
3. Register it in `src/components/BlockRenderer.astro`
4. Mark editable elements with `data-tina-field={tf(Astro.props, "fieldName")}` (and `tf(item, "field")` for list items). If a field uses `nameOverride`, pass the schema name.

## How click-to-edit works

- `src/lib/tina.ts` loads pages and posts through Tina's client and converts the result back to the file shape the components expect.
- `src/lib/islands.ts` lists the editable regions (page sections, blog articles). Each page wraps them in `<TinaIsland>`.
- `src/pages/tina-island/[name].ts` is the only on-demand route: it re-renders a region while someone types. Every other page is static HTML.
