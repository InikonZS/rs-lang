const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProd = options.mode === 'production';
  const config = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'none' : 'source-map',
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: `src/index.css`, to: `common.css` },
        { from: `src/index.html`, to: `index.html` },
        { from: `src/assets`, to: `assets` }
      ]),
    ],
  };

  return config;
}