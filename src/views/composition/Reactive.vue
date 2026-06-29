<template>
  <div class="content-page">
    <h1>响应式: ref 与 reactive</h1>
    <p>
      Vue 3 提供了两种创建响应式数据的方式：<code>ref</code> 和
      <code>reactive</code>。理解它们的区别是掌握 Composition API 的关键。
    </p>

    <h2>ref - 基础响应式引用</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { ref } from 'vue'

// ref 可以包裹任何类型的值
const count = ref(0)          // 数字
const name = ref('Vue 3')    // 字符串
const isActive = ref(true)   // 布尔
const user = ref({ name: '张三', age: 25 }) // 对象
const list = ref([1, 2, 3])  // 数组

// 在 JS 中需要 .value 访问
console.log(count.value)  // 0
count.value++
console.log(count.value)  // 1

// 对象/数组的 ref，内部值自动用 reactive 包裹
user.value.name = '李四'  // 响应式
list.value.push(4)         // 响应式
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 模板中自动解包，不需要 .value --&gt;
  &lt;p&gt;{{ count }}&lt;/p&gt;
  &lt;p&gt;{{ name }}&lt;/p&gt;
  &lt;p&gt;{{ user.name }}&lt;/p&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>reactive - 响应式对象</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { reactive } from 'vue'

// reactive 只能用于对象类型（对象、数组、Map、Set）
const state = reactive({
  count: 0,
  user: {
    name: '张三',
    age: 25
  },
  list: ['a', 'b', 'c']
})

// 不需要 .value，直接访问
state.count++
state.user.name = '李四'
state.list.push('d')

// ⚠️ 注意：reactive 不能用于原始类型
// const count = reactive(0)  // ❌ 错误！
&lt;/script&gt;

&lt;template&gt;
  &lt;p&gt;{{ state.count }}&lt;/p&gt;
  &lt;p&gt;{{ state.user.name }}&lt;/p&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>ref vs reactive 对比</h2>
    <table>
      <thead>
        <tr>
          <th>特性</th>
          <th>ref</th>
          <th>reactive</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>适用类型</td>
          <td>任何类型</td>
          <td>仅对象类型</td>
        </tr>
        <tr>
          <td>访问方式</td>
          <td>需要 .value（JS中）</td>
          <td>直接访问</td>
        </tr>
        <tr>
          <td>模板中</td>
          <td>自动解包</td>
          <td>直接使用</td>
        </tr>
        <tr>
          <td>重新赋值</td>
          <td>可以（.value = 新值）</td>
          <td>不可以（会丢失响应性）</td>
        </tr>
        <tr>
          <td>解构</td>
          <td>保持响应性</td>
          <td>会丢失响应性</td>
        </tr>
        <tr>
          <td>使用场景</td>
          <td>基本类型 + 需要重新赋值</td>
          <td>表单对象 + 不需要替换</td>
        </tr>
      </tbody>
    </table>

    <h2>reactive 的注意事项</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { reactive, toRefs, toRef } from 'vue'

const state = reactive({ name: '张三', age: 25 })

// ❌ 解构会丢失响应性！
// const { name, age } = state  // name, age 不再是响应式的

// ✅ 使用 toRefs 保持响应性
const { name, age } = toRefs(state)
// name.value 和 age.value 是响应式的

// ✅ 使用 toRef 取单个属性
const nameRef = toRef(state, 'name')

// ❌ 不能替换整个 reactive 对象！
// state = reactive({ name: '新对象' })  // 丢失响应性

// ✅ 可以修改属性
state.name = '李四'  // 响应式

// ✅ 或使用 Object.assign
Object.assign(state, { name: '李四', age: 30 })
&lt;/script&gt;</code></pre>
    </div>

    <h2>shallowRef 与 shallowReactive</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { shallowRef, shallowReactive, triggerRef } from 'vue'

// shallowRef: 只有 .value 的变化才会触发更新
const shallow = shallowRef({ count: 0 })
shallow.value.count++      // ❌ 不会触发更新
shallow.value = { count: 1 } // ✅ 触发更新
triggerRef(shallow)         // ✅ 手动触发更新

// shallowReactive: 只有顶层属性是响应式的
const state = shallowReactive({
  nested: { count: 0 }
})
state.nested = { count: 1 }  // ✅ 触发更新（顶层属性）
state.nested.count++          // ❌ 不会触发更新（深层属性）
&lt;/script&gt;</code></pre>
    </div>

    <h2>响应式工具函数</h2>
    <div class="code-block">
      <pre v-pre><code>import {
  isRef,         // 检查是否为 ref
  isReactive,    // 检查是否为 reactive
  isProxy,       // 检查是否为 reactive/readonly
  isReadonly,    // 检查是否为 readonly
  unref,         // 如果是 ref 则返回 .value，否则返回本身
  toRef,         // 将 reactive 的某个属性转为 ref
  toRefs,        // 将 reactive 所有属性转为 ref
  toRaw,         // 返回 reactive/readonly 代理的原始对象
  markRaw        // 标记对象永远不会被转为代理
} from 'vue'

// 实际使用示例
const state = reactive({ count: 0, name: 'Vue' })

// toRefs 常用于 composable 返回值
function useCounter() {
  const state = reactive({ count: 0 })
  const increment = () => state.count++
  return { ...toRefs(state), increment }
}

// unref 在接收可能是 ref 也可能不是的参数时很有用
function useTitle(title) {
  document.title = unref(title) // 兼容 ref 和普通值
}</code></pre>
    </div>

    <div class="tip-box info">
      <strong>💡 最佳实践建议</strong>
      <p>
        1. 基本类型一律使用 <code>ref</code><br />
        2. 对象如果不需要整体替换，可以用 <code>reactive</code><br />
        3. 需要整体替换对象或从函数返回响应式状态时，用 <code>ref</code><br />
        4. 团队统一用 <code>ref</code> 也是很好的选择，减少心智负担
      </p>
    </div>
  </div>
</template>
