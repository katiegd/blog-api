import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     external: ["express", "events", "http", "path", "buffer"],
  //   },
  // },
  // optimizeDeps: {
  //   exclude: ["express", "url", "path", "buffer"],
  // },
});
