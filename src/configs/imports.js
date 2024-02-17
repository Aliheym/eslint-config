import * as importPlugin from 'eslint-plugin-import';
import { isPackageExists } from 'local-pkg';

const typescriptExtensions = [
  '.ts',
  '.cts',
  '.mts',
  '.tsx',
];
const allExtensions = [
  ...typescriptExtensions,
  '.js',
  '.jsx',
];

/**
 * Specifies the rules to lint ES6+ import/export syntax
 *
 * @see {@link https://github.com/import-js/eslint-plugin-import | eslint-plugin-import}
 */
export const imports = async (options = {}) => {
  const { node = false, stylistic = true, typescript = isPackageExists('typescript') } = options;

  return [
    {
      name: 'aliheym:imports',
      plugins: {
        import: importPlugin,
      },

      rules: {
        // TODO: enable this when this plugin will support new ESLint flat config
        // ...importPlugin.configs.recommended.rules,
        ...typescript ? importPlugin.configs.typescript.rules : {},

        // enforce a consistent style for type specifiers (inline or top-level)
        'import/consistent-type-specifier-style': ['error', 'prefer-inline'],

        // enforces that all exports are declared at the bottom of the file
        'import/exports-last': 'error',

        // ensure consistent use of file extension within the import path
        'import/extensions': [
          'error',
          'never',
          { js: 'always' },
        ],

        // disallow non-import statements appearing before import statements
        'import/first': 'error',

        // TODO: check this rule again when this plugin will support new ESLint flat config
        'import/namespace': 'off',

        // forbid import of modules using absolute paths
        'import/no-absolute-path': 'error',

        // disallow `require()`
        'import/no-commonjs': 'error',

        // forbid cyclical dependencies between modules
        'import/no-cycle': ['error', { maxDepth: '∞' }],

        // reports if a resolved path is imported more than once.
        'import/no-duplicates': 'error',

        // forbid require() calls with expressions
        'import/no-dynamic-require': 'error',

        // reports the use of empty named import blocks.
        'import/no-empty-named-blocks': 'error',

        // forbid the import of external modules that are not declared in the package.json
        'import/no-extraneous-dependencies': ['error'],

        // forbid mutable exports
        'import/no-mutable-exports': 'error',

        // prevent importing the default as if it were named
        'import/no-named-default': 'error',

        // prevent importing packages through relative paths.
        'import/no-relative-packages': 'error',

        // forbid a module from importing itself
        'import/no-self-import': 'error',

        // ensure imports point to files/modules that can be resolved
        // TODO: check this rule again when this plugin will support new ESLint flat config
        'import/no-unresolved': ['off', { caseSensitive: true }],

        // reports modules without any exports, or with unused exports
        'import/no-unused-modules': [
          'off',
          {
            missingExports: true,
            unusedExports: true,
          },
        ],

        // ensures that there are no useless path segments
        'import/no-useless-path-segments': ['error'],

        // forbid Webpack loader syntax in imports
        'import/no-webpack-loader-syntax': 'error',

        // ensure absolute imports are above relative imports
        // and that unassigned imports are ignored
        'import/order': [
          'error',
          {
            alphabetize: {
              order: 'asc',
            },
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
            ],
            'newlines-between': 'always',
            pathGroups: [
              {
                group: 'external',
                pattern: '@/**',
                position: 'after',
              },
            ],
          },
        ],

        // require modules with a single export to use a default export
        'import/prefer-default-export': 'off',

        ...stylistic
          ? {
              // require a newline after the last import/require in a group
              'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
            }
          : {},
      },
      settings: {
        'import/extensions': allExtensions,
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        'import/parsers': {
          '@typescript-eslint/parser': typescriptExtensions,
        },
        'import/resolver': {
          node: typescript ? { extensions: allExtensions } : node,
        },
      },
    },
  ];
};
