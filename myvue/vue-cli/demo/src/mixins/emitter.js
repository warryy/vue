function broadcast(componentName, event, args) {
    let children = this.$children;
    children.forEach(child => {
        if (child.$options.componentName === componentName) {
            child.$emit.apply(child, [event].concat(args));
        } else {
            broadcast.call(child, componentName, event, args)
        }
    });
}

export default {
    methods: {
        dispatch: function (componentName, event, args) {
            // 根实例的子元素的父元素, 不是根实例, 所以要有个或的关系
            let parent = this.$parent || this.$root;
            let name = parent.$options.componentName;

            // 如果存在父节点且 name 为空 或者 name 不为空但不等于 componentName, 则递归
            while (parent && (!name || componentName !== name)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.componentName;
                }
            }

            if (parent) {
                parent.$emit.apply(parent, [event].concat(args));
            }
        },
        broadcast: function(componentName, event, args) {
            broadcast.call(this, componentName, event, args);
        }
    }
}