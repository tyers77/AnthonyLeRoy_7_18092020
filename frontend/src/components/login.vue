<template>
  <div class="connexion">
    <fieldset>
      <div class="formgroup">
        <form class="login__form" id="loginForm" @submit.prevent="checkLog()">
          <label for="formNom">Pseudo : </label>
          <input
            id="pseudo"
            label="nom"
            placeholder="Votre pseudo..."
            v-model="pseudo"
            type="text"
            required
            class="input-group--focused"
          />

          <label for="formNom">Password : </label>
          <input
            id="password"
            label="mot de passe"
            placeholder="Votre password..."
            v-model="password"
            type="password"
            required
            class="input-group--focused"
          />
        </form>
      </div>
    </fieldset>
    <router-link to="/"
      ><button type="submitonclick">Retour</button></router-link
    >
    <button class="btn" id="validation" type="submit" @click="checkLog()">
      Valider
    </button>
  </div>
</template>
<script>
let url = "http://localhost:3000/api/user/login";
export default {
  name: "loginAccount",
  data: function() {
    return {
      pseudo: "",
      password: "",
    };
  },
  methods: {
    checkLog: function() {
      console.log("login");
      let checkMessage = "";
      if (this.pseudo == "") {
        checkMessage = checkMessage + "Veuillez renseigner votre pseudo";
      } else {
        console.log("pseudo vérifié");
      }
      if (this.password == "") {
        checkMessage = checkMessage + "Veuillez renseigner votre mot de passe";
      } else {
        console.log("password vérifié");
      }
      if (checkMessage != "") {
        alert(checkMessage);
        return null;
      } else {
        this.login2();
      }
    },

    login2: async function() {
      const pseudo = document.getElementById("pseudo").value;
      const password = document.getElementById("password").value;
      const log = {
        pseudo,
        password,
      };
      const req = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(log),
      });
      const json = await req.json();
      if (json.error) {
        alert("identifiant et/ou mot de passe incorrect");
        console.log("Veuillez vérifier vos informations ");
      } else {
        localStorage.setItem("token", JSON.stringify(json.token));
        window.location.replace("http://localhost:8080/#/groupomania");
        alert(json.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.connexion {
  width: 100%;
}

fieldset {
  background-color: rgba(156, 154, 154, 0.13);
  margin: 0;
  padding: 10px;
  border-radius: 10px;
}
form {
  display: grid;
  width: 100%;
}
label {
  color: black;
  font-weight: bold;
  font-size: 1.2em;
  height: 35px;
  text-align: start;
}
input {
  box-shadow: 0 2px 5px rgb(245, 244, 244);
  height: 35px;
  border-radius: 10px;
}
.button {
  width: 100%;
}
button {
  width: 100px;
  height: 25px;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: black;
  color: #fff;
  font-size: 1.2em;
  border-radius: 10px;
}
</style>
