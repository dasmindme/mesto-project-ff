const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');


module.exports = {
    experiments: {
        asyncWebAssembly: true
      },
      optimization: {
        minimize: false
      },
    entry: {main: './src/scripts/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/,
              type: 'asset/resource',
              generator: {
                  filename: 'images/[name].[hash][ext]',
              }
          },
          {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',
              generator: {
              filename: 'fonts/[name].[hash][ext]',
            }
            },
            {
                test: /\.node$/,
                use: 'node-loader'
              },
              {
                test: /\.d\.ts$/,
                loader: 'ignore-loader'
              },
            {
                // применять это правило только к CSS-файлам
                test: /\.css$/,
                // при обработке этих файлов нужно использовать
                // MiniCssExtractPlugin.loader и css-loader
                use: [MiniCssExtractPlugin.loader, {
                  loader: 'css-loader',
                  options: { importLoaders: 1 }
                },
            'postcss-loader']
              }
        ]
    },
    resolve: {
        alias: {
            '@swc/core': '@swc/core/web'
          },
        fallback: {
          "path": require.resolve("path-browserify"),
          "stream": require.resolve("stream-browserify"),
          "os": require.resolve("os-browserify/browser"),
          "crypto": require.resolve("crypto-browserify"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "zlib": require.resolve("browserify-zlib"),
          "vm": require.resolve("vm-browserify"),
          "querystring": require.resolve("querystring-es3"),
          "constants": require.resolve("constants-browserify"),
          "fs": false,
          "child_process": false,
          "worker_threads": false,
          "inspector": false,
          "module": false,
          "uglify-js": require.resolve("uglify-js"),
          "@swc/core": require.resolve("@swc/core"),
          "esbuild": require.resolve("esbuild"),
          "tty": require.resolve("tty-browserify"),
      "pnpapi": false,
      "@swc/core": false,
      "pnpapi": false
        }
      },
      ignoreWarnings: [
        /Failed to parse .*\.node/,
        /Critical dependency/
      ],
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
          })
    ]
};