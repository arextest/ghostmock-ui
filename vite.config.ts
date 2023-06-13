import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
const apiKey = process.env.API_KEY;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // modifyVars: { "@primary-color": "#531dab", }
        // color: #531dab;
        // background: #f9f0ff;
        // border-color: #d3adf7;
      },
    },
  },
  resolve: {
    alias: [
      // fix less import by: @import ~
      // less import no support webpack alias '~' · Issue #2185 · vitejs/vite
      { find: /^~/, replacement: "" },
    ],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://10.5.153.1:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
    host: "0.0.0.0",
    port: 3000,
  },
  preview: {
    proxy: {
      "/api": {
        target: apiKey ? apiKey : "http://127.0.0.1:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
    host: "0.0.0.0",
    port: 3000,
  },
});
