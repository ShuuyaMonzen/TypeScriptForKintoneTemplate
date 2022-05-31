/// <reference path="../../../node_modules/kypes/namespaces/index.ts" />
import 'reflect-metadata';
import container from '../diContainer/inversify.config';
import TYPES from '../diContainer/inversify.types';
import IKintoneEnviroment from '../config/interfaceKintoneEnviroment';
import * as $ from 'jquery';
import * as moment from 'moment';

(() => {
    class appConfig {
        private kintoneEnviroment : IKintoneEnviroment;
        public name: string;
        constructor(name: string) {
            this.kintoneEnviroment = container.get<IKintoneEnviroment>(TYPES.IKintoneEnviroment);
            this.name = name;

            console.log(moment().toDate() + " " + this.name);
            console.log($("body"));
            console.log("sampleAppId : " + this.kintoneEnviroment.sampleAppId);
        }
    }

    // テストコメント
    const appConfigValue = new appConfig('アプリ1');
})();