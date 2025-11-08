import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ✅ Automatically detect correct backend URL (local vs deployed)
const backendUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://blog-website-u60z.onrender.com' // ⬅️ replace with your actual backend Render URL
    : 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],

  // ✅ Fix proxy for local dev (ignored in production)
  server: {
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5173,
  },

  // ✅ Better build optimization for Render
  build: {
    chunkSizeWarningLimit: 2000, // Increase chunk size limit (2 MB)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
});
