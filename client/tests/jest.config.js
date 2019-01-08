module.exports = {
  globals: {
    window: true
  },
  verbose: true,
  collectCoverage: true,
  testPathIgnorePatterns: ["./node_modules/"],
  setupTestFrameworkScriptFile: "./tests/setupTest.js",
  collectCoverageFrom: ["../src"],
  moduleFileExtensions: ["js", "vue"]
};
