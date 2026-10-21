# Todo Chrome Extension

A browser-toolbar popup for a daily checklist, built with React 18 and Vite and saved in `localStorage`.

**Status:** Stub. The code is two real source files (`src/App.jsx`, `src/main.jsx`), and the main action is broken: pressing Enter in the input throws, so new tasks cannot be added.

## The problem

Keeping a short daily to-do list without leaving the current tab. The popup shows today's date and a list of tasks that persists between browser sessions.

## What it does

- Shows today's date in the popup header.
- Toggles a task between done and not done, with a line-through style on completed items.
- Hides a task when its trash icon is clicked. The record stays in storage.
- Saves the list to `localStorage` under the key `TODO` on every change.
- Intended: add a task when Enter is pressed in the "Add Task" input. This path does not work yet (see below).

## How it's built

- React 18 with Vite 4 and `@vitejs/plugin-react`. The build output is a `dist` folder that Chrome loads as an unpacked extension.
- The extension manifest is `public/manifest.json`. It declares `manifest_version` 2 with a `browser_action` whose popup is `index.html`. Vite copies `public/` into `dist`.
- State is a single array of `{ id, name, done, trash }` objects, held in React state and mirrored to `localStorage` in a `useEffect`. Clicks are handled by one listener on the list, which reads a `job` attribute on each icon.
- `vite.config.js` runs `vite-plugin-imagemin` to compress images at build time.

## Running it locally

```bash
pnpm install   # or: npm install
pnpm build     # writes dist/
```

Then in Chrome, open `chrome://extensions/`, enable Developer mode, click "Load unpacked" and select `dist`. `pnpm dev` runs the popup in a Vite dev server, and `pnpm preview` serves the build.

## What's left

- Enter-to-add is broken. `handleInputKeyUp` reads an undefined variable `input` (it should use `inputValue`) and reads `window.event`. The fix is a one-line change to use the `inputValue` state.
- Deleted tasks are only hidden, so `localStorage` keeps growing. Removing them from the array would fix this.
- The manifest is version 2. Chrome Web Store no longer accepts new MV2 extensions, so this needs a move to MV3 before it can be published.
- No tests.
