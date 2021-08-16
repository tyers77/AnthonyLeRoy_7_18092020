import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/inscription',
    name:'Incription',
    component:() => import('../views/Inscription.vue')
  },
  {
  path:'/connexion',
  name:'/Connexion',
  component:() => import('../views/Connexion.vue')
},
{
  path:'/groupomania',
  name:'/Groupomania',
  component:() => import('../views/Groupomania.vue')
},
{
  path:'/newpost',
  name:'/Newpost',
  component:() => import('../views/Newpost.vue')
},
{
  path:'/profil',
  name:'/Profil',
  component:() => import('../views/Profil.vue')
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
