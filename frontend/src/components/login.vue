<template>
  <div class="connexion">
    <fieldset>
      <div class="formgroup">
        
              <label for="formNom">Email : </label>
              <input id="email"
                label="nom"
                v-model="email"
                type="text"
                required
                class="input-group--focused">

              <label for="formNom">Password : </label>
              <input id="password"
                label="mot de passe"
                v-model="password"
                type="password"
                
                required
                class="input-group--focused">
           
      </div>
    </fieldset>
      <div class="button">
    <router-link to="/"><button>Retour</button></router-link>
    <button id="validation" @click='checkLog()'>Valider</button>
  </div>
  </div>

</template>
<script>
let url = 'http://localhost:3000/api/user/login';


export default {
  name: 'loginAccount',
data:function(){
        return {
           
            email:"",
            password:"",
        }
    },
       
   methods: {

      checkLog:function(){
      console.log('login')
        const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;
        let checkMessage = '';
      if(regexEmail.test(this.email) == false || this.email ==''){
        checkMessage = checkMessage + "Veuillez renseigner votre email"
      }
      else {
          console.log('email vérifié')
      }
      if(this.password == ''){
        checkMessage = checkMessage + 'Veuillez renseigner votre mot de passe'
      }else{
        console.log('password vérifié')
      }
      if(checkMessage != ''){
        alert(checkMessage);
      return null
      }else{
        this.login2()
      }
      },
    login2: async function(){
    const mail = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const log = {
        mail,
        password,
        
    }
      
      const req = await fetch(url,{
        method:'post',
              headers:{
                "content-type": "application/json"
              },
              body: JSON.stringify(log)
      })
       const json = await req.json();
          if(json.error){
            alert('identifiant et/ou mot de passe incorrect')
            console.log("Veuillez vérifier vos informations ")}
            
          else{ 
            console.log(json)
            localStorage.setItem('token', JSON.stringify(json.token));
            //localStorage.setItem('id', JSON.stringify(json.userId));
            window.location.replace("http://localhost:8080/#/groupomania"); 
            alert(json.message)}
      /*.then(() => {
          
            localStorage.setItem('token', JSON.stringify(log.mail));*/
            
      }
      //.catch(error => console.error({ error }));
         // const json = await req.json();
          //if(json.error)
            //console.log("Veuillez vérifier vos informations ")
          //else( console.log('connexion réussi'))
          
    },
        }

  


</script>


<style lang="scss" scoped>
  .connexion{
    width: 100%;
  }

  fieldset{
  background-color: rgba(156, 154, 154, 0.13);
  margin: 0;
  padding: 10px;
  border-radius: 10px;
  }
  .formgroup{
      
    display: grid;
    width: 100%;
  }
label{
  color: #2c3e50;
  font-weight: bold;
  font-size: 1.2em;
  height: 35px;
  text-align: start;
}
input{
  box-shadow: 0 2px 5px rgb(245, 244, 244);
  height: 35px;
  border-radius: 10px;
} 
.button{
    width: 100%;  
}
button{
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