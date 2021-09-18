<template>
  <div class="connexion">
    <navBar id="nav" />
    <img alt="Vue logo" src="../assets/logo-home.png" />
    <Login />
    <router-view />
    <img alt="Vue logo" src="../assets/logofooter.png" />
  </div>
</template>
<script>
import navBar from "@/components/navBar.vue";
import Login from "../components/login.vue";
export default {
  name: "Connexion",
  components: {
    navBar,
    Login,
  },
};
</script>
<style lang="scss" scoped>
.connexion {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}
</style>
