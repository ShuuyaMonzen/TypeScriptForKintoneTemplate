/// <reference path="../../../node_modules/kypes/namespaces/index.ts" />
import * as $ from 'jquery';
import * as moment from 'moment';
//import kintoneEnviroment from '../config/indexKintoneEnviroment';

(() => {
    class appConfig {
        public name: string;
        constructor(name: string) {
            this.name = name;
            console.log(moment().toDate() + " " + this.name);
            console.log($("body"));
            //console.log("sampleAppId : " + kintoneEnviroment.sampleAppId);
        }
    }

    const appConfigValue = new appConfig('アプリ2');
})();