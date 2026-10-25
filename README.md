# Aptivance

Aptivance helps students assess their skills, identify gaps for target careers, and plan their learning.

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
