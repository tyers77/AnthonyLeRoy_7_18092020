<template>
    <div class="comment">
          <div class="nav">
        <router-link to ="/groupomania">Retour</router-link> |
        <router-link to="/" @click="disconnect()">Déconnexion</router-link> 
    </div>
        <img alt="Vue logo" src="../assets/logo-home.png" />
        <comments/>
    </div>
  
</template>
<script>
import comments from "@/components/comments.vue"
export default {
  name: 'viewComments',
   components:{
    comments
  },
}
</script>
<style lang="scss" scoped>

</style>