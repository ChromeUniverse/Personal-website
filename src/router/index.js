import { createRouter, createWebHistory } from 'vue-router'
import Post from '../views/Post.vue'
import Group from '../views/Group.vue'

const routes = [
  {
    path: '',
    name: 'Index',
    component: Post
  },
  {
    path: '/:name',
    name: 'Post',
    component: Post
  },
  {
    path: '/groups/:name',
    name: 'Group',
    component: Group
  },
  { 
    path: '/:catchAll(.*)', 
    name: 'NotFound',
    component: Post,
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;
