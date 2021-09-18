<template>
  <article class="post">
    <h2 v-if="post.User" class="titre">
      {{ post.title }} by {{ post.User.pseudo }}
    </h2>
    <h2 v-if="!post.User" class="titre">
      {{ post.title }} by utilisateur supprimé
    </h2>
    <p class="postdate">
      {{ post.dateFr }}
    </p>
    <img
      v-if="post.imageUrl"
      class="media"
      alt="photo du post"
      v-bind:src="post.imageUrl"
      style=""
    />
    <p class="description">
      {{ post.text }}
    </p>
    <button @click="goToPost(post.id)">
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
<style lang="scss" scoped>
article {
  background-color: rgba(156, 154, 154, 0.13);
  border-radius: 10px;
  padding-bottom: 15px;
}
h2 {
  color: black;
}
p {
  font-weight: bold;
  color: black;
}
img {
  width: 50%;
  border-radius: 10px;
}
button {
  height: 25px;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: black;
  color: #fff;
  font-size: 1.2em;
  border-radius: 10px;
}
</style>
