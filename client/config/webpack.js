const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const WebpackPwaManifestPlugin = require('webpack-pwa-manifest');

const rootDir = path.join(__dirname, '..', '..');
const sourceDir = path.join(rootDir, 'client', 'src');
const assetsDir = path.join(rootDir, 'client', 'assets');
const contextDir = sourceDir;

const publicAssetsPath = 'assets';
const distDir = path.join(rootDir, 'dist');
const distAssetsDir = path.join(distDir, publicAssetsPath);

module.exports = (env) => {
  const isDevelopment = !env.production;
  return {
    context: contextDir,
    entry: {
      index: path.join(__dirname, '..', 'src', 'index.js'),
      sw: path.join(__dirname, '..', 'src', 'sw', 'index.js'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: rootDir,
          use: [
            { loader: 'babel-loader' },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
    output: {
      filename: '[name].js',
      path: distAssetsDir,
      publicPath: `/${publicAssetsPath}`,
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'inline-source-map' : 'eval',
    plugins: [
      new HtmlWebpackPlugin({
        filename: path.join(distDir, 'index.html'),
        alwaysWriteToDisk: true,
        template: path.join(sourceDir, 'index.html.ejs'),
        inject: false,
      }),
      new HtmlWebpackHarddiskPlugin({
        outputPath: distDir,
      }),
      new WebpackPwaManifestPlugin({
        filename: 'manifest.json',
        name: 'PWA Todoist',
        short_name: 'PWA Todoist',
        description: 'PWA application for WarsawJS Workshop #28',
        background_color: '#3f51b5',
        theme_color: '#3f51b5',
        orientation: 'portrait',
        start_url: '/',
        display: 'standalone',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: path.join(assetsDir, 'logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
    ],
    devServer: {
      stats: 'errors-only',
    },
  };
};
