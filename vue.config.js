const path = require("path")

module.exports = {
  outputDir: "build",
  // configWebpack: {
  //   resolve: {
  //     alias: {
  //       components: "@/components"
  //     }
  //   }
  // },
  // configWebpack: (config) => {
  //   config.resolve.alias = {
  //     "@": path.resolve(__dirname, "src"),
  //     components: "@/components"
  //   }
  // },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      },
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.resolve(__dirname, "src"))
  }
}
