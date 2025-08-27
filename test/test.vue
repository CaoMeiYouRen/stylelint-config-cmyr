<template>
    <div class="test-component">
        <!-- 头部区域 -->
        <header class="header">
            <h1 class="title">测试组件</h1>
            <p class="subtitle">这是一个用于测试 stylelint-config-cmyr 的 Vue 组件</p>
        </header>

        <!-- 主要内容区域 -->
        <main class="main-content">
            <div class="card-container">
                <div class="card" v-for="item in items" :key="item.id">
                    <div class="card-header">
                        <h3 class="card-title">{{ item.title }}</h3>
                    </div>
                    <div class="card-body">
                        <p class="card-text">{{ item.description }}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" @click="handleClick(item.id)">
                            点击我
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <!-- 底部区域 -->
        <footer class="footer">
            <p>&copy; 2025 测试组件</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'TestComponent',
    data() {
        return {
            items: [
                {
                    id: 1,
                    title: '第一个卡片',
                    description: '这是第一个测试卡片的描述内容'
                },
                {
                    id: 2,
                    title: '第二个卡片',
                    description: '这是第二个测试卡片的描述内容'
                },
                {
                    id: 3,
                    title: '第三个卡片',
                    description: '这是第三个测试卡片的描述内容'
                }
            ]
        }
    },
    methods: {
        handleClick(id) {
            console.log(`点击了 ID 为 ${id} 的卡片`)
        }
    }
}
</script>

<style scoped>
/* 组件根样式 */
.test-component {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: "Helvetica Neue", Arial, sans-serif;
}

/* 头部样式 */
.header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e1e8ed;
}

.title {
    font-size: 2.5em;
    font-weight: bold;
    color: #3498db;
    margin-bottom: 10px;
}

.subtitle {
    font-size: 1.2em;
    color: #7f8c8d;
    margin: 0;
}

/* 主要内容区域 */
.main-content {
    margin-bottom: 40px;
}

.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

/* 卡片样式 */
.card {
    background-color: #fff;
    border: 1px solid #e1e8ed;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgb(0 0 0 / 0.15);
}

.card-header {
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e1e8ed;
}

.card-title {
    font-size: 1.3em;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
}

.card-body {
    margin-bottom: 16px;
}

.card-text {
    line-height: 1.6;
    color: #555;
    margin: 0;
}

.card-footer {
    text-align: right;
}

/* 按钮样式 */
.btn {
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: #3498db;
    color: #fff;
}

.btn-primary:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
}

.btn-primary:active {
    transform: translateY(0);
}

/* 底部样式 */
.footer {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #e1e8ed;
    color: #7f8c8d;
}

.footer p {
    margin: 0;
    font-size: 0.9em;
}

/* 响应式设计 */
@media (width <= 768px) {
    .test-component {
        padding: 10px;
    }

    .title {
        font-size: 2em;
    }

    .card-container {
        grid-template-columns: 1fr;
    }

    .card {
        padding: 16px;
    }
}

/* Vue 特有的伪类支持 */
.card :deep(.nested-content) {
    color: #666;
}

.card :global(.global-style) {
    font-weight: bold;
}

.card :slotted(.slot-content) {
    font-style: italic;
}
</style>
