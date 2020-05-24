function observe(obj) {
    if (typeof obj !== 'object' || obj === null) return;
    new Observer(obj);
}

function defineProperty(obj, key, val) {
    if (typeof val === 'object') {
        observe(val);
    }
    Object.defineProperty(obj, key, {
        get() {
            console.log('get: ', key, val);
            return val;
        },
        set(newVal) {
            if (val !== newVal) {
                observe(newVal);
                val = newVal;
            }
            console.log('set: ', key, val);
            return val;
        }
    });
}

function set(obj, key, val) {
    defineProperty(obj, key, val);
}

/**
 * 代理数据
 * 1. 将 prop 上的属性放在 obj 上面
 * 1.1 获取 obj 属性时, 访问对应的 prop 上的属性
 * 1.2 设置 obj 属性是, 设置给对应的 prop 上的属性
 * 
 */
function proxy(obj, prop) {
    Object.keys(obj[prop]).forEach(key => {
        Object.defineProperty(obj, key, {
            get() {
                return obj[prop][key]
            },
            set(newVal) {
                obj[prop][key] = newVal;
                return newVal;
            }
        })
    })
}

class YVue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data;

        // 1. 响应式处理
        // TODO: 此处为什么不用 Observer 实例来写
        // new Observer(this.$data)
        observe(this.$options)

        // 1.1. 数据的代理
        proxy(this, '$data');

        // 2. 模板编译
    }
}

// 判断数据是对象还是数组, 并对他们进行响应式处理
class Observer {
    constructor(value) {
        this.value = value;
        this.walk(value);
    }
    walk(value) {
        Object.keys(value).forEach(key => {
            defineProperty(value, key, value[key]);
        });
    }
}