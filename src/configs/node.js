import { interopDefault } from '../utils/index.js';

/**
 * Specifies the rules to lint Node.js security issues
 *
 * @see {@link https://github.com/eslint-community/eslint-plugin-security | eslint-plugin-security}
 */
export const nodeSecurity = async () => {
  const nodeSecurityPlugin = await interopDefault('eslint-plugin-security');
  const recommendedConfig = nodeSecurityPlugin.configs.recommended;

  return [
    {
      ...recommendedConfig,
      name: 'aliheym:node-security',

      rules: {
        ...recommendedConfig.rules,

        'security/detect-object-injection': 'off',
      },
    },
  ];
};

/**
 * Specifies the rules to lint Node.js code
 *
 * @see {@link https://github.com/eslint-community/eslint-plugin-n | eslint-plugin-n}
 */
export const node = async (options = {}) => {
  const { overrides = {} } = options;

  const nodePlugin = await interopDefault('eslint-plugin-n');
  const recommendedConfig = nodePlugin.configs['flat/recommended-module'];

  return [
    {
      ...recommendedConfig,

      name: 'aliheym:node',
      rules: {
        ...recommendedConfig.rules,

        // enforces error handling in callbacks (node environment)
        'n/handle-callback-err': ['error', '^(err|error)$'],

        // disallow `import` declarations which import non-existence modules
        'n/no-missing-import': 'off',

        // disallow string concatenation with __dirname and __filename
        'n/no-path-concat': 'error',

        // disallow use of process.env
        'n/no-process-env': 'error',

        // disallow use of synchronous methods except at top-level
        'n/no-sync': ['error', { allowAtRootLevel: true }],

        // enforce to use `Buffer` built-in module
        'n/prefer-global/buffer': ['error', 'never'],

        // enforce to use `console` global
        'n/prefer-global/console': ['error', 'always'],

        // enforce to use `process` built-in module
        'n/prefer-global/process': ['error', 'never'],

        // enforce to use `URL` global
        'n/prefer-global/url': ['error', 'always'],

        // enforce to use `URLSearchParams` global
        'n/prefer-global/url-search-params': ['error', 'always'],

        // ensure that `dns/promises` is used instead of `dns` when it it possible
        'n/prefer-promises/dns': 'error',

        // NOTE: this rule is disabled because it's not useful in TypeScript
        // ensure that `fs/promises` is used instead of `fs` when it it possible
        'n/prefer-promises/fs': 'error',

        ...overrides,
      },
    },
  ];
};
