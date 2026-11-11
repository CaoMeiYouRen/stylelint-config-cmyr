/** @type {import('stylelint').Config} */
export default {
    extends: [
        'stylelint-config-standard',
        // stylelint-config-standard-scss 目前依赖 stylelint-config-standard@40，
        // 尚未兼容 stylelint 18（含已移除的 declaration-block-single-line-max-declarations）。
        // 这里改为组合 standard + recommended-scss，并保留 standard-scss 的附加规则。
        // 待 https://github.com/stylelint-scss/stylelint-config-standard-scss/issues/297 修复后可换回。
        'stylelint-config-recommended-scss',
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

        // 原 stylelint-config-standard-scss 于 standard + recommended-scss 之上追加的规则
        'at-rule-empty-line-before': [
            'always',
            {
                except: ['blockless-after-blockless', 'first-nested'],
                ignore: ['after-comment'],
                ignoreAtRules: ['else'],
            },
        ],
        'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
        'scss/at-else-closing-brace-space-after': 'always-intermediate',
        'scss/at-else-empty-line-before': 'never',
        'scss/at-else-if-parentheses-space-before': 'always',
        'scss/at-function-parentheses-space-before': 'never',
        'scss/at-function-pattern': [
            '^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
            {
                message: (name) => `Expected function name "${name}" to be kebab-case`,
            },
        ],
        'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
        'scss/at-if-closing-brace-space-after': 'always-intermediate',
        'scss/at-mixin-argumentless-call-parentheses': 'never',
        'scss/at-mixin-parentheses-space-before': 'never',
        'scss/at-mixin-pattern': [
            '^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
            {
                message: (name) => `Expected mixin name "${name}" to be kebab-case`,
            },
        ],
        'scss/at-rule-conditional-no-parentheses': true,
        'scss/dollar-variable-colon-space-after': 'always-single-line',
        'scss/dollar-variable-colon-space-before': 'never',
        'scss/dollar-variable-empty-line-before': [
            'always',
            {
                except: ['after-dollar-variable', 'first-nested'],
                ignore: ['after-comment', 'inside-single-line-block'],
            },
        ],
        'scss/dollar-variable-pattern': [
            '^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
            {
                message: (name) => `Expected variable name "${name}" to be kebab-case`,
            },
        ],
        'scss/double-slash-comment-empty-line-before': [
            'always',
            {
                except: ['first-nested'],
                ignore: ['between-comments', 'stylelint-commands'],
            },
        ],
        'scss/double-slash-comment-whitespace-inside': 'always',
        'scss/percent-placeholder-pattern': [
            '^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
            {
                message: (name) => `Expected placeholder name "${name}" to be kebab-case`,
            },
        ],

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

        // stylelint 18 新增的 CSS 值校验无法识别 SCSS 函数/变量（如 darken($color, 10%)、rgba($color, 0.2)）
        'value-no-invalid': null,

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
