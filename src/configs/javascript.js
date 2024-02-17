import js from '@eslint/js';
import confusingBrowserGlobals from 'confusing-browser-globals';
import globals from 'globals';

const maxComplexity = 20;

/**
 * Specifies the core rules for Javascript.
 *
 * @see {@link https://eslint.org/ | ESLint}
 */
export const javascript = async (options = {}) => {
  const { node = false, overrides = {} } = options;

  const recommendedConfig = js.configs.recommended;

  return [
    {
      ...recommendedConfig,
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.es2021,
          ...node ? globals.nodeBuiltin : globals.browser,
        },
        parserOptions: {
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      name: 'aliheym:javascript',
      rules: {
        ...recommendedConfig.rules,

        /**
         * Errors
         */
        // enforce getter and setter pairs in objects and classes
        'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],

        // enforces return statements in callbacks of array's methods
        'array-callback-return': ['error', { allowImplicit: true }],

        // enforces no braces where they can be omitted
        'arrow-body-style': [
          'error',
          'as-needed',
          {
            requireReturnForObjectLiteral: false,
          },
        ],

        // enforce that class methods use "this"
        'class-methods-use-this': 'error',

        // specify the maximum cyclomatic complexity allowed in a program
        complexity: ['error', maxComplexity],

        // require return statements to either always or never specify values
        'consistent-return': 'error',

        // require default case in switch statements
        'default-case': ['error', { commentPattern: '^no default$' }],

        // Enforce default clauses in switch statements to be last
        'default-case-last': 'error',

        // always put default params last
        'default-param-last': 'error',

        /**
         * Style
         */

        // encourages use of dot notation whenever possible
        'dot-notation': ['error', { allowKeywords: true }],

        // disallow the use of Boolean literals in conditional expressions
        // require the use of === and !==
        eqeqeq: [
          'error',
          'always',
          { null: 'ignore' },
        ],

        // require grouped accessor pairs in object literals and classes
        'grouped-accessor-pairs': 'error',

        // make sure for-in loops have an if statement
        'guard-for-in': 'error',

        // enforce position of line comments
        'line-comment-position': [
          'error',
          {
            applyDefaultPatterns: true,
            ignorePattern: '',
            position: 'above',
          },
        ],

        // require logical assignment logical operator shorthand
        'logical-assignment-operators': [
          'error',
          'always',
          {
            enforceForIfStatements: true,
          },
        ],

        // enforce a maximum number of classes per file
        'max-classes-per-file': ['error', 1],

        // require a capital letter for constructors
        'new-cap': [
          'error',
          {
            capIsNew: false,
            newIsCap: true,
          },
        ],

        // disallow the use of alert, confirm, and prompt
        'no-alert': 'error',

        /**
         * Variables
         */

        // disallow use of the Array constructor
        'no-array-constructor': 'error',

        // disallow await inside of loops
        'no-await-in-loop': 'error',

        // disallow use of bitwise operators
        'no-bitwise': 'error',

        // disallow use of arguments.caller or arguments.callee
        'no-caller': 'error',

        // disallow use of console
        'no-console': ['error', { allow: ['warn', 'error'] }],

        // disallows expressions where the operation doesn't affect the value
        'no-constant-binary-expression': 'error',

        // disallow returning value in constructor
        'no-constructor-return': 'error',

        // disallow division operators explicitly at beginning of regular expression
        'no-div-regex': 'error',

        // disallow else after a return in an if
        'no-else-return': ['error', { allowElseIf: false }],

        // disallow empty functions, except for standalone funcs/arrows
        'no-empty-function': [
          'error',
          {
            allow: [
              'arrowFunctions',
              'functions',
              'methods',
              'constructors',
            ],
          },
        ],

        // disallow empty static blocks
        'no-empty-static-block': 'error',

        /**
         * Best Practices
         */

        // disallow use of eval()
        'no-eval': 'error',

        // disallow adding to native types
        'no-extend-native': 'error',

        // disallow unnecessary function binding
        'no-extra-bind': 'error',

        // disallow Unnecessary Labels
        'no-extra-label': 'error',

        /**
         * Deprecated
         */
        'no-extra-semi': 'off',

        // disallow implicit type conversions
        'no-implicit-coercion': [
          'error',
          {
            allow: [],
            boolean: false,
            number: true,
            string: true,
          },
        ],

        // disallow use of eval()-like methods
        'no-implied-eval': 'error',

        // disallow this keywords outside of classes or class-like objects
        'no-invalid-this': 'error',

        // disallow labels that share a name with a variable
        'no-label-var': 'error',

        // disallow use of labels for anything other than loops and switches
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],

        // disallow unnecessary nested blocks
        'no-lone-blocks': 'error',

        // disallow if as the only statement in an else block
        'no-lonely-if': 'error',

        // disallow creation of functions within loops
        'no-loop-func': 'error',

        // disallow magic numbers
        'no-magic-numbers': [
          'error',
          {
            detectObjects: false,
            enforceConst: true,
            ignore: [
              1,
              0,
              -1,
              2,
            ],
            ignoreArrayIndexes: true,
          },
        ],

        'no-mixed-spaces-and-tabs': 'off',

        // disallow use of chained assignment expressions
        'no-multi-assign': 'error',

        // disallow use of multiline strings
        'no-multi-str': 'error',

        // disallow nested ternary expressions
        'no-nested-ternary': 'error',

        // disallow use of new operator when not part of the assignment or comparison
        'no-new': 'error',

        // disallow use of new operator for Function object
        'no-new-func': 'error',

        // disallow new operators with global non-constructor functions
        'no-new-native-nonconstructor': 'error',

        // disallows creating new instances of String, Number, and Boolean
        'no-new-wrappers': 'error',

        // disallow calls to the Object constructor without an argument
        'no-object-constructor': 'error',

        // disallow use of octal escape sequences in string literals
        'no-octal-escape': 'error',

        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': [
          'error',
          {
            // for reduce accumulators
            ignorePropertyModificationsFor: ['acc'],
            props: true,
          },
        ],

        // disallow use of unary operators, ++ and --
        'no-plusplus': 'error',

        // disallow returning values from Promise executor functions
        'no-promise-executor-return': 'error',

        // disallow usage of __proto__ property
        'no-proto': 'error',

        // disallow specified names in exports
        'no-restricted-exports': [
          'error',
          {
            restrictedNamedExports: [
              // `default` - use `export default` to provide a default export
              // `then` - this will cause tons of confusion when your module
              // is dynamically `import()`ed, and will break in most node ESM versions
              'default', 'then',
            ],
          },
        ],

        // disallow specific globals
        'no-restricted-globals': [
          'error',
          {
            message: 'Use `Number.isFinite` instead https://github.com/airbnb/javascript#standard-library--isfinite',
            name: 'isFinite',
          },
          {
            message: 'Use `Number.isNaN` instead https://github.com/airbnb/javascript#standard-library--isnan',
            name: 'isNaN',
          },
          {
            message: 'Use `globalThis` instead.',
            name: 'global',
          },
          {
            message: 'Use `globalThis` instead.',
            name: 'self',
          },
          ...confusingBrowserGlobals.map((name) => ({ message: `Use window.${name} instead`, name })),
        ],

        // disallow certain object properties
        'no-restricted-properties': [
          'error',
          {
            message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
            property: '__proto__',
          },
          {
            message: '`arguments.callee` is deprecated',
            object: 'arguments',
            property: 'callee',
          },
          {
            message: 'Please use `Number.isFinite` instead',
            object: 'global',
            property: 'isFinite',
          },
          {
            message: 'Please use `Number.isFinite` instead',
            object: 'self',
            property: 'isFinite',
          },
          {
            message: 'Please use `Number.isFinite` instead',
            object: 'window',
            property: 'isFinite',
          },
          {
            message: 'Please use `Number.isNaN` instead',
            object: 'global',
            property: 'isNaN',
          },
          {
            message: 'Please use `Number.isNaN` instead',
            object: 'self',
            property: 'isNaN',
          },
          {
            message: 'Please use `Number.isNaN` instead',
            object: 'window',
            property: 'isNaN',
          },
          {
            message: 'Please use `Object.defineProperty` instead.',
            property: '__defineGetter__',
          },
          {
            message: 'Please use `Object.defineProperty` instead.',
            property: '__defineSetter__',
          },
          {
            message: 'Use the exponentiation operator (**) instead.',
            object: 'Math',
            property: 'pow',
          },
        ],

        // disallow certain syntax forms
        'no-restricted-syntax': [
          'error',
          {
            message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
            selector: 'ForInStatement',
          },
          {
            message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            selector: 'LabeledStatement',
          },
          {
            message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            selector: 'WithStatement',
          },
          {
            message: '`debugger` statement use is discouraged.',
            selector: 'DebuggerStatement',
          },
        ],

        // disallow use of assignment in return statement
        'no-return-assign': ['error', 'always'],

        // https://eslint.org/docs/rules/no-script-url
        'no-script-url': 'error',

        // disallow comparisons where both sides are exactly the same
        'no-self-compare': 'error',

        // disallow use of comma operator
        'no-sequences': 'error',

        // disallow declaration of variables already declared in the outer scope
        'no-shadow': 'error',

        // disallow template literal placeholder syntax in regular strings
        'no-template-curly-in-string': 'error',

        // restrict what can be thrown as an exception
        'no-throw-literal': 'error',

        // disallow use of undefined when initializing variables
        'no-undef-init': 'error',

        // disallow use of undefined variable
        'no-undefined': 'off',

        // disallow dangling underscores in identifiers
        'no-underscore-dangle': [
          'error',
          {
            allow: [],
            allowAfterSuper: false,
            allowAfterThis: false,
            enforceInMethodNames: true,
          },
        ],

        // disallow unmodified conditions of loops
        'no-unmodified-loop-condition': 'error',

        // also, prefer `a || b` over `a ? a : b`
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],

        // disallow loops with a body that allows only one iteration
        'no-unreachable-loop': ['error'],

        // disallow usage of expressions in statement position
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: false,
            allowTaggedTemplates: false,
            allowTernary: false,
          },
        ],

        // disallow Unused Private Class Members
        'no-unused-private-class-members': 'error',

        // disallow declaration of variables that are not used in the code
        'no-unused-vars': ['error', { args: 'after-used', ignoreRestSiblings: true, vars: 'all' }],

        // disallow use of variables before they are defined
        'no-use-before-define': ['error', { classes: true, functions: true, variables: true }],

        // disallow use of `javascript:` urls.
        // disallow unnecessary .call() and .apply()
        'no-useless-call': 'off',

        // disallow useless computed property keys
        'no-useless-computed-key': 'error',

        // disallow useless string concatenation
        'no-useless-concat': 'error',

        // disallow unnecessary constructor
        'no-useless-constructor': 'error',

        // disallow unnecessary string escaping
        'no-useless-escape': 'error',

        // disallow renaming import, export, and destructured assignments to the same name
        'no-useless-rename': [
          'error',
          {
            ignoreDestructuring: false,
            ignoreExport: false,
            ignoreImport: false,
          },
        ],

        // disallow redundant return; keywords
        'no-useless-return': 'error',

        // require let or const instead of var
        'no-var': 'error',

        // disallow use of void operator
        'no-void': 'error',

        // require method and property shorthand syntax for object literals
        'object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],

        // allow just one var statement per function
        'one-var': ['error', 'never'],

        // require assignment operator shorthand where possible or prohibit it entirely
        'operator-assignment': ['error', 'always'],

        // suggest using arrow functions as callbacks
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          },
        ],

        // suggest using of const declaration for variables that are never modified after declared
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
          },
        ],

        /**
         * ESNext
         */

        // prefer destructuring from arrays and objects
        'prefer-destructuring': [
          'error',
          {
            AssignmentExpression: {
              array: true,
              object: false,
            },
            VariableDeclarator: {
              array: false,
              object: true,
            },
          },
          {
            enforceForRenamedProperties: false,
          },
        ],

        // disallow the use of Math.pow in favor of the ** operator
        'prefer-exponentiation-operator': 'error',

        // disallow parseInt() in favor of binary, octal, and hexadecimal literals
        'prefer-numeric-literals': 'error',

        // prefer Object.hasOwn() over Object.prototype.hasOwnProperty.call()
        'prefer-object-has-own': 'error',

        // prefer use of an object spread over Object.assign
        'prefer-object-spread': 'error',

        // require using Error objects as Promise rejection reasons
        'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],

        // disallow use of the RegExp constructor in favor of regular expression literals
        'prefer-regex-literals': [
          'error',
          {
            disallowRedundantWrapping: true,
          },
        ],

        // use rest parameters instead of arguments
        'prefer-rest-params': 'error',

        // suggest using the spread syntax instead of .apply()
        'prefer-spread': 'error',

        // suggest using template literals instead of string concatenation
        'prefer-template': 'error',

        // require use of the second argument for parseInt()
        radix: 'error',

        // disallow assignments that can lead to race conditions due to usage of await or yield
        'require-atomic-updates': 'error',

        // require `await` in `async function`
        'require-await': 'off',

        // require a Symbol description
        'symbol-description': 'error',

        // require or disallow the Unicode Byte Order Mark
        'unicode-bom': ['error', 'never'],
        // require or disallow Yoda conditions
        yoda: 'error',

        ...overrides,
      },
    },
  ];
};
