import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      external: ['react-redux', '@reduxjs/toolkit']
    }
  }
});
