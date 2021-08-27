<template>
    <div class="profil">
        <navBar2 id="nav"/>
        <img alt="Vue logo" src="../assets/logo-home.png" />
        <div class="profil">
        <profil/>
        </div>
    </div>
</template>
<script>

import navBar2 from '@/components/navBar2.vue'
import profil from '@/components/profil.vue'
export default{
    name:'createProfil',
    components:{
        navBar2,
        profil
    }
}
</script>