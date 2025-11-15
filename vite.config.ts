import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), TanStackRouterVite(), tailwindcss()],
  server: {
    port: 3000,
  },
  // publicDir defaults to 'public' - images will be served from public folder
});
