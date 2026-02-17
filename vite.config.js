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
});
