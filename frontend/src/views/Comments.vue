<template>
  <div class="comment">
    <div class="nav">
      <router-link to="/groupomania">Retour</router-link> |
      <router-link to="/" @click="disconnect()">Déconnexion</router-link>
    </div>
    <img alt="Vue logo" src="../assets/logo-home.png" />
    <post v-bind:post="post" v-bind:user="user" />
    <form @submit.prevent="sendComment()">
      <label for="text">Commentaire</label>
      <input type="text" id="text" />
      <button type="submit">Ajouter le commentaire</button>
    </form>
    <comment
      v-for="comment in comments"
      :key="comment.id"
      v-bind:comment="comment"
      v-bind:user="user"
    />
  </div>
</template>
<script>
let token = JSON.parse(localStorage.getItem("token"));
import comment from "@/components/comment.vue";
import { userAuth } from "@/helpers/auth.js";
import post from "@/components/post.vue";

export default {
  name: "viewComments",
  components: {
    comment,
    post,
  },
  data() {
    return {
      post: {},
      user: {},
      comments: [],
    };
  },
  async created() {
    const postFound = await this.getPost();
    this.post = postFound;
    const user = await this.getUser();
    this.user = user;
    if (postFound.Comments.length > 0) {
      postFound.Comments.forEach((comment) => {
        this.comments.push(comment);
      });
    }
  },
  mounted() {
    userAuth();
  },
  methods: {
    async sendComment() {
      let urlId = window.location.href;
      let idPost = urlId.split("id=")[1];
      const text = document.getElementById("text").value;
      if (text != "") {
        const res = await fetch(
          "http://localhost:3000/api/post/comment/" + idPost,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ content: text }),
          }
        );
        const json = await res.json();
        if (json.error) {
          alert(json.error);
        } else {
          alert(json.message);
          window.location.reload();
        }
      }
    },

    disconnect: function() {
      localStorage.clear(), sessionStorage.removeItem("utilisateur");
    },
    getUser: async function() {
      const res = await fetch("http://localhost:3000/api/user/getOne", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const json = await res.json();
      return json;
    },
    async getPost() {
      let urlId = window.location.href;
      let id = urlId.split("id=")[1];
      const res = await fetch("http://localhost:3000/api/post/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const json = await res.json();
      return json;
    },
  },
};
</script>
<style lang="scss" scoped></style>
