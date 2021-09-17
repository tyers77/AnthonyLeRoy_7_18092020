<template>
  <div class="profil">
    <navBar2 id="nav" />
    <img alt="Vue logo" src="../assets/logo-home.png" />
    <div class="profil">
      <h2 class="titre" style="color: #2c3e50;">Votre profil</h2>
      <profil v-bind:user="user" />
    </div>
    <div class="userProfil" v-if="user.isAdmin">
      <h2>
        Liste des utilisateurs :
      </h2>
      <profil v-for="user in users" :key="user + user.id" v-bind:user="user" />
    </div>
  </div>
</template>
<script>
const token = JSON.parse(localStorage.getItem("token"));
import navBar2 from "@/components/navBar2.vue";
import profil from "@/components/profil.vue";
import { userAuth } from "@/helpers/auth.js";
export default {
  name: "createProfil",

  data: function() {
    return {
      user: {},
      users: [],
    };
  },
  components: {
    navBar2,
    profil,
  },
  async created() {
    const user = await this.getUser();
    this.user = user;
    if (user.isAdmin) {
      const userTodisplay = [];
      const allUsers = await this.getAllUsers();
      allUsers.forEach((userFound) => {
        if (user.id != userFound.id) {
          userTodisplay.push(userFound);
        }
      });
      this.users = userTodisplay;
    }
  },
  async mounted() {
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
    getAllUsers: async function() {
      let url = "http://localhost:3000/api/user/getAll";
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const json = await res.json();
      console.log("coucou", json);
      return json;
    },
  },
};
</script>
