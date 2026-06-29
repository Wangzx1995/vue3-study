<template>
  <div class="content-page">
    <h1>指令系统</h1>
    <p>
      指令是 Vue 模板中的特殊属性，以 <code>v-</code> 前缀标识。Vue 3 保留了 Vue
      2 的大部分指令，并做了一些优化和变更。
    </p>

    <h2>条件渲染</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;div v-if="type === 'A'"&gt;类型 A&lt;/div&gt;
  &lt;div v-else-if="type === 'B'"&gt;类型 B&lt;/div&gt;
  &lt;div v-else&gt;其他类型&lt;/div&gt;

  &lt;!-- v-show: 切换 display 属性，DOM 始终存在 --&gt;
  &lt;div v-show="isVisible"&gt;可见内容&lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
const type = ref('A')
const isVisible = ref(true)
&lt;/script&gt;</code></pre>
    </div>

    <div class="tip-box info">
      <strong>💡 v-if vs v-show</strong>
      <p>
        <strong>v-if</strong
        >：真正的条件渲染，切换时会销毁/重建元素。适合条件不常改变的场景。<br />
        <strong>v-show</strong>：只是切换 CSS display 属性，元素始终在 DOM
        中。适合频繁切换的场景。
      </p>
    </div>

    <h2>列表渲染 v-for</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;!-- 遍历数组 --&gt;
  &lt;ul&gt;
    &lt;li v-for="(item, index) in items" :key="item.id"&gt;
      {{ index }} - {{ item.name }}
    &lt;/li&gt;
  &lt;/ul&gt;

  &lt;!-- 遍历对象 --&gt;
  &lt;div v-for="(value, key, index) in userInfo" :key="key"&gt;
    {{ index }}. {{ key }}: {{ value }}
  &lt;/div&gt;

  &lt;!-- 遍历数字范围 --&gt;
  &lt;span v-for="n in 10" :key="n"&gt;{{ n }} &lt;/span&gt;

  &lt;!-- Vue 3: v-for 与 v-if 可以同时用在同一元素 --&gt;
  &lt;!-- 但 v-if 优先级高于 v-for（Vue 2 中相反！） --&gt;
  &lt;template v-for="item in items" :key="item.id"&gt;
    &lt;li v-if="item.isActive"&gt;{{ item.name }}&lt;/li&gt;
  &lt;/template&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, reactive } from 'vue'

const items = ref([
  { id: 1, name: '苹果', isActive: true },
  { id: 2, name: '香蕉', isActive: false },
  { id: 3, name: '橙子', isActive: true }
])

const userInfo = reactive({
  name: '张三',
  age: 25,
  city: '北京'
})
&lt;/script&gt;</code></pre>
    </div>

    <div class="tip-box danger">
      <strong>⚠️ Vue 2 与 Vue 3 的重要区别</strong>
      <p>
        在 Vue 2 中，<code>v-for</code> 优先级高于 <code>v-if</code>；<br />
        在 Vue 3 中，<code>v-if</code> 优先级高于 <code>v-for</code>。<br />
        因此在 Vue 3 中不建议在同一元素上同时使用 v-if 和 v-for，推荐使用
        <code>&lt;template&gt;</code> 包裹。
      </p>
    </div>

    <h2>v-model 双向绑定</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;!-- 基本用法 --&gt;
  &lt;input v-model="message" /&gt;

  &lt;!-- 修饰符 --&gt;
  &lt;input v-model.lazy="msg" /&gt;     &lt;!-- change 事件时更新 --&gt;
  &lt;input v-model.number="age" /&gt;    &lt;!-- 自动转为数字 --&gt;
  &lt;input v-model.trim="name" /&gt;     &lt;!-- 自动去除首尾空格 --&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>v-on 事件绑定</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;!-- 完整写法 --&gt;
  &lt;button v-on:click="handleClick"&gt;点击&lt;/button&gt;

  &lt;!-- 简写 --&gt;
  &lt;button @click="handleClick"&gt;点击&lt;/button&gt;

  &lt;!-- 内联处理 --&gt;
  &lt;button @click="count++"&gt;计数: {{ count }}&lt;/button&gt;

  &lt;!-- 事件修饰符 --&gt;
  &lt;form @submit.prevent="onSubmit"&gt;...&lt;/form&gt;
  &lt;div @click.stop="handleClick"&gt;阻止冒泡&lt;/div&gt;
  &lt;div @click.once="handleOnce"&gt;只触发一次&lt;/div&gt;

  &lt;!-- 按键修饰符 --&gt;
  &lt;input @keyup.enter="submit" /&gt;
  &lt;input @keyup.ctrl.enter="submit" /&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>Vue 3 指令变化总结</h2>
    <table>
      <thead>
        <tr>
          <th>变化项</th>
          <th>Vue 2</th>
          <th>Vue 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>v-for / v-if 优先级</td>
          <td>v-for 优先</td>
          <td>v-if 优先</td>
        </tr>
        <tr>
          <td>v-model 组件使用</td>
          <td>value + input 事件</td>
          <td>modelValue + update:modelValue</td>
        </tr>
        <tr>
          <td>v-bind 合并行为</td>
          <td>独立属性总覆盖 v-bind</td>
          <td>按声明顺序决定</td>
        </tr>
        <tr>
          <td>v-on.native</td>
          <td>需要 .native 监听原生事件</td>
          <td>移除，默认即可监听原生事件</td>
        </tr>
        <tr>
          <td>key 与 v-if</td>
          <td>需手动添加 key</td>
          <td>自动生成唯一 key</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
