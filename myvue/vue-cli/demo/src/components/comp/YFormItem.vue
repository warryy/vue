<template>
  <div>
    <span>{{label}}</span>
    <slot></slot>
    <span class="err-tips" v-show="errTips">{{errTips}}</span>
  </div>
</template>

<script>
import schema from "async-validator";
import emitter from "@/mixins/emitter.js"

export default {
  name: 'YFormItem',
  componentName: 'YFormItem',
  inject: ["form"],
  data() {
    return {
      errTips: ""
    };
  },
  mixins: [emitter],
  props: {
    label: {
      type: String,
      default: ""
    },
    // 校验的字段名称
    prop: {
      type: String,
      default: "",
      required: false
    }
  },
  mounted() {
    this.$on("validate", function() {
      console.log('on input validate')
      this.validate();
    });
    if (this.prop) {
      this.dispatch('YForm', 'warryy.form.addField', [this]);
    }
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        let key = this.prop;
        let rule = this.form.rules[key];
        let value = this.form.model[key];
        if (!key) {
          resolve()
        }
        let validator = new schema({ [key]: rule });
        validator.validate({ [key]: value }, errs => {
          if (errs) {
            this.errTips = errs[0].message;
            reject();
          } else {
            this.errTips = "";
            resolve();
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.err-tips {
  color: red;
}
</style>