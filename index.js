/** @type {import('stylelint').Config} */
export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-scss',
        'stylelint-config-html',
    ],
    plugins: [
        'stylelint-scss',
        'stylelint-order',
    ],
    overrides: [
        {
            files: ['**/*.vue', '**/*.html'],
            customSyntax: 'postcss-html',
        },
        {
            files: ['**/*.scss', '**/*.sass'],
            customSyntax: 'postcss-scss',
        },
    ],
    rules: {

        'at-rule-no-unknown': null,
        'no-empty-source': null,
        'font-family-no-missing-generic-family-keyword': null,
        'length-zero-no-unit': null,
        'block-no-empty': null,
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

        // SCSS 嵌套规则
        'scss/no-global-function-names': null,

        // 嵌套选择器规则
        'selector-nested-pattern': null,
        'selector-no-qualifying-type': null,
        'selector-no-vendor-prefix': null,

        // 禁用嵌套选择器缺少作用域根的检查（允许在 mixin 中使用 & 语法）
        'nesting-selector-no-missing-scoping-root': null,

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

        'alpha-value-notation': 'number', // 强制使用数字而不是百分比来表示 alpha 通道的值
        'color-hex-length': 'short', // 强制使用简写的十六进制颜色值（例如 #fff 而不是 #ffffff）
        'color-function-notation': 'modern', // 强制使用现代的颜色函数表示法（例如 rgb() 而不是 rgba()）
    },
}
