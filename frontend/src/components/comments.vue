<template>
    <div class="comments">
        <article class="post"></article>
        <h2 class="viewComments">Commentaires publiés sur ce post</h2>
        <router-link to="/AddComment"><button class="addComment">Ajouter un commentaire </button></router-link>
        <p class="text"> </p>
    </div>
</template>
<script>
export default {
    name: 'comments',
methods:{
 //viewOnePost: function{}
},
}
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