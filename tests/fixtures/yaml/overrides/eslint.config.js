import buildConfig from '../../../../src/index.js';

export default buildConfig({
  stylistic: {
    quotes: 'double',
  },
  yaml: {
    overrides: {
      'yml/plain-scalar': ['error', 'never'],
    },
  },
});
