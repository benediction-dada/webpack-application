const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const path = require('path');

function styleLoaderFactory(pre) {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader', 
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env', 
              {
                browsers: [
                  '>0.2%',
                  'not dead',
                  'last 2 versions'
                ]
              }
            ]
          ]
        }
      }
    }
    ,pre
  ].filter(Boolean)
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                cacheDirectory: true, // 开启babel缓存
                cacheCompression: false // 缓存是否压缩
              }
            }
          },
          {
            test: /\.css$/,
            use: styleLoaderFactory()
          },
          {
            test: /\.less$/,
            use: styleLoaderFactory('less-loader')
          },
          {
            test: /\.s[ac]ss$/,
            use: styleLoaderFactory('sass-loader')
          },
          {
            test: /\.styl$/,
            use: styleLoaderFactory('stylus-loader')
          },
          {
            test: /\.(png|jpe?g|svg|gif)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 1024 * 10 // 10kb
              }
            },
            generator: {
              filename: 'static/img/[hash:10][ext][query]'
            }
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: 'asset/resource',
            generator: {
              filename: 'static/media/[hash:10][ext][query]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    minimize: true,
  },
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true // 默认为true
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/common.css'
    })
  ]
}