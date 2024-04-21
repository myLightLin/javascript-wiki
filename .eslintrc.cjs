module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    "requireConfigFile": false,
    "babelOptions": {
      "presets": ["@babel/preset-env"],
    }
  },
  extends: [
    "airbnb",
  ],
  env: {
    browser: true
  },
  rules: {
    "semi": ["error", "never"],
    "no-plusplus": "off",
  }  
}