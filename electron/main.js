const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

// Detect development environment
const isDev = process.env.NODE_ENV !== 'production';

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'), // Use preload script
			contextIsolation: true, // Protect against prototype pollution
			nodeIntegration: false, // Recommended security practice
		},
	});

	// Load the index.html of the app.
	if (isDev) {
		// In development, load Vite dev server URL
		mainWindow.loadURL('http://localhost:5173'); // Default Vite port

		// Open the DevTools automatically if in development
		// mainWindow.webContents.openDevTools();
	} else {
		// In production, load the built HTML file
		mainWindow.loadFile(path.join(__dirname, '../dist/index.html')); // Adjust path if your build output differs
	}

	// Optional: Example of handling IPC messages from renderer
	ipcMain.on('some-message', (event, args) => {
		console.log('Received message from renderer:', args);
		// You can send a reply back if needed
		// event.reply('reply-message', 'Hello from main process!');
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// You can include additional main process logic here.