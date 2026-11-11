import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, extname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

import stylelint from 'stylelint'

import config from '../index.js'

const testDir = dirname(fileURLToPath(import.meta.url))

// 参与“零告警”校验的文件扩展名，新增测试文件时无需改动这里
const FIXTURE_EXTENSIONS = new Set(['.css', '.html', '.scss', '.vue'])

/** 使用本配置执行 lint */
const lint = (options) => stylelint.lint({ ...options, config })

/** 把 lint 结果展开成便于断言的告警描述 */
function describeWarnings(result) {
    return result.results.flatMap(({ source, warnings }) =>
        warnings.map(({ line, column, rule, text }) => `${source}:${line}:${column} ${rule} ${text}`),
    )
}

/** 取出命中的规则名，用于断言规则仍然生效 */
function reportedRules(result) {
    return result.results.flatMap(({ warnings }) => warnings.map(({ rule }) => rule))
}

describe('stylelint-config-cmyr', () => {
    it('可以被 stylelint 正常加载', async () => {
        const result = await lint({ code: 'a { color: #fff; }' })

        assert.deepEqual(describeWarnings(result), [])
    })

    it('对全部测试文件零告警', async () => {
        const fixtures = (await readdir(testDir)).filter((name) => FIXTURE_EXTENSIONS.has(extname(name)))

        // 防止文件扩展名写错或文件被移除后，出现“没有 lint 任何文件也算通过”的假绿
        assert.ok(fixtures.length >= 4, `预期至少 4 个测试文件，实际 ${fixtures.length} 个`)

        const result = await lint({ files: fixtures.map((name) => join(testDir, name)) })

        assert.deepEqual(describeWarnings(result), [])
        assert.equal(result.results.length, fixtures.length, '存在未被 stylelint 处理的测试文件')
    })

    it('允许 Vue 单文件组件的 :deep / :global / :slotted', async () => {
        const result = await lint({
            code: '<style>.a :deep(.b) { color: #fff; } .c :global(.d) { color: #fff; } .e :slotted(.f) { color: #fff; }</style>',
            codeFilename: 'App.vue',
        })

        assert.ok(!reportedRules(result).includes('selector-pseudo-class-no-unknown'), 'Vue 伪类被误报')
    })

    it('允许空的样式块', async () => {
        const result = await lint({ code: '.empty {}' })

        assert.ok(!reportedRules(result).includes('block-no-empty'), '空样式块被误报')
    })

    it('允许 SCSS 函数与变量', async () => {
        const result = await lint({
            code: '.a { color: darken(#3498db, 10%); background-color: rgba($color, 0.2); }',
            codeFilename: 'app.scss',
        })

        assert.ok(!reportedRules(result).includes('value-no-invalid'), 'SCSS 值被 value-no-invalid 误报')
        assert.ok(!reportedRules(result).includes('function-no-unknown'), 'SCSS 函数被 function-no-unknown 误报')
    })

    // 仅验证“测试文件零告警”无法发现规则被误关，这里逐条确认关键规则仍在生效
    const enforcedRules = [
        { rule: 'color-hex-length', code: 'a { color: #ffffff; }' },
        { rule: 'alpha-value-notation', code: 'a { color: rgb(0 0 0 / 50%); }' },
        { rule: 'color-function-notation', code: 'a { color: rgba(0, 0, 0, 0.5); }' },
        { rule: 'order/order', code: 'a { color: red; --custom-property: 1; }' },
        { rule: 'selector-pseudo-class-no-unknown', code: 'a:unknown-pseudo { color: #fff; }' },
        { rule: 'scss/dollar-variable-pattern', code: '$BadName: #fff;', codeFilename: 'app.scss' },
        { rule: 'scss/at-mixin-pattern', code: '@mixin BadName { color: #fff; }', codeFilename: 'app.scss' },
        { rule: 'scss/percent-placeholder-pattern', code: '%BadName { color: #fff; }', codeFilename: 'app.scss' },
    ]

    for (const { rule, code, codeFilename } of enforcedRules) {
        it(`仍会检查 ${rule}`, async () => {
            const result = await lint({ code, codeFilename })
            const rules = reportedRules(result)

            assert.ok(rules.includes(rule), `预期命中 ${rule}，实际命中：${rules.join(', ') || '无'}`)
        })
    }

    it('构建产物可通过 require 使用', async () => {
        const require = createRequire(import.meta.url)
        const cjsConfig = require('../dist/index.cjs')

        const result = await stylelint.lint({ code: 'a { color: #fff; }', config: cjsConfig })

        assert.deepEqual(describeWarnings(result), [])
    })
})
