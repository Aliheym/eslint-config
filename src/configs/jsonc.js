import jsoncPlugin from 'eslint-plugin-jsonc';
import jsoncParser from 'jsonc-eslint-parser';

import { GLOB_JSON } from '../constants/globs.js';

/**
 * Specifies the rules to lint JSON and JSONC files.
 *
 * @see {@link https://ota-meshi.github.io/eslint-plugin-jsonc/ | eslint-plugin-jsonc}
 */
export const jsonc = async (options = {}) => {
  const { files = [GLOB_JSON], overrides = {}, stylistic = true } = options;

  const {
    indent = 2,
  } = typeof stylistic === 'boolean' ? {} : stylistic;

  return [
    {
      files,
      languageOptions: {
        parser: jsoncParser,
      },
      name: 'aliheym:jsonc',
      plugins: {
        jsonc: jsoncPlugin,
      },
      rules: {
        // disallow `BigInt` literals
        'jsonc/no-bigint-literals': 'error',

        // disallow binary expression
        'jsonc/no-binary-expression': 'error',

        // disallow binary numeric literals
        'jsonc/no-binary-numeric-literals': 'error',

        // disallow duplicate keys in object literals
        'jsonc/no-dupe-keys': 'error',

        // disallow escape sequences in identifiers
        'jsonc/no-escape-sequence-in-identifier': 'error',

        // disallow leading or trailing decimal points in numeric literals
        'jsonc/no-floating-decimal': 'error',

        // disallow hexadecimal numeric literals
        'jsonc/no-hexadecimal-numeric-literals': 'error',

        // disallow `Infinity`
        'jsonc/no-infinity': 'error',

        // disallow multiline strings
        'jsonc/no-multi-str': 'error',

        // disallow `NaN`
        'jsonc/no-nan': 'error',

        // disallow number property keys
        'jsonc/no-number-props': 'error',

        // disallow numeric separators
        'jsonc/no-numeric-separators': 'error',

        // disallow legacy octal literals
        'jsonc/no-octal': 'error',

        // disallow octal escape sequences in string literals
        'jsonc/no-octal-escape': 'error',

        // disallow octal numeric literals
        'jsonc/no-octal-numeric-literals': 'error',

        // disallow parentheses around the expression
        'jsonc/no-parenthesized': 'error',

        // disallow plus sign
        'jsonc/no-plus-sign': 'error',

        // disallow `RegExp` literals
        'jsonc/no-regexp-literals': 'error',

        // disallow sparse arrays
        'jsonc/no-sparse-arrays': 'error',

        // disallow template literals
        'jsonc/no-template-literals': 'error',

        // disallow `undefined`
        'jsonc/no-undefined-value': 'error',

        // disallow Unicode code point escape sequences.
        'jsonc/no-unicode-codepoint-escapes': 'error',

        // disallow unnecessary escape usage
        'jsonc/no-useless-escape': 'error',

        // disallow invalid number for JSON
        'jsonc/valid-json-number': 'error',

        ...stylistic
          ? {
              // enforce line breaks after opening and before closing array brackets
              'jsonc/array-bracket-newline': ['error', { multiline: true }],

              // disallow spaces inside of brackets
              'jsonc/array-bracket-spacing': ['error', 'never'],

              // disallow trailing commas
              'jsonc/comma-dangle': ['error', 'never'],

              // enforce consistent comma style
              'jsonc/comma-style': ['error', 'last'],

              // enforce consistent indentation
              'jsonc/indent': ['error', indent],

              // enforce consistent spacing between keys and values in object literal properties
              'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],

              // enforce consistent line breaks inside braces
              'jsonc/object-curly-newline': ['error', { consistent: true, multiline: true }],

              // enforce consistent spacing inside braces
              'jsonc/object-curly-spacing': ['error', 'always'],

              // enforce placing object properties on separate lines
              'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],

              // require quotes around object literal property names
              'jsonc/quote-props': 'error',

              // enforce use of double quotes
              'jsonc/quotes': ['error', 'double'],

              // disallow spaces after unary operators
              'jsonc/space-unary-ops': 'error',
            }
          : {},

        ...overrides,
      },
    },
  ];
};
