<template>
    <div class="comments">
        <h2 class="viewComments">Commentaires publiés sur ce post</h2>
        <section id="post">
        </section>
        <router-link to="/AddComment"><button class="addComment">Ajouter un commentaire </button></router-link>
        <p class="text"> </p>
    </div>
</template>
<script>
let token = JSON.parse(localStorage.getItem('token'));
export default {
    name: 'comments',

mounted() {
    this.viewOnePost(); 
    
  },
methods:{

createPostHtml: function (element) {
  console.log(element)
      const articleParent = document.getElementById("post");
        let article = `<article class="post" 
        style=
        "background-color: rgba(156, 154, 154, 0.13);
        border-radius: 10px;
                ">
            <h2 class="titre" style="color: #2c3e50;">${element.title}</h2>
                <p class="postdate" style="font-weight: bold;
    color: #2c3e50;">${element.dateFr}</p>
                    <img class="media" alt="photo du post" src="${element.imageUrl}" style="width: 50%;border-radius: 10px;">
                        <p class="description" style="font-weight: bold;
    color: #2c3e50;">${element.text}</p><div class = ‘comments’ id= ‘commentsForPost${element.id}’>

<form class="comments__form" id="commentForm${element.id}">

              <label for="comment${element.id}">Commentez !</label>

              <input type="text" id="comment${element.id}" name = "comment${element.id}" placeholder="Votre commentaire..."/>

                 

              <button class="btn" type="submit">Envoyer</button>

</form></div>
        </article>`;
        articleParent.insertAdjacentHTML("beforeend", article);
    },


sendComment : async function (postId, content) {

  try {

    const res = await fetch(

      "http://localhost:3000/api/post/" + postId + "/comment",

      {

        method: "post",

        headers: {

          "Content-Type": "application/json",

          Authorization: "Bearer " + token,

        },

        body: JSON.stringify({ content }),

      }

    );

    const json = await res.json();

    if (json.error) {

     console.log(json.error);

    } else {

    console.log(json.message);

         }

  } catch (error) {

    console.log(error);

  }
},
addComment : function(postId){

const commentFormToListen = document.getElementById("commentForm"+postId)

const inputs = commentFormToListen.elements ;

commentFormToListen.addEventListener("submit",(e) => {

e.preventDefault() ;

const content = inputs["comment"+postId];

this.sendComment(postId,content)
})
},

 viewOnePost: function () {
      let urlId = window.location.href;
      let idPost = urlId.split("id=")[1];
      console.log(idPost)
      
      let url = "http://localhost:3000/api/post/"+ idPost;
      fetch(url,{
        method:"get",
        headers:{
          Authorization:'Bearer ' + token
        }
      })
      .then(response => response.json())
      .then(json => {
      this.createPostHtml(json);
      })
      .catch(error => console.error("erreur" + error))
    
  },
},
}
</script>
<style lang="scss" scoped>
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