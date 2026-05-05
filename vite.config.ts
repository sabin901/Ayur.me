import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:5002",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  optimizeDeps: {
    // three-stdlib ships broken source maps that crash esbuild during
    // Vite's dep pre-bundling. Excluding it lets Vite serve it as ESM.
    exclude: ["three-stdlib"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Source maps in production make Sentry-style stack traces useful;
    // 'hidden' keeps them off the wire but lets you upload them to a
    // monitoring service.
    sourcemap: "hidden",
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      external: ["workbox-core"],
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          charts: ["recharts", "d3"],
          motion: ["framer-motion"],
          ui: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
          ],
        },
      },
    },
  },
});
