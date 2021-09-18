<template>
  <div class="groupomania">
    <navBar2 id="nav" />
    <img alt="Vue logo" src="../assets/logo-home.png" />
    <div class="user">
      <navUser id="navuser" />
      <div class="actuality">
        <post
          v-for="post in posts"
          :key="post.id"
          v-bind:post="post"
          v-bind:user="user"
        />
      </div>
    </div>
    <img alt="Vue logo" src="../assets/logofooter.png" />
  </div>
</template>
<script>
let token = JSON.parse(localStorage.getItem("token"));
import navBar2 from "@/components/navBar2.vue";
import navUser from "@/components/navUser.vue";
import { userAuth } from "@/helpers/auth.js";
import post from "@/components/post.vue";
export default {
  name: "Groupomania",
  components: {
    navBar2,
    navUser,
    post,
  },
  data() {
    return {
      posts: [],
      user: {},
    };
  },
  async created() {
    const allPosts = await this.getPost();
    this.posts = allPosts;
    const user = await this.getUser();
    this.user = user;
  },
  mounted() {
    userAuth();
  },
  methods: {
    getUser: async function() {
      const res = await fetch("http://localhost:3000/api/user/getOne", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const json = await res.json();
      return json;
    },
    getPost: async function() {
      let url = "http://localhost:3000/api/post/get";
      const res = await fetch(url, {
        method: "get",
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
