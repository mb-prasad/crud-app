# crud-app

## Frontend (`frontend/`)

A Vite + React app with client-side routing (react-router-dom) and two pages:
Home (`/`) and About (`/about`).

Requirements: Node.js 18+ and npm.

```sh
cd frontend
npm install     # install dependencies
npm run dev     # start the Vite dev server
npm run build   # production build into frontend/dist
npm test        # run unit tests once with Vitest (jsdom + React Testing Library)
```

Unit tests live next to the code (`src/App.test.jsx`, `src/pages/*.test.jsx`).
Shared test setup is in `src/setupTests.js`, which loads `@testing-library/jest-dom`.

## Python tests

From the repository root:

```sh
python -m pytest -q
```
