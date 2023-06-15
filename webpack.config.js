const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { DuplicatesPlugin } = require('inspectpack/plugin');
// const { env } = require('process');

module.exports = (webpackServe, options) => {
  let ENV_CONFIG;

  if (options.mode === 'development') {
    ENV_CONFIG = new Dotenv({
      path: './.env.dev',
    });
  }

  if (options.mode === 'production') {
    if (options.env && options.env.environment === 'staging') {
      ENV_CONFIG = new Dotenv({ path: './.env.staging', systemvars: true });
    } else {
      ENV_CONFIG = new Dotenv({ path: './.env', systemvars: true });
    }
  }

  const plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    ENV_CONFIG,
  ];

  // These tools are very helpful but they can be very annoying if they pop up every build
  // periodically run webpack with these uncommented to check your bundle size

  // if(options.mode !== 'production') plugins.push(
  //   new BundleAnalyzerPlugin({
  //     generateStatsFile: true
  //   }),
  //   new DuplicatesPlugin({
  //     // Emit compilation warning or error? (Default: `false`)
  //     emitErrors: false,
  //     // Display full duplicates information? (Default: `false`)
  //     verbose: false
  //   })
  // )

  return {
    mode: options.mode,
    // entry: {
    //   index: "./src/index.js",
    //   app: "./src/App/index.js",
    //   createNewLeague: "./src/containers/CreateNewLeague/index.js"
    // },
    entry: './src/index.js',
    output: {
      // path: path.join(__dirname, '/dist'),
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
              // plugins: [
              //   'import',
              //   {libraryName: 'antd', style: true},
              //   'antd',
              // ]
            },
          }],
          // exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: {
            loader: 'file-loader',
          },
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: {
            loader: 'url-loader',
          },
        },
      ],
    },
    // webpack 5 no longer supports native node modules
    resolve: {
      fallback: {
        os: false,
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        crypto: require.resolve('crypto-browserify'),
        vm: false,
        assert: require.resolve('assert/'),
        stream: require.resolve('stream-browserify'),
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      //   contentBase: path.join(__dirname, 'dist'),
      port: 3000,
      //   inline: true,
      hot: true,
      historyApiFallback: {
        index: '/',
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'initial',
            minChunks: 2,
          },
        },
      },
      usedExports: true,
    },
    plugins,
  };
};
