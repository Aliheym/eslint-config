import buildConfig from '../../../../src/index.js';

export default buildConfig({
  yaml: true,
}, {
  files: ['**/*.yaml'],

  rules: {
    'yml/indent': ['error', 4],
  },
});
