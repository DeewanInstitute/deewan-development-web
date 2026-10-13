import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
  server: {
    // dev only: send /api to the local backend so the browser never hits CORS, whatever port Vite picks
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
