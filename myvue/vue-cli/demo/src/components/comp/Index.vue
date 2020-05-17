<template>
  <div>
    <YForm :rules="rules" :model="model" ref="loginForm">
      <YFormItem label="姓名" prop="username">
        <YInput v-model="model.username" placeholder="请输入用户名"></YInput>
      </YFormItem>
      <YFormItem label="密码" prop="password">
        <YInput v-model="model.password" placeholder="请输入密码" type="password"></YInput>
      </YFormItem>
      <YFormItem>
        <button @click="login">登录</button>
      </YFormItem>
    </YForm>
    {{model.username}}
  </div>
</template>

<script>
import YForm from "./YForm.vue";
import YFormItem from "./YFormItem.vue";
import YInput from "./YInput.vue";

export default {
  components: {
    YForm,
    YFormItem,
    YInput
  },
  data() {
    return {
      name: "",
      model: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(isValid => {
        if (!isValid) {
          console.log('校验失败')
        } else {
          console.log('校验成功, 登录')
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>