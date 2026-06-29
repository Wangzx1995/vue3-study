<template>
  <div class="app-container">
    <aside class="sidebar">
      <div class="logo">
        <h1>Vue3 学习指南</h1>
        <p class="subtitle">从 Vue2 到 Vue3</p>
      </div>
      <nav class="nav-menu">
        <div class="menu-group" v-for="group in menuGroups" :key="group.title">
          <h3 class="group-title" @click="toggleGroup(group.title)">
            <span class="icon">{{ group.icon }}</span>
            {{ group.title }}
            <span
              class="arrow"
              :class="{ expanded: expandedGroups.includes(group.title) }"
              >▶</span
            >
          </h3>
          <ul v-show="expandedGroups.includes(group.title)">
            <li v-for="item in group.items" :key="item.path">
              <router-link :to="item.path" active-class="active">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const expandedGroups = ref([
  "快速开始",
  "基础语法",
  "组合式 API",
  "组件深入",
  "高级特性",
  "Vue2 vs Vue3",
]);

const toggleGroup = (title) => {
  const index = expandedGroups.value.indexOf(title);
  if (index > -1) {
    expandedGroups.value.splice(index, 1);
  } else {
    expandedGroups.value.push(title);
  }
};

const menuGroups = [
  {
    title: "快速开始",
    icon: "🚀",
    items: [
      { name: "首页概览", path: "/" },
      { name: "Vue3 简介与新特性", path: "/basic/introduction" },
    ],
  },
  {
    title: "基础语法",
    icon: "📖",
    items: [
      { name: "模板语法", path: "/basic/template-syntax" },
      { name: "指令系统", path: "/basic/directives" },
      { name: "事件处理", path: "/basic/events" },
      { name: "表单绑定", path: "/basic/forms" },
    ],
  },
  {
    title: "组合式 API",
    icon: "⚡",
    items: [
      { name: "setup 与 script setup", path: "/composition/setup" },
      { name: "响应式: ref 与 reactive", path: "/composition/reactive" },
      { name: "computed 与 watch", path: "/composition/computed-watch" },
      { name: "生命周期钩子", path: "/composition/lifecycle" },
      { name: "组合式函数 (Composables)", path: "/composition/composables" },
    ],
  },
  {
    title: "组件深入",
    icon: "🧩",
    items: [
      { name: "Props 与 Emits", path: "/components/props-emits" },
      { name: "插槽 Slots", path: "/components/slots" },
      { name: "Provide / Inject", path: "/components/provide-inject" },
      { name: "动态组件与异步组件", path: "/components/dynamic-async" },
    ],
  },
  {
    title: "高级特性",
    icon: "🔥",
    items: [
      { name: "Teleport 传送门", path: "/advanced/teleport" },
      { name: "Suspense 异步", path: "/advanced/suspense" },
      { name: "Transition 动画", path: "/advanced/transition" },
      { name: "自定义指令", path: "/advanced/custom-directives" },
      { name: "插件开发", path: "/advanced/plugins" },
    ],
  },
  {
    title: "Vue2 vs Vue3",
    icon: "🔄",
    items: [
      { name: "整体变化概览", path: "/comparison/overview" },
      { name: "响应式原理对比", path: "/comparison/reactivity" },
      { name: "组件 API 对比", path: "/comparison/component-api" },
      { name: "迁移指南", path: "/comparison/migration" },
    ],
  },
];
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 280px;
  background: #1a1a2e;
  color: #e0e0e0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
}

.logo {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.logo h1 {
  font-size: 20px;
  color: #42b883;
  margin: 0;
}

.logo .subtitle {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

.nav-menu {
  padding: 12px 0;
}

.menu-group {
  margin-bottom: 4px;
}

.group-title {
  padding: 10px 20px;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}

.group-title:hover {
  background: rgba(255, 255, 255, 0.05);
}

.group-title .icon {
  font-size: 16px;
}

.group-title .arrow {
  margin-left: auto;
  font-size: 10px;
  transition: transform 0.3s;
}

.group-title .arrow.expanded {
  transform: rotate(90deg);
}

.menu-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-group ul li a {
  display: block;
  padding: 8px 20px 8px 48px;
  color: #aaa;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.menu-group ul li a:hover {
  color: #fff;
  background: rgba(66, 184, 131, 0.1);
}

.menu-group ul li a.active {
  color: #42b883;
  background: rgba(66, 184, 131, 0.15);
  border-left-color: #42b883;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 40px;
  background: #f8f9fa;
  min-height: 100vh;
}
</style>
