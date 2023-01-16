import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { dirname, resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  return {
    base: './',
    resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    server: {
      // 服务器主机名， 如果允许外部访问，可设置为 "0.0.0.0"
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // 跨域代理配置
      proxy: {
        "/api": {
          target: "https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "")
        }
      }
    },
    plugins: [
      vue(),
      // * vite 可以使用 jsx/tsx 语法
			vueJsx(),
      // * name 可以写在 script 标签上
      VueSetupExtend(),
      // 语言切换
      vueI18n({include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**')}),
      /**
       * 使用 svg 图标
       * 1. svg图标必须放在目录 src/assets/icons 下
       */
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      })
    ],
    build: {
      outDir: "dist",
      minify: "esbuild",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  }
})
