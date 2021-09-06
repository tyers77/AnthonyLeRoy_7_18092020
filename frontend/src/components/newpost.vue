<template>
    <div class="newpost">
        <h1>Créer votre Post</h1>
        <fieldset>
          
            <!--formulaire du post-->
            <form class="formpost" enctype="multipart/form-data" >
                
                <label for="title">
                        Titre :
                </label>
                 <input
          id="title"
          label="title"
          v-model="title"
          type="text"
          required
          class="input-group--focused"
        />
        <label for="imageUrl">
            Image : 
            </label>
          <input 
          
          id="imageUrl"
          label="imageUrl"
          ref="file"
          type="file"
          accept=".jpg,.jpeg,.png" 
          
          />
               <label for="formtext">
                        Commentaire :
                </label>
                 <input
          id="text"
          label="text"
          v-model="text"
          type="text"
          required
          class="input-group--focused"
        />
            </form>
        </fieldset>
        <router-link to="/groupomania"><button>Retour</button></router-link>
        <button @click="createPost()">Poster</button>
    </div>
</template>
<script>
let url = "http://localhost:3000/api/post/create";

export default {
    name:"newpost",
    data: function (){
        return {
            title:"",
            imageUrl:null,
            text:""
        }
    },
   
    methods: {
      
        //fetch post des posts
    createPost: async function () {
      let token = JSON.parse(localStorage.getItem('token'));
      const title = document.getElementById("title").value;
      const imageUrl = document.getElementById("imageUrl");
      const text = document.getElementById("text").value;
     const imgUrl = imageUrl.files[0];
      console.log(imgUrl);
      const formData = new FormData();
    if(imageUrl){
      const file = imageUrl.files[0];
      formData.append("image",file);
      formData.append("title",title)
      formData.append("text",text)
    }else{
    formData.append("title",title)
    formData.append("text",text)
    }
      const req = await fetch(url, {
        method: "post",
        headers: {
           Authorization: "Bearer " + token,
        },
        body: formData,
      })
      const json = await req.json();
          if(json.error){
            alert('veuillez vérifier vos informations',json.error)
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
    #text{
      height: 200px;  
}
#imageUrl{
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