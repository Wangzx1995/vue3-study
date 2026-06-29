<template>
  <div class="content-page">
    <h1>动态组件与异步组件</h1>
    <p>Vue 3 对动态组件的使用保持了兼容，但异步组件的定义方式发生了变化。</p>

    <h2>动态组件</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { ref, shallowRef } from 'vue'
import TabHome from './TabHome.vue'
import TabProfile from './TabProfile.vue'
import TabSettings from './TabSettings.vue'

const tabs = { TabHome, TabProfile, TabSettings }
const currentTab = shallowRef(TabHome)  // 用 shallowRef 避免深度响应式
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="tabs"&gt;
    &lt;button
      v-for="(comp, name) in tabs"
      :key="name"
      @click="currentTab = comp"
    &gt;
      {{ name }}
    &lt;/button&gt;
  &lt;/div&gt;

  &lt;!-- 动态组件 --&gt;
  &lt;component :is="currentTab" /&gt;

  &lt;!-- 配合 keep-alive 缓存 --&gt;
  &lt;KeepAlive&gt;
    &lt;component :is="currentTab" /&gt;
  &lt;/KeepAlive&gt;

  &lt;!-- keep-alive 配置 --&gt;
  &lt;KeepAlive :include="['TabHome', 'TabProfile']" :max="5"&gt;
    &lt;component :is="currentTab" /&gt;
  &lt;/KeepAlive&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>异步组件</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2</div>
        <div class="code-block">
          <pre v-pre><code>// 简单异步
const AsyncComp = () => import('./MyComp.vue')

// 高级配置
const AsyncComp = () => ({
  component: import('./MyComp.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  delay: 200,
  timeout: 3000
})</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3</div>
        <div class="code-block">
          <pre v-pre><code>import { defineAsyncComponent } from 'vue'

// 简单异步
const AsyncComp = defineAsyncComponent(
  () => import('./MyComp.vue')
)

// 高级配置
const AsyncComp = defineAsyncComponent({
  loader: () => import('./MyComp.vue'),
  loadingComponent: Loading,
  errorComponent: Error,
  delay: 200,
  timeout: 3000,
  suspensible: false,
  onError(error, retry, fail, attempts) {
    if (attempts <= 3) {
      retry() // 重试
    } else {
      fail()
    }
  }
})</code></pre>
        </div>
      </div>
    </div>

    <h2>配合 Suspense 使用</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;Suspense&gt;
    &lt;template #default&gt;
      &lt;AsyncComponent /&gt;
    &lt;/template&gt;
    &lt;template #fallback&gt;
      &lt;div&gt;加载中...&lt;/div&gt;
    &lt;/template&gt;
  &lt;/Suspense&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(
  () => import('./HeavyComponent.vue')
)
&lt;/script&gt;</code></pre>
    </div>

    <div class="tip-box info">
      <strong>💡 关键变化</strong>
      <p>
        1. Vue 3 使用 <code>defineAsyncComponent</code> 明确标识异步组件<br />
        2. 高级配置中 <code>component</code> 选项改为 <code>loader</code><br />
        3. 新增 <code>onError</code> 回调，支持错误重试<br />
        4. 新增 <code>suspensible</code> 选项控制是否受 Suspense 管理<br />
        5. 动态组件中推荐使用 <code>shallowRef</code> 存储组件引用
      </p>
    </div>
  </div>
</template>
