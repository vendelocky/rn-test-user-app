module.exports = {
  printWidth: 100,
  overrides: [
    {
      files: ['*.js'],
      options: {
        requirePragma: true,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        singleQuote: false,
        trailingComma: 'all',
      },
    },
  ],
};
