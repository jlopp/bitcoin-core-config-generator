import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed to GitHub Pages under /bitcoin-core-config-generator/
export default defineConfig({
  base: '/bitcoin-core-config-generator/',
  plugins: [
    // React 16 has no automatic JSX runtime, so use the classic transform.
    react({ jsxRuntime: 'classic' })
  ],
  // This project keeps JSX inside .js files (Create React App convention).
  // Vite's default .js loader rejects JSX, and its default esbuild filter
  // excludes .js via `exclude || /\.js$/`, so clear the exclude list and
  // treat source .js as JSX.
  esbuild: {
    include: /src\/.*\.jsx?$/,
    exclude: [],
    loader: 'jsx'
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' }
    }
  },
  build: {
    // Keep the CRA-compatible output directory so the deploy workflow is unchanged.
    outDir: 'build'
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js'
  }
});
