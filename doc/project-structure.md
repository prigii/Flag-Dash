# Project Structure

The project is organized into a standard React application structure, separating the application source code from public assets and documentation.

```
.
├── doc/
│   ├── architecture.md       # High-level overview of the app's architecture
│   ├── deployment.md         # Instructions for deploying the application
│   ├── project-structure.md  # This file
│   ├── README.md             # The main project documentation
│   └── roadmap.md            # Potential future features and improvements
├── icons/
│   ├── icon-192x192.png
│   └── icon-512x512.png
├── src/
│   ├── components/
│   │   ├── EndScreen.tsx       # Renders the final score screen
│   │   ├── GameBoard.tsx       # Renders the main quiz interface
│   │   ├── MainMenu.tsx        # Renders the main menu and game options
│   │   ├── OptionButton.tsx    # Renders a single answer button with feedback logic
│   │   └── StatsDisplay.tsx    # Renders the statistics page
│   ├── App.tsx                 # Main container component (state management and logic)
│   └── index.tsx               # The React root renderer
├── index.html                  # The entry point of the application
├── manifest.json               # PWA configuration file
├── metadata.json               # Project metadata
└── sw.js                       # The service worker for offline functionality
```

### File Descriptions

-   **`doc/`**: Contains all documentation related to the project.
-   **`icons/`**: Contains the application icons required by the PWA manifest.
-   **`src/`**: The main source code directory for the React application.
-   **`src/components/`**: Contains all the reusable, presentational React components.
-   **`src/App.tsx`**: The main "container" component. It manages all application state and logic and passes data down to the child components as props.
-   **`src/index.tsx`**: The entry point for the React application, which renders the `App` component.
-   **`index.html`**: The main HTML file that the user loads.
-   **`manifest.json`**: The web app manifest file for PWA functionality.
-   **`metadata.json`**: Basic project metadata.
-   **`sw.js`**: The service worker script for offline access and caching.