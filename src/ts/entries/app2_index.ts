import { kintone } from "kypes/namespaces/kintone";
import * as $ from 'jquery';
import * as moment from 'moment';
import IKintoneEnviroment from '../config/interfaceKintoneEnviroment';

(() => {
    class appConfig {
        public name: string;
        constructor(name: string) {
            this.name = name;
            console.log(moment().toDate() + " " + this.name);
            console.log($("body"));
        }
    }

    const appConfigValue = new appConfig('アプリ2');
})();