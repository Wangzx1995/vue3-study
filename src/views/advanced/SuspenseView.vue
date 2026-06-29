<template>
  <div class="content-page">
    <h1>Suspense 异步组件</h1>
    <p>
      <code>&lt;Suspense&gt;</code> 是 Vue 3
      新增的内置组件，用于协调组件树中异步依赖的加载状态。
    </p>

    <div class="tip-box warning">
      <strong>⚠️ 实验性特性</strong>
      <p>
        Suspense 目前仍是实验性特性，API
        可能会在未来版本中变化。但核心概念已经稳定，可以在项目中使用。
      </p>
    </div>

    <h2>基本用法</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;Suspense&gt;
    &lt;!-- 主要内容：包含异步组件 --&gt;
    &lt;template #default&gt;
      &lt;AsyncDashboard /&gt;
    &lt;/template&gt;

    &lt;!-- 加载中的回退内容 --&gt;
    &lt;template #fallback&gt;
      &lt;div class="loading"&gt;
        &lt;span&gt;加载中...&lt;/span&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/Suspense&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>异步 setup（Suspense 触发条件）</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;!-- AsyncDashboard.vue --&gt;
&lt;script setup&gt;
// 方式一：顶层 await（自动让组件成为异步组件）
const data = await fetch('/api/dashboard').then(r =&gt; r.json())

// 方式二：async setup
// 在 &lt;script setup&gt; 中使用顶层 await 时
// 组件会自动成为异步依赖项，被 Suspense 处理
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;{{ data.title }}&lt;/div&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>嵌套多个异步组件</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;!-- Suspense 会等待所有异步后代组件都就绪后才显示 --&gt;
  &lt;Suspense&gt;
    &lt;template #default&gt;
      &lt;div class="dashboard"&gt;
        &lt;AsyncHeader /&gt;
        &lt;AsyncSidebar /&gt;
        &lt;AsyncContent /&gt;
      &lt;/div&gt;
    &lt;/template&gt;
    &lt;template #fallback&gt;
      &lt;SkeletonLoader /&gt;
    &lt;/template&gt;
  &lt;/Suspense&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>错误处理</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { onErrorCaptured, ref } from 'vue'

const error = ref(null)

onErrorCaptured((e) => {
  error.value = e
  return false // 阻止错误继续传播
})
&lt;/script&gt;

&lt;template&gt;
  &lt;div v-if="error"&gt;出错了: {{ error.message }}&lt;/div&gt;
  &lt;Suspense v-else&gt;
    &lt;template #default&gt;
      &lt;AsyncComponent /&gt;
    &lt;/template&gt;
    &lt;template #fallback&gt;
      &lt;div&gt;加载中...&lt;/div&gt;
    &lt;/template&gt;
  &lt;/Suspense&gt;
&lt;/template&gt;</code></pre>
    </div>

    <div class="tip-box success">
      <strong>✅ 使用场景</strong>
      <p>
        1. 页面级别的数据加载（dashboard、详情页）<br />
        2. 配合 Vue Router 的异步路由组件<br />
        3. 需要统一管理多个异步组件加载状态<br />
        4. 配合 defineAsyncComponent 的骨架屏方案
      </p>
    </div>
  </div>
</template>
