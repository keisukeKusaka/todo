# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Type-check (tsc -b) then bundle to dist/
npm run lint       # ESLint
npm run preview    # Serve the dist/ build locally
```

There are no tests in this project.

## Architecture

This is a Vite + React 19 + TypeScript SPA with no backend. All state lives in memory and is persisted to `localStorage` under the key `todo-app-v1`.

### Data flow

```
useTodos (useReducer + localStorage sync)
  └── TodoProvider (context: todos, filteredTodos, filter, stats, dispatch)
        └── components consume via useTodoContext()
```

- **`src/hooks/useTodos.ts`** — Single `useReducer` owns all todo mutations. A `useEffect` watching the todo array writes to `localStorage` on every change (skips the initial render via a ref to avoid a redundant write).
- **`src/context/TodoContext.tsx`** — Wraps `useTodos`, adds filter state (`useState`), and exposes `filteredTodos` (a `useMemo` over `applyFilters`) and `stats` to the tree. The `Action` type is duplicated here from `useTodos.ts` — if you add a new action, update both files.
- **`src/utils/filters.ts`** — Pure function `applyFilters(todos, filter)` that chains status → priority → search → sort. No side effects.

### TypeScript strictness

`tsconfig.app.json` enables `verbatimModuleSyntax`, which requires `import type` for type-only imports. All type imports must use `import type { ... }`.

### Styling

No CSS framework installed. Tailwind is loaded from CDN in `index.html`. Custom design tokens (CSS custom properties) live in `src/index.css`. All colors, radii, and shadows reference `var(--...)` variables defined there. Component-level styles use inline `style={{}}` objects for layout, and class names from `index.css` for reusable patterns (`.btn`, `.card`, `.input`, `.badge-*`, `.priority-*`, etc.).

### Modals

`EditModal` and `ConfirmDialog` render via `ReactDOM.createPortal` into `document.body` to avoid CSS stacking context issues.

### Date handling

Dates are stored as ISO `YYYY-MM-DD` strings (never `Date` objects) for safe JSON serialization. `src/utils/dateHelpers.ts` handles all comparisons and formatting. Comparisons strip time to avoid timezone issues.

- 常に日本語で会話する
