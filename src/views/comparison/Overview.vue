<template>
  <div class="content-page">
    <h1>Vue 2 vs Vue 3 整体变化概览</h1>
    <p>
      Vue 3 相对于 Vue 2 是一次重大升级，从底层架构到上层 API
      都有大量变化。这里做一个全面的概览。
    </p>

    <h2>架构层面变化</h2>
    <table>
      <thead>
        <tr>
          <th>方面</th>
          <th>Vue 2</th>
          <th>Vue 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>源码语言</td>
          <td>JavaScript (Flow)</td>
          <td>TypeScript</td>
        </tr>
        <tr>
          <td>代码架构</td>
          <td>单体结构</td>
          <td>Monorepo（模块化）</td>
        </tr>
        <tr>
          <td>响应式</td>
          <td>Object.defineProperty</td>
          <td>Proxy</td>
        </tr>
        <tr>
          <td>虚拟 DOM</td>
          <td>无优化标记</td>
          <td>静态提升、Patch Flags</td>
        </tr>
        <tr>
          <td>Tree-shaking</td>
          <td>不支持</td>
          <td>完全支持</td>
        </tr>
        <tr>
          <td>TypeScript</td>
          <td>有限支持</td>
          <td>原生支持</td>
        </tr>
      </tbody>
    </table>

    <h2>API 层面变化</h2>
    <h3>新增的</h3>
    <ul>
      <li>
        <span class="tag new">新增</span> Composition
        API（setup、ref、reactive、computed...）
      </li>
      <li><span class="tag new">新增</span> &lt;script setup&gt; 语法糖</li>
      <li><span class="tag new">新增</span> Teleport 组件</li>
      <li><span class="tag new">新增</span> Suspense 组件</li>
      <li><span class="tag new">新增</span> Fragment（多根节点）</li>
      <li><span class="tag new">新增</span> defineAsyncComponent</li>
      <li><span class="tag new">新增</span> 多个 v-model</li>
      <li><span class="tag new">新增</span> emits 选项声明</li>
      <li><span class="tag new">新增</span> createApp 应用实例</li>
    </ul>

    <h3>移除的</h3>
    <ul>
      <li><span class="tag deprecated">移除</span> Vue.extend()</li>
      <li>
        <span class="tag deprecated">移除</span> Vue.filter()（全局过滤器）
      </li>
      <li>
        <span class="tag deprecated">移除</span> $on, $off, $once（事件总线）
      </li>
      <li>
        <span class="tag deprecated">移除</span> .sync 修饰符（用 v-model:
        替代）
      </li>
      <li><span class="tag deprecated">移除</span> .native 修饰符</li>
      <li><span class="tag deprecated">移除</span> $children</li>
      <li>
        <span class="tag deprecated">移除</span> $listeners（合并到 $attrs）
      </li>
      <li>
        <span class="tag deprecated">移除</span> 按键码修饰符（@keyup.13）
      </li>
      <li><span class="tag deprecated">移除</span> 内联模板 inline-template</li>
    </ul>

    <h3>改变的</h3>
    <ul>
      <li>
        <span class="tag changed">变化</span> v-model 默认 prop/event 变为
        modelValue/update:modelValue
      </li>
      <li><span class="tag changed">变化</span> v-for 与 v-if 优先级翻转</li>
      <li>
        <span class="tag changed">变化</span> 生命周期钩子重命名（beforeDestroy
        → beforeUnmount）
      </li>
      <li><span class="tag changed">变化</span> 自定义指令钩子名称改变</li>
      <li>
        <span class="tag changed">变化</span> Transition CSS 类名（v-enter →
        v-enter-from）
      </li>
      <li>
        <span class="tag changed">变化</span> $attrs 现在包含 class 和 style
      </li>
      <li><span class="tag changed">变化</span> data 必须始终是函数</li>
      <li>
        <span class="tag changed">变化</span> 异步组件需要 defineAsyncComponent
        包裹
      </li>
    </ul>

    <h2>生态系统变化</h2>
    <table>
      <thead>
        <tr>
          <th>工具/库</th>
          <th>Vue 2 时代</th>
          <th>Vue 3 时代</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>构建工具</td>
          <td>Vue CLI (Webpack)</td>
          <td>Vite（官方推荐）</td>
        </tr>
        <tr>
          <td>状态管理</td>
          <td>Vuex 3/4</td>
          <td>Pinia（官方推荐）</td>
        </tr>
        <tr>
          <td>路由</td>
          <td>Vue Router 3</td>
          <td>Vue Router 4</td>
        </tr>
        <tr>
          <td>开发工具</td>
          <td>Vue DevTools 5.x</td>
          <td>Vue DevTools 6.x</td>
        </tr>
        <tr>
          <td>IDE 支持</td>
          <td>Vetur</td>
          <td>Volar → Vue Official</td>
        </tr>
        <tr>
          <td>SSR</td>
          <td>Nuxt 2</td>
          <td>Nuxt 3</td>
        </tr>
        <tr>
          <td>UI 库</td>
          <td>Element UI</td>
          <td>Element Plus</td>
        </tr>
      </tbody>
    </table>

    <h2>性能对比</h2>
    <div class="tip-box success">
      <strong>✅ Vue 3 性能优化</strong>
      <p>
        1. 初始渲染速度提升约 55%<br />
        2. 更新速度提升约 133%<br />
        3. 内存使用减少约 54%<br />
        4. 打包后体积减少约 41%（Tree-shaking）<br />
        （数据来源：Vue 3 官方发布数据）
      </p>
    </div>
  </div>
</template>
