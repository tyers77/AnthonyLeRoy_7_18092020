<template>
    <div class="navuser">
        <ul>
        <router-link to="/newpost"><li> Nouveau Post</li> </router-link>
        <router-link to="/profil"><li>Profil</li> </router-link>
        </ul>
    </div>

</template>
<script>

        

export default {
  name: 'navUser',
  methods:{

}
}
</script>
<style lang="scss" scoped>
 ul{
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0px;
  li{
text-decoration: none;
  }
}
</style>