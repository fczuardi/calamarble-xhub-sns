import { cd, cp, test, rm } from 'shelljs';

cd('dist/npm');
cp(
    '../../package.json',
    '../../README.md',
    '../../LICENSE',
    '.'
);
cp('-R', '../../policies', '.');
rm('config.js');
