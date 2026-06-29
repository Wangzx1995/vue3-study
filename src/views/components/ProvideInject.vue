<template>
  <div class="content-page">
    <h1>Provide / Inject 依赖注入</h1>
    <p>
      Provide/Inject 用于跨组件层级传递数据，避免 prop 逐层传递（prop
      drilling）。Vue 3 中使用方式有了重大升级。
    </p>

    <h2>基本使用</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2</div>
        <div class="code-block">
          <pre v-pre><code>// 祖先组件
export default {
  provide() {
    return {
      theme: this.theme
      // ⚠️ 注意：这样不是响应式的！
    }
  },
  data() {
    return { theme: 'dark' }
  }
}

// 后代组件
export default {
  inject: ['theme'],
  // inject: { localTheme: 'theme' } 别名
}</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3</div>
        <div class="code-block">
          <pre v-pre><code>&lt;!-- 祖先组件 --&gt;
&lt;script setup&gt;
import { provide, ref, readonly } from 'vue'

const theme = ref('dark')
const user = ref({ name: '张三' })

// 提供响应式数据
provide('theme', theme)

// 提供只读数据（推荐）
provide('user', readonly(user))

// 提供修改方法
provide('updateTheme', (newTheme) => {
  theme.value = newTheme
})
&lt;/script&gt;

&lt;!-- 后代组件 --&gt;
&lt;script setup&gt;
import { inject } from 'vue'

// 注入（带默认值）
const theme = inject('theme', ref('light'))
const user = inject('user')
const updateTheme = inject('updateTheme')
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </div>

    <h2>使用 Symbol 作为 Key（推荐）</h2>
    <div class="code-block">
      <pre v-pre><code>// keys.js - 集中管理 injection keys
export const ThemeKey = Symbol('theme')
export const UserKey = Symbol('user')

// 提供者
import { ThemeKey } from './keys'
provide(ThemeKey, theme)

// 注入者
import { ThemeKey } from './keys'
const theme = inject(ThemeKey)</code></pre>
    </div>

    <h2>实际应用场景</h2>
    <div class="code-block">
      <pre v-pre><code>// 一个实际的主题管理示例
// composables/useTheme.js
import { ref, provide, inject, readonly } from 'vue'

const ThemeSymbol = Symbol('theme')

export function provideTheme() {
  const theme = ref('light')
  const colors = computed(() => ({
    light: { bg: '#fff', text: '#333' },
    dark: { bg: '#1a1a2e', text: '#eee' }
  }[theme.value]))

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  provide(ThemeSymbol, {
    theme: readonly(theme),
    colors,
    toggleTheme
  })
}

export function useTheme() {
  const themeContext = inject(ThemeSymbol)
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return themeContext
}</code></pre>
    </div>

    <div class="tip-box success">
      <strong>✅ Vue 3 Provide/Inject 优势</strong>
      <p>
        1. 天然支持响应式数据（Vue 2 需要额外处理）<br />
        2. 配合 readonly 更安全<br />
        3. 配合 TypeScript 更好的类型推导<br />
        4. 可以与 Composable 模式结合使用
      </p>
    </div>

    <div class="tip-box info">
      <strong>💡 最佳实践</strong>
      <p>
        1. 尽量将修改数据的方法放在 provide 一侧<br />
        2. 使用 readonly 包裹 provide 的数据防止子组件误修改<br />
        3. 使用 Symbol 作为 key 避免命名冲突<br />
        4. 对于全局状态，考虑使用 Pinia 代替
      </p>
    </div>
  </div>
</template>
