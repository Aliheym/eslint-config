import buildConfig from '../../../../src/index.js';

export default buildConfig({
  node: {
    overrides: {
      'n/prefer-global/process': ['error', 'always'],
      'n/prefer-global/url': ['error', 'never'],
    },
  },
});
