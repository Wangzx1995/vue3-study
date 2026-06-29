<template>
  <div class="content-page home-page">
    <div class="hero">
      <h1>🎯 Vue 3 从零开始学习指南</h1>
      <p class="hero-desc">
        专为 Vue 2 开发者设计的 Vue 3
        完整学习路线，涵盖核心概念、实战对比和最佳实践
      </p>
    </div>

    <div class="features">
      <div class="feature-card">
        <span class="feature-icon">📖</span>
        <h3>基础语法</h3>
        <p>模板语法、指令系统、事件处理、表单绑定等核心基础知识</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">⚡</span>
        <h3>组合式 API</h3>
        <p>setup、ref/reactive、computed/watch、生命周期、组合式函数</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🧩</span>
        <h3>组件深入</h3>
        <p>Props/Emits、Slots、Provide/Inject、动态组件与异步组件</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🔥</span>
        <h3>高级特性</h3>
        <p>Teleport、Suspense、Transition 动画、自定义指令、插件开发</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🔄</span>
        <h3>Vue2 vs Vue3</h3>
        <p>全方位对比两个版本差异，帮助快速理解升级要点</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🚀</span>
        <h3>实战代码</h3>
        <p>每个知识点都配有可运行的示例代码，边学边练</p>
      </div>
    </div>

    <h2>Vue 3 核心亮点</h2>
    <div class="highlights">
      <div class="highlight-item">
        <strong>🏗️ Composition API</strong>
        <p>更灵活的代码组织方式，逻辑复用更简单</p>
      </div>
      <div class="highlight-item">
        <strong>⚡ 更好的性能</strong>
        <p>基于 Proxy 的响应式系统，Tree-shaking 支持，更小的打包体积</p>
      </div>
      <div class="highlight-item">
        <strong>🔒 TypeScript 支持</strong>
        <p>从底层重写以支持 TypeScript，更好的类型推导</p>
      </div>
      <div class="highlight-item">
        <strong>📦 Fragment & Teleport</strong>
        <p>组件支持多根节点，Teleport 可将 DOM 渲染到任意位置</p>
      </div>
    </div>

    <h2>学习建议</h2>
    <div class="tip-box info">
      <strong>💡 如果你已经掌握 Vue 2：</strong>
      <p>
        建议先浏览「Vue2 vs Vue3」章节了解整体变化，再按顺序学习「组合式
        API」和「高级特性」。基础语法部分变化不大，可以快速浏览。
      </p>
    </div>
    <div class="tip-box success">
      <strong>✅ 推荐学习路线：</strong>
      <p>
        Vue3 简介 → 组合式 API (重点) → 组件深入 → 高级特性 → Vue2/Vue3 对比 →
        迁移实战
      </p>
    </div>
  </div>
</template>

<style scoped>
.home-page .hero {
  text-align: center;
  padding: 40px 0 30px;
}

.hero-desc {
  font-size: 16px;
  color: #666;
  max-width: 600px;
  margin: 12px auto 0;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 30px 0;
}

.feature-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 28px;
  display: block;
  margin-bottom: 12px;
}

.feature-card h3 {
  font-size: 16px;
  margin-bottom: 8px;
  color: #1a1a2e;
}

.feature-card p {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

.highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
}

.highlight-item {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
}

.highlight-item strong {
  font-size: 15px;
  color: #1a1a2e;
}

.highlight-item p {
  font-size: 13px;
  color: #666;
  margin-top: 4px;
}
</style>
