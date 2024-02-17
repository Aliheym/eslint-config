import { GLOB_IGNORES } from '../constants/globs.js';

/**
 * Set the file globs to ignore during linting.
 *
 * @see {@link https://eslint.org/docs/next/use/configure/ignore | Ignore Files}
 */
export const ignores = () => [
  {
    ignores: GLOB_IGNORES,
  },
];
