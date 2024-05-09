import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from "eslint-config-prettier";

export default withNuxt({
  files: ['**/*.ts', '**/*.tsx'],
}).append(eslintConfigPrettier)