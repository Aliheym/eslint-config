import buildConfig from '../../../../src/index.js';

export default buildConfig({
  stylistic: {
    indent: 4,
  },

  toml: {
    overrides: {
      'toml/quoted-keys': ['error', { prefer: 'always' }],
    },
  },
});
