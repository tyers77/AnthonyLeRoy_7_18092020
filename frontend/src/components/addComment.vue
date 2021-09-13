<template>
    <div class="newcomment">
        <h1>Créer votre commentaire</h1>
        <fieldset>
            <!--formulaire du commentaire-->
            <form class="formcomment" enctype="multipart/form-data" >
            <label for="formtext"> Commentaire :</label>
                 <input
          id="content"
          label="content"
          v-model="content"
          type="text"
          required
          class="input-group--focused"
        />
            </form>
        </fieldset>
        <router-link to="/comments"><button>Retour</button></router-link>
        <button @click="createComment()">Publier</button>
    </div>
</template>
<script>
export default {
    name:"addComment",
    data: function (){
        return {
            content:""
        }
    },

    methods:{
     
      createComment: async function(){
        let url = "http://localhost:3000/api/comment/post";
        let token = JSON.parse(localStorage.getItem('token'));
        const content = document.getElementById("content").value;
        const formData = new FormData();
        formData.append("content",content)
        const req = await fetch(url, {
        method: "post",
        headers: {
           Authorization: "Bearer " + token,
        },
        body: formData,
      })
      const json = await req.json();
          if(json.error){
            alert('veuillez vérifier votre message',json.error)
            }
          else{ 
          //window.location.replace("http://localhost:8080/#/groupomania"); 
          alert("Commentaire publié")}
      }
    }
}
</script>
<style lang="scss" scoped>
 .newcomment{
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}

  fieldset{
  background-color: rgba(156, 154, 154, 0.13);
  margin: 0;
  padding: 10px;
  border-radius: 10px;
  }
  .formcomment{
      
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