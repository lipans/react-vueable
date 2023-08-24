module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint'), 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'max-len': [1, { code: 120 }],
  },
};
