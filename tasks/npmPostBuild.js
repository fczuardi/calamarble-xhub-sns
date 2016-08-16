import { cd, cp, test, rm } from 'shelljs';

cd('dist/npm');
cp('../../package.json', '.');
cp('-R', '../../policies', '.');
rm('config.js');
