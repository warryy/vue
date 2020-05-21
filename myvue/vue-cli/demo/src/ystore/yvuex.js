let Vue;

class Store {
    constructor(options) {
        this._state = new Vue({
            data: {
                $$state: options.state
            }
        });

        this._mutations = options.mutations;
    }

    get state() {
        return this._state._data.$$state
    }

    set state(v) {
        console.error('不可以直接设置 state, 需要提交 mutation 或者派发 action')
    }

    commit(mutationName, payload) {
        let entry = this._mutations[mutationName];
        if (!entry) {
            console.error('未知的 mutation: ', mutationName)
            return;
        }
        entry(this.state, payload);
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