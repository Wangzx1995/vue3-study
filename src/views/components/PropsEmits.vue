<template>
  <div class="content-page">
    <h1>Props 与 Emits</h1>
    <p>
      Vue 3 中 Props 和 Emits 的声明方式有了重大变化，特别是在
      <code>&lt;script setup&gt;</code> 中使用编译器宏。
    </p>

    <h2>Props 声明</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2</div>
        <div class="code-block">
          <pre v-pre><code>export default {
  props: {
    title: String,
    count: {
      type: Number,
      default: 0,
      required: false,
      validator(value) {
        return value >= 0
      }
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3 &lt;script setup&gt;</div>
        <div class="code-block">
          <pre v-pre><code>// 运行时声明
const props = defineProps({
  title: String,
  count: {
    type: Number,
    default: 0,
    required: false,
    validator(value) {
      return value >= 0
    }
  },
  items: {
    type: Array,
    default: () => []
  }
})</code></pre>
        </div>
      </div>
    </div>

    <h3>TypeScript 泛型声明（推荐）</h3>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup lang="ts"&gt;
// 基于类型的 props 声明
interface Props {
  title: string
  count?: number
  items?: string[]
  user: {
    name: string
    age: number
  }
}

// 带默认值
const props = withDefaults(defineProps&lt;Props&gt;(), {
  count: 0,
  items: () => [],
})

// Vue 3.5+ 响应式解构（自动保持响应性）
const { title, count = 0, items = [] } = defineProps&lt;Props&gt;()
&lt;/script&gt;</code></pre>
    </div>

    <h2>Emits 声明</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2</div>
        <div class="code-block">
          <pre v-pre><code>export default {
  // Vue 2 中 emits 不是必须声明的
  methods: {
    handleClick() {
      this.$emit('change', 'new value')
      this.$emit('update:title', 'new title')
    }
  }
}</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3</div>
        <div class="code-block">
          <pre v-pre><code>&lt;script setup&gt;
// 数组语法
const emit = defineEmits(['change', 'update:title'])

// 对象语法（带验证）
const emit = defineEmits({
  change(value) {
    return typeof value === 'string'
  },
  'update:title'(title) {
    return title.length > 0
  }
})

// TypeScript 写法
const emit = defineEmits&lt;{
  change: [value: string]
  'update:title': [title: string]
}&gt;()

// 使用
function handleClick() {
  emit('change', 'new value')
  emit('update:title', 'new title')
}
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </div>

    <h2>Props 单向数据流</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
const props = defineProps({
  initialCount: Number
})

// ❌ 不要直接修改 props！
// props.initialCount++  // 会报警告

// ✅ 方案一：基于 prop 创建本地数据
import { ref } from 'vue'
const count = ref(props.initialCount)

// ✅ 方案二：基于 prop 创建计算属性
import { computed } from 'vue'
const normalizedCount = computed(() => props.initialCount * 2)
&lt;/script&gt;</code></pre>
    </div>

    <h2>defineExpose - 暴露组件内部</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;!-- 子组件 ChildComponent.vue --&gt;
&lt;script setup&gt;
import { ref } from 'vue'

const count = ref(0)
const privateData = ref('不暴露')

function increment() {
  count.value++
}

// 使用 &lt;script setup&gt; 的组件默认是关闭的
// 必须通过 defineExpose 显式暴露
defineExpose({
  count,
  increment
})
&lt;/script&gt;

&lt;!-- 父组件 --&gt;
&lt;script setup&gt;
import { ref, onMounted } from 'vue'
import ChildComponent from './ChildComponent.vue'

const childRef = ref(null)

onMounted(() => {
  // 只能访问 defineExpose 暴露的内容
  console.log(childRef.value.count)  // ✅
  childRef.value.increment()          // ✅
  // console.log(childRef.value.privateData) // ❌ undefined
})
&lt;/script&gt;

&lt;template&gt;
  &lt;ChildComponent ref="childRef" /&gt;
&lt;/template&gt;</code></pre>
    </div>

    <div class="tip-box info">
      <strong>💡 Vue 2 vs Vue 3 关键区别</strong>
      <p>
        1. Vue 3 推荐显式声明 emits，有助于组件文档化和验证<br />
        2. <code>&lt;script setup&gt;</code> 组件默认封闭，需要 defineExpose
        暴露<br />
        3. Vue 2 中 <code>this.$refs.child</code> 可以访问所有内容<br />
        4. Vue 3 的 Props 支持 TypeScript 泛型声明，类型安全更好
      </p>
    </div>
  </div>
</template>
