# Agent Guidelines & Next.js Windows Stability Rules

## Critical Rule: Next.js Workspace Root & Hot-Reload Fix on Windows

### 1. Root Cause of `Cannot find module './611.js'` & `reading '/_app'` Errors

- **Stale Production Build Artifact Conflict**:
  When `npm run build` is run, Next.js generates production Webpack chunks (e.g. `611.js`, `833.js`) and manifests (`pages-manifest.json`) inside `.next/server/`.
  If `npm run dev` is subsequently executed without deleting `.next/`, Next.js dev bundler attempts to read those stale production chunk hashes, throwing `Error: Cannot find module './611.js'` and `TypeError: Cannot read properties of undefined (reading '/_app')`.

- **Parent Lockfile Hijacking**:
  On Windows, if a parent directory (e.g. `C:\Users\acer\package-lock.json`) contains a `package-lock.json` file, Next.js auto-infers `C:\Users\acer` as the root workspace directory.
  `outputFileTracingRoot: path.resolve(__dirname)` in `next.config.mjs` prevents Next.js from looking outside the project directory.

---

### 2. Solution Implemented

1. **Automatic `.next` Cleanup in `package.json`**:
   ```json
   "scripts": {
     "dev": "npx rimraf .next && next dev",
     "build": "next build"
   }
   ```

2. **Workspace Root Lock in `next.config.mjs`**:
   ```javascript
   import path from 'path';
   import { fileURLToPath } from 'url';

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);

   /** @type {import('next').NextConfig} */
   const nextConfig = {
     outputFileTracingRoot: path.resolve(__dirname),
     reactStrictMode: true,
     devIndicators: false,
   };

   export default nextConfig;
   ```

---

### 3. Quick Recovery Command

If any stale dev server cache issue occurs:
```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue; npm run dev
```

---

## Page Creation & Directory Architecture Standard

Whenever creating or refactoring any page in the application (e.g. `contact`, `pricing`, `dashboard`, `docs`), ALWAYS structure the page folder under `src/app/[pagename]/` using modular section architecture:

```
src/app/[pagename]/
├── sections/             <-- Local section components specific to this page
│   ├── MainSection.tsx
│   └── SecondarySection.tsx
└── page.tsx              <-- Main compiler entry point importing sections
```

**Mandatory Rules**:
1. Every page directory under `src/app/` MUST include a `sections/` subdirectory containing modular section components.
2. `page.tsx` must act strictly as the layout entry point where sections from `./sections/` (along with global components like `Navbar` and `Footer`) are imported and compiled together.
3. This modular pattern ensures clean component isolation, scalability, and easy maintenance.

