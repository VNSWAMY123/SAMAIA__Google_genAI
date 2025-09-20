import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

export default defineConfig({
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
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
