<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  componentName: 'YForm',
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
  created() {
    this.fields = [];
    this.$on('warryy.form.addField', item => {
      console.log('this', this)
      this.fields.push(item);
    })
  },
  methods: {
    validate(cb) {
      console.log('yform validate')
      // let fields = this.$children.filter(child => child.prop).map(child => child.validate())
      let fields = this.fields.map(field => field.validate());
      console.log({fields})
      Promise.all(fields).then(res => {
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