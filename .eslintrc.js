 module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.js"],
      env: {
        jest: true,
      },
      extends: ["@react-native-community"],
      plugins: ["react-hooks", "import"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        quotes: [
          "error",
          "double",
          {
            avoidEscape: true,
            allowTemplateLiterals: true,
          },
        ],
        "max-len": [
          "error",
          {
            code: 100,
            ignoreUrls: true,
            ignoreTrailingComments: true,
          },
        ],
        "import/no-namespace": "error",
        "import/prefer-default-export": "error",
      },
    },
  ],
};
