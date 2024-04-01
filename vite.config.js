/**
 * Copyright 2020 Bruno P. Kinoshita
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import istanbul from "vite-plugin-istanbul";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    istanbul({
      include: "src/*",
      exclude: [
        "node_modules",
        "tests",
        "coverage",
      ],
      extension: [".js", ".jsx", ".ts", ".vue"],
      requireEnv: false,
      cypress: true,
      forceBuildInstrument: true
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~@lumino": path.resolve(__dirname, "node_modules/@lumino"),
    },
  },
  build: {
    // Our largest chunk: dist/assets/yasqe.min-ec8f4984.js 508.16 kB │ gzip: 130.97 kB
    // outDir: 'target',
    chunkSizeWarningLimit: 550,
    assetsDir: 'static',
    sourcemap: 'inline',
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'vue-lumino',
      fileName: 'vue-lumino'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  server: {
    // Default, can be overridden by `--port 1234` in package.json
    port: process.env.PORT || 8080,
  },
  test: {
    environment: 'happy-dom',
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    watch: false,
    coverage: {
      provider: 'istanbul',
      reporter: [
        'html',
        'lcov'
      ]
    }
  }
})
