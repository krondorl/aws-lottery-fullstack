import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { PluginOption } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() as PluginOption[]],
});
