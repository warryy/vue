<template>
  <div>
    <Slots>
        <template></template>
        <template v-slot:default>我是默认的匿名插槽</template>
        <template v-slot:content>我是具名content插槽</template>
        <template v-slot:testSlotsProps="{baz}">
            <p>我是父元素自己的内容, 然后下面是子元素的内容</p>
            {{baz}}
            <p>然后这里又是我自己的内容</p>
        </template>
    </Slots>
  </div>
</template>

<script>
import Slots from "./Slots.vue";
export default {
    components: {
        Slots
    },
};
</script>

<style lang="scss" scoped>
</style>