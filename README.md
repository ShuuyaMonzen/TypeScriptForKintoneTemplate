# typescript-kintone-template
kintoneカスタマイズのTypescript開発テンプレート

# 構築手順
1. 本テンプレートをダウンロード
2. git bashを起動
3. $ cd (本テンプレートのフォルダ)
4. $ npm install 

# ビルドについて
1. $ npm run buildDev
　→ 開発用ビルドです、ソースマップが含まれているのでデバッグが容易です。
  使用する設定値: src/ts/config/kintoneEnviroment.development.ts

2. $ npm run buildStg
  → 検証環境用ビルドです。
  使用する設定値: src/ts/config/kintoneEnviroment.staging.ts

3. $ npm run buildPro
  → 本番環境用ビルドです。
  使用するppkファイル: key/production/xxxxx.ppk
  使用する設定値: src/ts/config/kintoneEnviroment.production.ts

# ソースコードにて設定値の参照方法
~~~ 設定値参照サンプルコード
import IKintoneEnviroment from '@/config/interfaceKintoneEnviroment';
import container from '@/diContainer/inversify.config';
import { DiTypes } from '@/diContainer/inversify.types';

var kintoneEnviroment = container.get<IKintoneEnviroment>(DiTypes.IKintoneEnviroment);
kintoneEnviroment.sampleAppId
~~~