import { type StylisticCustomizeOptions } from '@stylistic/eslint-plugin';
import { type Linter } from 'eslint';

type FlatConfigItem = Linter.FlatConfig & {
  /**
   * Custom name of each config item
   */
  name?: string;
};

type StylisticConfig = Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'semi'>;

interface OverridesOptions {
  /**
   * The rules to override.
   */
  overrides?: FlatConfigItem['rules'];
}

interface StylisticOptions extends StylisticConfig, OverridesOptions {}

interface TypescriptOptions extends OverridesOptions {
  /**
   * Path to the tsconfig file.
   *
   * When this option is provided, type aware rules will be enabled.
   * @see {@link https://typescript-eslint.io/linting/typed-linting/ | Linting with Type Information}
   */
  tsconfigPath?: string;

  /**
   * Enable strict Typescript rules.
   *
   * @default false
   * @see {@link https://typescript-eslint.io/linting/configs#strict | Strict Configs}
   */
  strict?: boolean;
}

interface NodeOptions extends OverridesOptions {
  /**
   * Enable Node.js security rules.
   *
   * @default true
   * @see {@link https://www.npmjs.com/package/eslint-plugin-security | eslint-plugin-security}
   */
  security?: boolean;
}

interface BuildConfigOptions {
  /**
   * Core ESLint configuration. Cannot be disabled.
   */
  javascript?: OverridesOptions;

  /**
   * Enable TypeScript support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | TypescriptOptions;

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean | OverridesOptions;

  /**
   * Enable YAML support.
   *
   * @default true
   */
  yaml?: boolean | OverridesOptions;

  /**
   * Enable TOML support.
   *
   * @default false
   */
  toml?: boolean | OverridesOptions;

  /**
   * Enable Node.js support.
   *
   * @default false
   */
  node?: boolean | NodeOptions;

  /**
   * Enable stylistic rules.
   *
   * @default true
   */
  stylistic?: boolean | StylisticOptions;
}

export default function buildConfig(
  options?: BuildConfigOptions & FlatConfigItem, ...userConfigs: FlatConfigItem[]
): Promise<FlatConfigItem[]>;
