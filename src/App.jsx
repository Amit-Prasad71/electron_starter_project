import React, { useState, useEffect } from 'react';

function App() {
	const [message, setMessage] = useState('React App Loaded!');
	const [nodeVersion, setNodeVersion] = useState('Loading...');

	useEffect(() => {
		// Example of using the exposed API from preload.js
		if (window.electronAPI) {
			setNodeVersion(`Node.js version: ${window.electronAPI.getNodeVersion()}`);

			// Example of receiving a message from main process (if main sends one)
			// window.electronAPI.receiveMessage('reply-message', (data) => {
			//   console.log('Received reply:', data);
			// });
		} else {
			setNodeVersion('electronAPI not available (running in browser?)');
		}
	}, []);

	const handleSendMessage = () => {
		if (window.electronAPI) {
			console.log('Sending message to main process...');
			window.electronAPI.sendMessage('some-message', 'Hello from React!');
		} else {
			console.log('Cannot send message: electronAPI not available.');
		}
	};

	return (
		<div>
			<h1>Hello world</h1>
		</div>
	);
}

export default App;