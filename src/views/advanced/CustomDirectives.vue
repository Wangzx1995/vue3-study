<template>
  <div class="content-page">
    <h1>自定义指令</h1>
    <p>
      Vue 3 中自定义指令的钩子函数名称做了调整，使其更贴近组件生命周期的命名。
    </p>

    <h2>指令钩子变化</h2>
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
          <td>bind</td>
          <td>beforeMount</td>
          <td>指令绑定到元素，DOM 插入前</td>
        </tr>
        <tr>
          <td>inserted</td>
          <td>mounted</td>
          <td>元素插入 DOM 后</td>
        </tr>
        <tr>
          <td>-</td>
          <td>beforeUpdate</td>
          <td>新增：元素更新前</td>
        </tr>
        <tr>
          <td>update</td>
          <td>updated</td>
          <td>元素更新后</td>
        </tr>
        <tr>
          <td>componentUpdated</td>
          <td>updated</td>
          <td>合并到 updated</td>
        </tr>
        <tr>
          <td>unbind</td>
          <td>unmounted</td>
          <td>指令解绑</td>
        </tr>
      </tbody>
    </table>

    <h2>定义和使用</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
// 在 &lt;script setup&gt; 中，以 v 开头的驼峰变量自动成为指令
const vFocus = {
  mounted(el) {
    el.focus()
  }
}

const vHighlight = {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow'
  },
  updated(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow'
  }
}
&lt;/script&gt;

&lt;template&gt;
  &lt;input v-focus /&gt;
  &lt;p v-highlight="'lightblue'"&gt;高亮文本&lt;/p&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>钩子函数参数</h2>
    <div class="code-block">
      <pre v-pre><code>const vMyDirective = {
  mounted(el, binding, vnode, prevVnode) {
    // el: 指令绑定的 DOM 元素
    // binding 对象包含：
    //   - value: 指令的绑定值 v-my="value"
    //   - oldValue: 更新前的值（仅在 updated 中可用）
    //   - arg: 指令参数 v-my:arg
    //   - modifiers: 修饰符对象 v-my.mod1.mod2 → { mod1: true, mod2: true }
    //   - instance: 组件实例
    //   - dir: 指令定义对象
    // vnode: 绑定元素的虚拟节点
    // prevVnode: 更新前的虚拟节点
  }
}

// 使用示例
// &lt;div v-my:arg.mod1.mod2="value"&gt;&lt;/div&gt;</code></pre>
    </div>

    <h2>简写形式</h2>
    <div class="code-block">
      <pre v-pre><code>// 如果只需要 mounted 和 updated 且逻辑相同，可以简写为函数
const vColor = (el, binding) => {
  el.style.color = binding.value
}

// 使用
// &lt;span v-color="'red'"&gt;红色文字&lt;/span&gt;</code></pre>
    </div>

    <h2>全局注册指令</h2>
    <div class="code-block">
      <pre v-pre><code>// main.js
const app = createApp(App)

app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.directive('permission', {
  mounted(el, binding) {
    const userPermissions = getUserPermissions()
    if (!userPermissions.includes(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  }
})</code></pre>
    </div>

    <h2>实用指令示例</h2>
    <div class="code-block">
      <pre v-pre><code>// 点击外部关闭（常用）
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      if (!el.contains(event.target)) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  }
}

// 防抖指令
const vDebounce = {
  mounted(el, binding) {
    let timer
    el.addEventListener('input', () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        binding.value()
      }, binding.arg || 300)
    })
  }
}

// 懒加载图片
const vLazy = {
  mounted(el, binding) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.src = binding.value
        observer.unobserve(el)
      }
    })
    observer.observe(el)
  }
}</code></pre>
    </div>

    <div class="tip-box warning">
      <strong>⚠️ 注意事项</strong>
      <p>
        1. Vue 3 中自定义指令不再支持用在组件上（仅原生 DOM 元素）<br />
        2. 如果需要对组件使用类似功能，推荐使用 Composable 替代<br />
        3. 在 &lt;script setup&gt; 中，以
        <code>v</code> 开头的变量会自动注册为局部指令
      </p>
    </div>
  </div>
</template>
