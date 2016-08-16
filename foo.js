import { xhubCallBack } from './src';
import config from './config';

const cb = xhubCallBack(config);
cb({ body: 'foo4' }, null);
