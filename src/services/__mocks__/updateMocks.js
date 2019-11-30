import { writeFileSync } from 'fs';
import rawData from './rawData.json';
import { transform } from '../transformer';

const transformedData = transform(rawData);
writeFileSync('src/services/__mocks__/exspected.json', JSON.stringify(transformedData, null, 2));
console.log('sucessfully updated expected.json')
