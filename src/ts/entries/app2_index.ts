import * as $ from 'jquery';
import * as moment from 'moment';

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