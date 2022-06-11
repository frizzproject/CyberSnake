const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtarctPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/game.js',
    output: {
        filename: 'index.[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 3000,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.svg'), 
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/assets/icon-16x16.png'), 
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/assets/icon-64x64.png'), 
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/assets/icon-256x256.png'), 
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtarctPlugin({
            filename: 'index.[contenthash].css'
        })
    ],
    module: {
        rules: [
            /* ===== SASS ===== */
          {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtarctPlugin.loader,    // Creates `style` nodes from JS strings
                "css-loader",                   // Translates CSS into CommonJS
                "sass-loader",                  // Compiles Sass to CSS
            ],
          },
            /* ===== JS ===== */
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ],
    },
}