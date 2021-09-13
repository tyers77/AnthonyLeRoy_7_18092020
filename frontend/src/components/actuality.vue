<template>
  <div id="actuality">
    <h2>Fil d'actualités</h2>
    <section id="feel"></section>
  </div>
</template>
<script>

export default {
  name: "actuality",

  mounted() {
    this.getPost(); //lance getpost() a l affichage de la page
   
  },
  methods: {

    createPostHtml: function (post) {
      const articleParent = document.getElementById("feel");
      post.forEach((element) => {
        let post = `<article class="post" 
        style=
        "background-color: rgba(156, 154, 154, 0.13);
        border-radius: 10px;padding-bottom:15px;
                ">
            <h2 class="titre" style="color: #2c3e50;">${element.title}</h2>
                <p class="postdate" style="font-weight: bold;
    color: #2c3e50;">${element.dateFr}</p>
                    <img class="media" alt="photo du post" src="${element.imageUrl}" style="width: 50%;border-radius: 10px;">
                        <p class="description" style="font-weight: bold;
    color: #2c3e50;">${element.text}</p><a href="http://localhost:8080/#/comments?id=${element.id}" style=
        "background-color:#cbd0d4;
        border-radius: 10px; padding:5px;text-decoration:none;
                ">Commentaires</a>
        </article>`;
        articleParent.insertAdjacentHTML("beforeend", post);
        
      });
    },

    getPost: function () {
      let token = JSON.parse(localStorage.getItem('token'));
      let url = "http://localhost:3000/api/post/get";
      fetch(url,{
        method:'get',
              headers: {
                 Authorization: "Bearer " + token,
              },
      })
        .then((response) =>
          response.json()
        )
        .then((json) => {
          this.createPostHtml(json);
          console.log(json);
        }) 
        .catch((error) => console.error("erreur" + error));
    },
}};
</script>
<style lang="scss" scoped>
#feel {
  .titre {
    color: yellow;
  }
}
button {
  width: 200px;
  height: 30px;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
  background-color:#2c3e50;
  color: #fff;
  font-size: 1.2em;
  border-radius: 10px;
}
</style>