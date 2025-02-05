import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	{
		ignores: ['src/**/*.test.ts']
	},
	...compat.extends('plugin:prettier/recommended', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'),
	{
		plugins: {
			'@typescript-eslint': typescriptEslint,
			import: fixupPluginRules(_import),
			prettier
		},

		languageOptions: {
			globals: {
				...globals.node
			},

			ecmaVersion: 'latest',
			sourceType: 'module',

			parserOptions: {
				project: './tsconfig.json'
			}
		},

		rules: {
			'prettier/prettier': 'error',
			camelcase: 'error',
			'spaced-comment': 'error',
			quotes: ['error', 'single'],
			'no-duplicate-imports': 'error',
			'no-unused-vars': 'off',
			'no-magic-numbers': 'off',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/strict-boolean-expressions': 'off',
			'@typescript-eslint/no-extraneous-class': 'off',
			'@typescript-eslint/no-magic-numbers': 'error'
		}
	}
];
