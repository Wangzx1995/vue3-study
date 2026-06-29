<template>
  <div class="content-page">
    <h1>Vue 2 → Vue 3 迁移指南</h1>
    <p>
      如果你有一个 Vue 2 项目需要迁移到 Vue 3，可以按照以下步骤进行。Vue 3
      提供了兼容版本来帮助平滑过渡。
    </p>

    <h2>迁移策略</h2>
    <div class="tip-box info">
      <strong>💡 推荐迁移路线</strong>
      <p>
        1. 先升级到 Vue 2.7（包含部分 Vue 3 特性的 Vue 2 版本）<br />
        2. 使用 @vue/compat 兼容构建进行渐进式迁移<br />
        3. 逐步修复兼容性警告<br />
        4. 最终切换到纯 Vue 3
      </p>
    </div>

    <h2>第一步：更新依赖</h2>
    <div class="code-block">
      <pre v-pre><code># package.json 核心依赖变更
{
  "dependencies": {
    // "vue": "^2.x"
    "vue": "^3.x",
    // "vue-router": "^3.x"
    "vue-router": "^4.x",
    // "vuex": "^3.x"
    "pinia": "^2.x"        // 推荐用 Pinia 替代 Vuex
  },
  "devDependencies": {
    // "@vue/cli-service": "^4.x"
    "vite": "^5.x",        // 推荐用 Vite 替代 webpack
    "@vitejs/plugin-vue": "^5.x"
  }
}</code></pre>
    </div>

    <h2>第二步：入口文件修改</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2 - main.js</div>
        <div class="code-block">
          <pre v-pre><code>import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3 - main.js</div>
        <div class="code-block">
          <pre v-pre><code>import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$http = axios

app.mount('#app')</code></pre>
        </div>
      </div>
    </div>

    <h2>第三步：常见代码修改</h2>
    <h3>1. 全局过滤器 → 方法/计算属性</h3>
    <div class="code-block">
      <pre v-pre><code>// Vue 2: 全局过滤器
Vue.filter('currency', (value) => '¥' + value.toFixed(2))
// 模板: {{ price | currency }}

// Vue 3: 使用方法替代
// 方案一：全局属性
app.config.globalProperties.$filters = {
  currency(value) { return '¥' + value.toFixed(2) }
}
// 模板: {{ $filters.currency(price) }}

// 方案二（推荐）：composable
function useCurrency(value) {
  return '¥' + value.toFixed(2)
}</code></pre>
    </div>

    <h3>2. EventBus → mitt</h3>
    <div class="code-block">
      <pre v-pre><code>// Vue 2
const bus = new Vue()
bus.$on('event', handler)
bus.$emit('event', data)

// Vue 3: 使用 mitt 库
import mitt from 'mitt'
const emitter = mitt()
emitter.on('event', handler)
emitter.emit('event', data)</code></pre>
    </div>

    <h3>3. Vuex → Pinia</h3>
    <div class="code-block">
      <pre v-pre><code>// Vue 2 + Vuex
const store = new Vuex.Store({
  state: { count: 0 },
  mutations: {
    increment(state) { state.count++ }
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => commit('increment'), 1000)
    }
  },
  getters: {
    doubleCount: state => state.count * 2
  }
})

// Vue 3 + Pinia
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++ },
    async asyncIncrement() {
      setTimeout(() => this.count++, 1000)
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
})

// 或使用 Composition API 风格
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() { count.value++ }
  return { count, doubleCount, increment }
})</code></pre>
    </div>

    <h3>4. Vue Router 3 → 4</h3>
    <div class="code-block">
      <pre v-pre><code>// Vue Router 3
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({ routes, mode: 'history' })

// Vue Router 4
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 组件中使用
// Vue 2: this.$router / this.$route
// Vue 3:
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()</code></pre>
    </div>

    <h2>迁移检查清单</h2>
    <table>
      <thead>
        <tr>
          <th>检查项</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Vue.filter()</td>
          <td>改为方法或计算属性</td>
        </tr>
        <tr>
          <td>$on/$off/$once</td>
          <td>改用 mitt 或 props/emit</td>
        </tr>
        <tr>
          <td>.sync 修饰符</td>
          <td>改用 v-model:xxx</td>
        </tr>
        <tr>
          <td>.native 修饰符</td>
          <td>直接移除</td>
        </tr>
        <tr>
          <td>$children</td>
          <td>改用 ref + defineExpose</td>
        </tr>
        <tr>
          <td>$listeners</td>
          <td>已合并到 $attrs</td>
        </tr>
        <tr>
          <td>v-enter CSS</td>
          <td>改为 v-enter-from</td>
        </tr>
        <tr>
          <td>data 对象</td>
          <td>确保始终是函数</td>
        </tr>
        <tr>
          <td>template 多根</td>
          <td>可选，但需检查 $attrs 继承</td>
        </tr>
        <tr>
          <td>keyCode 修饰符</td>
          <td>改用按键名（@keyup.enter）</td>
        </tr>
      </tbody>
    </table>

    <div class="tip-box success">
      <strong>✅ 迁移建议</strong>
      <p>
        1. 新项目直接使用 Vue 3<br />
        2. 老项目建议渐进式迁移，不要一步到位<br />
        3. 可以先升级到 Vue 2.7 体验 Composition API<br />
        4. 使用 gogocode 或 vue-codemod 自动化部分迁移工作<br />
        5. 关注第三方库的 Vue 3 兼容版本
      </p>
    </div>
  </div>
</template>
