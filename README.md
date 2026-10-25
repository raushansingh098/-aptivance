# Aptivance

Aptivance helps students assess their skills, identify gaps for target careers, and plan their learning.

## Public website

The public welcome page is designed for students exploring career directions. Its primary goal is to explain the product and invite visitors to create an account; the learning dashboard remains behind sign-in.

### Visual direction

“Career clarity, with room to think”: editorial serif headlines paired with a clear sans-serif interface, warm paper backgrounds, deep forest-green actions, and a restrained leaf-green accent. A custom CSS role-map illustration previews the product without stock-photo dependency or fabricated customer metrics.

### Page structure

- **Hero:** “Your next chapter starts with a skill.” Product promise and account call to action.
- **The platform:** Three feature cards for role direction, skill perspective, and learning momentum.
- **How it works:** Choose a direction, map current skills, and build next steps.
- **Our approach:** Personal, understandable, steady progress—with no promise of shortcuts.
- **Closing call to action and footer:** Account creation and sign-in.

### Design and accessibility references

- [web.dev: Responsive web design basics](https://web.dev/articles/responsive-web-design-basics) — adaptable layouts and content that fits the viewport.
- [web.dev: Web Vitals](https://web.dev/articles/vitals) — loading, interactivity, and visual-stability goals.
- [W3C: WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) — accessible controls, semantics, and alternatives.

## Run locally

1. Install Node.js and npm.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env.local` and set your Supabase project URL and anon/publishable key.
4. Apply the SQL migration in `supabase/migrations` to your Supabase project.
5. Start the development server with `npm run dev`.

Build the production bundle with `npm run build`.

## GitHub Pages

The published site is served from the repository's `gh-pages` branch:

https://raushansingh098.github.io/-aptivance/

For a new production build, set `GITHUB_PAGES=true` while running `npm run build` so asset paths use the GitHub Pages project subpath. Publish the contents of `dist` to the `gh-pages` branch. Do not commit `.env.local`.

In Supabase Auth URL Configuration, set the Site URL and redirect allowlist to the published URL. The browser app uses the public anon/publishable key; never expose a service-role key.
