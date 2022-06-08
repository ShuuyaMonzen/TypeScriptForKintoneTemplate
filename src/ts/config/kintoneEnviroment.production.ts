import { injectable, inject } from 'inversify';
import IKintoneEnviroment from '@/config/interfaceKintoneEnviroment';

@injectable()
export default class kintoneEnviromentProduction implements IKintoneEnviroment {
  public constructor() {
    this.baseUrl = "https://{subdomain}.cybozu.com/";
    this.sampleAppId = 400;
    this.sampleApiToken = "ccc";
  }
  baseUrl: string;
  sampleApiToken: string;
  sampleAppId: number;
}