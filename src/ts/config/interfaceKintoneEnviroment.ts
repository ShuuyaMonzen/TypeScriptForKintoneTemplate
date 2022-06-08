// KintoneEnviroment型の定義
export default interface IKintoneEnviroment {
  baseUrl: string;

  /**
   * サンプルアプリのアプリID
   */
  sampleAppId: number;
  /**
   * サンプルアプリのAPIトークン
   */
  sampleApiToken: string;
}