<template>
  <div class="content-page">
    <h1>Transition 过渡动画</h1>
    <p>
      Vue 3 保留了 Vue 2 的过渡系统，但组件名从
      <code>&lt;transition&gt;</code> 变为
      <code>&lt;Transition&gt;</code>（PascalCase），并且有一些改进。
    </p>

    <h2>基本过渡</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { ref } from 'vue'
const show = ref(true)
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="show = !show"&gt;切换&lt;/button&gt;

  &lt;Transition name="fade"&gt;
    &lt;div v-if="show"&gt;淡入淡出内容&lt;/div&gt;
  &lt;/Transition&gt;
&lt;/template&gt;

&lt;style&gt;
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
&lt;/style&gt;</code></pre>
    </div>

    <h2>CSS 类名变化（Vue 2 → Vue 3）</h2>
    <table>
      <thead>
        <tr>
          <th>Vue 2</th>
          <th>Vue 3</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>v-enter</td>
          <td>v-enter-from</td>
          <td>进入起始状态</td>
        </tr>
        <tr>
          <td>v-enter-active</td>
          <td>v-enter-active</td>
          <td>进入过程中</td>
        </tr>
        <tr>
          <td>v-enter-to</td>
          <td>v-enter-to</td>
          <td>进入结束状态</td>
        </tr>
        <tr>
          <td>v-leave</td>
          <td>v-leave-from</td>
          <td>离开起始状态</td>
        </tr>
        <tr>
          <td>v-leave-active</td>
          <td>v-leave-active</td>
          <td>离开过程中</td>
        </tr>
        <tr>
          <td>v-leave-to</td>
          <td>v-leave-to</td>
          <td>离开结束状态</td>
        </tr>
      </tbody>
    </table>

    <div class="tip-box danger">
      <strong>⚠️ 重要变化</strong>
      <p>
        <code>v-enter</code> 改为 <code>v-enter-from</code>，<code
          >v-leave</code
        >
        改为 <code>v-leave-from</code>。命名更加语义化和一致。
      </p>
    </div>

    <h2>TransitionGroup 列表过渡</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { ref } from 'vue'
const items = ref([1, 2, 3, 4, 5])
const nextId = ref(6)

const add = () => items.value.splice(randomIndex(), 0, nextId.value++)
const remove = () => items.value.splice(randomIndex(), 1)
const randomIndex = () => Math.floor(Math.random() * items.value.length)
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="add"&gt;添加&lt;/button&gt;
  &lt;button @click="remove"&gt;删除&lt;/button&gt;

  &lt;TransitionGroup name="list" tag="ul"&gt;
    &lt;li v-for="item in items" :key="item"&gt;
      {{ item }}
    &lt;/li&gt;
  &lt;/TransitionGroup&gt;
&lt;/template&gt;

&lt;style&gt;
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* 移动动画 */
.list-move {
  transition: transform 0.5s ease;
}
/* 确保离开的元素脱离文档流 */
.list-leave-active {
  position: absolute;
}
&lt;/style&gt;</code></pre>
    </div>

    <h2>Vue 3 TransitionGroup 变化</h2>
    <div class="tip-box info">
      <strong>💡 Vue 3 中的改进</strong>
      <p>
        1. <code>&lt;TransitionGroup&gt;</code> 不再默认渲染
        <code>&lt;span&gt;</code> 包裹元素<br />
        2. 可以通过 <code>tag</code> prop 指定包裹标签，也可以不渲染任何包裹<br />
        3. 类名变化同 Transition（enter → enter-from）
      </p>
    </div>

    <h2>JavaScript 钩子</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
&gt;
  &lt;div v-if="show"&gt;...&lt;/div&gt;
&lt;/Transition&gt;

&lt;script setup&gt;
function onEnter(el, done) {
  // 使用 GSAP 或其他动画库
  gsap.to(el, {
    opacity: 1,
    duration: 0.5,
    onComplete: done  // 完成后调用 done
  })
}
&lt;/script&gt;</code></pre>
    </div>
  </div>
</template>
