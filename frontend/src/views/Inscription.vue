<template> 
    <div class="inscription">
    <navBar id="nav"/>
    <img alt="Vue logo" src="../assets/logo-home.png" />
    <Signup/>
    <router-view/>
    </div>
</template>
<script>
import navBar from '@/components/navBar.vue'
import Signup from '../components/signup.vue'
export default {
  name: 'Inscription',
  components:{
    navBar,
    Signup
    
  }
}
</script>
<style lang="scss" scoped>

.inscription{
 
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
    
}
</style>