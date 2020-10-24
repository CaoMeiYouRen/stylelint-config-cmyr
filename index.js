'use strict'
const IS_PROD = process.env.NODE_ENV === 'production' ? 2 : 0
module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
    ],
    plugins: [
        'stylelint-scss',
        'stylelint-order',
    ],
    rules: {
        indentation: [
            4,
        ],
        'at-rule-no-unknown': null,
        'no-empty-source': null,
        'font-family-no-missing-generic-family-keyword': null,
        'no-descending-specificity': null,
        'length-zero-no-unit': null,
        'block-no-empty': null,
        'declaration-block-semicolon-newline-after': null,
        'selector-list-comma-newline-after': null,
        'no-missing-end-of-source-newline': null,
        'selector-combinator-space-after': null,
        'selector-combinator-space-before': null,
    },
}