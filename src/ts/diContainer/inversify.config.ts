const APP_ENV = process.env.APP_ENV;
import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from '@/diContainer/inversify.types';
import { CodeConst } from '@/const/codeConst';

import IKintoneEnviroment from '@/config/interfaceKintoneEnviroment';
import KintoneEnviromentDev from '@/config/kintoneEnviroment.development';
import KintoneEnviromentStg from '@/config/kintoneEnviroment.staging';
import KintoneEnviromentPro from '@/config/kintoneEnviroment.production';

const container = new Container();
if (APP_ENV == CodeConst.nodeEnv.development) {
    container
        .bind<IKintoneEnviroment>(TYPES.IKintoneEnviroment)
        .to(KintoneEnviromentDev)
        .inSingletonScope();
} else if (APP_ENV == CodeConst.nodeEnv.staging) {
    container
        .bind<IKintoneEnviroment>(TYPES.IKintoneEnviroment)
        .to(KintoneEnviromentStg)
        .inSingletonScope();
} else if (APP_ENV == CodeConst.nodeEnv.production) {
    container
        .bind<IKintoneEnviroment>(TYPES.IKintoneEnviroment)
        .to(KintoneEnviromentPro)
        .inSingletonScope();
}

export default container;