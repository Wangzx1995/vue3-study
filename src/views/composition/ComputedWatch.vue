<template>
  <div class="content-page">
    <h1>computed 与 watch</h1>
    <p>
      计算属性和侦听器是 Vue 响应式系统的核心功能。Vue 3
      中它们从选项式变为了函数式调用。
    </p>

    <h2>computed 计算属性</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 只读计算属性
const fullName = computed(() => {
  return firstName.value + lastName.value
})

// 可写计算属性
const fullNameWritable = computed({
  get() {
    return firstName.value + lastName.value
  },
  set(newValue) {
    ;[firstName.value, lastName.value] = newValue.split(' ')
  }
})

// 使用
console.log(fullName.value) // '张三'
fullNameWritable.value = '李 四' // firstName='李', lastName='四'
&lt;/script&gt;</code></pre>
    </div>

    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2 写法</div>
        <div class="code-block">
          <pre v-pre><code>export default {
  data() {
    return {
      firstName: '张',
      lastName: '三'
    }
  },
  computed: {
    fullName() {
      return this.firstName + this.lastName
    },
    // 可写
    fullNameWritable: {
      get() {
        return this.firstName + this.lastName
      },
      set(val) {
        // ...
      }
    }
  }
}</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3 写法</div>
        <div class="code-block">
          <pre v-pre><code>import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

const fullName = computed(
  () => firstName.value + lastName.value
)

const fullNameWritable = computed({
  get() {
    return firstName.value + lastName.value
  },
  set(val) {
    // ...
  }
})</code></pre>
        </div>
      </div>
    </div>

    <h2>watch 侦听器</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { ref, reactive, watch } from 'vue'

const count = ref(0)
const state = reactive({ name: '张三', nested: { value: 1 } })

// 侦听 ref
watch(count, (newVal, oldVal) => {
  console.log(`count: ${oldVal} -> ${newVal}`)
})

// 侦听 reactive 的某个属性（需要 getter 函数）
watch(
  () => state.name,
  (newName, oldName) => {
    console.log(`name: ${oldName} -> ${newName}`)
  }
)

// 侦听整个 reactive 对象（自动深度侦听）
watch(state, (newState) => {
  console.log('state 变化了', newState)
})

// 侦听多个源
watch(
  [count, () => state.name],
  ([newCount, newName], [oldCount, oldName]) => {
    console.log(`count: ${oldCount}->${newCount}, name: ${oldName}->${newName}`)
  }
)

// 配置选项
watch(count, (newVal) => {
  console.log(newVal)
}, {
  immediate: true,  // 立即执行一次
  deep: true,       // 深度侦听
  flush: 'post',    // DOM 更新后触发（默认 'pre'）
  once: true        // 只触发一次（Vue 3.4+）
})
&lt;/script&gt;</code></pre>
    </div>

    <h2>watchEffect 副作用侦听</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { ref, watchEffect, watchPostEffect, watchSyncEffect } from 'vue'

const count = ref(0)
const name = ref('Vue')

// watchEffect: 自动追踪依赖，立即执行
const stop = watchEffect(() => {
  // 自动追踪 count 和 name 的变化
  console.log(`count: ${count.value}, name: ${name.value}`)
})

// 停止侦听
stop()

// watchEffect 带清理函数
watchEffect((onCleanup) => {
  const timer = setInterval(() => {
    count.value++
  }, 1000)

  // 清理函数：在副作用重新执行前 或 侦听器停止时调用
  onCleanup(() => {
    clearInterval(timer)
  })
})

// watchPostEffect = watchEffect + { flush: 'post' }
// 在 DOM 更新后执行
watchPostEffect(() => {
  // 可以安全访问更新后的 DOM
  console.log(document.getElementById('count')?.textContent)
})

// watchSyncEffect = watchEffect + { flush: 'sync' }
// 同步触发，在 Vue 进行任何更新前触发
&lt;/script&gt;</code></pre>
    </div>

    <h2>watch vs watchEffect</h2>
    <table>
      <thead>
        <tr>
          <th>特性</th>
          <th>watch</th>
          <th>watchEffect</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>依赖追踪</td>
          <td>显式指定</td>
          <td>自动追踪</td>
        </tr>
        <tr>
          <td>旧值访问</td>
          <td>可以获取 oldValue</td>
          <td>不可以</td>
        </tr>
        <tr>
          <td>立即执行</td>
          <td>需要 immediate: true</td>
          <td>默认立即执行</td>
        </tr>
        <tr>
          <td>惰性执行</td>
          <td>默认惰性</td>
          <td>非惰性</td>
        </tr>
        <tr>
          <td>适用场景</td>
          <td>需要对比新旧值</td>
          <td>执行副作用（请求、DOM操作）</td>
        </tr>
      </tbody>
    </table>

    <div class="tip-box info">
      <strong>💡 选择建议</strong>
      <p>
        - 需要知道新旧值 → <code>watch</code><br />
        - 只需要在依赖变化时做些事情 → <code>watchEffect</code><br />
        - 需要立即执行且自动追踪 → <code>watchEffect</code><br />
        - 侦听特定数据源且需要条件控制 → <code>watch</code>
      </p>
    </div>
  </div>
</template>
