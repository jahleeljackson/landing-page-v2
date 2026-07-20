# Cassian AI — Landing Page

Static one-page site for Cassian AI (Cassian Consulting LLC): audit → build → retainer. HTML, CSS, and JS for Netlify.

## Local preview

Open `index.html` in a browser, or from this folder:

```bash
npx --yes serve .
```

## Edit copy

Most marketing copy lives in [`index.html`](index.html). Look for `<!-- EDIT: ... -->` comments near:

- Problem headline, lead, and body blurb
- Scenarios caption
- Audit price and the optional Build / Retainer follow-on blurb
- About blurb paragraphs

## Edit embeds and images

Open [`js/main.js`](js/main.js) and update `CONFIG`:

```js
const CONFIG = {
  calendlyUrl:
    "https://calendly.com/jahleeljackson-cassianconsultingai/30-minute-discovery-call",
  aboutImage: "", // e.g. "images/about.jpg"
  scenariosImage: "", // e.g. "images/scenarios.png"
  formName: "contact",
};
```

### About photo

1. Add your file as `images/about.jpg` or `images/about.png`.
2. Set `CONFIG.aboutImage` to that path.
3. Redeploy. The placeholder is replaced by the photo.

### Credibility logos (About)

UVA V-Sabre and Booz Allen marks live in `images/`:

- `images/uva-vsabre.png`
- `images/booz-allen-logo.svg`

Swap those files to update the logos next to the About blurb.

### Scenarios (audit PDF example)

1. Export or collage your audit PDF pages into `images/scenarios.png` (or `.jpg`).
2. Set `CONFIG.scenariosImage` to that path.
3. Redeploy.

### Brand tokens

Colors and type live in [`css/styles.css`](css/styles.css) under `:root` (`--color-bg`, `--color-ink`, `--font-serif`, etc.).

## Deploy on Netlify

1. Push this repo to GitHub.
2. In [Netlify](https://app.netlify.com), **Add a new project** → import the repo.
3. Build settings (also in [`netlify.toml`](netlify.toml)):
   - **Build command:** leave empty
   - **Publish directory:** `.`
4. Deploy, then rename the site under **Site settings** if you want.

### Netlify Forms (contact)

The contact form uses Netlify Forms (`name="contact"`) with fields: name, business, email, message. After the first successful deploy:

1. Submit a test message from the live site (or confirm the form appears under **Forms** in the Netlify dashboard).
2. Enable email notifications: **Site configuration → Forms → Form notifications** → add your email.
3. Successful submits redirect to `/?success=1#contact` and show a thank-you banner.

Calendly embed: [30-minute discovery call](https://calendly.com/jahleeljackson-cassianconsultingai/30-minute-discovery-call).
