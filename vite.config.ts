import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
    input: {
    popup: resolve(__dirname, "index.html"),
    background: resolve(__dirname, "src/background/index.ts"),
    content: resolve(__dirname, "src/content/index.ts"),
    // icon: resolve(__dirname, "src/assets/icon.png")
  },
  output: {
    entryFileNames: "[name].js",
  }
}

  }
});
