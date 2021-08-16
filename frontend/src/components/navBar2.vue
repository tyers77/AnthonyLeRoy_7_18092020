<template>
    <div class="nav">
        
        <router-link to="/">Déconnexion</router-link> |
        <router-link to ="/about">About</router-link>
        
    </div>

</template>

<script>
export default {
  name: 'navBar2',

}
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #2c3e50;
    }
    &:hover {
      color: #fd2800;
    }
  }
}
</style>