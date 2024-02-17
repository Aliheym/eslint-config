import path, { join } from 'node:path';
import process from 'node:process';

// eslint-disable-next-line n/no-unpublished-import
import { expect, test, describe } from 'vitest';

// TODO: Change this to a proper import once the ESLint v9 is released
// eslint-disable-next-line import/no-relative-packages, n/no-unpublished-import
const { FlatESLint } = await import('../node_modules/eslint/lib/eslint/flat-eslint.js');

const fixturesPath = path.join(process.cwd(), 'tests', 'fixtures');
const fileIgnoreLintMessage = 'File ignored because of a matching ignore pattern. Use "--no-ignore" to disable file ignore settings or use "--no-warn-ignored" to suppress this warning.';

describe('JavaScript', () => {
  test('should lint the issues', async () => {
    const cwd = join(fixturesPath, 'javascript', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('no-console');
  });

  test('should lint for invalid globals usage in the Node.js environment', async () => {
    const cwd = join(fixturesPath, 'javascript', 'node');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('no-undef');
    expect(results[0].messages[0].message).toBe(`'window' is not defined.`);
  });

  test('should lint for invalid globals usage in the browser environment', async () => {
    const cwd = join(fixturesPath, 'javascript', 'browser');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('no-undef');
    expect(results[0].messages[0].message).toBe(`'setImmediate' is not defined.`);
  });

  test('should override default linting rules', async () => {
    const cwd = join(fixturesPath, 'javascript', 'overrides');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);

    expect(results[0].messages).toHaveLength(0);
  });
});

