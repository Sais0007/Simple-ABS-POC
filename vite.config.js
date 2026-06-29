import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Vercel needs to know about all your HTML files to build them correctly
      input: {
        main: resolve(__dirname, 'index.html'),
        listing: resolve(__dirname, 'listing.html'),
        details: resolve(__dirname, 'details.html'),
        upload: resolve(__dirname, 'upload.html')
      }
    }
  },
});
