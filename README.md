# WTWR (What to Wear?)

WTWR is a React application that helps users decide what to wear based on live weather conditions. The app fetches weather data, filters clothing suggestions for current conditions, and allows users to add and delete clothing items stored on a mock API server.

Repository: https://github.com/avahaulick/se_project_react

Project video: https://www.loom.com/share/a14501968064462fb77d80d110610b0f

## Technologies Used

- React 18
- React Router DOM
- Vite
- json-server (mock backend)
- ESLint
- CSS

## Running the Project Locally

### 1) Install dependencies

```bash
npm install
```

### 2) Start the mock API server (port 3001)

```bash
npm run server
```

This serves data from `db.json` at:

- http://localhost:3001/items

### 3) Start the frontend app (port 3000)

```bash
npm run dev
```

### Optional: start both server and frontend together

```bash
npm run dev:all
```

### Optional: run both with host exposure

```bash
npm run dev:all:host
```

## Available Scripts

- `npm run dev` — start Vite dev server
- `npm run dev:host` — start Vite with `--host`
- `npm run server` — start json-server on port 3001
- `npm run dev:all` — run backend + frontend together
- `npm run dev:all:host` — run backend + host-exposed frontend
- `npm run build` — create production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
