const { resolve, join } = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';

const public = 'public';

// the path(s) that should be cleaned
const pathsToClean = [
  `${public}/**/*.*`,
];

// the clean options to use
const cleanOptions = {
  root: resolve(__dirname, '..'),
  exclude: [`${public}/.gitignore`],
  verbose: true,
  dry: false,
};

const plugins = [
  new Dotenv(),
  new webpack.EnvironmentPlugin(),
  new CleanWebpackPlugin(pathsToClean, cleanOptions),
  new HtmlWebpackPlugin({
    template: join('src', 'index.html'),
  }),
  new webpack.NamedModulesPlugin(),
];

if (isProduction) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new OptimizeCSSAssetsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/),
    new MiniCssExtractPlugin({
        filename: 'css/[contenthash].css',
        chunkFilename: 'css/[contenthash].css',
    }),
  );

} else {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        defaultSizes: 'parsed',
        openAnalyzer: false
    }),
    new webpack.HotModuleReplacementPlugin(),
  );
}

module.exports = plugins;
