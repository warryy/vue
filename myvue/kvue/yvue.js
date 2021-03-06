'use strict';

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
                watchers.forEach(w => w.update())
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
        this.$methods = options.methods;

        // 1. 响应式处理
        // TODO: 此处为什么不用 Observer 实例来写
        // new Observer(this.$data)
        observe(this.$options)

        // 1.1. 数据的代理
        proxy(this, '$data');
        proxy(this, '$methods');

        // 2. 模板编译
        new Compile(this.$options.el, this);
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


// 编译器, 获取模板中的指令和插值
class Compile {
    // vm: yvue 的实例, 用于初始化和更新页面
    // el: 选择器, 用于获取 dom
    constructor(el, vm) {
        this.$el = document.querySelector(el);
        this.$vm = vm;
        this.compile(this.$el);
    }

    // 编译
    compile(html) {
        let childNodes = html.childNodes;
        Array.from(childNodes).forEach(child => {
            if (this.isElement(child)) {
                this.compileElement(child);
            }

            if (this.isInner(child)) {
                this.compileText(child);
            }

            // 递归
            if (child.childNodes) {
                this.compile(child)
            }
        });
    }

    isElement(node) {
        return node.nodeType === 1;
    }

    isInner(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

    // 编译插值文本
    compileText(node) {
        // node.textContent = this.$vm[RegExp.$1];
        this.update(node, RegExp.$1, 'text');
    }

    // 编译元素节点, 判断其属性是否含有 y-xx 的指令语法, 目前只支持 y-text
    /**
     * 1. 拿到节点属性名
     * 2. 遍历属性名, 判断是否是指令(目前只看 y-text 这个指令)
     * 3. 获取到指令的名称和值
     * 4. 通过名称找到定义好的对应的函数, 执行
     */
    compileElement(node) {
        let nodeAttrs = node.attributes;

        Array.from(nodeAttrs).forEach(attr => {
            let attrName = attr.name;
            let exp = attr.value;

            // 如果是自定义指令
            if (this.isDirective(attrName)) {
                // 获取指令1``的名字
                let directiveName = attrName.slice(2);
                this[directiveName] && this[directiveName](node, exp);
            }

            // 如果是事件监听函数
            if (this.isEvent(attrName)) {
                let eventName = attrName.slice(1);
                this[eventName] && this[eventName](node, exp);
            }

        })
    }

    update(node, exp, dir) {
        const fn = this[dir + 'Updater'];
        // fn && fn.call(this, node, exp);
        fn && fn(node, this.$vm[exp], exp);
        
        // new watcher, 将 update 传给 watcher
        new Watcher(this.$vm, exp, function (val) {
            fn && fn(node, val, exp);
        });
    }

    isDirective(attrName) {
        return attrName.indexOf('y-') === 0;
    }

    isEvent(attrName) {
        return attrName.indexOf('@') === 0;
    }

    click(node, exp) {
        node.addEventListener('click', e => {
            this.$vm[exp] && this.$vm[exp]();
        });
    }

    model(node, exp) {
        this.update(node, exp, 'model');

        node.addEventListener('input', e => {
            this.$vm[exp] = e.currentTarget.value;
        })
    }

    modelUpdater(node, val) {
        node.value = val;
    }

    text(node, exp) {
        this.update(node, exp, 'text');
    }

    textUpdater(node, val) {
        node.textContent = val;
    }

    html(node, exp) {
        this.update(node, exp, 'html');
    }

    htmlUpdater(node, val) {
        node.innerHTML = val;
    }
}
const watchers = [];
// vm + exp ==> update
class Watcher {
    constructor(vm, exp, updater) {
        this.vm = vm;
        this.exp = exp;
        this.updater = updater;
        this.update()
        watchers.push(this);
    }

    update() {
        this.updater(this.vm[this.exp]);
    }
}