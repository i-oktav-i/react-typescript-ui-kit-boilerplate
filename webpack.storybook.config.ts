import path from 'path';

import { Configuration } from 'webpack';

const conf = (): Configuration => ({
  mode:    'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.json', '.ts', '.tsx', '.js', '.jsx'],
    modules:    [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test:    /\.[tj]sx?$/,
        use:     ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use:  [
          'style-loader',
          {
            loader:  'css-loader',
            options: {
              modules: {
                auto:           /.css$/,
                localIdentName: '[path][name]__[local]-[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader:  'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-import',
                  'postcss-nested',
                  'postcss-simple-vars',
                  'postcss-mixins',
                  'postcss-custom-media',
                ],
              },
            },
          },
        ],
      },
      {
        test:      /\.(ttf|otf|woff2)/,
        type:      'asset/resource',
        generator: {
          filename: 'static/fonts/[hash].[ext]',
        },
      },
    ],
  },
});

export default conf;
