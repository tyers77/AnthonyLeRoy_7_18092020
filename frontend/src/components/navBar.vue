<template>
  <div class="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: "navBar",
};
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: black;

    &.router-link-exact-active {
      color: black;
    }
    &:hover {
      color: #fd2800;
    }
  }
}
</style>
