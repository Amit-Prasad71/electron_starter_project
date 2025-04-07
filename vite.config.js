import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		react()
	],
	base: './', // Use relative paths for assets in the build output
	build: {
		outDir: 'dist', // Specify the output directory (relative to project root)
	},
	server: {
		port: 5173, // Ensure this matches the port in electron/main.js for development
	},
});