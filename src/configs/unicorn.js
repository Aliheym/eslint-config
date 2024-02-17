import unicornPlugin from 'eslint-plugin-unicorn';

/**
 * Specifies the additional powerful rules
 *
 * @see {@link https://github.com/sindresorhus/eslint-plugin-unicorn/ | eslint-plugin-unicorn}
 */
export const unicorn = async () => {
  const recommendedConfig = unicornPlugin.configs['flat/recommended'];

  return [
    {
      ...recommendedConfig,
      name: 'aliheym:unicorn',
      rules: {
        ...recommendedConfig.rules,

        // enforce correct Error subclassing
        'unicorn/custom-error-definition': 'error',

        // prefer reading a JSON file as a buffer
        'unicorn/prefer-json-parse-buffer': 'error',
      },
    },
  ];
};
