module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /templates.*\.html$/,
          loader: 'html-loader',
        }
      ],
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      },
    },
  },
  lintOnSave: true,
};
