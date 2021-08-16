<template> 
    <div class="connexion">
    <navBar id="nav"/>
    <img alt="Vue logo" src="../assets/logo-home.png" />
    <Login/>
    <router-view/>
    </div>
</template>
<script>
import navBar from '@/components/navBar.vue'
import Login from '../components/login.vue'
export default {
  name: 'Connexion',
  components:{
    navBar,
    Login
    
  }
}
</script>
<style lang="scss" scoped>

.connexion{
 
    width: 70%;
    margin: auto;
    
}
</style>