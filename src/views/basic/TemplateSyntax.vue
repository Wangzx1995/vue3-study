<template>
  <div class="content-page">
    <h1>模板语法</h1>
    <p>
      Vue 3 的模板语法与 Vue 2 基本一致，但有一些改进和新增功能。Vue 使用基于
      HTML 的模板语法，允许你声明式地将渲染的 DOM 绑定到底层组件实例的数据。
    </p>

    <h2>文本插值</h2>
    <p>最基本的数据绑定形式是使用双大括号（Mustache 语法）的文本插值：</p>
    <div class="code-block">
      <span class="lang-tag">vue</span>
      <pre v-pre><code>&lt;template&gt;
  &lt;p&gt;消息: {{ message }}&lt;/p&gt;
  &lt;p&gt;计算表达式: {{ count + 1 }}&lt;/p&gt;
  &lt;p&gt;调用方法: {{ message.split('').reverse().join('') }}&lt;/p&gt;
  &lt;p&gt;三元表达式: {{ isActive ? '激活' : '未激活' }}&lt;/p&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const message = ref('Hello Vue 3!')
const count = ref(10)
const isActive = ref(true)
&lt;/script&gt;</code></pre>
    </div>

    <h2>原始 HTML</h2>
    <p>使用 <code>v-html</code> 指令输出真正的 HTML：</p>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;p&gt;使用文本插值: {{ rawHtml }}&lt;/p&gt;
  &lt;p&gt;使用 v-html: &lt;span v-html="rawHtml"&gt;&lt;/span&gt;&lt;/p&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
const rawHtml = ref('&lt;span style="color: red"&gt;红色文本&lt;/span&gt;')
&lt;/script&gt;</code></pre>
    </div>
    <div class="tip-box warning">
      <strong>⚠️ 安全警告</strong>
      <p>
        动态渲染任意 HTML 可能导致 XSS 攻击。只对可信内容使用
        v-html，永远不要对用户输入使用。
      </p>
    </div>

    <h2>Attribute 绑定</h2>
    <p>使用 <code>v-bind</code> 或简写 <code>:</code> 绑定 HTML 属性：</p>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;!-- 完整语法 --&gt;
  &lt;div v-bind:id="dynamicId"&gt;&lt;/div&gt;

  &lt;!-- 简写 --&gt;
  &lt;div :id="dynamicId"&gt;&lt;/div&gt;
  &lt;div :class="{ active: isActive }"&gt;&lt;/div&gt;
  &lt;div :style="{ color: textColor, fontSize: size + 'px' }"&gt;&lt;/div&gt;

  &lt;!-- Vue 3 新增: 绑定多个属性 --&gt;
  &lt;div v-bind="objectOfAttrs"&gt;&lt;/div&gt;

  &lt;!-- 布尔型 Attribute --&gt;
  &lt;button :disabled="isDisabled"&gt;按钮&lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, reactive } from 'vue'

const dynamicId = ref('container')
const isActive = ref(true)
const textColor = ref('blue')
const size = ref(16)
const isDisabled = ref(false)

// 一次绑定多个属性
const objectOfAttrs = reactive({
  id: 'container',
  class: 'wrapper',
  style: 'color: red'
})
&lt;/script&gt;</code></pre>
    </div>

    <h2>Class 与 Style 绑定</h2>
    <h3>Class 绑定</h3>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;!-- 对象语法 --&gt;
  &lt;div :class="{ active: isActive, 'text-danger': hasError }"&gt;&lt;/div&gt;

  &lt;!-- 数组语法 --&gt;
  &lt;div :class="[activeClass, errorClass]"&gt;&lt;/div&gt;

  &lt;!-- 数组中使用对象 --&gt;
  &lt;div :class="[{ active: isActive }, errorClass]"&gt;&lt;/div&gt;

  &lt;!-- 计算属性（推荐复杂逻辑时使用） --&gt;
  &lt;div :class="classObject"&gt;&lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, computed } from 'vue'

const isActive = ref(true)
const hasError = ref(false)
const activeClass = ref('active')
const errorClass = ref('text-danger')

const classObject = computed(() => ({
  active: isActive.value && !hasError.value,
  'text-danger': hasError.value
}))
&lt;/script&gt;</code></pre>
    </div>

    <h3>Style 绑定</h3>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;!-- 对象语法（自动添加浏览器前缀） --&gt;
  &lt;div :style="{ color: activeColor, fontSize: fontSize + 'px' }"&gt;&lt;/div&gt;

  &lt;!-- 绑定到样式对象（推荐） --&gt;
  &lt;div :style="styleObject"&gt;&lt;/div&gt;

  &lt;!-- 数组语法（合并多个样式对象） --&gt;
  &lt;div :style="[baseStyles, overridingStyles]"&gt;&lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, reactive } from 'vue'

const activeColor = ref('red')
const fontSize = ref(14)

const styleObject = reactive({
  color: 'blue',
  fontSize: '16px',
  fontWeight: 'bold'
})

const baseStyles = reactive({ color: 'blue' })
const overridingStyles = reactive({ fontSize: '20px' })
&lt;/script&gt;</code></pre>
    </div>

    <h2>Vue 3 模板语法新增</h2>
    <div class="tip-box success">
      <strong>✅ Vue 3 新增特性</strong>
      <p>
        1. 支持使用 v-bind 绑定完整的属性对象<br />
        2. 组件上的 v-model 用法变化（支持多个 v-model）<br />
        3. 模板中可以有多个根节点（Fragment）
      </p>
    </div>
  </div>
</template>
