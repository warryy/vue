import Vue from 'vue';

/**
 * 在 body 上面挂载一个组件
 * @param {Object} Component vue 组件的配置文件
 * @param {Object} props vue 组件所需参数
 */
export default function create(Component, props) {
    var vm = new Vue({
        render: h => h(Component, { props })
    }).$mount();

    var dom = vm.$el;
    // 将真实 dom append 给 body
    document.body.appendChild(dom);

    // 从 vue 实例中获取 vue 组件实例
    var _comp = vm.$children[0];
    _comp.remove = function remove() {
        document.body.removeChild(dom);
        _comp.$destroy();
    }

    return _comp;
}