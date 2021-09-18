<template>
  <article
    class="allComments"
    style="background-color: rgba(156, 154, 154, 0.13);
        border-radius: 10px;padding-bottom:10px;margin-top: 15px;
    padding: 5px;"
  >
    <h3 class="infoComment" v-if="comment.User">
      By {{ comment.User.pseudo }} le {{ comment.date }}
    </h3>
    <h3 class="infoComment" v-if="!comment.User">
      By Utilisateur supprimé le {{ comment.date }}
    </h3>
    <p class="oneComments">{{ comment.content }}</p>
    <button
      v-if="comment.UserId == user.id || user.isAdmin"
      @click="deleteComment(comment.id)"
      class="delete"
      style="height: 30px;
    margin-left: 5px;
  margin-right: 5px;
  background-color: #2c3e50;
  color: #fff;
  font-size: 1em;
  border-radius: 10px;"
    >
      Supprimer le commentaire
    </button>
  </article>
</template>
<script>
let token = JSON.parse(localStorage.getItem("token"));
export default {
  name: "comment",
  props: {
    comment: Object,
    user: Object,
  },
  methods: {
    async deleteComment(id) {
      const res = await fetch("http://localhost:3000/api/comment/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const json = await res.json();
      alert(json.message);
      window.location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
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
