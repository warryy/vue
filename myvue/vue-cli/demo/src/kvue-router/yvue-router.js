import View from '@/kvue-router/yrouter-view';
import Link from '@/kvue-router/yrouter-link';

let Vue;

class router {

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
                Vue.prototype.$router = this.$options.router;
            }
        }
    });

    // 定义 router-link 和 router-view 组件
    Vue.component('router-link', Link);
    Vue.component('router-view', View);
}

export default router;