import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: ".",
  plugins: [react()],
  server: {
    port: 3006,
    proxy: {
      "/api": "http://localhost:3007",
    },
  },
  build: {
    outDir: "build",
  },
});
