# Todo Chrome Extension

A lightweight browser popup Chrome extension for quick task management, checklists, and daily todos built with React 18 and Vite.

## Overview

`todo-chrome-extension` is a quick-access browser extension that enables users to manage daily checklists directly from Chrome's toolbar popup, keeping tasks saved locally without leaving the current tab.

## Tech Stack

- **Extension Framework**: React 18 & [Vite](https://vitejs.dev/) (v4)
- **Manifest**: Chrome Extension Manifest V3
- **Language**: JavaScript / TypeScript

## Prerequisites

- Node.js (v16 or v18 recommended)
- Google Chrome or any Chromium-based browser
- Package manager (`pnpm` or `npm`)

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Build the Extension**:
   ```bash
   pnpm build
   # or
   npm run build
   ```

3. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** in the top right corner.
   - Click **Load unpacked** and select the generated `dist` folder.

## Available Scripts

- `pnpm dev` - Starts the Vite dev server for popup UI development.
- `pnpm build` - Builds production-ready Chrome extension bundles.
- `pnpm preview` - Previews the build output locally.

## Author

Created by [Mehfooz-ur-Rehman](https://github.com/MehfoozurRehman).
