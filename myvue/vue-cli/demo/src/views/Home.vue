<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
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
  }
};
</script>
