<template>
  <span>
    <input :value="value" @input="onInput" v-bind="$attrs" />
  </span>
</template>

<script>
export default {
  // 避免 span 标签继承属性
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    onInput(e) {
      console.log('inputing', e.target.value)
      this.$emit("input", e.target.value);
      this.$parent.$emit('validate', e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>