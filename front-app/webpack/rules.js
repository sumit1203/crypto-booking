const { join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const postcssCssnext = require('postcss-cssnext');

const rules = [{
  test: /.jsx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
}, {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 2,
      },
    },           {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins() {
          return [
            precss,
            postcssCssnext,
          ];
        },
      }
    },{
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    }],
  }),
}, {
  test: /\.css$/,
  use: [{
    loader: 'style-loader',
  }, {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders: 2,
    },
  },{
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins() {
        return [
          precss,
          postcssCssnext,
        ];
      },
    }
  }],
}, {
  test: /\.(woff2|woff|ttf|eot|svg)(\?.*$|$)/,
  loader: 'file-loader?name=fonts/[name].[ext]',
  include: [
    join(__dirname, 'src'),
    join(__dirname, 'node_modules'),
  ],
}, {
  test: /\.(jpg|jpeg|gif|png|ico|svg)(\?.*$|$)$/,
  loader: 'file-loader?name=img/[name].[ext]',
}];

module.exports = rules;
