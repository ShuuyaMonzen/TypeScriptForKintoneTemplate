// ↓ kintoneオブジェクトはglobalオブジェクトである(このソースコードで実装をimportできない)ため型定義を参照という形にしている
/// <reference path="../../../node_modules/kypes/namespaces/index.ts" />

import container from '@/diContainer/inversify.config';
import TYPES from '@/diContainer/inversify.types';
import IKintoneEnviroment from '@/config/interfaceKintoneEnviroment';
import * as $ from 'jquery';
import * as moment from 'moment';

class appConfig {
    private kintoneEnviroment: IKintoneEnviroment;
    public name: string;
    constructor(name: string) {
        // DIコンテナから設定値オブジェクトの依存性を解決
        this.kintoneEnviroment = container.get<IKintoneEnviroment>(TYPES.IKintoneEnviroment);
        this.name = name;

        // サンプルコード : appConfigのnameプロパティを表示
        console.log("name : " + this.name);
        // サンプルコード : moment.jsにて現在日付を取得、表示
        console.log("moment().format('YYYY/MM/DD HH:mm:ss') : " + moment().format('YYYY/MM/DD HH:mm:ss'));
        // サンプルコード : jqueryにてbodyを取得、表示
        console.log($("body"));
        // サンプルコード : 設定値オブジェクトの変数を表示(ビルド設定ごとに変数値が変わることを確認)
        console.log("sampleAppId : " + this.kintoneEnviroment.sampleAppId);
        // サンプルコード : 設定値オブジェクトの変数を表示(ビルド設定ごとに変数値が変わることを確認)
        console.log("sampleApiToken : " + this.kintoneEnviroment.sampleApiToken);
        // サンプルコード : 現在実行中のアプリIDを表示
        console.log("appId : " + kintone.app.getId());
    }
}

// class構文とnewの確認
const appConfigValue = new appConfig('アプリ1');