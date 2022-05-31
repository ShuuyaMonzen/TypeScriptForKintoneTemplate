const path = require('path');
const glob = require("glob");
const webpack = require('webpack');
// 難読化
const WebpackObfuscator = require('webpack-obfuscator');
// ts型チェック
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

//#region バンドル対象を取得する
// ビルド対象のsrc/ts/entries配下のtsファイル名を取得する
const entries = {};
const srcDir = path.join(__dirname, 'src', 'ts', 'entries');
glob.sync('**/*.ts', {
  ignore: '**/_*.ts',
  cwd: srcDir
}).map((value) => {
  var fileName = path.basename(value, '.ts')
  entries[fileName + '.js'] = path.resolve(srcDir, value);
});
//#endregion

//#region 難読化モジュールのオプション設定
/**
 * 難読化モジュールのオプション設定
 */
var WebpackObfuscatorOption = {
  compact: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 5,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayEncoding: ['rc4'],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 5,
  stringArrayWrappersChainedCalls: true,    
  stringArrayWrappersParametersMaxCount: 5,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 1,
  transformObjectKeys: true,
  unicodeEscapeSequence: false
}
//#endregion

//#region ローダールールのオブジェクトを作成する
var babelLoaderRule = { 
  test: /\.ts$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader'
  }]
};
var WebpackObfuscatorLoaderRule = {
  test: /\.ts$/,
  exclude: /node_modules/,
  enforce: 'post',
  use: [{
      loader: WebpackObfuscator.loader,
      options: WebpackObfuscatorOption
  }]
};
//#endregion

//#region プラグインのオブジェクトを作成する
/**
 * 難読化用プラグイン
 */
var webpackObfuscatorPluginObj = new WebpackObfuscator (WebpackObfuscatorOption, []);

var forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin({
  typescript: {
    configFile: path.resolve(__dirname, "./tsconfig.json")
  },
  async: false,
});

var environmentPlugin = new webpack.EnvironmentPlugin(["NODE_ENV"]);

//#endregion

module.exports = {
  mode: process.env.NODE_ENV,
  entry: entries,
  output: {
    filename: '[name]',
    path: path.join(__dirname, 'dist', 'entries'),
    clean: true,
  },
  // 開発用ビルドではソースマップあり
  // 検証・本番用ビルドではソースマップなし
  devtool: (process.env.NODE_ENV == 'development') ? 'inline-source-map' : undefined,
  target: 'node',
  module: {
    rules: (process.env.NODE_ENV == 'development') ? 
    [babelLoaderRule] :
    [
      WebpackObfuscatorLoaderRule,
      babelLoaderRule, 
    ],
  },
  resolve: {
    extensions: ['.ts', '.js',],
  },
  // 開発用ビルドでは難読化なし
  // 検証・本番用ビルドでは難読化あり
  plugins: (process.env.NODE_ENV == 'development') ? 
  [
    environmentPlugin,
    forkTsCheckerWebpackPlugin,
  ] :
  [
    environmentPlugin,
    forkTsCheckerWebpackPlugin,
    //webpackObfuscatorPluginObj
  ],
};
