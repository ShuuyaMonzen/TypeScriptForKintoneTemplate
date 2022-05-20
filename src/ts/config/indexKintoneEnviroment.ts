import * as interfaceKintoneEnviroment from './interfaceKintoneEnviroment';
var tempKintoneEnviroment; 
if (process.env.NODE_ENV === 'production') {
    tempKintoneEnviroment = require('./kintoneEnviroment.production').default;
} else {
    tempKintoneEnviroment = require('./kintoneEnviroment.development').default;
}

const kintoneEnviroment = tempKintoneEnviroment as interfaceKintoneEnviroment.IKintoneEnviroment;
export default kintoneEnviroment;
