const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProduction = process.env.NODE_ENV === 'production';

const public = 'public';

// the path(s) that should be cleaned
const pathsToClean = [
  `${public}/*.*`,
];

// the clean options to use
const cleanOptions = {
  root: resolve(__dirname, '..'),
  exclude: [`${public}/.gitignore`],
  verbose: true,
  dry: false,
};

const plugins = [
  new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  new CleanWebpackPlugin(pathsToClean, cleanOptions),
  new HtmlWebpackPlugin({
    template: join('src', 'index.html'),
  }),
  new ExtractTextPlugin(join(public, 'bundle.css'), {
    allChunks: true,
  }),
  new webpack.NamedModulesPlugin(),
];

if (isProduction) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/),
  );
} else {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: isProduction ? 'disabled' : 'static'
    })
  );
}

module.exports = plugins;
