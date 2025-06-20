import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", //tắt cảnh báo import React cho React 17+
      "no-unused-vars": "warn", // Đổi từ 'error' thành 'warn'
      "react/prop-types": "off", // Tắt PropTypes nếu không cần (phổ biến khi dùng TypeScript hoặc không dùng PropTypes)
      // "no-constant-binary-expression": "off", // Tắt cảnh báo no-constant-binary-expression
    },
    settings: {
      react: {
        version: "detect", // Tự động phát hiện phiên bản React
      },
    },
  },
];
