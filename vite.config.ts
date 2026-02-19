import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { manusRuntime } from "vite-plugin-manus-runtime";

export default defineConfig({
  plugins: [
    react(),
    manusRuntime(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  server: {
    middlewareMode: true,
  },
  build: {
    target: "ES2020",
    minify: "esbuild",
    sourcemap: true,
  },
  publicDir: path.resolve(__dirname, "client", "public"),
});
