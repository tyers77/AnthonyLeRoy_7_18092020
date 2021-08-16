<template>
  <div class="inscription">
    <fieldset>
      <div class="formgroup">
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
    </fieldset>
    <p id="error"></p>
    <div class="button">
      <router-link to="/"><button>Retour</button></router-link>
      <button
        id="validation"
        @click="checkForm()">Valider
      </button>
      
    </div>
  </div>
</template>
<script>
let url = "http://localhost:3000/api/user/signup";

export default {
  name: "createAccount",
  data: function () {
    return {
      email: "",
      pseudo: "",
      password: "",
    };
  },

  methods: {
    checkForm:function(){
      console.log('checkfrom')
        const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;
        let checkMessage ='';
      if(regexEmail.test(this.email)== false || this.email == ''){
         checkMessage = checkMessage +  "Veuillez vérifier les informations concernant votre mail.";
      }
      else{
        console.log('email vérifié')
      }
      if(this.pseudo ==''){
        checkMessage = checkMessage + "Veuillez créer votre pseudo.";
      }
      else{
        console.log('pseudo vérifié')
      }
      if(this.password ==''){
        checkMessage = checkMessage  + "Veuillez créer un mot de passe."
      }
      else{
        console.log('password vérifié')
      }
      if (checkMessage != "") {
      alert(checkMessage);
      return null
   } else {
this.create2();
   }
      
      },
    
    create2: async function () {
      const pseudo = document.getElementById("pseudo").value;
      const mail = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const newUser = {
        pseudo,
        mail,
        password,
      };
     const req = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
    const json = await req.json();
          if(json.error){
            alert('email déjà existant')
            console.log("Veuillez vérifier vos informations ")}
            
          else{ 
            localStorage.setItem('token', JSON.stringify(newUser.mail))
            window.location.replace("http://localhost:8080/#/groupomania"); 
            alert("compte crée, vous êtes connecté ")}
      //const json = await req.json();
      //if (json.error) 
      //console.log("Veuillez renseigner tous les champs")
      //else console.log("utilisateur crée avec succès")
      //window.location.assign("Groupomania.vue");
    }
  }  
}
</script>


<style lang="scss" scoped>
fieldset {
  background-color: rgba(156, 154, 154, 0.13);
  height: 250px;
  width: 100%;
  margin: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 10px;
}
.formgroup {
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr;
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
  text-align: start;
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
  background-color: #2c3e50;
  color: #fff;
  font-size: 1.2em;
  border-radius: 10px;
}
</style>