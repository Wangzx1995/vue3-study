<template>
  <div class="content-page">
    <h1>组件 API 对比</h1>
    <p>
      Vue 3 引入了 Composition API 作为 Options API 的替代方案。两者可以共存，但
      Composition API 是未来的推荐方向。
    </p>

    <h2>完整组件对比</h2>
    <p>
      下面是同一个功能组件分别用 Vue 2 Options API 和 Vue 3 Composition API
      实现：
    </p>

    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2 - Options API</div>
        <div class="code-block">
          <pre v-pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;input v-model="searchText" /&gt;
    &lt;ul&gt;
      &lt;li v-for="item in filteredList" :key="item.id"&gt;
        {{ item.name }}
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;p&gt;总数: {{ total }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  props: {
    items: { type: Array, default: () => [] }
  },
  data() {
    return {
      searchText: ''
    }
  },
  computed: {
    filteredList() {
      return this.items.filter(item =>
        item.name.includes(this.searchText)
      )
    },
    total() {
      return this.filteredList.length
    }
  },
  watch: {
    searchText(newVal) {
      this.$emit('search', newVal)
    }
  },
  mounted() {
    this.fetchInitialData()
  },
  methods: {
    fetchInitialData() {
      // ...
    }
  }
}
&lt;/script&gt;</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3 - Composition API</div>
        <div class="code-block">
          <pre v-pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;input v-model="searchText" /&gt;
    &lt;ul&gt;
      &lt;li v-for="item in filteredList" :key="item.id"&gt;
        {{ item.name }}
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;p&gt;总数: {{ total }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] }
})
const emit = defineEmits(['search'])

const searchText = ref('')

const filteredList = computed(() =>
  props.items.filter(item =>
    item.name.includes(searchText.value)
  )
)
const total = computed(() => filteredList.value.length)

watch(searchText, (newVal) => {
  emit('search', newVal)
})

onMounted(() => {
  fetchInitialData()
})

function fetchInitialData() {
  // ...
}
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </div>

    <h2>逻辑组织方式对比</h2>
    <div class="tip-box info">
      <strong>💡 Options API 的问题</strong>
      <p>
        在复杂组件中，同一个功能的代码会被分散到 data、computed、methods、watch
        等不同选项中。 组件越大，相关逻辑跳转越多，维护越困难。
      </p>
    </div>

    <div class="code-block">
      <pre v-pre><code>// Options API - 逻辑被分散
export default {
  data() {
    return {
      // 功能A 的数据
      // 功能B 的数据
      // 功能C 的数据
    }
  },
  computed: {
    // 功能A 的计算属性
    // 功能B 的计算属性
  },
  methods: {
    // 功能A 的方法
    // 功能B 的方法
    // 功能C 的方法
  },
  watch: {
    // 功能A 的侦听
    // 功能C 的侦听
  }
}

// Composition API - 逻辑聚合
&lt;script setup&gt;
// ===== 功能A =====
const featureAData = ref(...)
const featureAComputed = computed(...)
function featureAMethod() { ... }
watch(featureAData, ...)

// ===== 功能B =====
const featureBData = ref(...)
const featureBComputed = computed(...)
function featureBMethod() { ... }

// ===== 功能C =====
const featureCData = ref(...)
function featureCMethod() { ... }
watch(featureCData, ...)
&lt;/script&gt;

// 更好的方式：提取为 composable
&lt;script setup&gt;
const { data: aData, method: aMethod } = useFeatureA()
const { data: bData, computed: bComputed } = useFeatureB()
const { data: cData, method: cMethod } = useFeatureC()
&lt;/script&gt;</code></pre>
    </div>

    <h2>组件通信方式对比</h2>
    <table>
      <thead>
        <tr>
          <th>通信方式</th>
          <th>Vue 2</th>
          <th>Vue 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>父→子</td>
          <td>props</td>
          <td>props (defineProps)</td>
        </tr>
        <tr>
          <td>子→父</td>
          <td>this.$emit</td>
          <td>emit (defineEmits)</td>
        </tr>
        <tr>
          <td>父访问子</td>
          <td>this.$refs（全部暴露）</td>
          <td>ref + defineExpose（显式暴露）</td>
        </tr>
        <tr>
          <td>子访问父</td>
          <td>this.$parent</td>
          <td>不推荐（用 props/emit）</td>
        </tr>
        <tr>
          <td>兄弟通信</td>
          <td>EventBus ($on/$emit)</td>
          <td>mitt 库或状态管理</td>
        </tr>
        <tr>
          <td>跨层级</td>
          <td>provide/inject (非响应式)</td>
          <td>provide/inject (响应式)</td>
        </tr>
        <tr>
          <td>全局状态</td>
          <td>Vuex</td>
          <td>Pinia</td>
        </tr>
        <tr>
          <td>透传属性</td>
          <td>$attrs + $listeners</td>
          <td>$attrs (合并了 $listeners)</td>
        </tr>
      </tbody>
    </table>

    <h2>this 的变化</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2 - 大量使用 this</div>
        <div class="code-block">
          <pre v-pre><code>export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
      this.$emit('change', this.count)
      this.$refs.input.focus()
      this.$router.push('/home')
      this.$store.dispatch('action')
    }
  }
}</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3 - 不需要 this</div>
        <div class="code-block">
          <pre v-pre><code>&lt;script setup&gt;
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from './store'

const count = ref(0)
const emit = defineEmits(['change'])
const inputRef = ref(null)
const router = useRouter()
const store = useStore()

function increment() {
  count.value++
  emit('change', count.value)
  inputRef.value.focus()
  router.push('/home')
  store.dispatch('action')
}
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="tip-box success">
      <strong>✅ Composition API 优势总结</strong>
      <p>
        1. 更好的逻辑聚合，同一功能代码放一起<br />
        2. 更好的代码复用（composable vs mixin）<br />
        3. 更好的 TypeScript 支持（不依赖 this）<br />
        4. 更小的打包体积（Tree-shaking 友好）<br />
        5. 没有 this 指向问题
      </p>
    </div>
  </div>
</template>
