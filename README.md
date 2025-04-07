# Electron + React + Vite Starter Project

This is a starter template for building cross-platform desktop applications using:

* **[Electron](https://www.electronjs.org/):** Framework for creating native applications with web technologies like JavaScript, HTML, and CSS.
* **[React](https://react.dev/):** A JavaScript library for building user interfaces.
* **[Vite](https://vitejs.dev/):** A fast frontend build tool providing a lightning-fast cold server start and instant Hot Module Replacement (HMR).
* **[Electron Forge](https://www.electronforge.io/):** A complete tool for building, packaging, and distributing Electron applications.

---

## How Electron Works (Simplified)

Electron applications essentially consist of two main process types:

1.  **Main Process:**
    * This is the entry point of the application (runs the code in `electron/main.js`).
    * It runs in a Node.js environment, meaning it has access to Node.js APIs (like file system access).
    * It's responsible for creating and managing application windows (`BrowserWindow` instances) and handling system events (app lifecycle, menus, dialogs, etc.).
    * There is only **one** Main process per application.

2.  **Renderer Process:**
    * Each `BrowserWindow` created by the Main process runs its own Renderer process.
    * This is where your web page (UI) lives. It runs HTML, CSS, and JavaScript (in this case, your React code bundled by Vite).
    * It renders the actual user interface that the user sees and interacts with.
    * It does **not** have direct access to Node.js APIs for security reasons (unless explicitly configured, which is generally discouraged).
    * Renderer processes communicate with the Main process using Inter-Process Communication (IPC) via `ipcRenderer` (typically exposed securely through a preload script like `electron/preload.js`) and `ipcMain`.

---

## Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (LTS version recommended) and npm (comes with Node.js)
* [Git](https://git-scm.com/)

---

## Getting Started

Follow these steps to set up and run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url> # Replace with your actual repo URL
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd electron_starter_project
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

---

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading enabled:

```bash
npm start
```

This command handles launching the Vite development server and the Electron application together, providing a seamless development experience with HMR for your React code. Any changes in the `src` directory should reflect almost instantly in the Electron window. Changes to the Electron Main or Preload scripts (`electron/` directory) will usually require a restart of the application.

*Alternatively, for more manual control, you could run `npm run dev` in one terminal and `npm run electron:dev` in another terminal, but `npm start` is the integrated approach provided by Electron Forge and is recommended.*

### Production Mode (Local Test)

To simulate how the application would run for an end-user using the built React files:

1.  **Build the React application:**
    ```bash
    npm run build
    ```
    This bundles your React code and outputs it to the `dist/` directory.

2.  **Launch Electron using the production build:**
    ```bash
    npm run electron:prod
    ```
    This runs the Electron application, loading the optimized assets directly from the `dist/` folder.

### Building and Packaging

To create distributable packages (like `.exe` on Windows, `.dmg` on macOS, `.deb`/`.rpm` on Linux) for your application:

1.  **Ensure the React app is built:** (The `make` script often relies on the output of the build)
    ```bash
    npm run build
    ```

2.  **Run the make command:**
    ```bash
    npm run make
    ```
    This command uses Electron Forge to package your application and create installers/packages suitable for your current operating system. The output will be generated in the `out/` directory.

### Project Structure
```
electron_starter_project/
├── electron/         # Electron Main process & Preload scripts
│   ├── main.js       # Main process entry point
│   └── preload.js    # Optional preload script
├── src/              # React source code (Renderer process UI)
│   ├── App.jsx
│   └── main.jsx      # React entry point
├── dist/             # Output for built React app (from `npm run build`)
├── out/              # Output for packaged Electron app (from `npm run make`)
├── index.html        # HTML entry point for Vite
├── vite.config.js    # Vite configuration
├── forge.config.js   # Electron Forge configuration (if separate)
├── package.json      # Project manifest, dependencies, scripts
└── README.md         # This file
```

### Available Scripts

* `npm start`: (recommended) Starts both the Vite dev server and Electron in development mode. Waits for the dev server to be ready before launching Electron. Ideal for full app development.
* `npm run dev`: Starts *only* the Vite development server.
* `npm run build`: Builds the React application for production (outputs to `dist/`).
* `npm run electron:dev`: Starts Electron in development mode (expects Vite server to be running separately).
* `npm run electron:prod`: Starts Electron using the production build from `dist/`.
* `npm run preview`: Serves the production build locally using Vite for previewing.
* `npm run package`: Packages the application without creating installers (used internally by `make`).
* `npm run make`: Creates distributable installers/packages for the application (outputs to `out/`).
### License

This project is licensed under the ISC License.