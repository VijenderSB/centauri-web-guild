// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Force Nitro on with the standalone Node-server preset so a normal
  // `npm run build` (locally, in CI, and on Hostinger) emits a runnable Node
  // server at .output/server/index.mjs (listens on $PORT). Without this, the
  // Lovable wrapper skips Nitro outside its own sandbox and only dist/ is
  // produced. Inside a Lovable sandbox this override is ignored (stays Cloudflare).
  nitro: { preset: "node-server" },
});
