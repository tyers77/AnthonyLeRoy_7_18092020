<template>
  <div>
    <div id="profil">
      <h3 class="pseudo" style="">{{ user.pseudo }}</h3>
      <p>{{ user.email }}</p>
    </div>
    <button @click="deleteProfil(user.id)">
      Supprimer le profil
    </button>
  </div>
</template>
<script>
let token = JSON.parse(localStorage.getItem("token"));

export default {
  name: "profil",
  props: {
    user: Object,
  },
  data: function() {
    return {};
  },

  methods: {
    deleteProfil: function(UserId) {
      let url = "http://localhost:3000/api/user/delete/" + UserId;
      fetch(url, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      window.location.reload();
      alert("compte supprimée");
    },
  },
};
</script>
<style lang="scss" scoped>
.profil {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}
fieldset {
  background-color: rgba(156, 154, 154, 0.13);

  margin: 0;
  padding: 10px;
  border-radius: 10px;
}
h3 {
  color: #2c3e50;
}
.formprofil {
  display: grid;
  width: 100%;
}
legend {
  color: #2c3e50;
  font-weight: bold;
  font-size: 1.2em;
  height: 35px;
}
label {
  color: #2c3e50;
  font-weight: bold;
  font-size: 1.2em;
  height: 35px;
  text-align: start;
}
input {
  box-shadow: 0 2px 5px rgb(245, 244, 244);
  height: 35px;
  margin-bottom: 10px;
  border-radius: 10px;
}

#media {
  padding-left: 7px;
}

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
