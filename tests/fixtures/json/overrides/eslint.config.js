import buildConfig from '../../../../src/index.js';

export default buildConfig({
  stylistic: {
    indent: 4,
  },
  jsonc: {
    overrides: {
      'jsonc/key-spacing': ['error', { afterColon: false, beforeColon: true }],
    },
  },
});
