<template>
    <div class="navuser">
        <ul>
        <router-link to="/Newpost"><li> Nouveau Post</li> </router-link>
        <router-link to="/Profil" @click="getUser()"><li>Profil</li> </router-link>
        </ul>
    </div>

</template>
<script>

        

export default {
  name: 'navUser',
  methods:{


    getUser: function(){
        let url = "http://localhost:3000/api/user/get"
        fetch(url)
        .then(response => response.json())
        .then(response => sessionStorage.setItem("user", JSON.stringify(response)))
        .catch(error => console.error("erreur" + error))
   
        
        }
    
    /*lastProfil: function(){
        let lastprofil = JSON.parse(localStorage.getItem("user"));
        let lastpseudo = document.getElementById("lastpseudo"); 
        lastpseudo.innerHTML = lastprofil.req.body.pseudo ;
    }*/
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