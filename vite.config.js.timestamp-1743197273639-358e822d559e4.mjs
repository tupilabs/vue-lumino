// vite.config.js
import { resolve } from "path";
import { defineConfig } from "file:///home/kinow/Development/javascript/workspace/vue-lumino/.yarn/__virtual__/vite-virtual-f31bcfa014/5/.yarn/berry/cache/vite-npm-6.2.3-3b400d2412-10c0.zip/node_modules/vite/dist/node/index.js";
import vue from "file:///home/kinow/Development/javascript/workspace/vue-lumino/.yarn/__virtual__/@vitejs-plugin-vue-virtual-86969b32f6/5/.yarn/berry/cache/@vitejs-plugin-vue-npm-5.2.1-25d60c16d1-10c0.zip/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/home/kinow/Development/javascript/workspace/vue-lumino";
var vite_config_default = defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "~@lumino": path.resolve(__vite_injected_original_dirname, "node_modules/@lumino")
    }
  },
  build: {
    // Our largest chunk: dist/assets/yasqe.min-ec8f4984.js 508.16 kB │ gzip: 130.97 kB
    // outDir: 'target',
    chunkSizeWarningLimit: 550,
    assetsDir: "static",
    sourcemap: "inline",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.js"),
      name: "vue-lumino",
      fileName: "vue-lumino"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  server: {
    // Default, can be overridden by `--port 1234` in package.json
    port: process.env.PORT || 8080
  },
  test: {
    environment: "happy-dom",
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    watch: false,
    coverage: {
      provider: "v8",
      reporter: [
        "html"
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlUm9vdCI6ICIvaG9tZS9raW5vdy9EZXZlbG9wbWVudC9qYXZhc2NyaXB0L3dvcmtzcGFjZS92dWUtbHVtaW5vLyIsCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUva2lub3cvRGV2ZWxvcG1lbnQvamF2YXNjcmlwdC93b3Jrc3BhY2UvdnVlLWx1bWlub1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUva2lub3cvRGV2ZWxvcG1lbnQvamF2YXNjcmlwdC93b3Jrc3BhY2UvdnVlLWx1bWluby92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9raW5vdy9EZXZlbG9wbWVudC9qYXZhc2NyaXB0L3dvcmtzcGFjZS92dWUtbHVtaW5vL3ZpdGUuY29uZmlnLmpzXCI7LyoqXG4gKiBDb3B5cmlnaHQgMjAyMCBCcnVubyBQLiBLaW5vc2hpdGFcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgIFwifkBsdW1pbm9cIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJub2RlX21vZHVsZXMvQGx1bWlub1wiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIC8vIE91ciBsYXJnZXN0IGNodW5rOiBkaXN0L2Fzc2V0cy95YXNxZS5taW4tZWM4ZjQ5ODQuanMgNTA4LjE2IGtCIFx1MjUwMiBnemlwOiAxMzAuOTcga0JcbiAgICAvLyBvdXREaXI6ICd0YXJnZXQnLFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNTUwLFxuICAgIGFzc2V0c0RpcjogJ3N0YXRpYycsXG4gICAgc291cmNlbWFwOiAnaW5saW5lJyxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC5qcycpLFxuICAgICAgbmFtZTogJ3Z1ZS1sdW1pbm8nLFxuICAgICAgZmlsZU5hbWU6ICd2dWUtbHVtaW5vJ1xuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsndnVlJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogJ1Z1ZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgLy8gRGVmYXVsdCwgY2FuIGJlIG92ZXJyaWRkZW4gYnkgYC0tcG9ydCAxMjM0YCBpbiBwYWNrYWdlLmpzb25cbiAgICBwb3J0OiBwcm9jZXNzLmVudi5QT1JUIHx8IDgwODAsXG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBlbnZpcm9ubWVudDogJ2hhcHB5LWRvbScsXG4gICAgY2xlYXJNb2NrczogdHJ1ZSxcbiAgICByZXN0b3JlTW9ja3M6IHRydWUsXG4gICAgbW9ja1Jlc2V0OiB0cnVlLFxuICAgIHdhdGNoOiBmYWxzZSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6ICd2OCcsXG4gICAgICByZXBvcnRlcjogW1xuICAgICAgICAnaHRtbCcsXG4gICAgICBdXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQWdCQSxTQUFTLGVBQWU7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQW5CakIsSUFBTSxtQ0FBbUM7QUFzQnpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDcEMsWUFBWSxLQUFLLFFBQVEsa0NBQVcsc0JBQXNCO0FBQUEsSUFDNUQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQTtBQUFBLElBR0wsdUJBQXVCO0FBQUEsSUFDdkIsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBQ1gsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixNQUFNLFFBQVEsSUFBSSxRQUFRO0FBQUEsRUFDNUI7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxJQUNaLGNBQWM7QUFBQSxJQUNkLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
