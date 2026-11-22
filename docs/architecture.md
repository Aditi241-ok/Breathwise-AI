# Architecture

Phase 1 establishes how the frontend is organized. It does not implement air-quality features or the Atmospheric Lab visual system.

## What was already here

`frontend/` is the Vite React TypeScript template: React 19, TypeScript 6, Vite 8, and ESLint. There was no router, no API layer, no backend, and no Tailwind. Starter styles in `src/index.css` and `src/App.css` described the Vite welcome page. `index.css` was replaced because its layout rules (`#root` width, centered marketing sections) would fight the application shell. `App.css` was removed because nothing imports it. Vite, TypeScript, and ESLint configuration were kept and only extended.

## Boundary

The browser never calls Open-Meteo. Screens ask `src/api/` for data. `src/api/client.ts` calls the BreatheWise API at `VITE_API_BASE_URL`. The API, added in a later phase, is what talks to Open-Meteo, stores community reports, and decides what is measured, predicted, or missing.

That split keeps provider details and any future credentials off the client, and it gives every screen one place to handle an unreachable API. The shell already does this: `useBackendStatus` calls `GET /health` and renders loading or unavailable. It does not invent a reading when the call fails.

## Folder map

```
frontend/src/
  app/            router, providers, section registry
  api/            HTTP client and endpoint functions
  components/     layout and status UI shared by sections
  config/         public environment values
  features/       one folder per product section
  hooks/          shared React hooks
  styles/         shell layout; the design system comes later
  types/          contracts shared by screens and the API
```

Each product section has a page component and a route. Those pages currently render the same section description so the navigation is real before the features exist. Later phases replace the page body without moving the route.

## Data contracts

`types/airQuality.ts` names the six pollutants with Open-Meteo field codes. A reading may be `null`. The origin is `measured`, `predicted`, `estimated`, or `demonstration`, and demonstration is never presented as a live monitor.

An air-quality index always carries its scale (`european` or `us`). The UI must not assume one scale.

`types/exposure.ts` reserves the AirPrint contract. The indicator is E = Σ(Cᵢ × Tᵢ), calculated separately per pollutant. It is time spent near a concentration. It is not an inhaled dose and not a diagnosis. Intervals without a concentration stay missing.

## Configuration

`VITE_API_BASE_URL` defaults to `http://127.0.0.1:8000`. Copy `frontend/.env.example` to `frontend/.env.local` to override it. Files named `.env` and `.env.*` are gitignored except `.env.example`.

When the API exists, it must allow the Vite origin. The frontend does not proxy that call in development, so the base URL stays explicit.

## Left for later phases

Tailwind CSS, Framer Motion, Recharts, and Leaflet are not installed. They belong with the design system, charts, and map. FastAPI and SQLite are not created yet. No air-quality numbers are shown, because this phase has no source to show them from.
