const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;
const AutoImport = require("unplugin-auto-import/webpack");
const VueSetupExtend = require("unplugin-vue-setup-extend-plus/webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "http://localhost:8080/",
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
        name: "vue-host",
        filename: "v-host.js",
        remotes: {
          vueRemote: "vue_remote@http://localhost:8054/v-remote.js",
        },

        // 共享的
        shared: ["vue"],
      }),
    ],
  },
});
