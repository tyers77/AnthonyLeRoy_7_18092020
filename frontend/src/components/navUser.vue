<template>
    <div class="navuser">
        <ul>
        <router-link to="/Newpost"><li> Nouveau Post</li> </router-link>
        <li>Recherche</li>
        <router-link to="/Profil"><li>Profil</li> </router-link>
        </ul>
    </div>

</template>
<script>
export default {
  name: 'navUser',
}
</script>
<style lang="scss" scoped>
 ul{
  display: flex;
  justify-content: space-evenly;
  list-style: none;
  li{
text-decoration: none;
  }
}
</style>