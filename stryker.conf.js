module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'yarn',
    reporters: ['clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    transpilers: [],
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    mutate: [
      "src/**/*.ts",
      "src/**/*.tsx",
      "!src/**/*.d.ts",
      "!src/**/*.spec.ts",
      "!dist/**/*",
      "!coverage/**/*",
      "!node_modules/**/*",
    ],
    maxConcurrentTestRunners: 1,
    command: 'test'
  });
};
