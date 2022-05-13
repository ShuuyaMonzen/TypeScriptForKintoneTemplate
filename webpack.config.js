const path = require('path')
const glob = require("glob");
const webpack = require('webpack')

// ts→jsコンパイル後のものをbundle
const entries = {};
const srcDir = path.join(__dirname, 'temp', 'build', 'entries');
glob.sync('**/*.js', {
  ignore: '**/_*.js',
  cwd: srcDir
}).map((value) => {
  entries[value] = path.resolve(srcDir, value);
});

module.exports = {
  mode: 'production',
  entry: entries,
  output: {
    filename: '[name]',
    path: path.join(__dirname, 'dist', 'entries')
  },
  devtool: 'inline-source-map',
  target: 'node',
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    // 拡張子を配列で指定
    extensions: [
      '.ts', '.js',
    ],
  },
}