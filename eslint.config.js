// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['app/**/*.tsx', 'app/**/*.ts'],
    rules: {
      'import/no-unused-modules': 'off',
    },
  },
]);
