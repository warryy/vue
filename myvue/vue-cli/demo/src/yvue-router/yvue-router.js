import View from '@/yvue-router/yrouter-view';
import Link from '@/yvue-router/yrouter-link';

let Vue;

class router {
    constructor(options) {
        // 将 current 设置成响应式数据
        let hashUrl = window.location.hash.slice(1);
        // Vue.util.defineReactive(this, 'current', hashUrl || '/');
        
        // 存储 options
        this.$options = options;
        Vue.util.defineReactive(this, 'matched', []);
       

        this.current = hashUrl || '/';
        this.match();

         // 监听 url 的 hash 改变
         window.addEventListener('hashchange', this.onhashchange.bind(this))
         window.addEventListener('load', this.onhashchange.bind(this))
        // // 缓存路由
        // this.routeMap = {};
        // this.$options.routes.forEach(route => {
        //     this.routeMap[route.path] = route;
        // });
    }

    match(routes) {
        routes = routes || this.$options.routes;
        for (let i = 0; i < routes.length; ++i) {
            const route = routes[i];
            if (this.current === '/' && route.path === '/') {
                this.matched.push(route);
                return;
            }
            if (this.current !== '/' && this.current.indexOf(route.path) != -1 && route.path !=='/') {
                this.matched.push(route);
                if (route.children) {
                    this.match(route.children);
                }
                return;
            }
        }
    }

    onhashchange(e) {
        console.log('onhashchange', this.current)
        this.current = e.target.location.hash.slice(1);
        this.matched = [];
        this.match();
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