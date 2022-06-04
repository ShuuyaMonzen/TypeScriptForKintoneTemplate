import { injectable, inject } from 'inversify';
import IKintoneEnviroment from '@/config/interfaceKintoneEnviroment';

@injectable()
export default class kintoneEnviromentProduction implements IKintoneEnviroment {
    public constructor(){
        this.sampleAppId = 400;
        this.sampleApiToken = "ccc";
    }
    sampleApiToken: string;
    sampleAppId: number;
}