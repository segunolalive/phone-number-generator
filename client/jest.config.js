module.exports = {
  verbose: true,
  collectCoverage: true,
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],

  collectCoverageFrom: ["<rootDir>/src/*.{vue}", "!<rootDir>/node_modules/**"],

  moduleFileExtensions: ["js", "json", "vue", "jsx"],

  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },

  transformIgnorePatterns: ["<rootDir>/node_modules/"],

  snapshotSerializers: ["jest-serializer-vue"],

  testMatch: [
    "<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],

  testURL: "http://localhost/"
};