describe('TypeScript', () => {
  test('should lint the issues', async () => {
    const cwd = join(fixturesPath, 'typescript', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['typescript.ts'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('@typescript-eslint/no-use-before-define');
  });

  test('should lint the type-aware issues', async () => {
    const cwd = join(fixturesPath, 'typescript', 'type-aware');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['typescript.ts'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('@typescript-eslint/naming-convention');
  });

  test('should lint the strict issues', async () => {
    const cwd = join(fixturesPath, 'typescript', 'strict');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['typescript.ts'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('@typescript-eslint/no-non-null-assertion');
  });

  test('should lint the strict type-aware issues', async () => {
    const cwd = join(fixturesPath, 'typescript', 'type-aware-strict');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['typescript.ts'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('@typescript-eslint/no-mixed-enums');
  });

  test('should not lint the issues if the config was disabled', async () => {
    const cwd = join(fixturesPath, 'typescript', 'disabled');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['typescript.ts'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].message).toBe(fileIgnoreLintMessage);
  });

  test('should override default linting rules', async () => {
    const cwd = join(fixturesPath, 'typescript', 'overrides');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['typescript.ts'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(0);
  });
});

describe('Comments', () => {
  test('should lint the ESLint comment issues', async () => {
    const cwd = join(fixturesPath, 'comments', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js', 'yaml.yaml'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(2);

    for (const result of results) {
      expect(result.messages).toHaveLength(1);
      expect(result.messages[0].ruleId).toBe('eslint-comments/disable-enable-pair');
    }
  });
});

describe('Ignores', () => {
  test('should exclude well-known directories and files from linting', async () => {
    const cwd = join(fixturesPath, 'ignores', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['package-lock.json', '.cache/javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(2);

    for (const result of results) {
      expect(result.messages).toHaveLength(1);
      expect(result.messages[0].message).toBe(fileIgnoreLintMessage);
    }
  });
});

describe('Imports', () => {
  test('should lint the import/export syntax issues in the JavaScript files', async () => {
    const cwd = join(fixturesPath, 'imports', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('import/no-self-import');
  });

  test('should lint the import/export syntax issues in the TypeScript files', async () => {
    const cwd = join(fixturesPath, 'imports', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['typescript.ts'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('import/no-self-import');
  });
});

describe('Node.js', () => {
  test('should lint the issues', async () => {
    const cwd = join(fixturesPath, 'node', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js', 'typescript.ts'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(2);

    for (const result of results) {
      expect(result.messages).toHaveLength(1);
      expect(result.messages[0].ruleId).toBe('n/prefer-global/process');
    }
  });

  test('should lint the security issues', async () => {
    const cwd = join(fixturesPath, 'node', 'security');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('security/detect-unsafe-regex');
  });

  test('should not lint the issues if the config was disabled', async () => {
    const cwd = join(fixturesPath, 'node', 'disabled');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(0);
  });

  test('should override default linting rules', async () => {
    const cwd = join(fixturesPath, 'node', 'overrides');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('n/prefer-global/url');
  });
});

describe('JSON', () => {
  test('should lint the issues in the JSON files', async () => {
    const cwd = join(fixturesPath, 'json', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['json.json'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('jsonc/quote-props');
  });

  test('should lint the issues in the JSONC files', async () => {
    const cwd = join(fixturesPath, 'json', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['jsonc.jsonc'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('jsonc/comma-dangle');
  });

  test('should sort the tsconfig.json file', async () => {
    const cwd = join(fixturesPath, 'json', 'sort');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['tsconfig.json'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('jsonc/sort-keys');
  });

  test('should sort the package.json file', async () => {
    const cwd = join(fixturesPath, 'json', 'sort');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['package.json'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('jsonc/sort-keys');
  });

  test('should not lint the issues if the config was disabled', async () => {
    const cwd = join(fixturesPath, 'json', 'disabled');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['json.json'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].message).toBe(fileIgnoreLintMessage);
  });

  test('should override default linting rules', async () => {
    const cwd = join(fixturesPath, 'json', 'overrides');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['json.json'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);

    expect(results[0].messages).toHaveLength(2);
    expect(results[0].messages[0].ruleId).toBe('jsonc/indent');
    expect(results[0].messages[1].ruleId).toBe('jsonc/key-spacing');
  });
});

describe('YAML', () => {
  test('should lint the issues in the YAML files', async () => {
    const cwd = join(fixturesPath, 'yaml', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['yaml.yaml'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('yml/quotes');
  });

  test('should lint the issues in the YML files', async () => {
    const cwd = join(fixturesPath, 'yaml', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['yaml.yml'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('yml/quotes');
  });

  test('should not lint the issues if the config was disabled', async () => {
    const cwd = join(fixturesPath, 'yaml', 'disabled');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['yaml.yaml'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].message).toBe(fileIgnoreLintMessage);
  });

  test('should override default linting rules', async () => {
    const cwd = join(fixturesPath, 'yaml', 'overrides');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['yaml.yaml'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);

    expect(results[0].messages).toHaveLength(2);
    expect(results[0].messages[0].ruleId).toBe('yml/quotes');
    expect(results[0].messages[1].ruleId).toBe('yml/plain-scalar');
  });
});

describe('TOML', () => {
  test('should lint the issues', async () => {
    const cwd = join(fixturesPath, 'toml', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['toml.toml'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('toml/array-bracket-newline');
  });

  test('should not lint the issues if the config was disabled', async () => {
    const cwd = join(fixturesPath, 'toml', 'disabled');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['toml.toml'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].message).toBe(fileIgnoreLintMessage);
  });

  test('should override default linting rules', async () => {
    const cwd = join(fixturesPath, 'toml', 'overrides');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['toml.toml'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);

    expect(results[0].messages).toHaveLength(3);
    expect(results[0].messages[0].ruleId).toBe('toml/quoted-keys');
    expect(results[0].messages[1].ruleId).toBe('toml/indent');
    expect(results[0].messages[2].ruleId).toBe('toml/indent');
  });
});

describe('unicorn', () => {
  test('should lint the issues', async () => {
    const cwd = join(fixturesPath, 'unicorn', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('unicorn/prefer-node-protocol');
  });
});

describe('stylistic', () => {
  test('should lint the issues in the Javascript files', async () => {
    const cwd = join(fixturesPath, 'stylistic', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('@stylistic/indent');
  });

  test('should lint the issues in the Typescript files', async () => {
    const cwd = join(fixturesPath, 'stylistic', 'typescript');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['typescript.ts'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('@stylistic/member-delimiter-style');
  });

  test('should not lint the issues if the config was disabled', async () => {
    const cwd = join(fixturesPath, 'stylistic', 'disabled');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(0);
  });

  test('should override default linting rules', async () => {
    const cwd = join(fixturesPath, 'stylistic', 'overrides');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);

    expect(results[0].messages).toHaveLength(2);
    expect(results[0].messages[0].ruleId).toBe('@stylistic/quotes');
    expect(results[0].messages[1].ruleId).toBe('@stylistic/semi');
  });
});

describe('Perfectionist', () => {
  test('should lint the issues', async () => {
    const cwd = join(fixturesPath, 'perfectionist', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['javascript.js'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('perfectionist/sort-objects');
  });
});

describe('Custom configs', () => {
  test('custom configs can be added', async () => {
    const cwd = join(fixturesPath, 'user-configs', 'simple');
    const eslint = new FlatESLint({ cwd });

    const filesToLint = ['yaml.yaml'];
    const results = await eslint.lintFiles(filesToLint);

    expect(results).toHaveLength(1);

    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('yml/indent');
  });
});
