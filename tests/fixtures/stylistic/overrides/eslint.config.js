import buildConfig from '../../../../src/index.js';

export default buildConfig({
  stylistic: {
    quotes: 'double',
    overrides: {
      '@stylistic/semi': ['error', 'never'],
    },
  },
});
