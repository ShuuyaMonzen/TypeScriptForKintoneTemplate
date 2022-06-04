import { injectable } from 'inversify';
import IKintoneEnviroment from '@/config/interfaceKintoneEnviroment';

@injectable()
export default class kintoneEnviromentStaging implements IKintoneEnviroment {
    public constructor(){
        this.sampleAppId = 300;
        this.sampleApiToken = "bbb";
    }
    sampleAppId: number;
    sampleApiToken: string;
}