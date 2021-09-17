<template>
  <article
    class="post"
    style="background-color: rgba(156, 154, 154, 0.13);
        border-radius: 10px;padding-bottom:15px;
                "
  >
    <h2 v-if="post.User" class="titre" style="color: #2c3e50;">
      {{ post.title }} by {{ post.User.pseudo }}
    </h2>
    <h2 v-if="!post.User" class="titre" style="color: #2c3e50;">
      {{ post.title }} by utilisateur supprimé
    </h2>
    <p
      class="postdate"
      style="font-weight: bold;
    color: #2c3e50;"
    >
      {{ post.dateFr }}
    </p>
    <img
      v-if="post.imageUrl"
      class="media"
      alt="photo du post"
      v-bind:src="post.imageUrl"
      style="width: 50%;border-radius: 10px;"
    />
    <p
      class="description"
      style="font-weight: bold;
    color: #2c3e50;"
    >
      {{ post.text }}
    </p>
    <button
      @click="goToPost(post.id)"
      style="background-color:#cbd0d4;
        border-radius: 10px; padding:5px;text-decoration:none;
                "
    >
      Voir les commentaires
    </button>
    <button
      v-if="post.UserId == user.id || user.isAdmin"
      @click="deletePost(post.id)"
    >
      Supprimer le post
    </button>
  </article>
</template>
<script>
let token = JSON.parse(localStorage.getItem("token"));
export default {
  name: "post",
  props: {
    post: Object,
    user: Object,
  },
  methods: {
    async deletePost(id) {
      const res = await fetch("http://localhost:3000/api/post/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const json = await res.json();
      if (json.error) {
        alert(json.error);
      } else {
        alert(json.message);
      }
      window.location.reload();
    },
    goToPost(id) {
      window.location.href = "http://localhost:8080/#/comments?id=" + id;
    },
  },
};
</script>
