// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  verbose: true,
  testEnvironment: "node",
  testRegex: ".*\\.test\\.mjs$",
  transform: {
    ".*\\.mjs$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "json", "jsx", "node", "mjs"],
};
