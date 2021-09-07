<template>
    <div class="groupomania">
        <navBar2 id="nav"/>
    <img alt="Vue logo" src="../assets/logo-home.png" />
    <div class="user">
        <navUser id="navuser"/>
        <div class="actuality">
        <actuality/>
        </div>
    </div>
    </div>
</template>
<script>
import navBar2 from '@/components/navBar2.vue'
import navUser from '@/components/navUser.vue'
import actuality from '@/components/actuality.vue'
import {userAuth} from "@/helpers/auth.js"

export default {
  name: 'Groupomania',
  components:{
    navBar2,
    navUser,
    actuality 
  },
  mounted() {
    
   userAuth();
  },
}
</script>
<style lang="scss" scoped>

</style>