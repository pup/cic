module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8
  },
  "env": {
    "browser": true
  },
  "globals": {
    "window": "readonly",
    "Promise": "readonly",
    "setTimeout": "readonly",
    "module": "readonly",
    "require": "readonly",
    "clearTimeout": "readonly"
  },
  "rules": {
    "no-unused-vars": 1,
    "strict": 0
  }
};