<template>
    <div class="newpost">
        <h1>Créer votre Post</h1>
        <fieldset>
          
            <!--formulaire du post-->
            <div class="formpost">
                
                <label for="formtitle">
                        Titre :
                </label>
                 <input
          id="titre"
          label="titre"
          v-model="titre"
          type="text"
          required
          class="input-group--focused"
        />
        <label for="media">
            Image : 
            </label>
          <input 
          id="media"
          label="media"
          ref="file"
          type="file" 
          accept=".jpg, .jpeg, .png" 
          
          />
               <label for="formtext">
                        Commentaire :
                </label>
                 <input
          id="description"
          label="description"
          v-model="description"
          type="text"
          required
          class="input-group--focused"
        />
            </div>
        </fieldset>
        <router-link to="/groupomania"><button>Retour</button></router-link>
        <button @click="createPost()">Poster</button>
    </div>
</template>
<script>
let url = "http://localhost:3000/api/post/create"
export default {
    name:"newpost",
    data: function (){
        return {
            titre:"",
            media:null,
            description:""
        }
    },
   
    methods: {
      
        //fetch post des posts
    createPost: async function () {
      let token = localStorage.getItem("token");
      const titre = document.getElementById("titre").value;
      const media = document.getElementById("media");
      const description = document.getElementById("description").value;
      const formData = new FormData();
    if(media !== null){
      console.log("hi")
      const file = media.files[0];
      formData.append("media",file);
      formData.append("title",titre)
      formData.append("content",description)
      
    }else{
    formData.append("title",titre)
    formData.append("content",description)
    }
      /*const newPost = {
        titre,
        //media,
        description,
      };*/
      console.log(formData)
      const req = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
           Authorization: "Bearer" + " " +  token,
        },
        body: formData,
      })
      const json = await req.json();
          if(json.error){
            alert('veuillez vérifier vos informations')
            console.log("Veuillez vérifier vos informations ")}
            
          else{ 
          window.location.replace("http://localhost:8080/#/groupomania"); 
          alert("Post publié")}
    }
},

  

}
</script>
<style lang="scss" scoped>

.newpost{
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}
#newpost{
  width: 100%;
}
fieldset {
  background-color: rgba(156, 154, 154, 0.13);
  
  margin: 0;
  padding: 10px;
  border-radius: 10px;
}
.formpost {
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
    #description{
      height: 200px;  
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