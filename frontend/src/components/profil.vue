<template>
  <div>
    <div id="profil">
      <h3 class="pseudo" style="">{{ user.pseudo }}</h3>
      <p>{{ user.email }}</p>
    </div>
    <button @click="deleteProfil(user.id)">
      Supprimer le profil
    </button>
  </div>
</template>
<script>
let token = JSON.parse(localStorage.getItem("token"));

export default {
  name: "profil",
  props: {
    user: Object,
  },
  data: function() {
    return {};
  },

  methods: {
    deleteProfil: function(UserId) {
      let url = "http://localhost:3000/api/user/delete/" + UserId;
      fetch(url, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      // window.location.reload();
      alert("compte supprimée");
    },
    /*     createPostHtml: function(post) {
      const articleParent = document.getElementById("profil");
      post.forEach((element) => {
        let post = `<h2 class="titre" style="color: #2c3e50;">Bienvenue sur votre profil</h2>
                    <h3 class="pseudo" style="color: #2c3e50;">${element.pseudo}</h3>
                    <p>${element.email}</p>
                    `;
        articleParent.insertAdjacentHTML("beforeend", post);
      });
    },
 */
    /* getUser: function() {
      let url = "http://localhost:3000/api/user/getOne";
      fetch(url, {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.pseudo = json.pseudo;
          this.email = json.email;
          this.id = json.id;
          //this.createPostHtml(json);
        })
        .catch((error) => {
          console.error("erreur" + error);
        });
    }, */

    /*     getAllUsers: function() {
      let url = "http://localhost:3000/api/user/getAll";
      fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            console.log(json.error);
          } else {
            console.log(json);
            if (json.length == 0) {
              let para = document.getElementById("usersList");
              let paraUser = document.createElement("p");
              paraUser.setAttribute("class", "noUser");
              para.appendChild(paraUser);
              paraUser.innerHTML = "Aucun utilisateur";
              console.log("pas d'utilisateur'");
            } else {
              json.forEach((element) => {
                const articleParent = document.getElementById("usersList");

                if (isAdmin == 1) {
                  let list = `<h2>Liste des utilisateurs</h2>
                    <h3 class="pseudo" style="color: #2c3e50;">${element.pseudo}</h3>
                    <p>${element.email}</p><button @click='deleteProfil(${element.id})' style="height: 30px;
    margin-left: 5px;
  margin-right: 5px;
  background-color: #2c3e50;
  color: #fff;
  font-size: 1em;
  border-radius: 10px;">Supprimer le compte</button>
                    `;

                  articleParent.insertAdjacentHTML("beforeend", list);
                  /*             document
                    .getElementsById("btn")
                    .addEventListener("click", (e) => {
                      e.preventDefault();
                      this.deleteProfil;
                    }); 
                }
              });
            }
          }
        })
        .catch((error) => {
          console.error("erreur" + error);
        });
    }, */
    /* deleteAccount: function() {
      const deleteUser = document.getElementsById("btn");
      deleteUser.addEventListener("click", (e) => {
        e.preventDefault();
        this.deleteProfil();
      });
    }, */
  },
};
</script>
<style lang="scss" scoped>
.profil {
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
h3 {
  color: #2c3e50;
}
.formprofil {
  display: grid;
  width: 100%;
}
legend {
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

#media {
  padding-left: 7px;
}

button {
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
