import View from '@/yvue-router/yrouter-view';
import Link from '@/yvue-router/yrouter-link';

let Vue;

class router {
    constructor(options) {
        // 将 current 设置成响应式数据
        Vue.util.defineReactive(this, 'current', '/');
        // 存储 options
        this.$options = options;
        // 监听 url 的 hash 改变
        window.addEventListener('hashchange', this.onhashchange.bind(this))
        window.addEventListener('load', this.onhashchange.bind(this))

        // 缓存路由
        this.routeMap = {};
        this.$options.routes.forEach(route => {
            this.routeMap[route.path] = route;
        });
    }

    onhashchange(e) {
        console.log('onhashchange', this.current)
        this.current = e.target.location.hash.slice(1);
    }
}


router.install = function (_vue) {
    // 保存 Vue 这个构造函数
    Vue = _vue;
    // Vue.prototype.$router = this.$options.router;
    // 将 router 放在 Vue 的原型上, 以至于所有子组件都可以访问
    Vue.mixin({
        beforeCreate() {
            // 所有 Vue 组件都会走这个方法, 所以需要过滤一下
            if (this.$options.router) {
                // 将创建好的 router 实例挂载在 Vue 原型上
                Vue.prototype.$router = this.$options.router;
            }
        }
    });

    // 定义 router-link 和 router-view 组件
    Vue.component('router-link', Link);
    Vue.component('router-view', View);
}

export default router;