import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  build: {
    target: "ES2020",
    minify: "esbuild",
    sourcemap: true,
  },
  publicDir: path.resolve(__dirname, "client", "public"),
});
