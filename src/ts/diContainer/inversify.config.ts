const { NODE_ENV } = process.env;
import { Container } from 'inversify';
import TYPES from './inversify.types';

import IKintoneEnviroment from '../config/interfaceKintoneEnviroment';
import KintoneEnviromentDev from '../config/kintoneEnviroment.development';
import IKintoneEnviromentPro from '../config/kintoneEnviroment.production';

const container = new Container();
if (NODE_ENV === 'development') {
    container
        .bind<IKintoneEnviroment>(TYPES.IKintoneEnviroment)
        .to(KintoneEnviromentDev)
        .inSingletonScope();;
} else if (NODE_ENV === 'production') {
    container
        .bind<IKintoneEnviroment>(TYPES.IKintoneEnviroment)
        .to(IKintoneEnviromentPro)
        .inSingletonScope();;
}

export default container;