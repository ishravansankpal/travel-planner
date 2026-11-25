# Yatra – Indian Travel Itinerary Planner

A React app for planning trips across India: day-wise itineraries, activity costs in ₹, budget tracking, charts, search, filters, sorting and pagination.

**Backend note:** there is no backend. Data lives in the browser's LocalStorage, which is *not* a database. Passwords are stored in plain text for demo purposes only; a real product would use a server (for example Node/Express with PostgreSQL), hashed passwords and token-based sessions.

## Run on Windows (PowerShell)
1. Install Node.js LTS from https://nodejs.org (check with `node -v`).
2. Unzip the project, open the folder in VS Code, and open its terminal (PowerShell).
3. Run:
```powershell
npm install
npm run dev
```
4. Open http://localhost:5173

If PowerShell blocks npm scripts: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

## Demo login
Email `demo@yatra.in`, password `Demo@123` (pre-filled on the login page). New accounts also start with sample trips.

## Folder structure
```
src/
  components/  Modal, TripCard, TripForm, EmptyState, StatusBadge
  context/     AuthContext, TripsContext, ToastContext
  hooks/       useLocalStorage (useState that persists)
  layouts/     AppLayout (sidebar + page outlet)
  pages/       Landing, AuthPage, Dashboard, Trips, TripDetail, Profile
  data/        Demo user and sample trips
  utils/       ₹ and date helpers
  styles/      global.css (design tokens at the top)
```

## How to explain it in the interview
- **State:** `useState` for local UI, `useContext` for shared auth, trips and toasts, `useMemo` for filter + sort.
- **Persistence:** `useLocalStorage` reads once on load and writes on every change. Trips are saved per user (`yatra_trips_<userId>`).
- **Routing:** React Router; the `Protected` wrapper redirects logged-out users to `/login`.
- **CRUD:** trips (modal form), plus days and activities on the detail page.
- **Validation:** `validateTrip`, plus inline checks on login, register, profile (10-digit Indian mobile) and activities.
- **Reset data:** Profile, then "Restore demo trips".

## Scripts
`npm run dev`, `npm run build`, `npm run preview`

## What's new in v2
- **Dark mode toggle** (sun/moon button) – remembered in LocalStorage via `ThemeContext`; also on the landing page.
- **Top-right profile menu** with Profile and Log out (closes on outside click or Esc).
- **Favourites:** star any trip; filter by favourites on the Trips page; pinned on the dashboard.
- **Grid / list view toggle** on the Trips page.
- **New dashboard chart:** trips by status (donut).
