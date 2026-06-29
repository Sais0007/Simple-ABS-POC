import { defineConfig } from 'vite';

export default defineConfig({
  // Vite configuration options go here
  server: {
    port: 3000, // Matches the port you were using previously with http-server
    open: true, // Automatically opens the app in the browser on server start
  },
  build: {
    outDir: 'dist', // The directory where the production build will be placed
  },
});
