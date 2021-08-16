<template>
    <div class="newpost">
        <navBar id="nav"/>
        <img alt="Vue logo" src="../assets/logo-home.png" />
        <div id="newpost">
        <newpost/>
        </div>
    </div>
</template>
<script>
import newpost from '@/components/newpost.vue'
import navBar from '@/components/navBar.vue'

export default {
  name:"createPost",
  components:{
      navBar,
      newpost,
  }
}
</script>
