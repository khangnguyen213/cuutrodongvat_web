// vite.config.js
import { defineConfig } from "file:///mnt/c/Users/TECHACRE/Desktop/cuutrodongvat/web/node_modules/vite/dist/node/index.js";
import react from "file:///mnt/c/Users/TECHACRE/Desktop/cuutrodongvat/web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import million from "file:///mnt/c/Users/TECHACRE/Desktop/cuutrodongvat/web/node_modules/million/dist/packages/compiler.mjs";
var __vite_injected_original_dirname = "/mnt/c/Users/TECHACRE/Desktop/cuutrodongvat/web";
var vite_config_default = defineConfig({
  plugins: [
    million.vite({
      threshold: 0.05,
      // default: 0.1,
      skip: ["Register", "Login", "useForm"]
      // default []
    }),
    react()
  ],
  // plugins: [react()],
  // Config alias
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
      "@utils": path.resolve(__vite_injected_original_dirname, "./src/utils"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@services": path.resolve(__vite_injected_original_dirname, "./src/services"),
      "@layouts": path.resolve(__vite_injected_original_dirname, "./src/layouts")
    }
  },
  // / Config Global Scss Variable */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/scss/index.scss";
        `
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvVEVDSEFDUkUvRGVza3RvcC9jdXV0cm9kb25ndmF0L3dlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL21udC9jL1VzZXJzL1RFQ0hBQ1JFL0Rlc2t0b3AvY3V1dHJvZG9uZ3ZhdC93ZWIvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21udC9jL1VzZXJzL1RFQ0hBQ1JFL0Rlc2t0b3AvY3V1dHJvZG9uZ3ZhdC93ZWIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBtaWxsaW9uIGZyb20gJ21pbGxpb24vY29tcGlsZXInO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIG1pbGxpb24udml0ZSh7XG4gICAgICB0aHJlc2hvbGQ6IDAuMDUsIC8vIGRlZmF1bHQ6IDAuMSxcbiAgICAgIHNraXA6IFsnUmVnaXN0ZXInLCAnTG9naW4nLCAndXNlRm9ybSddLCAvLyBkZWZhdWx0IFtdXG4gICAgfSksXG4gICAgcmVhY3QoKSxcbiAgXSxcbiAgLy8gcGx1Z2luczogW3JlYWN0KCldLFxuXG4gIC8vIENvbmZpZyBhbGlhc1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAnQGNvbXBvbmVudHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvY29tcG9uZW50cycpLFxuICAgICAgJ0BwYWdlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9wYWdlcycpLFxuICAgICAgJ0Bhc3NldHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvYXNzZXRzJyksXG4gICAgICAnQHV0aWxzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3V0aWxzJyksXG4gICAgICAnQGhvb2tzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2hvb2tzJyksXG4gICAgICAnQHNlcnZpY2VzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3NlcnZpY2VzJyksXG4gICAgICAnQGxheW91dHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvbGF5b3V0cycpLFxuICAgIH0sXG4gIH0sXG4gIC8vIC8gQ29uZmlnIEdsb2JhbCBTY3NzIFZhcmlhYmxlICovXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcbiAgICAgICAgICBAaW1wb3J0IFwiLi9zcmMvc2Nzcy9pbmRleC5zY3NzXCI7XG4gICAgICAgIGAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1QsU0FBUyxvQkFBb0I7QUFDNVYsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGFBQWE7QUFIcEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsUUFBUSxLQUFLO0FBQUEsTUFDWCxXQUFXO0FBQUE7QUFBQSxNQUNYLE1BQU0sQ0FBQyxZQUFZLFNBQVMsU0FBUztBQUFBO0FBQUEsSUFDdkMsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLEVBQ1I7QUFBQTtBQUFBO0FBQUEsRUFJQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDcEMsZUFBZSxLQUFLLFFBQVEsa0NBQVcsa0JBQWtCO0FBQUEsTUFDekQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQy9DLFdBQVcsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNqRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsVUFBVSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQy9DLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQ3JELFlBQVksS0FBSyxRQUFRLGtDQUFXLGVBQWU7QUFBQSxJQUNyRDtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUE7QUFBQTtBQUFBLE1BR2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
