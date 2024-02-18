import { isPackageExists } from 'local-pkg';

import { interopDefault } from '../utils/index.js';

const maxLineLength = 100;

const defaultStylisticConfig = {
  indent: 2,
  jsx: false,
  quotes: 'single',
  semi: true,
};

/**
 * Specifies the rules for stylistic options.
 *
 * @see {@link https://eslint.style/ | ESLint Stylistic}
 */
export const stylistic = async (options = {}) => {
  const {
    indent, overrides = {}, quotes, semi, typescript = isPackageExists('typescript'),
  } = { ...defaultStylisticConfig, ...options };

  const stylisticPlugin = await interopDefault('@stylistic/eslint-plugin');

  const baseConfig = stylisticPlugin.configs.customize({
    flat: true,
    indent,
    jsx: false,
    quotes,
    semi,
  });

  return [
    {
      ...baseConfig,
      name: 'aliheym:stylistic',
      rules: {
        ...baseConfig.rules,

        // enforce line breaks after opening and before closing array brackets
        '@stylistic/array-bracket-newline': ['error', { multiline: true }],

        // enforce spacing inside array brackets
        '@stylistic/array-bracket-spacing': ['error', 'never'],

        // enforce line breaks between array elements
        '@stylistic/array-element-newline': ['error', { minItems: 3, multiline: true }],

        // require parens in arrow function arguments
        '@stylistic/arrow-parens': ['error', 'always'],

        // require space before/after arrow function's arrow
        '@stylistic/arrow-spacing': ['error', { after: true, before: true }],

        // enforce spacing inside single-line blocks
        '@stylistic/block-spacing': ['error', 'always'],

        // enforce one true brace style
        '@stylistic/brace-style': [
          'error',
          '1tbs',
          { allowSingleLine: true },
        ],

        // require trailing commas in multiline object literals
        '@stylistic/comma-dangle': ['error', 'always-multiline'],

        // enforce spacing before and after comma
        '@stylistic/comma-spacing': ['error', { after: true, before: false }],

        // enforce one true comma style
        '@stylistic/comma-style': [
          'error',
          'last',
          {
            exceptions: {
              ArrayExpression: false,
              ArrayPattern: false,
              ArrowFunctionExpression: false,
              CallExpression: false,
              FunctionDeclaration: false,
              FunctionExpression: false,
              ImportDeclaration: false,
              NewExpression: false,
              ObjectExpression: false,
              ObjectPattern: false,
              VariableDeclaration: false,
            },
          },
        ],

        // disallow padding inside computed properties
        '@stylistic/computed-property-spacing': ['error', 'never'],

        // enforces consistent newlines before or after dots
        '@stylistic/dot-location': ['error', 'property'],

        // enforce newline at the end of file, with no multiple empty lines
        '@stylistic/eol-last': ['error', 'always'],

        // enforce spacing between functions and their invocations
        '@stylistic/func-call-spacing': ['error', 'never'],

        // enforce line breaks between arguments of a function call
        '@stylistic/function-call-argument-newline': ['error', 'consistent'],

        // with each item on a line by itself, with a trailing comma on the last item
        '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],

        // enforce the spacing around the * in generator functions
        '@stylistic/generator-star-spacing': ['error', { after: true, before: false }],

        // enforce the location of arrow function bodies with implicit returns
        '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],

        // enforces spacing between keys and values in object literal properties
        '@stylistic/key-spacing': ['error', { afterColon: true, beforeColon: false }],

        // require a space before & after certain keywords
        '@stylistic/keyword-spacing': [
          'error',
          {
            after: true,
            before: true,
            overrides: {
              case: { after: true },
              return: { after: true },
              throw: { after: true },
            },
          },
        ],

        // disallow mixed 'LF' and 'CRLF' as linebreaks
        '@stylistic/linebreak-style': ['error', 'unix'],

        // require empty lines before block comments
        '@stylistic/lines-around-comment': [
          'error',
          {
            afterBlockComment: false,
            afterHashbangComment: false,
            allowArrayStart: true,
            allowBlockStart: true,
            allowClassStart: true,
            allowEnumStart: true,
            allowInterfaceStart: true,
            allowModuleStart: true,
            allowObjectStart: true,
            allowTypeStart: true,
            beforeBlockComment: true,
          },
        ],

        // require an empty line between class members
        '@stylistic/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],

        // specify the maximum length of a line in your program
        '@stylistic/max-len': [
          'error',
          maxLineLength,
          2,
          {
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreUrls: true,
          },
        ],

        // enforce a maximum statement count per line
        '@stylistic/max-statements-per-line': ['error', { max: 1 }],

        // require multiline ternary
        '@stylistic/multiline-ternary': ['error', 'always-multiline'],

        // disallow the omission of parentheses when invoking a constructor with no arguments
        '@stylistic/new-parens': 'error',

        // more readable and easy to maintain
        '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],

        // disallow arrow functions where they could be confused with comparisons
        '@stylistic/no-confusing-arrow': [
          'error',
          {
            allowParens: true,
          },
        ],

        // disallow unnecessary parentheses
        '@stylistic/no-extra-parens': [
          'error',
          'all',
          {
            enforceForArrowConditionals: false,
            nestedBinaryExpressions: false,
            ternaryOperandBinaryExpressions: false,
          },
        ],

        // disallow unnecessary semicolons
        '@stylistic/no-extra-semi': 'error',

        // disallow the use of leading or trailing decimal points in numeric literals
        '@stylistic/no-floating-decimal': 'error',

        // functions with multiline signatures, or invocations,
        // should be indented just like every other multiline list in this guide:
        // disallow un-paren'd mixes of different operators
        '@stylistic/no-mixed-operators': [
          'error',
          {
            // the list of arithmetic groups disallows mixing `%` and `**`
            allowSamePrecedence: false,
            // with other arithmetic operators.
            groups: [
              ['%', '**'],
              ['%', '+'],
              ['%', '-'],
              ['%', '*'],
              ['%', '/'],
              ['/', '*'],
              [
                '&',
                '|',
                '<<',
                '>>',
                '>>>',
              ],
              [
                '==',
                '!=',
                '===',
                '!==',
              ],
              ['&&', '||'],
              ['in', 'instanceof'],
            ],
          },
        ],

        // disallow mixed spaces and tabs for indentation
        '@stylistic/no-mixed-spaces-and-tabs': 'error',

        // disallow use of multiple spaces
        '@stylistic/no-multi-spaces': [
          'error',
          {
            ignoreEOLComments: false,
          },
        ],

        // only one newline at the end, and no new lines at the beginning
        '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

        // disallow tab characters entirely
        '@stylistic/no-tabs': 'error',

        // disallow trailing whitespace at the end of lines
        '@stylistic/no-trailing-spaces': [
          'error',
          {
            ignoreComments: false,
            skipBlankLines: false,
          },
        ],

        // disallow whitespace before properties
        '@stylistic/no-whitespace-before-property': 'error',

        // enforce the location of single-line statements
        '@stylistic/nonblock-statement-body-position': ['error', 'beside'],

        // enforce line breaks between braces
        '@stylistic/object-curly-newline': [
          'error',
          {
            ExportDeclaration: {
              consistent: true,
              minProperties: 4,
              multiline: true,
            },
            ImportDeclaration: {
              consistent: true,
              minProperties: 4,
              multiline: true,
            },
            ObjectExpression: {
              consistent: true,
              minProperties: 4,
              multiline: true,
            },
            ObjectPattern: { consistent: true, minProperties: 4, multiline: true },
          },
        ],

        // require padding inside curly braces
        '@stylistic/object-curly-spacing': ['error', 'always'],

        // enforce "same line" or "multiple line" on object properties.
        '@stylistic/object-property-newline': [
          'error',
          {
            allowAllPropertiesOnSameLine: true,
          },
        ],

        // requires operator at the beginning of the line in multiline statements
        '@stylistic/operator-linebreak': [
          'error',
          'before',
          { overrides: { '=': 'none' } },
        ],

        // disallow padding within blocks
        '@stylistic/padded-blocks': [
          'error',
          {
            blocks: 'never',
            classes: 'never',
            switches: 'never',
          },
          {
            allowSingleLineBlocks: true,
          },
        ],

        // require quotes around object literal property names
        '@stylistic/quote-props': [
          'error',
          'as-needed',
          { keywords: false, numbers: false, unnecessary: true },
        ],

        // enforce spacing between object rest-spread
        '@stylistic/rest-spread-spacing': ['error', 'never'],

        // enforce spacing before and after semicolons
        '@stylistic/semi-spacing': ['error', { after: true, before: false }],

        // enforce location of semicolons
        '@stylistic/semi-style': ['error', 'last'],

        // require or disallow space before blocks
        '@stylistic/space-before-blocks': ['error', 'always'],

        // enforce consistent spacing before function definition opening parenthesis
        '@stylistic/space-before-function-paren': ['error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],

        // require or disallow spaces inside parentheses
        '@stylistic/space-in-parens': ['error', 'never'],

        // require spaces around operators
        '@stylistic/space-infix-ops': 'error',

        // enforces new line after each method call in the chain to make it
        // require or disallow spaces before/after unary operators
        '@stylistic/space-unary-ops': ['error', { nonwords: false, words: true }],

        // require a space immediately following the `//` or `/*` in a comment
        '@stylistic/spaced-comment': [
          'error',
          'always',
          {
            block: {
              balanced: true,
              exceptions: [
                '*',
                '+',
                '-',
              ],
              markers: [
                '/',
                '=',
                '!',
              ],
            },
            line: {
              exceptions: ['+', '-'],
              markers: [
                '/',
                '=',
                '!',
              ],
            },
          },
        ],

        // enforce spacing around colons of switch statements
        '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],

        // disallow multiple empty lines,
        // enforce usage of spacing in template strings
        '@stylistic/template-curly-spacing': ['error'],

        // disallow spacing between template tags and their literals
        '@stylistic/template-tag-spacing': ['error', 'never'],

        // require immediate function invocation to be wrapped in parentheses
        '@stylistic/wrap-iife': [
          'error',
          'outside',
          { functionPrototypeMethods: true },
        ],

        // enforce spacing around the * in yield* expressions
        '@stylistic/yield-star-spacing': ['error', { after: true, before: false }],

        // require camel case names
        camelcase: ['error', { ignoreDestructuring: false, properties: 'never' }],

        // disallow capitalization of the first letter of a comment
        'capitalized-comments': [
          'error',
          'never',
          {
            block: {
              ignoreConsecutiveComments: true,
              ignoreInlineComments: true,
              ignorePattern: '.*',
            },
            line: {
              ignoreConsecutiveComments: true,
              ignoreInlineComments: true,
              ignorePattern: '.*',
            },
          },
        ],

        // specify curly brace conventions for all control statements
        curly: ['error', 'multi-line'],

        // enforces use of function declarations or expressions
        'func-style': ['error', 'expression'],

        // specify the max number of lines in a file
        'max-lines': [
          'off',
          {
            max: 300,
            skipBlankLines: true,
            skipComments: true,
          },
        ],

        // enforce a maximum function length
        'max-lines-per-function': [
          'off',
          {
            IIFEs: true,
            max: 50,
            skipBlankLines: true,
            skipComments: true,
          },
        ],

        ...typescript
          ? {
              // require a specific member delimiter style for interfaces and type literals.
              '@stylistic/member-delimiter-style': [
                'error',
                {
                  multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                  },
                  singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                  },
                },
              ],
            }
          : {},

        ...overrides,
      },
    },
  ];
};
