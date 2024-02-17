import buildConfig from '../../../../src/index.js';

export default buildConfig({
  typescript: {
    overrides: {
      '@typescript-eslint/no-use-before-define': 'off',
    },
  },
});
