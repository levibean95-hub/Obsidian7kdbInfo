# Deployment Documentation

This file contains deployment and web hosting information.

## Web Hosting Considerations

This is a pure static site with no build step or dependencies.

## Deploying to Netlify

When asked to deploy updates to Netlify, use the Netlify CLI:

1. Ensure all changes are saved (especially script.js if hero data was updated)
2. Run: `netlify deploy --prod` from the project directory
3. The site is already linked to Netlify (see `.netlify/state.json`)

**Important:** Do NOT reference `DEPLOYMENT.md` - that's a user-facing guide for manual deployment.
