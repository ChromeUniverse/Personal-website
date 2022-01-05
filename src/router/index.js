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
    path: '/posts/:name',
    name: 'Post',
    component: Post
  },
  {
    path: '/groups/:name',
    name: 'Group',
    component: Group
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
