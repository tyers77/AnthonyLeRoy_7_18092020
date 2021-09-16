<template>
  <div class="comments">
    <h2 class="viewComments">Commentaires publiés sur ce post</h2>
    <section id="post">
      <div class="comments" id="commentsForPost">
        <form
          class="comments__form"
          id="commentForm"
          @submit.prevent="addComment()"
        >
          <label
            for="comment"
            style="font-weight: bold;
    color: #2c3e50;"
            >Commentez !
          </label>
          <input
            type="text"
            id="comment"
            name="comment"
            placeholder="Votre commentaire..."
            style="border-radius: 10px;padding: 5px"
          /><br />
          <button class="btn" type="submit">
            Ajouter un commentaire
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
let token = JSON.parse(localStorage.getItem("token"));
function getTokenInfos(token) {
  const string64 = token.split(".")[1];
  const stringJson = atob(string64);
  const object = JSON.parse(stringJson);
  return object;
}
const UserId = getTokenInfos(token).userId;
const isAdmin = getTokenInfos(token).admin;
console.log(isAdmin);
export default {
  name: "comments",
  data: function() {
    return {
      content: "",
    };
  },
  mounted() {
    this.viewOnePost(); // chargement du post
  },
  methods: {
    //création du HTML
    createPostHtml: function(element) {
      const articleParent = document.getElementById("post");
      if (UserId == element.UserId || isAdmin == 1) {
        let article = `<article class="post"
        style=
        "background-color: rgba(156, 154, 154, 0.13);
        border-radius: 10px;padding-bottom:10px; ">
            <h2 id="title" class="titre" style="color: #2c3e50;">${element.title}</h2>
                <p class="postdate" style="font-weight: bold;
    color: #2c3e50;">${element.dateFr}</p>
                    <img class="media" alt="photo du post" src="${element.imageUrl}" style="width: 50%;border-radius: 10px;">
                        <p class="description" style="font-weight: bold;
    color: #2c3e50;">${element.text}</p><button class="delete"btn type="submit" style="height: 30px;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: #2c3e50;
  color: #fff;
  font-size: 1em;
  border-radius: 10px;">Supprimer le post</button></article>
        </article>`;
        articleParent.insertAdjacentHTML("beforeend", article);
        return;
      }
      if (isAdmin == 0) {
        let article = `<article class="post"
        style=
        "background-color: rgba(156, 154, 154, 0.13);
        border-radius: 10px;padding-bottom:10px; ">
            <h2 id="title" class="titre" style="color: #2c3e50;">${element.title}</h2>
                <p class="postdate" style="font-weight: bold;
    color: #2c3e50;">${element.dateFr}</p>
                    <img class="media" alt="photo du post" src="${element.imageUrl}" style="width: 50%;border-radius: 10px;">
                        <p class="description" style="font-weight: bold;
    color: #2c3e50;">${element.text}</p></article>
        </article>`;
        articleParent.insertAdjacentHTML("beforeend", article);
        return;
      }
    },
    addComment: function() {
      let urlId = window.location.href;
      let idPost = urlId.split("id=")[1];

      const content = document.getElementById("comment").value;
      this.sendComment(idPost, content);
      window.location.reload();
    },

    sendComment: async function(idPost, content) {
      try {
        const res = await fetch(
          "http://localhost:3000/api/post/" + idPost + "/comment",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ content: content }),
          }
        );
        const json = await res.json();
        if (json.error) {
          console.log(json.error);
        } else {
          alert("Commentaire crée avec succès");
          console.log(json.message);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //recuperation du post avec son id et ses commentaires
    viewOnePost: async function() {
      let urlId = window.location.href;
      let idPost = urlId.split("id=")[1];
      console.log(idPost);
      let url = "http://localhost:3000/api/post/" + idPost;
      fetch(url, {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            console.log(json.error);
          } else {
            this.createPostHtml(json);
            let comments = json.Comments;
            if (comments.length == 0) {
              let para = document.getElementById("post");
              let paraComment = document.createElement("p");
              paraComment.setAttribute("class", "noComment");
              para.appendChild(paraComment);
              paraComment.innerHTML = "Aucun commentaire";
              console.log("pas de commentaire");
            } else {
              comments = comments.sort((a, b) => {
                if (a.id > b.id) {
                  return -1;
                }
                if (a.id < b.id) {
                  return 1;
                }
                return 0;
              });
              comments.forEach((comment) => {
                console.log(comment);
                const articleParent = document.getElementById("post");
                if (UserId == comment.UserId || isAdmin == 1) {
                  let name = comment.User
                    ? `${comment.User.pseudo}`
                    : "auteur supprimé";
                  let allCommentsNull = `
      <article class="allComments"  style=
        "background-color: rgba(156, 154, 154, 0.13);
        border-radius: 10px;padding-bottom:10px;margin-top: 15px;
    padding: 5px;"><h3 class="infoComment">By ${name} le ${comment.date}</h3>
                <p class="oneComments">${comment.content}</p><button class="delete"  type="submit" style="height: 30px;
    margin-left: 5px;
  margin-right: 5px;
  background-color: #2c3e50;
  color: #fff;
  font-size: 1em;
  border-radius: 10px;">Supprimer le commentaire</button></article>`;
                  articleParent.insertAdjacentHTML(
                    "beforeend",
                    allCommentsNull
                  );
                } else {
                  let allCommentsNull = `<article class="allComments"  style=
        "background-color: rgba(156, 154, 154, 0.13);
        border-radius: 10px;padding-bottom:10px;margin-top: 15px;
    padding: 5px;"><h3 class="infoComment"> le ${comment.date}</h3>
                <p class="oneComments">${comment.content}</p></article>`;
                  articleParent.insertAdjacentHTML(
                    "beforeend",
                    allCommentsNull
                  );
                }
              });
            }
          }
        })
        .catch((error) => console.error("erreur" + error));
    },
  },
};
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
