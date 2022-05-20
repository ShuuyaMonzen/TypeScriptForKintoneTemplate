import * as interfaceKintoneEnviroment from './interfaceKintoneEnviroment';

class kintoneEnviromentPro implements interfaceKintoneEnviroment.IKintoneEnviroment {
    public constructor(){
        this.sampleAppId = 400;
        this.sampleApiToken = "bbb";
    }
    sampleApiToken: string;
    sampleAppId: number;
}

const kintoneEnv = new kintoneEnviromentPro();
export default kintoneEnv;