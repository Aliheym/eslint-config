import commentsPlugin from 'eslint-plugin-eslint-comments';

/**
 * Specifies the rules for ESLint comments.
 *
 * @see {@link https://mysticatea.github.io/eslint-plugin-eslint-comments/ | eslint-plugin-eslint-comments}
 */
export const comments = async () => [
  {
    name: 'aliheym:eslint-comments',
    plugins: {
      'eslint-comments': commentsPlugin,
    },
    rules: {
      // require a `eslint-enable` comment for every `eslint-disable` comment
      'eslint-comments/disable-enable-pair': 'error',

      // disallow a `eslint-enable` comment for multiple `eslint-disable` comments
      'eslint-comments/no-aggregating-enable': 'error',

      // disallow duplicate `eslint-disable` comments
      'eslint-comments/no-duplicate-disable': 'error',

      // disallow `eslint-disable` comments without rule names
      'eslint-comments/no-unlimited-disable': 'error',

      // disallow unused `eslint-disable` comments
      'eslint-comments/no-unused-disable': 'error',

      // disallow unused `eslint-enable` comments
      'eslint-comments/no-unused-enable': 'error',
    },
  },
];
