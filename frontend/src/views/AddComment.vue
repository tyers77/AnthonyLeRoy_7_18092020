<template>
    <div class="addComment">
            <div class="nav">
        <router-link to ="/comments">Retour</router-link> |
        <router-link to="/" @click="disconnect()">Déconnexion</router-link> 
    </div>
        <img alt="Vue logo" src="../assets/logo-home.png" />
        <div id="addComment">
        <addComment/>
        </div>
    </div>
</template>
<script>
import addComment from '@/components/addComment.vue'
import {userAuth} from '@/helpers/auth.js'

export default {
  name:"createComment",
  components:{
      addComment,
  },
   mounted() {
    
    userAuth();
  
  },
  methods:{
      disconnect:function(){
    localStorage.clear(),
    sessionStorage.removeItem("utilisateur");
  }
}
}
</script>