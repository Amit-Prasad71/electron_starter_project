const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	// Example: Expose a function to send messages to the main process
	sendMessage: (channel, data) => {
		// Whitelist channels to prevent arbitrary message sending
		let validChannels = ['some-message']; // Define channels you expect to use
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	// Example: Expose a function to receive messages from the main process
	receiveMessage: (channel, func) => {
		let validChannels = ['reply-message']; // Define channels you expect to receive on
		if (validChannels.includes(channel)) {
			// Deliberately strip event as it includes `sender`
			ipcRenderer.on(channel, (event, ...args) => func(...args));
		}
	},
	// You can expose other Node.js or Electron APIs here safely
	// Example: get Node version (purely illustrative)
	getNodeVersion: () => process.versions.node,
});

console.log('Preload script loaded.');