<template>
  <div class="newpost">
    <navBar2 id="nav" />
    <img alt="Vue logo" src="../assets/logo-home.png" />
    <div id="newpost">
      <newpost />
    </div>
    <img alt="Vue logo" src="../assets/logofooter.png" />
  </div>
</template>
<script>
import newpost from "@/components/newpost.vue";
import navBar2 from "@/components/navBar2.vue";
import { userAuth } from "@/helpers/auth.js";
export default {
  name: "createPost",
  components: {
    navBar2,
    newpost,
  },
  mounted() {
    userAuth();
  },
};
</script>
