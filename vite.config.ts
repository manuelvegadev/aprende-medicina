import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      strict: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'prod',
    rollupOptions: {
      output: {
        entryFileNames: `assets/inventory-manager/[name].js`,
        chunkFileNames: `assets/inventory-manager/[name].js`,
        assetFileNames: `assets/inventory-manager/[name].[ext]`,
      },
    },
  },
});
