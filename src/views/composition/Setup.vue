<template>
  <div class="content-page">
    <h1>setup 与 &lt;script setup&gt;</h1>
    <p>
      Composition API 的核心入口是 <code>setup</code> 函数/语法糖。它是 Vue 3
      最重要的新特性之一，彻底改变了组件逻辑的组织方式。
    </p>

    <h2>两种写法对比</h2>
    <h3>写法一：setup() 函数</h3>
    <div class="code-block">
      <pre v-pre><code>&lt;script&gt;
import { ref, computed, onMounted } from 'vue'

export default {
  props: {
    title: String
  },
  emits: ['update'],
  setup(props, context) {
    // props 是响应式的
    console.log(props.title)

    // context 包含 attrs, slots, emit, expose
    const { attrs, slots, emit, expose } = context

    const count = ref(0)
    const doubled = computed(() => count.value * 2)

    const increment = () => {
      count.value++
      emit('update', count.value)
    }

    onMounted(() => {
      console.log('组件挂载完成')
    })

    // 必须返回要在模板中使用的内容
    return {
      count,
      doubled,
      increment
    }
  }
}
&lt;/script&gt;</code></pre>
    </div>

    <h3>写法二：&lt;script setup&gt; 语法糖（推荐）</h3>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { ref, computed, onMounted } from 'vue'

// defineProps 和 defineEmits 是编译器宏，无需导入
const props = defineProps({
  title: String
})

const emit = defineEmits(['update'])

// 所有顶层变量自动暴露给模板，无需 return
const count = ref(0)
const doubled = computed(() => count.value * 2)

const increment = () => {
  count.value++
  emit('update', count.value)
}

onMounted(() => {
  console.log('组件挂载完成')
})
&lt;/script&gt;

&lt;template&gt;
  &lt;h2&gt;{{ title }}&lt;/h2&gt;
  &lt;p&gt;Count: {{ count }}, Doubled: {{ doubled }}&lt;/p&gt;
  &lt;button @click="increment"&gt;+1&lt;/button&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>&lt;script setup&gt; 的优势</h2>
    <div class="tip-box success">
      <strong>✅ 为什么推荐 &lt;script setup&gt;</strong>
      <p>
        1. 更少的样板代码，不需要 return<br />
        2. 更好的 TypeScript 类型推导<br />
        3. 更好的运行时性能（编译为同一作用域的渲染函数）<br />
        4. 更好的 IDE 支持
      </p>
    </div>

    <h2>编译器宏（不需要导入）</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
// 1. defineProps - 声明 props
const props = defineProps({
  msg: { type: String, required: true },
  count: { type: Number, default: 0 }
})

// TypeScript 泛型写法
// const props = defineProps&lt;{
//   msg: string
//   count?: number
// }&gt;()

// 2. defineEmits - 声明事件
const emit = defineEmits(['change', 'update'])
// TypeScript 写法
// const emit = defineEmits&lt;{
//   (e: 'change', value: string): void
//   (e: 'update', id: number): void
// }&gt;()

// 3. defineExpose - 暴露给父组件的属性/方法
const publicMethod = () => { /* ... */ }
defineExpose({
  publicMethod
})

// 4. defineOptions - 定义组件选项（Vue 3.3+）
defineOptions({
  name: 'MyComponent',
  inheritAttrs: false
})

// 5. defineModel - 定义 v-model（Vue 3.4+）
const modelValue = defineModel()
// 等价于声明 modelValue prop + update:modelValue emit

// 6. defineSlots - 声明插槽类型（TypeScript）
// const slots = defineSlots&lt;{
//   default(props: { msg: string }): any
// }&gt;()
&lt;/script&gt;</code></pre>
    </div>

    <h2>与 Vue 2 Options API 对比</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2 - Options API</div>
        <div class="code-block">
          <pre v-pre><code>export default {
  data() {
    return { count: 0 }
  },
  computed: {
    doubled() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('mounted')
  }
}</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3 - Composition API</div>
        <div class="code-block">
          <pre v-pre><code>import { ref, computed, onMounted } from 'vue'

const count = ref(0)

const doubled = computed(
  () => count.value * 2
)

const increment = () => {
  count.value++
}

onMounted(() => {
  console.log('mounted')
})</code></pre>
        </div>
      </div>
    </div>

    <h2>使用普通 &lt;script&gt; 与 &lt;script setup&gt; 共存</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;!-- 可以同时使用两种 script --&gt;
&lt;script&gt;
// 普通 &lt;script&gt; 中的代码只执行一次
// 可以用来声明只需执行一次的副作用或 inheritAttrs
export default {
  inheritAttrs: false
}
&lt;/script&gt;

&lt;script setup&gt;
// &lt;script setup&gt; 中的代码在每次组件实例创建时执行
import { ref } from 'vue'
const count = ref(0)
&lt;/script&gt;</code></pre>
    </div>

    <div class="tip-box info">
      <strong>💡 注意</strong>
      <p>
        在 Vue 3.3+ 中，可以使用 <code>defineOptions</code> 替代普通
        &lt;script&gt; 来设置 inheritAttrs 等选项，不再需要两个 script 块共存。
      </p>
    </div>
  </div>
</template>
