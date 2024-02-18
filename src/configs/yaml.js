import { GLOB_YAML } from '../constants/globs.js';
import { interopDefault } from '../utils/index.js';

/**
 * Specifies the rules to lint YAML files.
 *
 * @see {@link https://ota-meshi.github.io/eslint-plugin-yml/ | eslint-plugin-yml}
 */
export const yaml = async (options = {}) => {
  const { files = [GLOB_YAML], overrides = {}, stylistic = true } = options;

  const {
    indent = 2,
    quotes = 'single',
  } = typeof stylistic === 'boolean' ? {} : stylistic;

  const [yamlPlugin, yamlParser] = await Promise.all([interopDefault('eslint-plugin-yml'), interopDefault('yaml-eslint-parser')]);

  return [
    {
      files,
      languageOptions: {
        parser: yamlParser,
      },
      name: 'aliheym:yaml',
      plugins: {
        yml: yamlPlugin,
      },
      rules: {
        // don't require a space immediately following the `//` or `/*` in a comment
        '@stylistic/spaced-comment': 'off',

        // require block style mappings
        'yml/block-mapping': 'error',

        // require block style sequences
        'yml/block-sequence': 'error',

        // disallow empty document
        'yml/no-empty-document': 'error',

        // disallow empty mapping keys
        'yml/no-empty-key': 'error',

        // disallow empty sequence entries
        'yml/no-empty-sequence-entry': 'error',

        // disallow irregular whitespace
        'yml/no-irregular-whitespace': 'error',

        // require or disallow plain style scalar
        'yml/plain-scalar': 'error',

        ...stylistic
          ? {
              // enforce consistent line breaks after `?` indicator
              'yml/block-mapping-question-indicator-newline': 'error',

              // enforce consistent line breaks after `-` indicator
              'yml/block-sequence-hyphen-indicator-newline': 'error',

              // enforce consistent line breaks inside braces
              'yml/flow-mapping-curly-newline': 'error',

              // enforce consistent spacing inside braces
              'yml/flow-mapping-curly-spacing': 'error',

              // enforce linebreaks after opening and before closing flow sequence brackets
              'yml/flow-sequence-bracket-newline': 'error',

              // enforce consistent spacing inside flow sequence brackets
              'yml/flow-sequence-bracket-spacing': 'error',

              // enforce consistent indentation
              'yml/indent': ['error', indent],

              // enforce consistent spacing between keys and values in mapping pairs
              'yml/key-spacing': 'error',

              // disallow tabs for indentation
              'yml/no-tab-indent': 'error',

              // enforce the consistent use of either double, or single quotes
              'yml/quotes': ['error', { avoidEscape: false, prefer: quotes }],

              // enforce consistent spacing after the `#` in a comment
              'yml/spaced-comment': 'error',
            }
          : {},

        ...overrides,
      },
    },
  ];
};
