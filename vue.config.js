const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// const ModuleFederationPlugin =
//     require("webpack").container.ModuleFederationPlugin;

module.exports = {
  publicPath: process.env.NODE_ENV == 'production' ? '/' : '/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('vue', '@vue/compat');
    
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        };
      });
  },
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin(),
      // new ModuleFederationPlugin({
      //     name: "consumer",
      //     filename: "remoteEntry.js",
      //     remotes: {
      //         host: 'host@http://localhost:9000/remoteEntry.js',
      //     },
      // }),
    ],
    resolve: {
      fallback: {
        'fs': false
      },
    }
  }
};
