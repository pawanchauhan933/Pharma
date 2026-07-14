import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: "electron/main.ts",
        vite: {
          build: {
            rollupOptions: {
              external: [
                "electron",
                "better-sqlite3",
                "bindings"
              ]
            }
          }
        }
      },
      {
        entry: path.join(__dirname, "electron/preload.ts")
      }
    ])
  ]
});