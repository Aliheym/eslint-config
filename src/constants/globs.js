export const GLOB_IGNORES = [
  // exclude git directory, which contains the project's version control information
  '.git/',
  // excludes the 'node_modules' directory, which contains the installed package dependencies
  '**/node_modules/',
  // excludes the 'dist' directory, typically used for the output of a build process
  '**/dist/',
  // excludes the 'dist' directory, typically used for the output of a build process
  '**/build/',
  // excludes the 'package-lock.json' file, which locks the installed `npm` package versions
  '**/package-lock.json',
  // excludes the 'yarn.lock' file, which locks the installed `yarn` package versions
  '**/yarn.lock',
  // excludes the 'pnpm-lock.yaml' file, which locks the installed `pnpm` package versions
  '**/pnpm-lock.yaml',
  // excludes the 'bun.lockb' file, used by Bun package manager to lock package versions
  '**/bun.lockb',
  // excludes the 'output' and '.output' directories, often used for generated output files
  '**/output/',
  '**/.output/',
  // excludes the 'coverage' directory, which contains code coverage reports
  '**/coverage/',
  // excludes the 'temp', '.temp', 'tmp' and '.tmp' directories,
  // the common temporary file storage locations
  '**/temp/',
  '**/.temp/',
  '**/tmp/',
  '**/.tmp/',
  // excludes the '.history' directory, often used by editors to store file history
  '**/.history/',
  // excludes the '.changeset' directory, used for managing project versioning and changelogs
  '**/.changeset/',
  // excludes the '.idea' directory, which contains JetBrains IDE settings
  '**/.idea/',
  // excludes the '.cache' directory, a general cache storage location
  '**/.cache/',
  // excludes CHANGELOG markdown files, which document the history of changes in the project
  '**/CHANGELOG*.md',
  // excludes files that are minified versions of larger files, typically JavaScript or CSS
  '**/*.min.*',
  // excludes LICENSE files, which contain the licensing information for the project
  '**/LICENSE*',
];

export const GLOB_YAML = '**/*.y?(a)ml';

export const GLOB_JSON = '**/*.json?(c)';

export const GLOB_TOML = '**/*.toml';

export const GLOB_PACKAGE_JSON = '**/package.json';

export const GLOB_TS_CONFIG = '**/tsconfig.json';

export const GLOB_TS_ANY_CONFIG = '**/tsconfig.*.json';
