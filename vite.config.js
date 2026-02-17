import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    tailwindcss(),
  ],
  // SPA fallback: all routes serve index.html
  appType: 'spa',
  build: {
    // Increase chunk size warning limit for Three.js bundle
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
        }
      }
    }
  }
});
