import buildConfig from '../../../../src/index.js';

export default buildConfig({
  yaml: true,
}, {
  rules: {
    'perfectionist/sort-objects': [
      'error',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
  },
});
