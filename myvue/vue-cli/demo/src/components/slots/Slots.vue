<template>
    <div>
        <slot></slot>
        <br>
        <slot name="content"></slot>
        <slot name="testSlotsProps" baz="我是插槽传给父元素的内容"></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
div {
    margin: 10px;
    border: 1px solid #f00;
}
</style>