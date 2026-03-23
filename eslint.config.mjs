const eslintConfig = {
  extends: ["next/core-web-vitals", "next/typescript"],
  ignorePatterns: [
    ".next/**",
    "out/**", 
    "build/**",
    "next-env.d.ts",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx", 
    "e2e/**",
    "playwright.config.ts",
    "jest.config.js",
    "jest.setup.js",
  ],
};

export default eslintConfig;
