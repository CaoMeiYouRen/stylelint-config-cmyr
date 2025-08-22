/** @type {import('stylelint').Config} */
export default {
    extends: [
        'stylelint-config-standard',
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
        'length-zero-no-unit': null,
        'block-no-empty': null,
        'declaration-block-semicolon-newline-after': null,
        'selector-list-comma-newline-after': null,
        'no-missing-end-of-source-newline': null,
        'selector-combinator-space-after': null,
        'selector-combinator-space-before': null,
        'scss/at-rule-no-unknown': true,

        // Vue 特有的规则
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['deep', 'global', 'slotted'],
            },
        ],

        // SCSS 变量相关
        'declaration-property-value-no-unknown': null,

        // CSS 选择器命名
        'selector-class-pattern': null,

        // CSS 特异性
        'no-descending-specificity': null,

        // 重复选择器
        'no-duplicate-selectors': null,

        // @import 规则位置
        'no-invalid-position-at-import-rule': null,

        // 添加一些基础的排序规则
        'order/properties-alphabetical-order': null,
        'order/order': [
            'custom-properties',
            'declarations',
        ],
        // @import 导入风格
        'import-notation': 'string',
    },
}
