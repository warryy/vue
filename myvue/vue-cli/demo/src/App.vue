<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="demo">
      <Comp></Comp>
    </div>
    <div class="demo">
      <mySlot></mySlot>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import mySlot from "./components/slots/Index";
import Comp from "./components/comp/Index";

export default {
  name: "App",
  components: {
    mySlot,
    Comp,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.demo {
  margin: 5px;
  border: 1px solid #46a0f0;
}
</style>
