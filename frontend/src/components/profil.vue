<template>
<div>
    <div id="profil">

    </div>
    <section id="feel"></section>
    <!--<fieldset>
      <form class="formprofil">
        <legend > Modifier mon pseudo </legend>
        <label for="formNom">Nouveau pseudo : </label>
        <input
          id="pseudo"
          label="nom"
          v-model="pseudo"
          type="text"
          required
          class="input-group--focused"
        />
 <legend > Modifier mon mail </legend>
        <label for="formNom">nouveau mail : </label>
        <input
          id="email"
          label="email"
          v-model="email"
          type="email"
          required
          class="input-group--focused"
        />
         
           <legend > Modifier mon password </legend>
        <label for="formNom">Nouveau password : </label>
        <input
          id="password"
          label="mot de passe"
          v-model="password"
          type="password"
          required
          class="input-group--focused"
        />
      </form>
    </fieldset>-->
        <router-link to="/groupomania"><button>Retour</button></router-link>
        <!--<button class="update" @click="updateProfil()" >Modifier</button>-->
        <router-link to="/"><button @click="deleteProfil()">Supprimer mon compte</button></router-link>
</div>
</template>
<script>

export default {
    name:'profil',
     data: function () {
    return {
      email: "",
      pseudo: "",
      //avatar:null,
      password: "",
    };
},
 mounted() {
    this.getUser();
  },
methods:{

  createPostHtml: function (post) {
      const articleParent = document.getElementById("profil");
      post.forEach((element) => {
        let post = `<h2 class="titre" style="color: #2c3e50;">Bienvenue sur votre profil</h2>
                    <h3 class="pseudo" style="color: #2c3e50;">${element.pseudo}</h3>
                    <p>${element.email}</p>
                    <img class="avatar" alt="photo de profil" src="${element.avatar}" style="width: 20%;border-radius: 10px;" `;
        articleParent.insertAdjacentHTML("beforeend", post);
      });
    },
  
     getUser: function () {
      let token = JSON.parse(localStorage.getItem("token"));
      let url = "http://localhost:3000/api/user/get/:id";
      fetch(url, {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.createPostHtml(json);
        }) 
        .catch((error) => {console.error("erreur" + error)
        });
    },
    deleteProfil: function(){
      let token = JSON.parse(localStorage.getItem("token"));
      let url = "http://localhost:3000/api/user/delete/:id";
      fetch(url, {
        method: "delete",
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      alert("compte supprimée");
    },
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
legend{
  color: #2c3e50;
  font-weight: bold;
  font-size: 1.2em;
  height: 35px;
 
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
  //width: 100px;
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