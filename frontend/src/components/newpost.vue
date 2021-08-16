<template>
    <div class="newpost">
        <fieldset>
            <!--formulaire du post-->
            <div class="formpost">
                <h1>Créer votre Post</h1>
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
            media:"",
            description:""
        }
    },

    methods: {
        //fetch post des posts
          createPost: async function () {
      const titre = document.getElementById("titre").value;
      const media = document.getElementById("media").value;
      const description = document.getElementById("description").value;
      const newPost = {
        titre,
        media,
        description,
      };
      const req = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
           Authorization: window.localStorage.getItem("token"),
        },
        body: JSON.stringify(newPost),
      })
      const json = await req.json();
          if(json.error){
            alert('veuillez vérifier vos informations')
            console.log("Veuillez vérifier vos informations ")}
            
          else{ 
            //localStorage.setItem('token', JSON.stringify(json.token))
          window.location.replace("http://localhost:8080/#/groupomania"); 
          alert("Post publié")}
    }
}
}
</script>