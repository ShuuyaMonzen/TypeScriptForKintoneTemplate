const path = require('path');
const glob = require("glob");
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const entries = {};
const srcDir = path.join(__dirname, 'src', 'ts', 'entries');
glob.sync('**/*.ts', {
  ignore: '**/_*.ts',
  cwd: srcDir
}).map((value) => {
  var fileName = path.basename(value, '.ts')
  entries[fileName + '.js'] = path.resolve(srcDir, value);
});

module.exports = {
  mode: process.env.NODE_ENV,
  entry: entries,
  output: {
    filename: '[name]',
    path: path.join(__dirname, 'dist', 'entries'),
    clean: true,
  },
  //developmentの場合はソースマップあり
  //productの場合はソースマップなし
  devtool: (process.env.NODE_ENV == 'development') ? 'inline-source-map' : undefined,
  target: 'node',
  module: {
    rules: [{ test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },
  resolve: {
    extensions: ['.ts', '.js',],
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  optimization: 
  //developmentの場合は圧縮,コメント削除しない
  //productの場合は圧縮,コメント削除をする
  (process.env.NODE_ENV == 'development') ? 
  undefined :
  {
    minimize: true,
    minimizer: [
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin');
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            //圧縮
            compress: true,
            output: {
              //コメント削除
              comments: false,
              //難読化
              beautify: false
            }
          }
        }).apply(compiler);
      },
    ]
  },
};
