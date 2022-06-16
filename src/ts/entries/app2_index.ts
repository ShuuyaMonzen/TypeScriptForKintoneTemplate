import container from '@/diContainer/inversify.config';
import { DiTypes } from '@/diContainer/inversify.types';
import IKintoneEnviroment from '@/config/interfaceKintoneEnviroment';
import "kypes";

class appConfig {
  private kintoneEnviroment: IKintoneEnviroment;
  public name: string;
  constructor(name: string) {
    // DIコンテナから設定値オブジェクトの依存性を解決
    this.kintoneEnviroment = container.get<IKintoneEnviroment>(DiTypes.IKintoneEnviroment);
    this.name = name;

    // サンプルコード : appConfigのnameプロパティを表示
    console.log("name : " + this.name);
    // サンプルコード : 設定値オブジェクトの変数を表示(ビルド設定ごとに変数値が変わることを確認)
    console.log("sampleAppId : " + this.kintoneEnviroment.sampleAppId);
    // サンプルコード : 設定値オブジェクトの変数を表示(ビルド設定ごとに変数値が変わることを確認)
    console.log("sampleApiToken : " + this.kintoneEnviroment.sampleApiToken);
    // サンプルコード : 現在実行中のアプリIDを表示
    console.log("appId : " + kintone.app.getId());
  }
}

// class構文とnewの確認
const appConfigValue = new appConfig('アプリ2');