# Vue 3 学习指南

一个专为 Vue 2 开发者设计的 Vue 3 系统学习项目，采用左侧菜单 + 右侧内容的交互式布局，涵盖 Vue 3 核心知识点及 Vue 2/Vue 3 对比。

## 技术栈

- **框架**: Vue 3
- **构建工具**: Vite
- **路由**: Vue Router 4
- **状态管理**: Pinia

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 内容目录

### 快速开始

- Vue 3 简介与新特性

### 基础语法

- 模板语法
- 指令系统（v-if / v-for / v-model / v-on）
- 事件处理
- 表单绑定

### 组合式 API

- setup 与 `<script setup>`
- 响应式：ref 与 reactive
- computed 与 watch / watchEffect
- 生命周期钩子
- 组合式函数（Composables）

### 组件深入

- Props 与 Emits
- 插槽 Slots
- Provide / Inject
- 动态组件与异步组件

### 高级特性

- Teleport 传送门
- Suspense 异步
- Transition 过渡动画
- 自定义指令
- 插件开发

### Vue 2 vs Vue 3 对比

- 整体变化概览
- 响应式原理对比（defineProperty vs Proxy）
- 组件 API 对比（Options API vs Composition API）
- 迁移指南

## 项目结构

```
src/
├── main.js              # 入口文件
├── App.vue              # 根组件（侧边栏布局）
├── style.css            # 全局样式
├── router/
│   └── index.js         # 路由配置
└── views/
    ├── Home.vue         # 首页
    ├── basic/           # 基础语法
    ├── composition/     # 组合式 API
    ├── components/      # 组件深入
    ├── advanced/        # 高级特性
    └── comparison/      # Vue2 vs Vue3 对比
```
