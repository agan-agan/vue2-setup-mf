const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;
const AutoImport = require("unplugin-auto-import/webpack");
const VueSetupExtend = require("unplugin-vue-setup-extend-plus/webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "http://localhost:8054/",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ["vue"],
        dts: false,
        eslintrc: {
          enabled: true, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        },
      }),
      VueSetupExtend(),
      new ModuleFederationPlugin({
        name: "vue_remote",
        library: { type: "var", name: "vue_remote" },
        filename: "v-remote.js",

        exposes: {
          "./Demo": "./src/components/Demo.vue",
        },

        // 共享的
        shared: ["vue"],
      }),
    ],
  },
  devServer: {
    port: 8054,
  },
});
