/** @type {import('jest').Config} */
const config = {
  // 1. Environment for Express/backend
  testEnvironment: 'node',

  // 2. Specify files to transform (using babel-jest)
  // This tells Jest to use babel-jest for all .js files.
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  
  // 3. IMPORTANT: Tell Jest *not* to ignore your node_modules
  // if they contain ESM-only packages (which many modern libraries do).
  // The default setting ignores all of node_modules, which breaks
  // if a dependency uses `import`.
  // The value below tells Jest to transform everything *except* node_modules.
  // **However**, if you have ESM packages in node_modules, you must
  // *override* this, or Jest will fail on those dependencies.
  // For most Express apps, keeping the default ignore is often safer:
  // transformIgnorePatterns: ['/node_modules/'],
  
  // --- ESM-specific Adjustment (If a dependency fails) ---
  // If you find that a *specific* node_module is failing due to ESM,
  // you must update this pattern to *exclude* that package from being ignored.
  // Example for a module named 'some-esm-module':
  // transformIgnorePatterns: ['/node_modules/(?!(some-esm-module)/)'],
  
  // For simplicity, let's stick with ignoring node_modules for now,
  // as the error is in your test file, not a dependency.
  transformIgnorePatterns: ['/node_modules/'],


  // 4. File patterns
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
};

export default config;