<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="vuex">
      <h3>vuex demo</h3>
      <p><button @click="$store.commit('add', 2)">add(2)</button>count: {{$store.state.count}}</p>
      <p><button @click="$store.dispatch('asyncAdd', 2)">asyncAdd(2)</button>doubleCount: {{$store.getters.doubleCount}}</p>
    </div>
    <div class="demo">
      <Comp></Comp>
    </div>
    <div class="demo">
      <mySlot></mySlot>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import mySlot from "@/components/slots/Index";
import Comp from "@/components/comp/Index";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    mySlot,
    Comp
  },
};
</script>
<style scoped>
.vuex {
  border: 1px solid #46a0f0;
  margin: 5px;
}
</style>