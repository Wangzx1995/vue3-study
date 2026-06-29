<template>
  <div class="content-page">
    <h1>Vue 3 简介与新特性</h1>
    <p>
      Vue 3 于 2020 年 9 月正式发布，代号 "One
      Piece"。它从底层进行了完全重写，带来了更好的性能、更小的体积和更强大的功能。
    </p>

    <h2>为什么要升级到 Vue 3？</h2>
    <ul>
      <li>
        <strong>性能提升</strong>：重写了虚拟 DOM
        实现，编译模板优化，组件初始化更快
      </li>
      <li>
        <strong>更小的包体积</strong>：支持 Tree-shaking，核心运行时仅约 10KB
        (gzip)
      </li>
      <li><strong>Composition API</strong>：更好的逻辑复用和代码组织方式</li>
      <li>
        <strong>更好的 TypeScript 支持</strong>：源码完全用 TypeScript 重写
      </li>
      <li><strong>新特性</strong>：Fragment、Teleport、Suspense 等</li>
    </ul>

    <h2>Vue 3 核心变化一览</h2>
    <table>
      <thead>
        <tr>
          <th>特性</th>
          <th>Vue 2</th>
          <th>Vue 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>响应式系统</td>
          <td>Object.defineProperty</td>
          <td>Proxy</td>
        </tr>
        <tr>
          <td>API 风格</td>
          <td>Options API</td>
          <td>Options API + Composition API</td>
        </tr>
        <tr>
          <td>生命周期</td>
          <td>beforeCreate, created...</td>
          <td>setup() 替代，on 前缀钩子</td>
        </tr>
        <tr>
          <td>组件根节点</td>
          <td>必须单根节点</td>
          <td>支持多根节点 (Fragment)</td>
        </tr>
        <tr>
          <td>全局 API</td>
          <td>Vue.use(), Vue.mixin()</td>
          <td>app.use(), app.mixin()</td>
        </tr>
        <tr>
          <td>TypeScript</td>
          <td>有限支持</td>
          <td>完全支持</td>
        </tr>
        <tr>
          <td>状态管理</td>
          <td>Vuex</td>
          <td>Pinia（官方推荐）</td>
        </tr>
        <tr>
          <td>构建工具</td>
          <td>Vue CLI (webpack)</td>
          <td>Vite（官方推荐）</td>
        </tr>
      </tbody>
    </table>

    <h2>项目创建方式对比</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2 方式</div>
        <div class="code-block">
          <pre v-pre><code># 使用 Vue CLI
npm install -g @vue/cli
vue create my-project</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3 方式</div>
        <div class="code-block">
          <pre v-pre><code># 使用 Vite（推荐）
npm create vite@latest my-project -- --template vue
cd my-project
npm install
npm run dev</code></pre>
        </div>
      </div>
    </div>

    <div class="tip-box info">
      <strong>💡 为什么推荐 Vite？</strong>
      <p>
        Vite 利用浏览器原生 ES Module
        支持，开发服务器启动极快（毫秒级），热更新也更快。而 Webpack
        需要打包所有模块才能启动开发服务器。
      </p>
    </div>

    <h2>Vue 3 新增特性预览</h2>
    <h3>1. Composition API</h3>
    <p>最核心的新特性，提供了一种全新的组织组件逻辑的方式：</p>
    <div class="code-block">
      <span class="lang-tag">vue</span>
      <pre v-pre><code>&lt;script setup&gt;
import { ref, computed, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 计算属性
const doubled = computed(() => count.value * 2)

// 方法
const increment = () => count.value++

// 生命周期
onMounted(() => {
  console.log('组件已挂载')
})
&lt;/script&gt;</code></pre>
    </div>

    <h3>2. Fragment (多根节点)</h3>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2 - 必须单根节点</div>
        <div class="code-block">
          <pre v-pre><code>&lt;template&gt;
  &lt;div&gt; &lt;!-- 必须有一个包裹元素 --&gt;
    &lt;header&gt;...&lt;/header&gt;
    &lt;main&gt;...&lt;/main&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3 - 支持多根节点</div>
        <div class="code-block">
          <pre v-pre><code>&lt;template&gt;
  &lt;!-- 无需包裹元素 --&gt;
  &lt;header&gt;...&lt;/header&gt;
  &lt;main&gt;...&lt;/main&gt;
  &lt;footer&gt;...&lt;/footer&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
    </div>

    <h3>3. Teleport</h3>
    <p>将组件内容渲染到 DOM 的其他位置：</p>
    <div class="code-block">
      <pre v-pre><code>&lt;Teleport to="body"&gt;
  &lt;div class="modal"&gt;
    这个 Modal 会被渲染到 body 下
  &lt;/div&gt;
&lt;/Teleport&gt;</code></pre>
    </div>

    <h3>4. Suspense</h3>
    <p>处理异步组件加载状态：</p>
    <div class="code-block">
      <pre v-pre><code>&lt;Suspense&gt;
  &lt;template #default&gt;
    &lt;AsyncComponent /&gt;
  &lt;/template&gt;
  &lt;template #fallback&gt;
    &lt;LoadingSpinner /&gt;
  &lt;/template&gt;
&lt;/Suspense&gt;</code></pre>
    </div>

    <h3>5. 更好的 v-model</h3>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2 - 单个 v-model</div>
        <div class="code-block">
          <pre v-pre><code>&lt;!-- 只能有一个 v-model --&gt;
&lt;MyInput v-model="value" /&gt;

&lt;!-- 需要 .sync 修饰符 --&gt;
&lt;MyDialog :visible.sync="show" /&gt;</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3 - 多个 v-model</div>
        <div class="code-block">
          <pre v-pre><code>&lt;!-- 支持多个 v-model --&gt;
&lt;MyInput
  v-model:title="title"
  v-model:content="content"
/&gt;

&lt;!-- 移除了 .sync，统一用 v-model --&gt;
&lt;MyDialog v-model:visible="show" /&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="tip-box success">
      <strong>✅ 接下来</strong>
      <p>
        通过左侧菜单逐个学习各知识点，每个页面都包含详细讲解和实际代码示例。建议从「组合式
        API」开始深入学习。
      </p>
    </div>
  </div>
</template>
