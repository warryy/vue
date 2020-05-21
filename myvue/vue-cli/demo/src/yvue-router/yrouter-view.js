
export default {
    render(h) {
        let component;
        this.$vnode.data.routerView = true;

        let parent = this.$parent;
        let depth = 0;
        
        while(parent) {
            if (parent?.$vnode?.data?.routerView) {
                depth ++;
            }
            parent = parent.$parent;
        }

        // let routeMap = this.$router.routeMap;
        // if (routeMap) {
        //     component = routeMap[this.$router.current].component;
        // }

        let matched = this.$router.matched || [];
        if (matched[depth]) {
            component = matched[depth].component || null;
        }

        return h(component);
    }
}