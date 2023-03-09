import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const configPath = join('config.yml');

export default () => {
  return yaml.load(readFileSync(configPath, 'utf8'));
};
