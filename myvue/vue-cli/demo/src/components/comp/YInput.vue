<template>
  <span>
    <input :value="value" @input="onInput" v-bind="$attrs" />
  </span>
</template>

<script>
import emitter from '@/mixins/emitter.js';

export default {
  componentName: 'YInput',
  // 避免 span 标签继承属性
  inheritAttrs: false,
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    onInput(e) {
      console.log('this', this)
      console.log('inputing', e.target.value)
      this.$emit("input", e.target.value);
      // this.$parent.$emit('validate');
      this.dispatch('YFormItem', 'validate');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>