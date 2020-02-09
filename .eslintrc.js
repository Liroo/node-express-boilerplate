module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true,
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "rules": {
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
  },
};