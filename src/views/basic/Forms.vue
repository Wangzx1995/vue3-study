<template>
  <div class="content-page">
    <h1>表单绑定</h1>
    <p>
      Vue 的 <code>v-model</code> 指令在表单元素上创建双向数据绑定。Vue 3 中
      v-model 的底层实现有所变化，但使用方式基本一致。
    </p>

    <h2>基础用法</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;script setup&gt;
import { ref } from 'vue'

const text = ref('')
const message = ref('')
const picked = ref('')
const selected = ref('')
const checked = ref(false)
const checkedNames = ref([])
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 文本输入 --&gt;
  &lt;input v-model="text" placeholder="输入文本" /&gt;
  &lt;p&gt;输入的是: {{ text }}&lt;/p&gt;

  &lt;!-- 多行文本 --&gt;
  &lt;textarea v-model="message" placeholder="输入多行"&gt;&lt;/textarea&gt;

  &lt;!-- 复选框 - 单个 --&gt;
  &lt;input type="checkbox" v-model="checked" id="cb" /&gt;
  &lt;label for="cb"&gt;{{ checked }}&lt;/label&gt;

  &lt;!-- 复选框 - 多个 --&gt;
  &lt;input type="checkbox" v-model="checkedNames" value="张三" /&gt;
  &lt;input type="checkbox" v-model="checkedNames" value="李四" /&gt;
  &lt;input type="checkbox" v-model="checkedNames" value="王五" /&gt;
  &lt;p&gt;选中: {{ checkedNames }}&lt;/p&gt;

  &lt;!-- 单选框 --&gt;
  &lt;input type="radio" v-model="picked" value="male" /&gt; 男
  &lt;input type="radio" v-model="picked" value="female" /&gt; 女

  &lt;!-- 下拉选择 --&gt;
  &lt;select v-model="selected"&gt;
    &lt;option disabled value=""&gt;请选择&lt;/option&gt;
    &lt;option&gt;A&lt;/option&gt;
    &lt;option&gt;B&lt;/option&gt;
    &lt;option&gt;C&lt;/option&gt;
  &lt;/select&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>v-model 修饰符</h2>
    <div class="code-block">
      <pre v-pre><code>&lt;template&gt;
  &lt;!-- .lazy: 在 change 事件后更新而非 input 事件 --&gt;
  &lt;input v-model.lazy="msg" /&gt;

  &lt;!-- .number: 将输入值转为数字类型 --&gt;
  &lt;input v-model.number="age" type="number" /&gt;

  &lt;!-- .trim: 自动去除首尾空格 --&gt;
  &lt;input v-model.trim="name" /&gt;
&lt;/template&gt;</code></pre>
    </div>

    <h2>组件上的 v-model (Vue 3 重大变化)</h2>
    <div class="comparison-box">
      <div class="vue2-side">
        <div class="side-header">Vue 2</div>
        <div class="code-block">
          <pre v-pre><code>&lt;!-- 父组件 --&gt;
&lt;MyInput v-model="msg" /&gt;
&lt;!-- 等价于 --&gt;
&lt;MyInput :value="msg" @input="msg = $event" /&gt;

&lt;!-- 子组件 --&gt;
&lt;script&gt;
export default {
  props: ['value'],
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
&lt;/script&gt;

&lt;!-- 多个值需要 .sync --&gt;
&lt;MyComp :title.sync="title" /&gt;</code></pre>
        </div>
      </div>
      <div class="vue3-side">
        <div class="side-header">Vue 3</div>
        <div class="code-block">
          <pre v-pre><code>&lt;!-- 父组件 --&gt;
&lt;MyInput v-model="msg" /&gt;
&lt;!-- 等价于 --&gt;
&lt;MyInput
  :modelValue="msg"
  @update:modelValue="msg = $event"
/&gt;

&lt;!-- 子组件 --&gt;
&lt;script setup&gt;
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
&lt;/script&gt;

&lt;!-- 支持多个 v-model！ --&gt;
&lt;UserForm
  v-model:name="userName"
  v-model:email="userEmail"
/&gt;</code></pre>
        </div>
      </div>
    </div>

    <h3>自定义 v-model 修饰符（Vue 3 新增）</h3>
    <div class="code-block">
      <pre v-pre><code>&lt;!-- 父组件使用自定义修饰符 --&gt;
&lt;MyInput v-model.capitalize="text" /&gt;

&lt;!-- 子组件实现 --&gt;
&lt;script setup&gt;
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () =&gt; ({}) }
})
const emit = defineEmits(['update:modelValue'])

function onInput(e) {
  let value = e.target.value
  // 检测是否有 capitalize 修饰符
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;input :value="modelValue" @input="onInput" /&gt;
&lt;/template&gt;</code></pre>
    </div>

    <div class="tip-box success">
      <strong>✅ Vue 3 v-model 优势</strong>
      <p>
        1. 移除了 .sync 修饰符，统一使用 v-model<br />
        2. 支持一个组件绑定多个 v-model<br />
        3. 支持自定义 v-model 修饰符<br />
        4. prop 从 value 改为 modelValue，事件从 input 改为 update:modelValue
      </p>
    </div>
  </div>
</template>
