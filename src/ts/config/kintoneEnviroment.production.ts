import { injectable, inject } from 'inversify';
import IKintoneEnviroment from './interfaceKintoneEnviroment';

@injectable()
export default class kintoneEnviromentProduction implements IKintoneEnviroment {
    public constructor(){
        this.sampleAppId = 400;
        this.sampleApiToken = "bbb";
    }
    sampleApiToken: string;
    sampleAppId: number;
}