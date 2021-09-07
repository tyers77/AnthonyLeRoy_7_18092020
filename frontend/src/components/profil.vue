<template>
    <div class="profil">
        <h2>Bienvenue sur votre profil</h2>
        <div class="inscription">
    <fieldset>
      <div class="formprofil">
        <label for="formNom">Pseudo : </label>
        <input
          id="pseudo"
          label="nom"
          v-model="pseudo"
          type="text"
          required
          class="input-group--focused"
        />

        <label for="formNom">Mail : </label>
        <input
          id="email"
          label="email"
          v-model="email"
          type="email"
          required
          class="input-group--focused"
        />
        <label for="media">
            Avatar : 
            </label>
          <input 
          id="media"
          label="media"
          type="file" 
          accept=".jpg, .jpeg, .png"  
          />
        <label for="formNom">Password : </label>
        <input
          id="password"
          label="mot de passe"
          v-model="password"
          type="password"
          required
          class="input-group--focused"
        />
      </div>
    </fieldset></div>
        <router-link to="/groupomania"><button>Retour</button></router-link>
        <button class="update" >Modifier</button>
        <router-link to="/"><button @click="deleteProfil">Supprimer</button></router-link>
    </div>
</template>
<script>

export default {
    name:'profil',
     data: function () {
    return {
      email: "",
      pseudo: "",
      media:"",
      password: "",
    };
},
 mounted() {
    this.getUser();
  },
methods:{

  createUserProfil:function(){

  },
  
     getUser: function () {
      let token = JSON.parse(localStorage.getItem("token"));
      let url = "http://localhost:3000/api/user/get/:id";
      fetch(url, {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .catch((error) => {console.error("erreur" + error)
        });
        
    },
    deleteProfil: function(){
      let token = JSON.parse(localStorage.getItem("token"));
      let url = "http://localhost:3000/api/user/delete/:id";
      fetch(url, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.profil{
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}
fieldset {
  background-color: rgba(156, 154, 154, 0.13);
  
  margin: 0;
  padding: 10px;
  border-radius: 10px;
}
.formprofil {
  display: grid;
  width: 100%;
}
label {
  color: #2c3e50;
  font-weight: bold;
  font-size: 1.2em;
  height: 35px;
  text-align: start;
}
input {
  box-shadow: 0 2px 5px rgb(245, 244, 244);
  height: 35px;
  margin-bottom: 10px;
  border-radius: 10px;
  }

#media{
  padding-left: 7px;
}

button {
  width: 100px;
  height: 30px;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: #2c3e50;
  color: #fff;
  font-size: 1.2em;
  border-radius: 10px;
}
</style>