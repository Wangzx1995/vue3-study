<template>
  <div class="content-page">
    <h1>响应式原理对比</h1>
    <p>
      响应式系统是 Vue 的核心。Vue 3 使用 Proxy 完全重写了响应式系统，解决了 Vue
      2 中 Object.defineProperty 的局限性。
    </p>

    <h2>Vue 2 响应式原理 (Object.defineProperty)</h2>
    <div class="code-block">
      <pre v-pre><code>// Vue 2 简化实现
function defineReactive(obj, key, val) {
  const dep = new Dep()
  
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend()  // 收集依赖
      }
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      dep.notify()  // 通知更新
    }
  })
}

// Vue 2 需要递归遍历所有属性
function observe(obj) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}</code></pre>
    </div>

    <h3>Vue 2 的限制</h3>
    <div class="code-block">
      <pre v-pre><code>// ❌ Vue 2 无法检测的变化：

// 1. 对象新增属性
this.user.newProp = 'value'  // 不是响应式的！
// 解决：Vue.set(this.user, 'newProp', 'value')
//   或：this.$set(this.user, 'newProp', 'value')

// 2. 对象删除属性
delete this.user.name  // 不是响应式的！
// 解决：Vue.delete(this.user, 'name')
//   或：this.$delete(this.user, 'name')

// 3. 数组索引直接赋值
this.items[0] = 'new value'  // 不是响应式的！
// 解决：Vue.set(this.items, 0, 'new value')
//   或：this.items.splice(0, 1, 'new value')

// 4. 数组长度修改
this.items.length = 0  // 不是响应式的！
// 解决：this.items.splice(0)</code></pre>
    </div>

    <h2>Vue 3 响应式原理 (Proxy)</h2>
    <div class="code-block">
      <pre v-pre><code>// Vue 3 简化实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)  // 追踪依赖
      const result = Reflect.get(target, key, receiver)
      // 深层对象惰性转换（用到时才代理）
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (oldValue !== value) {
        trigger(target, key)  // 触发更新
      }
      return result
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
      trigger(target, key)  // 删除也能触发更新！
      return result
    },
    has(target, key) {
      track(target, key)
      return Reflect.has(target, key)
    }
  })
}</code></pre>
    </div>

    <h3>Vue 3 解决了所有限制</h3>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { reactive } from 'vue'

const state = reactive({
  user: { name: '张三' },
  items: ['a', 'b', 'c']
})

// ✅ 新增属性 - 自动响应式
state.user.newProp = 'value'

// ✅ 删除属性 - 自动响应式
delete state.user.name

// ✅ 数组索引赋值 - 自动响应式
state.items[0] = 'new value'

// ✅ 修改数组长度 - 自动响应式
state.items.length = 0

// ✅ Map、Set 等集合类型 - 自动响应式
const map = reactive(new Map())
map.set('key', 'value')  // 响应式！
&lt;/script&gt;</code></pre>
    </div>

    <h2>核心区别总结</h2>
    <table>
      <thead>
        <tr>
          <th>特性</th>
          <th>Vue 2 (defineProperty)</th>
          <th>Vue 3 (Proxy)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>新增属性</td>
          <td>需要 Vue.set</td>
          <td>自动检测</td>
        </tr>
        <tr>
          <td>删除属性</td>
          <td>需要 Vue.delete</td>
          <td>自动检测</td>
        </tr>
        <tr>
          <td>数组索引</td>
          <td>不检测</td>
          <td>自动检测</td>
        </tr>
        <tr>
          <td>数组长度</td>
          <td>不检测</td>
          <td>自动检测</td>
        </tr>
        <tr>
          <td>Map/Set</td>
          <td>不支持</td>
          <td>支持</td>
        </tr>
        <tr>
          <td>深层嵌套</td>
          <td>初始化时递归转换</td>
          <td>惰性转换（按需）</td>
        </tr>
        <tr>
          <td>性能</td>
          <td>初始化开销大</td>
          <td>惰性代理，性能更好</td>
        </tr>
        <tr>
          <td>兼容性</td>
          <td>IE9+</td>
          <td>不支持 IE</td>
        </tr>
      </tbody>
    </table>

    <div class="tip-box info">
      <strong>💡 理解要点</strong>
      <p>
        1. Vue 3 使用 Proxy 后，<code>Vue.set</code> 和
        <code>Vue.delete</code> 已完全不需要<br />
        2. Proxy 是惰性的：只有属性被访问时才会递归代理深层对象<br />
        3. Vue 3 不再支持 IE 浏览器，因为 Proxy 无法被 polyfill<br />
        4. 这是 Vue 3 性能提升的核心原因之一
      </p>
    </div>
  </div>
</template>
