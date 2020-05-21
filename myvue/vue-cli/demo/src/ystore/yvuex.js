let Vue;

class Store {
    constructor(options) {
        this._state = new Vue({
            data: {
                $$state: options.state
            }
        });

    }

    get state() {
        return this._state._data.$$state
    }

    set state(v) {
        console.error('不可以直接设置 state, 需要提交 mutation 或者派发 action')
    }
}

function install(_vue) {
    Vue = _vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    });
}

export default {
    Store,
    install
}