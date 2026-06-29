<template>
  <div class="content-page">
    <h1>生命周期钩子</h1>
    <p>
      Vue 3 的生命周期钩子在 Composition API
      中以函数形式调用，且命名规则有所变化。
    </p>

    <h2>生命周期对照表</h2>
    <table>
      <thead>
        <tr>
          <th>Vue 2 (Options API)</th>
          <th>Vue 3 (Composition API)</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>beforeCreate</td>
          <td>不需要（setup 本身）</td>
          <td>setup 在 beforeCreate 之前执行</td>
        </tr>
        <tr>
          <td>created</td>
          <td>不需要（setup 本身）</td>
          <td>setup 替代了这两个钩子</td>
        </tr>
        <tr>
          <td>beforeMount</td>
          <td>onBeforeMount</td>
          <td>DOM 挂载前</td>
        </tr>
        <tr>
          <td>mounted</td>
          <td>onMounted</td>
          <td>DOM 挂载后</td>
        </tr>
        <tr>
          <td>beforeUpdate</td>
          <td>onBeforeUpdate</td>
          <td>数据更新、DOM 重新渲染前</td>
        </tr>
        <tr>
          <td>updated</td>
          <td>onUpdated</td>
          <td>DOM 重新渲染后</td>
        </tr>
        <tr>
          <td>beforeDestroy</td>
          <td>onBeforeUnmount</td>
          <td>组件卸载前（改名）</td>
        </tr>
        <tr>
          <td>destroyed</td>
          <td>onUnmounted</td>
          <td>组件卸载后（改名）</td>
        </tr>
        <tr>
          <td>activated</td>
          <td>onActivated</td>
          <td>keep-alive 组件激活</td>
        </tr>
        <tr>
          <td>deactivated</td>
          <td>onDeactivated</td>
          <td>keep-alive 组件停用</td>
        </tr>
        <tr>
          <td>errorCaptured</td>
          <td>onErrorCaptured</td>
          <td>捕获后代组件错误</td>
        </tr>
        <tr>
          <td>-</td>
          <td>onRenderTracked（dev）</td>
          <td>渲染函数追踪依赖时（调试）</td>
        </tr>
        <tr>
          <td>-</td>
          <td>onRenderTriggered（dev）</td>
          <td>渲染被依赖触发时（调试）</td>
        </tr>
        <tr>
          <td>-</td>
          <td>onServerPrefetch</td>
          <td>SSR 专用，服务端渲染前</td>
        </tr>
      </tbody>
    </table>

    <h2>使用示例</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'

// setup 本身 = beforeCreate + created
console.log('等同于 created，此时响应式数据已可用')

onBeforeMount(() => {
  console.log('DOM 即将挂载，此时还无法访问 DOM')
})

onMounted(() => {
  console.log('DOM 已挂载，可以访问 DOM 元素')
  // 常用于：发起请求、操作 DOM、初始化第三方库
})

onBeforeUpdate(() => {
  console.log('数据变了，DOM 即将重新渲染')
})

onUpdated(() => {
  console.log('DOM 已经重新渲染完毕')
  // 注意：避免在此修改状态，可能导致无限循环
})

onBeforeUnmount(() => {
  console.log('组件即将卸载，可以清理定时器/事件监听等')
})

onUnmounted(() => {
  console.log('组件已卸载，所有响应式效果已停止')
})

// 错误处理
onErrorCaptured((err, instance, info) => {
  console.error('捕获到子组件错误:', err)
  console.log('错误信息:', info)
  return false // 返回 false 阻止错误继续传播
})

// 调试钩子（仅在开发模式有效）
onRenderTracked((event) => {
  console.log('依赖被追踪:', event)
})

onRenderTriggered((event) => {
  console.log('重新渲染被触发:', event)
})
&lt;/script&gt;</code></pre>
    </div>

    <h2>生命周期执行顺序</h2>
    <div class="code-block">
      <pre v-pre><code>// 父子组件生命周期执行顺序：
// 挂载阶段：
// 父 setup → 父 onBeforeMount → 子 setup → 子 onBeforeMount
// → 子 onMounted → 父 onMounted

// 更新阶段：
// 父 onBeforeUpdate → 子 onBeforeUpdate → 子 onUpdated → 父 onUpdated

// 卸载阶段：
// 父 onBeforeUnmount → 子 onBeforeUnmount → 子 onUnmounted → 父 onUnmounted</code></pre>
    </div>

    <h2>同一个钩子可以多次调用</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { onMounted } from 'vue'

// Vue 3 中可以多次注册同一个钩子，按顺序执行
onMounted(() => {
  console.log('第一个 mounted 回调')
})

onMounted(() => {
  console.log('第二个 mounted 回调')
})

// 这在 composable 中非常有用
// 每个 composable 可以注册自己的生命周期钩子
&lt;/script&gt;</code></pre>
    </div>

    <div class="tip-box info">
      <strong>💡 重要区别</strong>
      <p>
        1. Vue 3 中 <code>beforeDestroy</code> →
        <code>onBeforeUnmount</code>，<code>destroyed</code> →
        <code>onUnmounted</code>（语义更准确）<br />
        2. <code>setup()</code> 本身替代了 <code>beforeCreate</code> 和
        <code>created</code><br />
        3. Composition API 的钩子可以多次注册，非常适合逻辑拆分<br />
        4. 新增了 <code>onRenderTracked</code> 和
        <code>onRenderTriggered</code> 用于调试响应式
      </p>
    </div>
  </div>
</template>
