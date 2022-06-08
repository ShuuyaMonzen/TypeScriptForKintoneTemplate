import { injectable } from 'inversify';
import IKintoneEnviroment from '@/config/interfaceKintoneEnviroment';

@injectable()
export default class kintoneEnviromentDevelopment implements IKintoneEnviroment {
  public constructor() {
    this.baseUrl = "https://sample.cybozu.com/";
    this.sampleAppId = 200;
    this.sampleApiToken = "sampleApiToken";
  }
  baseUrl: string;
  sampleAppId: number;
  sampleApiToken: string;
}