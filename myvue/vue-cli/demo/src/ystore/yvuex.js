let Vue;

class Store {
    constructor(options) {
        // 存储 getters
        this.wrapGetters = options.getters;

        this.getters = {};
        const _store = this;
        Object.keys(this.wrapGetters).forEach(key => {
            console.log('_store instanceof Store', _store instanceof Store);
           const fn = _store.wrapGetters[key];
            
            Object.defineProperty(_store.getters, key, {
                get() {
                    return fn(_store.state)
                }
            });
        });

        this._vm = new Vue({
            data: {
                $$state: options.state
            },
            computed: _store.getters
        });

        // 存储 mutation
        this._mutations = options.mutations;
        // 存储 action
        this._actions = options.actions;

        this.commit = function boundCommit(mutationName, payload) {
            commit.call(this, mutationName, payload)
        }
        this.dispatch = function boundDispatch(actoinName, payload) {
            dispatch.call(this, actoinName, payload)
        }
    }

    get state() {
        return this._vm._data.$$state
    }

    set state(v) {
        console.error('不可以直接设置 state, 需要提交 mutation 或者派发 action')
    }


}

function commit(mutationName, payload) {
    let entry = this._mutations[mutationName];
    if (!entry) {
        console.error('未知的 mutation: ', mutationName)
        return;
    }
    entry(this.state, payload);
}

function dispatch(actionName, payload) {
    let entry = this._actions[actionName];
    if (!entry) {
        console.error('未知的 action: ', actionName)
        return;
    }
    entry(this, payload);
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