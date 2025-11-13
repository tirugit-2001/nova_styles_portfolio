import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all addresses
    port: 5173, // Default Vite port
    strictPort: false, // Allow other ports if 5173 is taken
    proxy: {
      // Proxy API requests to backend to avoid CORS issues in development
      '/api': {
        target: 'https://nova-styles-backend.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
      },
    },
  },
});
