import { injectable } from 'inversify';
import IKintoneEnviroment from '@/config/interfaceKintoneEnviroment';

@injectable()
export default class kintoneEnviromentStaging implements IKintoneEnviroment {
  public constructor() {
    this.baseUrl = "https://{subdomain}.cybozu.com/";
    this.sampleAppId = 300;
    this.sampleApiToken = "bbb";
  }
  baseUrl: string;
  sampleAppId: number;
  sampleApiToken: string;
}