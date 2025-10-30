# Flag Dash

**Flag Dash** is a sleek, modern, and fun progressive web app (PWA) that tests your knowledge of world flags. It's built with React, TypeScript, and Tailwind CSS, focusing on a clean user experience, responsiveness, and offline capabilities.

## Features

-   **Progressive Web App (PWA):** Installable on your device and works offline.
-   **Multiple Difficulty Levels:** Choose from Easy (90s), Medium (60s), or Hard (30s) to match your skill level.
-   **Region Filtering:** Focus your quiz on specific continents like Europe, Asia, Africa, etc.
-   **Comprehensive Flag Database:** Features over 200 countries and flags.
-   **Statistics Tracking:** Your performance is saved locally, allowing you to track:
    -   Overall accuracy and win/loss record.
    -   Performance breakdown by region.
    -   A chart of your recent game scores.
-   **Sleek & Responsive UI:** A modern interface that looks great on any device, from mobile phones to desktops.
-   **No Repetition:** The game avoids repeating flags until all flags in the selected set have been shown.

## Tech Stack

-   **Framework:** React 18
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS (via CDN)
-   **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`, etc.)
-   **Offline Storage:** `localStorage` for statistics and Service Worker Cache API for app shell and assets.

## Getting Started

Since this is a client-side application without a build step, you can run it by simply serving the root directory with a local web server.

1.  **Serve the directory:**
    Use any static file server. If you have Python installed:
    ```bash
    # For Python 3
    python -m http.server
    ```
    Or with Node.js `serve`:
    ```bash
    npx serve .
    ```

2.  **Open your browser:**
    Navigate to `http://localhost:8000` (or the port provided by your server).

## Project Structure

For a detailed breakdown of the file structure, see [project-structure.md](./project-structure.md).

## Architecture

The application follows a single-component architecture for simplicity. All logic, state, and UI are contained within `App.tsx`. For more details, see [architecture.md](./architecture.md).
