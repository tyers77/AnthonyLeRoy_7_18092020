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

export default {
    name: 'comments',

mounted() {
    this.viewOnePost(); //lance getpost() a l affichage de la page
    
  },
methods:{

createPostHtml: function (post) {
      const articleParent = document.getElementById("post");
      post.forEach((element) => {
        let post = `<article class="post" 
        style=
        "background-color: rgba(156, 154, 154, 0.13);
        border-radius: 10px;
                ">
            <h2 class="titre" style="color: #2c3e50;">${element.title}</h2>
                <p class="postdate" style="font-weight: bold;
    color: #2c3e50;">${element.dateFr}</p>
                    <img class="media" alt="photo du post" src="${element.imageUrl}" style="width: 50%;border-radius: 10px;">
                        <p class="description" style="font-weight: bold;
    color: #2c3e50;">${element.text}</p>
        </article>`;
        articleParent.insertAdjacentHTML("beforeend", post);
      });
    },

  viewOnePost: function () {
      let param = new URLSearchParams(window.location.search);
      let idPost = param.get("id");
      let token = JSON.parse(localStorage.getItem('token'));
      let url = "http://localhost:3000/api/post/get/:id"+idPost;
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