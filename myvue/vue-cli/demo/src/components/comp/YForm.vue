<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: { type: Object, required: true },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      console.log('yform validate')
      let resArr = this.$children.filter(child => child.prop).map(child => child.validate())
      console.log({resArr})
      Promise.all(resArr).then(res => {
        console.log('yform promise all res', res)
        cb(true)
      }).catch(e => {
        console.log('yform promise all catch', e)
        cb(false)
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>