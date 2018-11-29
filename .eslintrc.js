module.exports = {
  "env": {
    node: true,
    "browser": true,
    "es6": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
 "rules": {
    indent: [ "error", 2 ],
    'linebreak-style': [ "error", "unix" ],
    quotes: [ "error", "single" ],
    semi: [ "error", "never" ],
    'no-console': 'off'
  }
};