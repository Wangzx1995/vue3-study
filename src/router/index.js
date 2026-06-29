import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  // 基础篇
  {
    path: "/basic/introduction",
    name: "Introduction",
    component: () => import("../views/basic/Introduction.vue"),
  },
  {
    path: "/basic/template-syntax",
    name: "TemplateSyntax",
    component: () => import("../views/basic/TemplateSyntax.vue"),
  },
  {
    path: "/basic/directives",
    name: "Directives",
    component: () => import("../views/basic/Directives.vue"),
  },
  {
    path: "/basic/events",
    name: "Events",
    component: () => import("../views/basic/Events.vue"),
  },
  {
    path: "/basic/forms",
    name: "Forms",
    component: () => import("../views/basic/Forms.vue"),
  },
  // 组合式 API
  {
    path: "/composition/setup",
    name: "Setup",
    component: () => import("../views/composition/Setup.vue"),
  },
  {
    path: "/composition/reactive",
    name: "Reactive",
    component: () => import("../views/composition/Reactive.vue"),
  },
  {
    path: "/composition/computed-watch",
    name: "ComputedWatch",
    component: () => import("../views/composition/ComputedWatch.vue"),
  },
  {
    path: "/composition/lifecycle",
    name: "Lifecycle",
    component: () => import("../views/composition/Lifecycle.vue"),
  },
  {
    path: "/composition/composables",
    name: "Composables",
    component: () => import("../views/composition/Composables.vue"),
  },
  // 组件
  {
    path: "/components/props-emits",
    name: "PropsEmits",
    component: () => import("../views/components/PropsEmits.vue"),
  },
  {
    path: "/components/slots",
    name: "Slots",
    component: () => import("../views/components/Slots.vue"),
  },
  {
    path: "/components/provide-inject",
    name: "ProvideInject",
    component: () => import("../views/components/ProvideInject.vue"),
  },
  {
    path: "/components/dynamic-async",
    name: "DynamicAsync",
    component: () => import("../views/components/DynamicAsync.vue"),
  },
  // 高级特性
  {
    path: "/advanced/teleport",
    name: "Teleport",
    component: () => import("../views/advanced/Teleport.vue"),
  },
  {
    path: "/advanced/suspense",
    name: "Suspense",
    component: () => import("../views/advanced/SuspenseView.vue"),
  },
  {
    path: "/advanced/transition",
    name: "Transition",
    component: () => import("../views/advanced/TransitionView.vue"),
  },
  {
    path: "/advanced/custom-directives",
    name: "CustomDirectives",
    component: () => import("../views/advanced/CustomDirectives.vue"),
  },
  {
    path: "/advanced/plugins",
    name: "Plugins",
    component: () => import("../views/advanced/Plugins.vue"),
  },
  // Vue2 vs Vue3 对比
  {
    path: "/comparison/overview",
    name: "ComparisonOverview",
    component: () => import("../views/comparison/Overview.vue"),
  },
  {
    path: "/comparison/reactivity",
    name: "ReactivityComparison",
    component: () => import("../views/comparison/Reactivity.vue"),
  },
  {
    path: "/comparison/component-api",
    name: "ComponentAPIComparison",
    component: () => import("../views/comparison/ComponentAPI.vue"),
  },
  {
    path: "/comparison/migration",
    name: "Migration",
    component: () => import("../views/comparison/Migration.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
