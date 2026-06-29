<template>
  <div class="content-page">
    <h1>组合式函数 (Composables)</h1>
    <p>
      Composables 是 Vue 3 中逻辑复用的核心模式，类似于 Vue 2 中 Mixins
      的升级替代方案，但更加灵活和清晰。
    </p>

    <h2>什么是 Composable</h2>
    <p>
      Composable 是一个利用 Vue Composition API
      来封装和复用有状态逻辑的函数。命名约定以 <code>use</code> 开头。
    </p>

    <h2>Vue 2 Mixins 的问题</h2>
    <div class="code-block">
      <pre v-pre><code>// Vue 2 Mixin 的三大痛点：

// 1. 命名冲突 - 多个 mixin 可能有同名属性
const mixinA = { data() { return { count: 0 } } }
const mixinB = { data() { return { count: 100 } } }
// 哪个 count 会被使用？不确定！

// 2. 来源不清晰 - 模板中的属性不知道来自哪个 mixin
// this.someData 到底是组件的？还是 mixin 的？

// 3. 隐式依赖 - mixin 之间可能相互依赖
// 维护困难，重构风险大</code></pre>
    </div>

    <h2>Composable 基础示例</h2>
    <div class="code-block">
      <pre v-pre><code>// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubled = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = initialValue
  }

  return {
    count,
    doubled,
    increment,
    decrement,
    reset
  }
}

// 在组件中使用
// &lt;script setup&gt;
// import { useCounter } from '@/composables/useCounter'
// const { count, doubled, increment, reset } = useCounter(10)
// &lt;/script&gt;</code></pre>
    </div>

    <h2>实用 Composable 示例</h2>
    <h3>1. useMouse - 鼠标位置追踪</h3>
    <div class="code-block">
      <pre v-pre><code>// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}</code></pre>
    </div>

    <h3>2. useFetch - 数据请求</h3>
    <div class="code-block">
      <pre v-pre><code>// composables/useFetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function fetchData() {
    loading.value = true
    error.value = null
    
    try {
      const res = await fetch(toValue(url)) // toValue 支持 ref/getter/值
      data.value = await res.json()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // 如果 url 是响应式的，自动重新请求
  watchEffect(() => {
    fetchData()
  })

  return { data, error, loading, refetch: fetchData }
}

// 使用
// const { data, loading, error } = useFetch('/api/users')
// const { data } = useFetch(() => `/api/user/${id.value}`) // 响应式 URL</code></pre>
    </div>

    <h3>3. useLocalStorage - 本地存储</h3>
    <div class="code-block">
      <pre v-pre><code>// composables/useLocalStorage.js
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  const data = ref(stored ? JSON.parse(stored) : defaultValue)

  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return data
}

// 使用
// const theme = useLocalStorage('theme', 'light')
// theme.value = 'dark' // 自动同步到 localStorage</code></pre>
    </div>

    <h3>4. useEventListener - 事件监听</h3>
    <div class="code-block">
      <pre v-pre><code>// composables/useEventListener.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  onMounted(() => {
    target.addEventListener(event, callback)
  })
  onUnmounted(() => {
    target.removeEventListener(event, callback)
  })
}</code></pre>
    </div>

    <h2>Composable 最佳实践</h2>
    <div class="tip-box success">
      <strong>✅ 编写规范</strong>
      <p>
        1. 命名以 <code>use</code> 开头（useXxx）<br />
        2. 接收 ref/getter 作为参数（灵活性更好）<br />
        3. 返回 ref 而非 reactive（方便解构）<br />
        4. 内部处理好副作用清理（onUnmounted）<br />
        5. 放在 <code>src/composables/</code> 目录下<br />
        6. 每个文件只导出一个主要 composable
      </p>
    </div>

    <h2>与 Vue 2 Mixins 对比</h2>
    <table>
      <thead>
        <tr>
          <th>特性</th>
          <th>Mixins (Vue 2)</th>
          <th>Composables (Vue 3)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>命名冲突</td>
          <td>容易冲突</td>
          <td>不会冲突（变量自己命名）</td>
        </tr>
        <tr>
          <td>来源清晰</td>
          <td>不清晰</td>
          <td>清晰（import + 解构）</td>
        </tr>
        <tr>
          <td>TypeScript</td>
          <td>支持差</td>
          <td>完美支持</td>
        </tr>
        <tr>
          <td>逻辑复用</td>
          <td>受限于选项式结构</td>
          <td>完全灵活</td>
        </tr>
        <tr>
          <td>参数传递</td>
          <td>不支持</td>
          <td>支持参数化</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
