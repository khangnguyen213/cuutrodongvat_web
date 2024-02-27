import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import million from 'million/compiler';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({
      threshold: 0.05, // default: 0.1,
      skip: ['Register', 'Login', 'useForm'], // default []
    }),
    react(),
  ],
  // plugins: [react()],

  // Config alias
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
    },
  },
  // / Config Global Scss Variable */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/scss/index.scss";
        `,
      },
    },
  },
});
