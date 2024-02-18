# @aliheym/eslint-config

[![npm](https://img.shields.io/npm/v/@aliheym/eslint-config?color=444&label=)](https://npmjs.com/package/@aliheym/eslint-config)

This package is inspired by [Anthony's ESLint config preset](https://github.com/antfu/eslint-config) and [Airbnb's ESLint config preset](https://github.com/airbnb/javascript).

> [!IMPORTANT]
> This config is intended to work only with ESM projects. Your project needs
> to be ESM too.

## Usage

### Install

```bash
npm i --save-dev eslint @aliheym/eslint-config
```

### Create config file

Create a file named `eslint.config.js` in the root of your project and add the following:

```js
import aliheym from '@aliheym/eslint-config';

export default aliheym();
```

> [!TIP]
> ESLint only detects `eslint.config.js` as the flag config entry.

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Editor Integration

### VS Code

There is a plugin called [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). Install it.

Add the following to your `.vscode/settings.json`:

```jsonc
{
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in the editor, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "@stylistic/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "typescript",
    "json",
    "jsonc",
    "yaml",
    "toml"
  ]
}
```

## Customization

Normally, you only need to import the `@aliheym/eslint-config`.

```js
import aliheym from '@aliheym/eslint-config';

export default aliheym();
```

However, you can configure each integration, for example:

```js
import aliheym from '@aliheym/eslint-config';

export default aliheym({
  // Disable some files and directories
  ignores: [
    '**/.temporary',
  ],

  // Customize the stylistic rules
  stylistic: {
    indent: 4,
    quotes: 'double',
  },

  // Enable Node.js linting
  node: {
    overrides: {
      // ...
    }
  },

  // Disable YAML support
  yaml: false,

  // Override Typescript rules
  typescript: {
    overrides: {
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    }
  },
});
```

> [!TIP]
> The function has TS types, so you can check them to see all the available options.

You can also pass any number of custom config overrides, for example:

```js
import aliheym from '@aliheym/eslint-config';

export default aliheym(
  {
    // Configures the base config
  },
  // From the second arguments they are ESLint configs
  {
    files: ['**/*.ts'],
    rules: {
      '@stylistic/semi': ['error', 'never'],
    },
  },
  {
    // Without `files`, they are general rules for all files
    rules: {},
  },
);
```

## Optional Rules

This config also provides some optional plugins/rules for extended usage.


### eslint-plugin-perfectionist

[`eslint-plugin-perfectionist`](https://github.com/azat-io/eslint-plugin-perfectionist) allows you to sorted object keys, imports, etc, with auto-fix.

The plugin is installed but no rules are enabled by default.

It's recommended to opt-in on each file individually using [configuration comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1).

```js
/* eslint perfectionist/sort-objects: "error" */
const objectWantedToSort = {
  a: 2,
  b: 1,
  c: 3,
};
/* eslint perfectionist/sort-objects: "off" */
```

### Type Aware Rules

You can optionally enable the [type aware rules](https://typescript-eslint.io/linting/typed-linting/) by passing `tsconfigPath` to the `typescript` config:

```js
import aliheym from '@aliheym/eslint-config';

export default aliheym({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
});
```

## Lint Staged

You can use `lint-staged` to lint and auto-fix before every commit. Install it:

```bash
npm i -D lint-staged
```

And then change your `package.json`:

```json
{
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

You can combine it with git hooks. For more details, see the [husky](https://typicode.github.io/husky/) or [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks).

## ESlint Config Viewer

There are a useful tool, that you can use to view what rules are enabled in your project and apply them to what files - [eslint-flat-config-viewer](https://github.com/antfu/eslint-flat-config-viewer).

Go to your project root (the same directory where your `eslint.config.js` is) and run:

```bash
npx eslint-flat-config-viewer
```
