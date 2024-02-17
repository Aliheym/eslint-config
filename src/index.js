import { isPackageExists } from 'local-pkg';

import { comments } from './configs/comments.js';
import { ignores } from './configs/ignores.js';
import { imports } from './configs/imports.js';
import { javascript } from './configs/javascript.js';
import { jsonc } from './configs/jsonc.js';
import { node, nodeSecurity } from './configs/node.js';
import { perfectionist } from './configs/perfectionist.js';
import { sortPackageJson, sortTsconfig } from './configs/sort.js';
import { stylistic } from './configs/stylistic.js';
import { toml } from './configs/toml.js';
import { typescript } from './configs/typescript.js';
import { unicorn } from './configs/unicorn.js';
import { yaml } from './configs/yaml.js';
import { combineConfigs, extractEslintConfig, pickOptions } from './utils/index.js';

const buildConfig = async (options = {}, ...userConfigs) => {
  const {
    jsonc: jsoncEnabled = true,
    node: nodeEnabled = false,
    stylistic: stylisticEnabled = true,
    toml: tomlEnabled = false,
    typescript: typescriptEnabled = isPackageExists('typescript'),
    yaml: yamlEnabled = true,
  } = options;

  const stylisticOptions = pickOptions(options.stylistic);

  const configs = [
    ignores(),
    javascript({
      ...pickOptions(options.javascript),
      node: nodeEnabled,
    }),
    comments(),
    imports({
      node: nodeEnabled,
      stylistic: stylisticEnabled,
      typescript: typescriptEnabled,
    }),
    unicorn(),
    perfectionist(),
  ];

  if (nodeEnabled) {
    const nodeOptions = pickOptions(options.node);
    configs.push(node(nodeOptions));

    const securityEnabled = nodeOptions?.security ?? true;
    if (securityEnabled) {
      configs.push(nodeSecurity());
    }
  }

  if (stylisticEnabled) {
    configs.push(stylistic({
      ...stylisticOptions,
      typescript: typescriptEnabled,
    }));
  }

  if (typescriptEnabled) {
    configs.push(typescript(pickOptions(options.typescript)));
  }

  if (jsoncEnabled) {
    configs.push(
      jsonc({
        ...pickOptions(options.jsonc),
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsconfig(),
    );
  }

  if (yamlEnabled) {
    configs.push(yaml({
      ...pickOptions(options.yaml),
      stylistic: stylisticOptions,
    }));
  }

  if (tomlEnabled) {
    configs.push(toml({
      ...pickOptions(options.toml),
      stylistic: stylisticOptions,
    }));
  }

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  const eslintConfig = extractEslintConfig(options);
  if (Object.keys(eslintConfig).length > 0) {
    configs.push([eslintConfig]);
  }

  return combineConfigs(...configs, ...userConfigs);
};

export default buildConfig;
