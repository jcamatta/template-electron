// @ts-check

import path from "node:path";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tseslint from "typescript-eslint";

const kebabCaseFilePattern =
  /^[a-z0-9]+(?:-[a-z0-9]+)*(\.test)?(\.d)?\.(ts|tsx|mts|cts)$/;
const componentFilePattern = /^[A-Z][A-Za-z0-9]*\.tsx$/;
const hookFilePattern = /^use[A-Z][A-Za-z0-9]*\.(ts|tsx)$/;
const kebabCaseFolderPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const componentFolderPattern = /^[A-Z][A-Za-z0-9]*$/;
const hookFolderPattern = /^use[A-Z][A-Za-z0-9]*$/;

/**
 * @param {string} fullPath
 */
const getParentFolderName = (fullPath) => path.basename(path.dirname(fullPath));

/**
 * @param {(filename: string, fullPath: string) => boolean} isValid
 * @param {string} message
 * @returns {import("eslint").Rule.RuleModule}
 */
const createFilenameConventionRule = (isValid, message) => ({
  meta: {
    type: /** @type {const} */ ("problem"),
    docs: {
      description: "enforce filename conventions",
    },
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        const fullPath = /** @type {{ filename: string }} */ (context).filename;
        const filename = path.basename(fullPath);

        if (!isValid(filename, fullPath)) {
          context.report({
            node,
            message,
          });
        }
      },
    };
  },
});

/** @type {import("eslint").ESLint.Plugin} */
const localRulesPlugin = {
  rules: {
    "filename-kebab-case": createFilenameConventionRule(
      (filename, fullPath) =>
        kebabCaseFilePattern.test(filename) ||
        ((filename === "index.ts" || filename === "index.test.ts") &&
          kebabCaseFolderPattern.test(getParentFolderName(fullPath))),
      "Filename must use kebab-case.",
    ),
    "filename-component": createFilenameConventionRule(
      (filename, fullPath) =>
        componentFilePattern.test(filename) ||
        (filename === "index.tsx" &&
          componentFolderPattern.test(getParentFolderName(fullPath))),
      "Component filenames must use PascalCase in the format ComponentName.tsx.",
    ),
    "filename-hook": createFilenameConventionRule(
      (filename, fullPath) =>
        hookFilePattern.test(filename) ||
        ((filename === "index.ts" || filename === "index.tsx") &&
          hookFolderPattern.test(getParentFolderName(fullPath))),
      "Hook filenames must use the format useHookName.ts or useHookName.tsx.",
    ),
  },
};

export default defineConfig(
  {
    ignores: ["dist/**", ".vite/**", "out/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    plugins: {
      local: localRulesPlugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    ignores: ["**/*.d.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSInterfaceDeclaration",
          message:
            "Use `type` by default. `interface` is only allowed in declaration files or when explicitly required.",
        },
      ],
    },
  },
  {
    files: ["src/frontend/**/hooks/**/*.{ts,tsx}"],
    rules: {
      "local/filename-hook": "error",
    },
  },
  {
    files: ["src/frontend/**/*.tsx"],
    ignores: ["src/frontend/**/hooks/**/*.{ts,tsx}"],
    rules: {
      "local/filename-component": "error",
    },
  },
  {
    files: ["src/frontend/**/*.{ts,mts,cts}", "src/frontend/**/*.d.ts"],
    ignores: ["src/frontend/**/hooks/**/*.{ts,tsx}"],
    rules: {
      "local/filename-kebab-case": "error",
    },
  },
  {
    files: ["src/frontend/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='button']",
          message:
            "Use the Base UI Button primitive instead of a raw <button>.",
        },
        {
          selector: "JSXOpeningElement[name.name='input']",
          message:
            "Use the appropriate Base UI primitive instead of a raw <input>.",
        },
        {
          selector: "JSXOpeningElement[name.name='select']",
          message:
            "Use the Base UI Select primitive instead of a raw <select>.",
        },
        {
          selector: "JSXOpeningElement[name.name='textarea']",
          message:
            "Use the appropriate Base UI primitive instead of a raw <textarea>.",
        },
      ],
    },
  },
  {
    files: ["src/backend/**/*.{ts,tsx,mts,cts}"],
    rules: {
      "local/filename-kebab-case": "error",
    },
  },
  {
    files: ["src/backend/**/core/**/*.{ts,tsx,mts,cts}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/inbound/**"],
              message:
                "Core code must not import inbound code. Respect onion dependency direction.",
            },
            {
              group: ["**/outbound/**"],
              message:
                "Core code must not import outbound code. Respect onion dependency direction.",
            },
            {
              group: [
                "../shared/**",
                "../../shared/**",
                "../../../shared/**",
                "../../../../shared/**",
                "src/shared/**",
              ],
              message:
                "Core code must not import root shared IPC contracts. Respect onion dependency direction.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/shared/**/*.{ts,tsx,mts,cts}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "../backend/**",
                "../../backend/**",
                "../../../backend/**",
                "src/backend/**",
              ],
              message:
                "Root shared code must not import backend code. Shared contracts must stay independent.",
            },
            {
              group: [
                "../frontend/**",
                "../../frontend/**",
                "../../../frontend/**",
                "src/frontend/**",
              ],
              message:
                "Root shared code must not import frontend code. Shared contracts must stay independent.",
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
);
