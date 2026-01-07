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
    {
      path: '/books/:id',
      name: 'book',
      component: () => import('../views/BookView.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/categoriesView.vue'),
    },
    {
      path: '/books/add',
      name: 'Add Book',
      component: () => import('../views/AddBook.vue'),
    },
    {
      path: '/books/:id/edit',
      name: 'edit',
      component: () => import('../views/UpdateBook.vue'),
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: () => import('../views/catalogueView.vue'),
    },
  ],
})

export default router
