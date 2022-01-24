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
    path: '/:post',
    name: 'Post',
    component: Post
  },
  {
    path: '/groups/:group',
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
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash };
      // return { selector: to.hash };
    }
    return { top: 0 };
    
  }

})

export default router;
