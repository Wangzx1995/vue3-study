<template>
  <div class="content-page">
    <h1>插槽 Slots</h1>
    <p>
      插槽是 Vue 中组件内容分发的机制。Vue 3 统一使用
      <code>v-slot</code> 指令，移除了 Vue 2 中的废弃语法。
    </p>

    <h2>默认插槽</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;!-- 子组件 Card.vue --&gt;
&lt;template&gt;
  &lt;div class="card"&gt;
    &lt;div class="card-body"&gt;
      &lt;slot&gt;默认内容（没有传入时显示）&lt;/slot&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;!-- 父组件使用 --&gt;
&lt;Card&gt;
  &lt;p&gt;这里的内容会替换 slot 默认内容&lt;/p&gt;
&lt;/Card&gt;</code></pre>
    </div>

    <h2>具名插槽</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;!-- 子组件 Layout.vue --&gt;
&lt;template&gt;
  &lt;div class="layout"&gt;
    &lt;header&gt;
      &lt;slot name="header"&gt;&lt;/slot&gt;
    &lt;/header&gt;
    &lt;main&gt;
      &lt;slot&gt;&lt;/slot&gt; &lt;!-- 默认插槽 --&gt;
    &lt;/main&gt;
    &lt;footer&gt;
      &lt;slot name="footer"&gt;&lt;/slot&gt;
    &lt;/footer&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;!-- 父组件使用 --&gt;
&lt;Layout&gt;
  &lt;template #header&gt;
    &lt;h1&gt;页面标题&lt;/h1&gt;
  &lt;/template&gt;

  &lt;!-- 默认插槽内容 --&gt;
  &lt;p&gt;主要内容&lt;/p&gt;

  &lt;template #footer&gt;
    &lt;p&gt;页脚信息&lt;/p&gt;
  &lt;/template&gt;
&lt;/Layout&gt;</code></pre>
    </div>

    <h2>作用域插槽</h2>
    <p>作用域插槽允许子组件向父组件的插槽传递数据：</p>
    <div class="code-block">
      <pre v-pre><code>&lt;!-- 子组件 DataList.vue --&gt;
&lt;template&gt;
  &lt;ul&gt;
    &lt;li v-for="item in items" :key="item.id"&gt;
      &lt;!-- 将 item 数据传给父组件 --&gt;
      &lt;slot :item="item" :index="index"&gt;
        {{ item.name }} &lt;!-- 默认渲染 --&gt;
      &lt;/slot&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;

&lt;script setup&gt;
defineProps({
  items: Array
})
&lt;/script&gt;

&lt;!-- 父组件使用 --&gt;
&lt;DataList :items="users"&gt;
  &lt;template #default="{ item, index }"&gt;
    &lt;span&gt;{{ index + 1 }}. {{ item.name }} - {{ item.email }}&lt;/span&gt;
  &lt;/template&gt;
&lt;/DataList&gt;

&lt;!-- 简写（只有默认插槽时） --&gt;
&lt;DataList :items="users" v-slot="{ item }"&gt;
  &lt;span&gt;{{ item.name }}&lt;/span&gt;
&lt;/DataList&gt;</code></pre>
    </div>

    <h2>具名作用域插槽</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;!-- 子组件 Table.vue --&gt;
&lt;template&gt;
  &lt;table&gt;
    &lt;thead&gt;
      &lt;slot name="header" :columns="columns"&gt;&lt;/slot&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
      &lt;tr v-for="row in data" :key="row.id"&gt;
        &lt;slot name="row" :row="row"&gt;&lt;/slot&gt;
      &lt;/tr&gt;
    &lt;/tbody&gt;
  &lt;/table&gt;
&lt;/template&gt;

&lt;!-- 父组件 --&gt;
&lt;Table :data="tableData" :columns="columns"&gt;
  &lt;template #header="{ columns }"&gt;
    &lt;tr&gt;
      &lt;th v-for="col in columns" :key="col"&gt;{{ col }}&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/template&gt;

  &lt;template #row="{ row }"&gt;
    &lt;td&gt;{{ row.name }}&lt;/td&gt;
    &lt;td&gt;{{ row.age }}&lt;/td&gt;
  &lt;/template&gt;
&lt;/Table&gt;</code></pre>
    </div>

    <h2>Vue 2 vs Vue 3 插槽语法</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2 (废弃语法)</div>
        <div class="code-block">
          <pre v-pre><code>&lt;!-- 旧的具名插槽 --&gt;
&lt;div slot="header"&gt;标题&lt;/div&gt;

&lt;!-- 旧的作用域插槽 --&gt;
&lt;template slot="default" slot-scope="{ item }"&gt;
  {{ item.name }}
&lt;/template&gt;</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3 (统一语法)</div>
        <div class="code-block">
          <pre v-pre><code>&lt;!-- v-slot 或 # 简写 --&gt;
&lt;template #header&gt;标题&lt;/template&gt;

&lt;!-- 作用域插槽 --&gt;
&lt;template #default="{ item }"&gt;
  {{ item.name }}
&lt;/template&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="tip-box warning">
      <strong>⚠️ Vue 3 移除的语法</strong>
      <p>
        1. 移除了 <code>slot</code> 属性（用 <code>v-slot</code> /
        <code>#</code> 替代）<br />
        2. 移除了 <code>slot-scope</code> 属性<br />
        3. 统一使用 <code>v-slot</code> 指令和 <code>#</code> 简写
      </p>
    </div>
  </div>
</template>
