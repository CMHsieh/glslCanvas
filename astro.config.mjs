// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://Yuan0100.github.io",
  base: "cmh-glslcanvas",
  integrations: [react(), mdx()],
  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Noto Sans TC",
      cssVariable: "--font-noto-sans-tc",
    }, {
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist-sans"
    }, {
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
    }]
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === "UNUSED_EXTERNAL_IMPORT" && warning.message.includes("@astrojs/internal-helpers/remote")) return;
          warn(warning);
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('glslCanvas')) {
                return 'glslCanvas';
              }
              if (id.includes('react-player')) {
                return 'react-player';
              }
              if (id.includes('lucide-react')) {
                return 'lucide-react';
              }
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
            }
          }
        }
      }
    }
  }
});