# Application Architecture

Flag Dash is designed as a single-page application (SPA) following a **container-presentational** component pattern. This structure separates the application's logic and state management from its UI rendering, improving maintainability and reusability.

## Container Component: `App.tsx`

The `src/App.tsx` file serves as the single "container" component for the entire application. It is responsible for:

1.  **State Management:** All application state is managed using React Hooks.
    -   `useState`: Manages game state (`menu`, `playing`, `finished`, `stats`), quiz progress (scores, options, feedback), user selections (difficulty, region), and statistics.
    -   `useEffect`: Handles side effects, such as loading/saving stats from `localStorage`, managing the game timer, and loading the first question.
    -   `useCallback`, `useMemo`, `useRef`: Used for performance optimizations and managing timers.

2.  **Logic:** All core game logic resides here. This includes functions for starting the game, loading the next question, handling user answers, and updating statistics.

3.  **Data Flow:**
    -   `App.tsx` acts as the single source of truth.
    -   It passes state down to the presentational components as props.
    -   It passes callback functions (e.g., `handleOptionClick`) down as props, allowing child components to communicate events back up to the container.

4.  **Rendering Views:** The main render method of `App.tsx` contains a `switch` statement based on the `gameState` variable. It decides which presentational component to render (`MainMenu`, `GameBoard`, etc.) for the current view.

## Presentational Components (`src/components/`)

These components are "dumb" components. Their primary role is to render the UI based on the props they receive. They do not contain any application logic or manage their own complex state.

-   **`MainMenu.tsx`**: Renders the start screen with region and difficulty options.
-   **`GameBoard.tsx`**: Renders the core quiz interface, including the flag and option buttons.
-   **`OptionButton.tsx`**: A specialized component for rendering a single answer button and its complex visual feedback states (correct, incorrect, selected).
-   **`EndScreen.tsx`**: Renders the "Game Over" screen with the final score.
-   **`StatsDisplay.tsx`**: Renders the entire statistics page.

## PWA and Offline Functionality

The PWA architecture remains the same, providing a native-like experience and offline capabilities.

-   **Service Worker (`sw.js`):** Uses a cache-first strategy to serve the app shell and assets (including component files and flag images) offline.
-   **Web App Manifest (`manifest.json`):** Provides metadata to make the app installable.
-   **Local Storage:** Used exclusively to persist user statistics.

## Advantages of this Architecture

-   **Separation of Concerns:** Logic and UI are clearly separated, making the codebase easier to understand and debug.
-   **Reusability:** Presentational components can be easily reused or modified without affecting the core application logic.
-   **Maintainability:** Changes to the UI are isolated within component files, reducing the risk of introducing bugs into the game logic.
-   **Scalability:** This structure makes it much easier to add new features or views by simply creating new components and adding a new case to the render logic in `App.tsx`.