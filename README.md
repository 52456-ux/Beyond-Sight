# Beyond Sight — Lab 5 (React + Node.js + Express)

This continues the same Beyond Sight semester project from Lab 4. React is the main website page (`index.html` + `src/`), and the Express backend is inside `server/`.

## Structure

- `src/` — React website and components (Header, PostCard, Sidebar, ResourceManager, Footer)
- `server/server.js` — Express API
- `server/data.js` — temporary in-memory resource array
- `server/validators.js` — POST validation
- Existing HTML pages such as `about.html`, `post1.html`, `resources.html`, `login.html`, and `register.html` are preserved.

## API routes

- `GET /api/hello` → `{ "message": "Hello" }`
- `GET /api/status` → `{ "status": "ok" }`
- `GET /api/items` → all resources
- `GET /api/items/:id` → one resource or 404
- `GET /api/items?search=screen` → filter by title/category/description
- `POST /api/items` → validate and create a resource
- `DELETE /api/items/:id` → delete a resource

The Express middleware logs `req.method` and `req.path`. React uses `fetch()` to load, search, add and delete resources and displays loading/error messages.

## Run (two terminals)

### Terminal 1 — backend

```powershell
cd server
npm install
npm run dev
```

API: `http://localhost:3000`

### Terminal 2 — React frontend

Open a second VS Code terminal. If it starts inside `server`, run `cd ..` first.

```powershell
npm install
npm run dev
```

Open the Vite address shown in the terminal (usually `http://localhost:5173`). Keep both terminals running. Vite proxies `/api` requests to Express.

## Test

Open `http://localhost:3000/api/hello`, `/api/status`, `/api/items`, or `/api/items?search=screen`.

## Data note

The backend uses a temporary array in `server/data.js`. Changes remain while the server is running and reset when it restarts. A database is not required by this lab.

## Git

Work on branch `lab5`, commit changes in meaningful steps, and push that branch. Do not replace your existing `.git` folder with one from an archive.
