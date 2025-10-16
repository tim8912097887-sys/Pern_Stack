// This tells Babel to compile ES modules for the current Node version,
// which is what Jest runs on.
const babelConfig = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ]
};

export default babelConfig;