/* eslint-disable import/no-anonymous-default-export */
import jest from "eslint-plugin-jest";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:testing-library/react",
    "prettier",
  ),
  {
    plugins: {
      jest,
      prettier,
    },

    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },

    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],

      "prettier/prettier": "error",
    },
  },
];
