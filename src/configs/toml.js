import * as tomlPlugin from 'eslint-plugin-toml';
import * as tomlParser from 'toml-eslint-parser';

import { GLOB_TOML } from '../constants/globs.js';

/**
 * Specifies the rules to lint TOML files.
 *
 * @see {@link https://ota-meshi.github.io/eslint-plugin-toml/ | eslint-plugin-toml}
 */
export const toml = async (options = {}) => {
  const { files = [GLOB_TOML], overrides = {}, stylistic = true } = options;

  const {
    indent = 2,
  } = typeof stylistic === 'boolean' ? {} : stylistic;

  return [
    {
      files,
      languageOptions: {
        parser: tomlParser,
      },
      name: 'aliheym:toml',
      plugins: {
        toml: tomlPlugin,
      },
      rules: {
        // don't require a space immediately following the `//` or `/*` in a comment
        'style/spaced-comment': 'off',

        // enforce consistent comma style in array
        'toml/comma-style': 'error',

        // disallow defining pair keys out-of-order
        'toml/keys-order': 'error',

        // disallow spacing around infix operators
        'toml/no-space-dots': 'error',

        // disallow number separators that to not enhance readability
        'toml/no-unreadable-number-separator': 'error',

        // disallow precision of fractional seconds greater than the specified value
        'toml/precision-of-fractional-seconds': 'error',

        // disallow precision of integer greater than the specified value
        'toml/precision-of-integer': 'error',

        // disallow defining tables out-of-order
        'toml/tables-order': 'error',

        ...stylistic
          ? {
              // enforce linebreaks after opening and before closing array brackets
              'toml/array-bracket-newline': 'error',

              // enforce consistent spacing inside array brackets
              'toml/array-bracket-spacing': 'error',

              // enforce line breaks between array elements
              'toml/array-element-newline': 'error',

              // enforce consistent indentation
              'toml/indent': ['error', indent],

              // enforce consistent spacing inside braces
              'toml/inline-table-curly-spacing': 'error',

              // enforce consistent spacing between keys and values in key/value pairs
              'toml/key-spacing': 'error',

              // require or disallow padding lines between pairs
              'toml/padding-line-between-pairs': 'error',

              // require or disallow padding lines between tables
              'toml/padding-line-between-tables': 'error',

              // require or disallow quotes around keys
              'toml/quoted-keys': 'error',

              // enforce consistent spacing after the # in a comment
              'toml/spaced-comment': 'error',

              // enforce consistent spacing inside table brackets
              'toml/table-bracket-spacing': 'error',
            }
          : {},

        ...overrides,
      },
    },
  ];
};
