import buildConfig from './src/index.js';

export default buildConfig(
  {
    node: true,
    typescript: false,
    ignores: ['tests/fixtures'],
  },
  {
    files: ['src/**/*.js'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
  {
    files: ['**/*.test.js'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },
);
