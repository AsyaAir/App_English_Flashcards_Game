import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Алиас на src/
      '@contexts': path.resolve(__dirname, 'src/contexts'), // Алиас на контексты
    },
  },
  server: {
    proxy: {
      '/api': 'http://itgirlschool.justmakeit.ru', // Прокси для API
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/_variables.scss' as *; 
                         @use '@/styles/_mixins.scss' as *; 
                         @use '@/styles/_fonts.scss' as *;`,
      },
    },
  },
  build: {
    sourcemap: mode !== 'production', // Теперь используется переданный `mode`
  },
}));