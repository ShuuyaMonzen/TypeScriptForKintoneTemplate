import * as interfaceKintoneEnviroment from './interfaceKintoneEnviroment';

class kintoneEnviromentDev implements interfaceKintoneEnviroment.IKintoneEnviroment {
    public constructor(){
        this.sampleAppId = 200;
        this.sampleApiToken = "aaa";
    }
    sampleAppId: number;
    sampleApiToken: string;
}

const kintoneEnv = new kintoneEnviromentDev();
export default kintoneEnv;