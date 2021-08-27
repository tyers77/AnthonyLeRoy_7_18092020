<template>
  <div class="home">
    <navBar id="nav"/>
    <img alt="Vue logo" src="../assets/logo-home.png" />
    <h1>Bienvenue sur le réseau social de votre entreprise</h1>
    <ul>
      <li><router-link to="/inscription"><button>Inscription</button></router-link></li>
      <li><router-link to="/connexion"><button>Connexion</button></router-link></li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
export default {
  name: 'Home',
  components:{
    navBar,
  }
}
</script>
<style lang="scss" scoped>
ul{
  display: flex;
  justify-content: space-evenly;
  list-style: none;
  padding: 0px;
  li{
    margin-right: 2px;
    margin-left: 2px;
  }
}
  button{
  width: 100%;
    width: 150px;
    height: 50px;
    margin-top: 15px;
    background-color:#2c3e50 ;
    color: #fff;
    font-size: 1.6em;
    border-radius: 15px;
  }
</style>
