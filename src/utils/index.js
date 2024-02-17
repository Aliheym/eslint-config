const configProperties = [
  'name',
  'files',
  'ignores',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
];

export const extractEslintConfig = (options) => {
  const config = {};

  for (const property of configProperties) {
    if (Object.hasOwn(options, property)) {
      config[property] = options[property];
    }
  }

  return config;
};

export const pickOptions = (options) => (typeof options === 'object' && !!options ? options : undefined);

export const combineConfigs = async (...configs) => {
  const combinedConfigs = await Promise.all(configs);

  return combinedConfigs.flat();
};
