module.exports = {
  plugins: [
    'stylelint-csstree-validator',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-htmlacademy',
    'stylelint-config-css-modules',
  ],
  ignoreFiles: [
    '**/*.tsx',
  ],
  rules: {
    'function-url-quotes':                       'always',
    'string-quotes':                             'double',
    'no-empty-source':                           null,
    'at-rule-no-unknown':                        null,
    'no-descending-specificity':                 null,
    'selector-list-comma-newline-after':         null,
    'color-hex-length':                          'short',
    'value-keyword-case':                        null,
    'max-nesting-depth':                         null,
    'max-empty-lines':                           1,
    'declaration-block-no-duplicate-properties': [true, { ignoreProperties: ['composes'] }],
  },
};
