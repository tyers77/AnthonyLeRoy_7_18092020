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
    component: () => import('../views/About.vue')
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
{
  path:'/comments',
  name:'/Comments',
  component:() => import('../views/Comments.vue')
},
{
  path:'/addComment',
  name:'/AddComment',
  component:() => import('../views/AddComment.vue')
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
