<template>
    <div class="newpost">
        <navBar2 id="nav"/>
        <img alt="Vue logo" src="../assets/logo-home.png" />
        <div id="newpost">
        <newpost/>
        </div>
    </div>
</template>
<script>
import newpost from '@/components/newpost.vue'
import navBar2 from '@/components/navBar2.vue'

export default {
  name:"createPost",
  components:{
      navBar2,
      newpost,
  }
}
</script>

