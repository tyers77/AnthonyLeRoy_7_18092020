<template>
    <div class="actuality">
        <section id="feel">
            <h3 @click="getPost()">Fil d'actualités</h3>
            <article id="post">
                <h2 id="titre"></h2>
                <p id="postdate"></p>
                <img id="media">
                <p id="description"></p>
            </article>
        </section>
    </div>
</template>
<script>
    
    const createPostHtml = function (post) {
    post.forEach((element) => {        
        let titre = document.getElementById("titre");
        let postdate = document.getElementById("postdate");
        let media = document.getElementById("media");
        let description = document.getElementById("description");
        media.setAttribute("alt","photo du post"),
        media.setAttribute("src", element.media),

        titre.innerHTML = element.titre;
        postdate.innerHTML = element.createdAt;
        description.innerHTML = element.description;
    });
}
export default {
    name: 'actuality',
    //fetch get posts
    methods:{
        getPost: function(){
            let url = "http://localhost:3000/api/post/get"
            fetch(url)
        .then(response => response.json())/*ensuite la réponse est une reponse json faire "réponse est une réponse json"*/
        .then(response => createPostHtml(response))/*ensuite faire de la réponse createProductHtml*/
        .catch(error => console.error("erreur" + error))
            }
            
        }
    }

</script>