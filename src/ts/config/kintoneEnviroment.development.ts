import { injectable } from 'inversify';
import IKintoneEnviroment from './interfaceKintoneEnviroment';

@injectable()
export default class kintoneEnviromentDevelopment implements IKintoneEnviroment {
    public constructor(){
        this.sampleAppId = 200;
        this.sampleApiToken = "aaa";
    }
    sampleAppId: number;
    sampleApiToken: string;
}