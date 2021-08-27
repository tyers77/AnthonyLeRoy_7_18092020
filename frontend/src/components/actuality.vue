<template>
    <div class="actuality">
        <h2>Fil d'actualités</h2>
        <section id="feel">
            
        </section>
    </div>
</template>
<script>
export default {
    name: 'actuality',
    

mounted() {
    this.getPost();//lance getpost() a l affichage de la page
    this.getUser();
    },
    methods:{

 createPostHtml : function (post) {
    console.log(post)
    const articleParent = document.getElementById('feel');
    post.forEach((element) => {        
        let post = `<article class="post">
        <h2 class="titre" >${element.titre}</h2>
        <p class="postdate">${element.createdAt}</p>
        <img class="media" alt="photo du post" src="http://localhost:3000/images/">
        <p class="description">${element.description}</p>
        </article>`;
        articleParent.insertAdjacentHTML('beforeend',post);
    });
},

        getPost: function(){
            let url = "http://localhost:3000/api/post/get"
            fetch(url)
        .then(response => response.json())/*ensuite la réponse est une reponse json faire "réponse est une réponse json"*/
        .then(json => this.createPostHtml(json))/*ensuite faire de la réponse createProductHtml*/
        .catch(error => console.error("erreur" + error))
            } ,

            getUser: function() {
            let token = JSON.parse(localStorage.getItem('token'));
            let url = "http://localhost:3000/api/user/get/:id"
            fetch(url,{
                method : 'get',
        headers: {
          "content-type": "application/json",
           Authorization: "Bearer" + " "+ token,
        },
        
          })
        .then(response => response.json())/*ensuite la réponse est une reponse json faire "réponse est une réponse json"*/
        .then(response => localStorage.setItem('utilisateur', JSON.stringify(response)))
        .catch(error => console.error("erreur" + error))
            } ,
        }
    }

</script>
<style lang="scss" scoped>
button {
  width: 200px;
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