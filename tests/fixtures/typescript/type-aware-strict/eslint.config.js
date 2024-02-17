import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import buildConfig from '../../../../src/index.js';

const cd = dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  typescript: {
    tsconfigPath: join(cd, 'tsconfig.json'),
    strict: true,
  },
});
