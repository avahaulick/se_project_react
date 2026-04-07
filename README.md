# WTWR (What to Wear?)

WTWR is a full-stack weather clothing app. The frontend is built with React, and it communicates with an Express + MongoDB backend for authentication, profile updates, likes, and clothing item management.

Frontend repository: https://github.com/avahaulick/se_project_react
Backend repository: https://github.com/avahaulick/se_project_express

Project video: https://www.loom.com/share/a14501968064462fb77d80d110610b0f

## Technologies Used

- React 18
- React Router DOM
- Vite
- Express
- MongoDB / Mongoose
- ESLint
- CSS

## Running the Project Locally

### 1) Install frontend dependencies

```bash
npm install
```

### 2) Start MongoDB

Run your local MongoDB server (`mongod`) before starting the backend.

### 3) Start backend API (port 3001)

```bash
# in se_project_express
npm install
npm run dev
```

### 4) Start frontend app (port 3000)

```bash
# in se_project_react
npm run dev
```

## Available Frontend Scripts

- `npm run dev` — start Vite dev server
- `npm run dev:host` — start Vite with `--host`
- `npm run build` — create production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
