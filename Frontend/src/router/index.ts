import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    // {
    //   path: '/logout',
    //   name: 'logout',
    //   component: () => import('../views/RegisterView.vue'),
    // },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BooksView.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/categoriesView.vue'),
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: () => import('../views/catalogueView.vue'),
    },
  ],
})

export default router
