import tseslint from 'typescript-eslint';

const getBaseConfig = ({ strict, typeAwareRulesEnabled }) => {
  if (typeAwareRulesEnabled) {
    return strict ? tseslint.configs.strictTypeChecked : tseslint.configs.recommendedTypeChecked;
  }

  return strict ? tseslint.configs.strict : tseslint.configs.recommended;
};

export const typescript = async (options = {}) => {
  const { overrides = {}, strict = false, tsconfigPath } = options;

  const typeAwareRulesEnabled = !!tsconfigPath;
  const baseConfigs = [...getBaseConfig({ strict, typeAwareRulesEnabled })];

  if (typeAwareRulesEnabled) {
    baseConfigs.push({
      languageOptions: {
        parserOptions: {
          project: tsconfigPath,
        },
      },
    });
  }

  const typeAwareRules = {
    // disallow awaiting a value that is not a Thenable
    '@typescript-eslint/await-thenable': 'error',

    // enforce consistent usage of type exports
    '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],

    // enforce dot notation whenever possible
    '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],

    // enforce consistent naming conventions
    '@typescript-eslint/naming-convention': [
      'error',
      // enforce that all variables, functions and properties follow are camelCase
      {
        format: ['camelCase'],
        selector: 'default',
      },
      // enforce that all variables are either camelCase or UPPER_CASE
      {
        format: ['camelCase', 'UPPER_CASE'],
        selector: 'variable',
      },
      // enforce that all parameters are camelCase
      {
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        selector: 'parameter',
      },
      // enforce that all classes, enums, types, interfaces follow are PascalCase
      {
        format: ['PascalCase'],
        selector: 'typeLike',
      },
      // enforce that interface names do not begin with an I
      {
        custom: {
          match: false,
          regex: '^I[A-Z]',
        },
        format: ['PascalCase'],
        selector: 'interface',
      },
    ],

    // followed by [0] when looking for a single result
    '@typescript-eslint/prefer-find': 'error',

    // enforce the use of `Array.prototype.find()` over `Array.prototype.filter()`
    // enforce `RegExp#exec` over `String#match` if no global flag is provided
    '@typescript-eslint/prefer-regexp-exec': 'error',

    // require any function or method that returns a Promise to be marked async.
    '@typescript-eslint/promise-function-async': 'error',

    // require `Array#sort` and `Array#toSorted` calls to always provide a compareFunction.
    '@typescript-eslint/require-array-sort-compare': 'error',

    // disallow certain types in boolean expressions.
    '@typescript-eslint/strict-boolean-expressions': 'error',

    // require switch-case statements to be exhaustive.
    '@typescript-eslint/switch-exhaustiveness-check': 'error',

    'dot-notation': 'off',
  };

  return tseslint.config(...baseConfigs, {
    rules: {
      // Turn off ESLint rules that are covered by TypeScript rules
      camelcase: 'off',
      'default-param-last': 'off',
      'no-loop-func': 'off',
      'no-magic-numbers': 'off',
      'no-shadow': 'off',
      'no-unused-expressions': 'off',
      'no-use-before-define': 'off',

      ...typeAwareRulesEnabled ? typeAwareRules : {},

      // enforce consistent usage of type imports
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports', prefer: 'type-imports' }],

      // enforce default parameters to be last
      '@typescript-eslint/default-param-last': 'error',

      // enforce using a particular method signature syntax
      '@typescript-eslint/method-signature-style': ['error', 'property'],

      // disallow classes used as namespaces.
      '@typescript-eslint/no-extraneous-class': [
        'error',
        {
          allowEmpty: true,
        },
      ],

      // disallow function declarations that contain unsafe references inside loop statements
      '@typescript-eslint/no-loop-func': 'error',

      // disallow the use of magic numbers
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          detectObjects: false,
          enforceConst: true,
          ignore: [
            -1,
            0,
            1,
            2,
          ],
          ignoreArrayIndexes: true,
        },
      ],

      // disallow declaration of variables already declared in the outer scope
      '@typescript-eslint/no-shadow': 'error',

      // disallow unused expressions.
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: false,
          allowTaggedTemplates: false,
          allowTernary: false,
        },
      ],

      // disallow the use of variables before they are defined.
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          classes: true,
          enums: true,
          functions: true,
          typedefs: true,
          variables: true,
        },
      ],

      // disallow empty exports that don't change anything in a module file.
      '@typescript-eslint/no-useless-empty-export': 'error',

      ...overrides,
    },
  });
};
