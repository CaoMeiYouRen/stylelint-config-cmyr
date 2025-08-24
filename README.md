# stylelint-config-cmyr

<p align="center">
    <a href="https://github.com/CaoMeiYouRen/stylelint-config-cmyr" target="_blank">
        <img alt="Version" src="https://img.shields.io/github/package-json/v/CaoMeiYouRen/stylelint-config-cmyr" /></a>
    <a href="https://www.npmjs.com/package/stylelint-config-cmyr" target="_blank">
        <img alt="npm publish" src="https://img.shields.io/npm/dt/stylelint-config-cmyr?label=npm%20downloads&color=yellow">
    </a>
    <img alt="node-current"  src="https://img.shields.io/node/v/stylelint-config-cmyr" />
    <a href="https://github.com/CaoMeiYouRen/stylelint-config-cmyr#readme" target="_blank">
        <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" /></a>
    <a href="https://github.com/CaoMeiYouRen/stylelint-config-cmyr/graphs/commit-activity" target="_blank">
        <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" /></a>
    <a href="https://github.com/CaoMeiYouRen/stylelint-config-cmyr/blob/master/LICENSE" target="_blank">
        <img alt="License: MIT" src="https://img.shields.io/github/license/CaoMeiYouRen/stylelint-config-cmyr" /></a>
</p>

> 🎨 草梅友仁个人使用的 Stylelint 配置规范，专为现代前端项目打造

一套开箱即用的 Stylelint 配置，支持 CSS、SCSS、Vue 等多种文件格式，提供一致的代码风格和最佳实践。

## ✨ 特性

-   🚀 **开箱即用** - 预配置了常用的 Stylelint 规则
-   🎯 **多格式支持** - 支持 CSS、SCSS、SASS、Vue、HTML 文件
-   📦 **现代化配置** - 基于 `stylelint-config-standard` 和 `stylelint-config-standard-scss`
-   🔧 **灵活配置** - 针对 Vue 项目进行了特殊优化
-   🛠️ **属性排序** - 内置 CSS 属性排序规则

## 📋 支持的文件类型

-   **CSS** - 标准 CSS 文件
-   **SCSS/SASS** - Sass 预处理器文件
-   **Vue** - Vue 单文件组件中的样式
-   **HTML** - HTML 文件中的内联样式

## 🚀 快速开始

### 安装

```bash
# 使用 npm
npm install --save-dev stylelint-config-cmyr stylelint postcss

# 使用 pnpm
pnpm add -D stylelint-config-cmyr stylelint postcss

# 使用 yarn
yarn add -D stylelint-config-cmyr stylelint postcss
```

### 配置

在项目根目录创建 `.stylelintrc.js` 文件：

```javascript
/** @type {import('stylelint').Config} */
export default {
    extends: ["stylelint-config-cmyr"],
};
```

或者在 `package.json` 中配置：

```json
{
    "stylelint": {
        "extends": ["stylelint-config-cmyr"]
    }
}
```

### 使用

在 `package.json` 中添加脚本：

```json
{
    "scripts": {
        "lint:css": "stylelint \"src/**/*.{css,scss,sass,vue,html}\" --fix",
        "lint:css:check": "stylelint \"src/**/*.{css,scss,sass,vue,html}\""
    }
}
```

然后运行：

```bash
# 检查并自动修复
npm run lint:css

# 仅检查，不修复
npm run lint:css:check
```

## ⚙️ 配置说明

### 扩展的配置

本配置基于以下官方配置扩展：

-   `stylelint-config-standard` - Stylelint 标准配置
-   `stylelint-config-standard-scss` - SCSS 标准配置
-   `stylelint-config-html` - HTML 文件支持

### 插件支持

-   `stylelint-scss` - SCSS 语法支持
-   `stylelint-order` - CSS 属性排序

### 主要规则特性

#### Vue 项目优化

-   支持 Vue 组件中的 `::v-deep`、`:deep`、`:global`、`:slotted` 等伪类
-   自动处理 Vue 单文件组件的样式语法

#### SCSS 支持

-   允许 SCSS 变量和函数
-   支持嵌套语法
-   自动处理 `@import` 和 `@mixin` 规则

#### 灵活的规则设置

-   允许空的样式块（适用于组件库开发）
-   不强制要求字体族的通用关键字
-   支持 CSS 自定义属性

## 🔧 自定义配置

如需自定义规则，可以在项目中继续扩展：

```javascript
/** @type {import('stylelint').Config} */
export default {
    extends: ["stylelint-config-cmyr"],
    rules: {
        // 你的自定义规则
        "color-hex-case": "upper",
        "declaration-block-trailing-semicolon": "always",
    },
};
```

### 常用自定义场景

#### 1. 严格的命名规范

```javascript
export default {
    extends: ["stylelint-config-cmyr"],
    rules: {
        // 启用 BEM 命名规范
        "selector-class-pattern":
            "^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$",
    },
};
```

#### 2. 禁用特定规则

```javascript
export default {
    extends: ["stylelint-config-cmyr"],
    rules: {
        // 禁用属性排序
        "order/order": null,
        // 允许浏览器前缀
        "property-no-vendor-prefix": null,
    },
};
```

## 🧪 测试和验证

项目包含了完整的测试文件，确保配置的正确性：

-   `test/test.css` - 标准 CSS 测试文件
-   `test/test.scss` - SCSS 语法测试文件
-   `test/test.vue` - Vue 组件测试文件

运行测试：

```bash
# 运行内置测试
npm test

# 或者
pnpm test
```

## 💡 最佳实践

### 1. Git Hooks 集成

建议配合 `husky` 和 `lint-staged` 使用：

```json
{
    "lint-staged": {
        "*.{css,scss,sass,vue,html}": ["stylelint --fix", "git add"]
    }
}
```

### 2. VSCode 集成

安装 [Stylelint 扩展](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)，并在 `.vscode/settings.json` 中配置：

```json
{
    "stylelint.validate": ["css", "scss", "sass", "vue", "html"],
    "editor.codeActionsOnSave": {
        "source.fixAll.stylelint": true
    }
}
```

### 3. CI/CD 集成

在 GitHub Actions 中使用：

```yaml
name: Style Check
on: [push, pull_request]

jobs:
    style-check:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: actions/setup-node@v3
              with:
                  node-version: "18"
            - run: npm install
            - run: npm run lint:css:check
```


## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📝 更新日志

详细的更新日志请查看 [CHANGELOG.md](CHANGELOG.md)。

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👨‍💻 作者

**CaoMeiYouRen** ([@CaoMeiYouRen](https://github.com/CaoMeiYouRen))

-   网站: https://blog.cmyr.ltd
-   GitHub: [@CaoMeiYouRen](https://github.com/CaoMeiYouRen)

## 🙏 致谢

感谢以下项目为本配置提供的基础支持：

-   [stylelint](https://stylelint.io/) - CSS 代码检查工具
-   [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) - Stylelint 标准配置
-   [stylelint-scss](https://github.com/stylelint-scss/stylelint-scss) - SCSS 语法支持

---

<div align="center">
  如果这个项目对你有帮助，请给它一个 ⭐️
</div>
