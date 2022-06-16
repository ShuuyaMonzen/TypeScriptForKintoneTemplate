const path = require('path');
const glob = require("glob");
const webpack = require('webpack');
// 難読化モジュール
const WebpackObfuscator = require('webpack-obfuscator');
// ts型・構文チェックモジュール
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

//#region バンドル対象を取得する
// ビルド対象のsrc/ts/entries配下のtsファイル名を取得する
const entries = {};
const srcDir = path.resolve(__dirname, 'src', 'ts', 'entries');
glob.sync('**/*.ts', {
  ignore: '**/_*.ts',
  cwd: srcDir
}).map((value) => {
  var fileName = path.basename(value, '.ts')
  entries[fileName + '.js'] = path.resolve(srcDir, value);
});
//#endregion

//#region ローダールールのオブジェクトを作成する
/**
 * babelローダールール
 */
var babelLoaderRule = {
  test: /\.(js|ts)$/,
  //exclude: /(?=.*node_modules)(?!.*rest-api-client).*$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        ["@babel/preset-env", {
          // 必要な分だけpolyfillする
          "useBuiltIns": "usage",
          // polyfillで使うcorejsのバージョン
          "corejs": 3,
        }],
        // typescriptトランスパイル用preset
        "@babel/typescript",
      ],
      plugins: [
        // デコレーターのトランスパイル
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        // dynamic importのトランスパイル
        ["@babel/plugin-syntax-dynamic-import"],
        // NODE_ENV, APP_ENVの変数を'development'などのビルドオプション文字列に置換
        ["transform-inline-environment-variables", {
          "include": ["NODE_ENV", "APP_ENV"]
        }]
      ]
    }
  }
};

/**
 * 難読化モジュールローダールール
 */
var WebpackObfuscatorLoaderRule = {
  test: /\.(js|ts)$/,
  exclude: /node_modules/,
  enforce: 'post',
  use: [{
    loader: WebpackObfuscator.loader,
    options: {
      compact: true,
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      numbersToExpressions: true,
      renameGlobals: false,
      selfDefending: true,
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
  }]
};
//#endregion

//#region プラグインのオブジェクトを作成する
/**
 * ts型・構文チェックプラグイン
 */
var forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin({
  typescript: {
    configFile: path.resolve(__dirname, "tsconfig.json")
  },
  async: false,
});
//#endregion

module.exports = {
  mode: process.env.NODE_ENV,
  // jsファイルの容量について警告を表示しない
  performance: {
    hints: false,
  },
  entry: entries,
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist', 'entries'),
    clean: true,
  },
  // 開発用ビルドではソースマップあり
  // 検証・本番用ビルドではソースマップなし
  devtool: (process.env.NODE_ENV == 'development') ? 'inline-source-map' : undefined,
  // node,web共通のモジュールの場合はexports.browserのエントリポイントを使用
  target: 'web',
  // 開発用ビルドでは難読化なし
  // 検証・本番用ビルドでは難読化あり
  module: {
    rules: (process.env.NODE_ENV == 'development') ?
      [babelLoaderRule] :
      [WebpackObfuscatorLoaderRule, babelLoaderRule],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    // ビルド時のパスを解決
    // @ → src/tsに置換 
    alias: { '@': path.resolve(__dirname, 'src/ts'), },
  },
  plugins: [
    forkTsCheckerWebpackPlugin
  ],
};
