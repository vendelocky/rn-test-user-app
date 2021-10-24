const {defaults} = require("jest-config");

// noinspection JSUnresolvedVariable
module.exports = {
  preset: "react-native",
  collectCoverageFrom: [`<rootDir>/app/**/*.{${defaults.moduleFileExtensions.join(", ")}}`],
  coveragePathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|@react-navigation|react-native-vector-icons)/)",
  ],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
  },
  setupFiles: ["<rootDir>/jest/setup.js"],
};
