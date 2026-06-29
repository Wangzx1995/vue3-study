<template>
  <div class="content-page">
    <h1>事件处理</h1>
    <p>Vue 3 的事件处理机制与 Vue 2 基本一致，但移除了一些特性并做了优化。</p>

    <h2>监听事件</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;!-- 内联事件处理 --&gt;
  &lt;button @click="count++"&gt;点击计数: {{ count }}&lt;/button&gt;

  &lt;!-- 方法处理 --&gt;
  &lt;button @click="handleClick"&gt;点击&lt;/button&gt;

  &lt;!-- 传递参数 --&gt;
  &lt;button @click="say('hello')"&gt;Say Hello&lt;/button&gt;

  &lt;!-- 访问原生事件对象 --&gt;
  &lt;button @click="handleEvent($event)"&gt;带事件对象&lt;/button&gt;

  &lt;!-- 多事件处理（Vue 3 新增） --&gt;
  &lt;button @click="handleA($event), handleB($event)"&gt;
    多个处理器
  &lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const count = ref(0)

const handleClick = () =&gt; {
  console.log('按钮被点击了')
}

const say = (msg) =&gt; {
  alert(msg)
}

const handleEvent = (event) =&gt; {
  console.log('事件类型:', event.type)
  console.log('目标元素:', event.target)
}

const handleA = (e) =&gt; console.log('A', e)
const handleB = (e) =&gt; console.log('B', e)
&lt;/script&gt;</code></pre>
    </div>

    <h2>事件修饰符</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;!-- .stop - 阻止事件冒泡 --&gt;
  &lt;div @click="handleOuter"&gt;
    &lt;button @click.stop="handleInner"&gt;不会冒泡&lt;/button&gt;
  &lt;/div&gt;

  &lt;!-- .prevent - 阻止默认行为 --&gt;
  &lt;form @submit.prevent="onSubmit"&gt;
    &lt;button type="submit"&gt;提交&lt;/button&gt;
  &lt;/form&gt;

  &lt;!-- .once - 只触发一次 --&gt;
  &lt;button @click.once="doOnce"&gt;只能点一次&lt;/button&gt;

  &lt;!-- .capture - 使用捕获模式 --&gt;
  &lt;div @click.capture="handleCapture"&gt;...&lt;/div&gt;

  &lt;!-- .self - 只有 event.target 是元素自身时触发 --&gt;
  &lt;div @click.self="handleSelf"&gt;...&lt;/div&gt;

  &lt;!-- .passive - 提高滚动性能 --&gt;
  &lt;div @scroll.passive="onScroll"&gt;...&lt;/div&gt;

  &lt;!-- 修饰符可以链式调用 --&gt;
  &lt;a @click.stop.prevent="handleLink"&gt;链接&lt;/a&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>按键修饰符</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;!-- 按键别名 --&gt;
  &lt;input @keyup.enter="submit" /&gt;
  &lt;input @keyup.tab="handleTab" /&gt;
  &lt;input @keyup.delete="handleDelete" /&gt;
  &lt;input @keyup.esc="cancel" /&gt;
  &lt;input @keyup.space="handleSpace" /&gt;
  &lt;input @keyup.up="handleUp" /&gt;
  &lt;input @keyup.down="handleDown" /&gt;

  &lt;!-- 系统修饰键 --&gt;
  &lt;input @keyup.ctrl.enter="submitForm" /&gt;
  &lt;div @click.ctrl="handleCtrlClick"&gt;Ctrl+Click&lt;/div&gt;
  &lt;div @click.alt="handleAltClick"&gt;Alt+Click&lt;/div&gt;
  &lt;div @click.shift="handleShiftClick"&gt;Shift+Click&lt;/div&gt;
  &lt;div @click.meta="handleMetaClick"&gt;Meta+Click&lt;/div&gt;

  &lt;!-- .exact - 精确匹配 --&gt;
  &lt;button @click.ctrl.exact="onCtrlClick"&gt;仅 Ctrl+Click&lt;/button&gt;
  &lt;button @click.exact="onClick"&gt;无任何修饰键的点击&lt;/button&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>Vue 3 事件相关变化</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2</div>
        <div class="code-block">
          <pre v-pre><code>// 组件中使用 $on, $off, $once
this.$on('custom-event', handler)
this.$off('custom-event', handler)
this.$once('hook:mounted', callback)

// EventBus 事件总线
const bus = new Vue()
bus.$emit('event', data)
bus.$on('event', handler)</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3</div>
        <div class="code-block">
          <pre v-pre><code>// $on, $off, $once 已移除！
// 推荐使用 mitt 或 tiny-emitter 库

import mitt from 'mitt'
const emitter = mitt()

emitter.on('event', handler)
emitter.emit('event', data)
emitter.off('event', handler)</code></pre>
        </div>
      </div>
    </div>

    <div class="tip-box warning">
      <strong>⚠️ 移除的特性</strong>
      <p>
        Vue 3 移除了 <code>$on</code>、<code>$off</code>、<code>$once</code>
        实例方法。<br />
        如果需要事件总线模式，推荐使用第三方库如 <code>mitt</code> 或
        <code>tiny-emitter</code>。<br />
        同时移除了 <code>.native</code> 修饰符，因为 Vue 3 中未声明为 emits
        的事件监听器会自动成为原生事件。
      </p>
    </div>
  </div>
</template>
