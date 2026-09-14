# Sentient Systems

Industrial landing page for infrastructure intelligence, Energy + Compute Radar, and RL resource-planning research.

## Run locally

Open `index.html`, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000. No dependencies or build step.

## GitHub Pages

Publish the repository root from `main` in Settings → Pages. Keep `index.html`, `styles.css`, `app.js`, `favicon.svg`, and the existing `CNAME` together. All asset paths are relative, so the site also works under a GitHub Pages repository path. The existing custom domain is `sentientsystems.space`; DNS settings are unchanged.

## Interactions and content

- Radar category buttons filter opportunity cards and map markers. Selecting either updates the detail panel.
- The resource selector switches among hydro, landfill gas, and curtailed-renewable combinations.
- Pilot, partnership, and site-search links open email drafts using Divyesh Parekh’s contact address, `dparekh3291@gmail.com`. No submissions are stored or sent by the page.
- Scenarios are fictional and labeled illustrative. The map is a schematic, not a geographic survey. The explorer is not a trained RL model or live scouting service.
- Edit the curated arrays in `app.js` to change scenarios. The RL section describes research intent; production scouting, simulation, training, and verification require a separate system.

## Accessibility

Semantic landmarks, labeled navigation and controls, keyboard focus styles, pressed states, live detail updates, reduced-motion support, responsive layouts, and a skip link. Core marketing content and contact links remain available without JavaScript.
