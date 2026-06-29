<template>
  <div class="content-page">
    <h1>Teleport 传送门</h1>
    <p>
      <code>&lt;Teleport&gt;</code> 是 Vue 3 新增的内置组件，可以将组件内部的
      DOM 元素"传送"到组件 DOM 层级之外的位置。
    </p>

    <h2>为什么需要 Teleport？</h2>
    <p>
      常见场景：Modal 对话框、Toast
      提示、全屏遮罩等。这些元素逻辑上属于当前组件，但渲染位置应该在
      <code>body</code> 下面，否则会受到父元素 CSS（如 overflow:
      hidden、z-index）的影响。
    </p>

    <h2>基本用法</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { ref } from 'vue'
const showModal = ref(false)
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="showModal = true"&gt;打开 Modal&lt;/button&gt;

  &lt;!-- 传送到 body 下 --&gt;
  &lt;Teleport to="body"&gt;
    &lt;div v-if="showModal" class="modal-overlay"&gt;
      &lt;div class="modal"&gt;
        &lt;h3&gt;我是 Modal&lt;/h3&gt;
        &lt;p&gt;虽然我写在组件内部，但我被渲染到了 body 下&lt;/p&gt;
        &lt;button @click="showModal = false"&gt;关闭&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/Teleport&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>Teleport 属性</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;!-- to: 目标容器，CSS 选择器或 DOM 元素 --&gt;
&lt;Teleport to="body"&gt;...&lt;/Teleport&gt;
&lt;Teleport to="#modal-container"&gt;...&lt;/Teleport&gt;
&lt;Teleport to=".app-root"&gt;...&lt;/Teleport&gt;

&lt;!-- disabled: 禁用传送（保持在原位渲染） --&gt;
&lt;Teleport to="body" :disabled="isMobile"&gt;
  &lt;div class="popup"&gt;
    在移动端不传送，保持在原位
  &lt;/div&gt;
&lt;/Teleport&gt;

&lt;!-- 多个 Teleport 可以传送到同一目标 --&gt;
&lt;Teleport to="#notifications"&gt;
  &lt;div&gt;通知 1&lt;/div&gt;
&lt;/Teleport&gt;
&lt;Teleport to="#notifications"&gt;
  &lt;div&gt;通知 2&lt;/div&gt;
&lt;/Teleport&gt;
&lt;!-- 按顺序追加到 #notifications 中 --&gt;</code></pre>
    </div>

    <div class="tip-box info">
      <strong>💡 注意事项</strong>
      <p>
        1. Teleport 只改变渲染的 DOM 位置，不影响组件逻辑层级关系<br />
        2. 组件的 props、events、provide/inject 等仍然按照组件树层级工作<br />
        3. 目标元素必须在 Teleport 挂载前就已存在于 DOM 中<br />
        4. 这是 Vue 3 的新特性，Vue 2 中需要使用 portal-vue 第三方库实现类似功能
      </p>
    </div>
  </div>
</template>
