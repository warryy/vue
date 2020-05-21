
export default {
    render(h) {
        let component = null;
        // // 获取到 路由配置表
        // let routes = this.$router.$options.routes;
        
        // routes.forEach(route => {
        //     // 找到当前路径对应的路由, 将路由的 vue 页面组件配置传入到 h 函数中
        //     if (route.path === this.$router.current) {
        //         component = route.component;
        //     }
        // });

        let routeMap = this.$router.routeMap;
        if (routeMap) {
            component = routeMap[this.$router.current].component;
        }

        return h(component);
    }
}