const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: {
        main: __dirname + '/src/main.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'assets/js/[name].js'
    },
    devtool: 'source-map',
    module: {
      rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          {
              test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  minetype: 'application/font-woff',
              },
          },
          {
              test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  minetype: 'application/font-woff',
              },
          },
          {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  minetype: 'application/octet-stream',
              },
          },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  minetype: 'application/vnd.ms-fontobject',
              },
          },
          {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  minetype: 'image/svg+xml',
              },
          },
          {
              test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
              loader: 'url-loader',
              options: {
                  limit: 10000,
              },
          },
          {
              test: /\.(scss|sass|css)$/,
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                    { loader: 'css-loader' },
                    {
                      loader: 'postcss-loader',
                      options: {
                        sourceMap: true,
                        plugins: () => [autoprefixer({ browsers: ['iOS >= 7', 'Android >= 4.1'] })],
                      },
                    },
                    {
                       loader: 'sass-loader',
                       query: {
                         sourceMap: true
                       }
                    }
                  ]
              })
          }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'my title',
            filename: __dirname + '/dist/index.html',
            template: __dirname + '/index.html',
            chunks: ['main']
        }),
        new ExtractTextPlugin('assets/css/[name].css')
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
}