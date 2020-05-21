# demo

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

搭建步骤
1. vue-cli 初始化一个项目
2. 练习 component 的写法
   1. 设计一个表单提交及校验的组件系列, 参考 elementUI
      1. 包含 Index, YForm, YFormItem, YInput
   2. slot 的使用, 组件设计
   3. inject 和 provide
   4. async-validator 的使用
   5. Promise.all
   6. $parent 和 $children 的优化
      1.  emitter 的实现
   7. 通用弹窗组件的设计
      1. 创建组件 create.js 的文件设计书写
      2. Vue 组件实例和根实例
      3. new Vue 和 Vue.extends
      4. 组件的创建和销毁
3. slots 的写法
   1. 具名和匿名
   2. 插槽给父组件传参
4. 引入插件 vue-router
   1. vue add router
   2. 实现简版(0.0.1)插件 vue-router
      1. 实现 yvue-router
         1. 实现 install 方法
      2. 实现 yrouter-link
         1. js 文件名为后缀
         2. 返回一个 a 标签
      3. 实现 yrouter-view
         1. 直接返回一个渲染函数返回 null 的组件
      4. 实现 index.js
         1. 直接拷贝 vue-cli 新增的 router/index.js
         2. 将 vue-router 引用改为 yvue-router
   3. 0.0.2
      1. 实现 yvue-router
         1. 暂存 Vue
         2. 监听 hashchange
         3. 实现当前路由(current)的响应式
            1. Vue.util.defineReactive
      2. 实现 yrouter-view
         1. 从路由表中找到当前组件配置文件 xx.vue, 渲染并返回
   4. 0.0.3 优化, 路由配置文件缓存