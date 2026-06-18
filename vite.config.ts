// Self-contained Vite config for the WebCentauri TanStack Start app.
//
// This replaces @lovable.dev/vite-tanstack-config with the underlying plugins
// it composed, so the project has ZERO Lovable dependencies. The wrapper's
// dev-server error overlays, sandbox detection, HMR gate, dev-server bridge and
// component tagger were all dev/sandbox-only and never ran in a production
// build, so they are intentionally omitted here.
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  // Tailwind v4 uses Lightning CSS at build time; run it in dev too so the dev
  // preview and the built output transform CSS identically.
  css: { transformer: "lightningcss" },
  resolve: {
    // `@` -> /src. vite-tsconfig-paths also reads this from tsconfig.json; this
    // explicit alias is a space-safe fallback.
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // Prevent duplicate React / TanStack Query copies across the dep graph.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: { host: "::", port: 8080 },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Block client bundles from importing server-only modules.
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      // Use src/server.ts (our SSR error + security-header wrapper) as the
      // server entry that Nitro builds from.
      server: { entry: "server" },
    }),
    // Emit a standalone Node server at .output/server/index.mjs (listens on
    // $PORT) — what Hostinger runs as the Node.js app.
    nitro({ preset: "node-server" }),
    viteReact(),
  ],
});
