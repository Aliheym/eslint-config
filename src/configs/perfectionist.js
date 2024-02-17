import perfectionistPlugin from 'eslint-plugin-perfectionist';

/**
 * Specifies the rules for sorting various data
 * such as objects, imports, types, enums, JSX props, etc.
 *
 * @see {@link https://github.com/azat-io/eslint-plugin-perfectionist | eslint-plugin-perfectionist}
 */
export const perfectionist = async () => [
  {
    name: 'aliheym:perfectionist',
    plugins: {
      perfectionist: perfectionistPlugin,
    },
  },
];
