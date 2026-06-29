<template>
  <div class="content-page">
    <h1>插件开发</h1>
    <p>
      Vue 3 的插件系统与 Vue 2 类似，但全局 API 从 Vue
      构造函数移到了应用实例上。
    </p>

    <h2>插件结构</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2</div>
        <div class="code-block">
          <pre v-pre><code>// 插件定义
const MyPlugin = {
  install(Vue, options) {
    // 全局方法
    Vue.myGlobalMethod = () => {}

    // 全局指令
    Vue.directive('my-dir', {})

    // 全局混入
    Vue.mixin({})

    // 实例方法
    Vue.prototype.$myMethod = () => {}
  }
}

// 使用
Vue.use(MyPlugin, { someOption: true })</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3</div>
        <div class="code-block">
          <pre v-pre><code>// 插件定义
const MyPlugin = {
  install(app, options) {
    // 全局组件
    app.component('MyComp', {})

    // 全局指令
    app.directive('my-dir', {})

    // 全局属性（替代 prototype）
    app.config.globalProperties.$myMethod = () => {}

    // Provide（推荐方式）
    app.provide('myKey', options)
  }
}

// 使用
const app = createApp(App)
app.use(MyPlugin, { someOption: true })</code></pre>
        </div>
      </div>
    </div>

    <h2>实际插件示例</h2>
    <h3>Toast 通知插件</h3>
    <div class="code-block">
      <pre v-pre><code>// plugins/toast.js
import { createApp, ref, h } from 'vue'
import ToastComponent from './ToastComponent.vue'

const toasts = ref([])
let id = 0

function showToast(message, options = {}) {
  const toast = {
    id: id++,
    message,
    type: options.type || 'info',
    duration: options.duration || 3000
  }
  toasts.value.push(toast)

  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== toast.id)
  }, toast.duration)
}

export const ToastPlugin = {
  install(app) {
    // 方式一：全局属性
    app.config.globalProperties.$toast = showToast

    // 方式二：provide（推荐，配合 Composition API）
    app.provide('toast', { show: showToast, toasts })

    // 挂载 Toast 容器
    const container = document.createElement('div')
    document.body.appendChild(container)
    createApp(ToastComponent, { toasts }).mount(container)
  }
}

// 在组件中使用
// Options API:  this.$toast('消息', { type: 'success' })
// Composition API:
// const { show } = inject('toast')
// show('消息', { type: 'success' })</code></pre>
    </div>

    <h3>国际化插件</h3>
    <div class="code-block">
      <pre v-pre><code>// plugins/i18n.js
import { ref, computed } from 'vue'

export const I18nPlugin = {
  install(app, options = {}) {
    const locale = ref(options.defaultLocale || 'zh')
    const messages = options.messages || {}

    const t = (key) => {
      return messages[locale.value]?.[key] || key
    }

    // 全局属性
    app.config.globalProperties.$t = t

    // Provide 方式（推荐）
    app.provide('i18n', {
      locale,
      t,
      setLocale: (lang) => { locale.value = lang }
    })

    // 全局指令
    app.directive('t', {
      mounted(el, binding) {
        el.textContent = t(binding.value)
      },
      updated(el, binding) {
        el.textContent = t(binding.value)
      }
    })
  }
}

// 使用
// app.use(I18nPlugin, {
//   defaultLocale: 'zh',
//   messages: {
//     zh: { hello: '你好', bye: '再见' },
//     en: { hello: 'Hello', bye: 'Goodbye' }
//   }
// })</code></pre>
    </div>

    <h2>Vue 3 全局 API 迁移总结</h2>
    <table>
      <thead>
        <tr>
          <th>Vue 2 全局 API</th>
          <th>Vue 3 替代</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Vue.use()</td>
          <td>app.use()</td>
        </tr>
        <tr>
          <td>Vue.mixin()</td>
          <td>app.mixin()（不推荐）</td>
        </tr>
        <tr>
          <td>Vue.component()</td>
          <td>app.component()</td>
        </tr>
        <tr>
          <td>Vue.directive()</td>
          <td>app.directive()</td>
        </tr>
        <tr>
          <td>Vue.prototype.$xxx</td>
          <td>app.config.globalProperties.$xxx</td>
        </tr>
        <tr>
          <td>Vue.config.xxx</td>
          <td>app.config.xxx</td>
        </tr>
        <tr>
          <td>Vue.extend()</td>
          <td>移除（使用 defineComponent）</td>
        </tr>
        <tr>
          <td>Vue.filter()</td>
          <td>移除（使用方法/计算属性替代）</td>
        </tr>
      </tbody>
    </table>

    <div class="tip-box success">
      <strong>✅ Vue 3 插件最佳实践</strong>
      <p>
        1. 优先使用 <code>provide/inject</code> 而非全局属性<br />
        2. 避免使用全局 mixin（Vue 3 中仍可用但不推荐）<br />
        3. 充分利用 Composition API 让插件功能可组合<br />
        4. Vue 3 每个 app 实例是独立的，不再污染全局
      </p>
    </div>
  </div>
</template>
