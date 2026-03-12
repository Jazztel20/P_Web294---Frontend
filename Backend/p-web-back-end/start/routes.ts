/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
*/

import CategoriesController from '#controllers/categories_controller'
import UsersController from '#controllers/users_controller'
import WritersController from '#controllers/writers_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import BooksController from '#controllers/books_controller'
import CommentsController from '#controllers/comments_controller'
import EvaluatesController from '#controllers/evaluates_controller'
import AuthController from '#controllers/auth_controller'

// --- ROUTES PUBLIQUES ---

router.group(() => {
  router.resource('writers', WritersController).apiOnly()
  router.resource('users', UsersController).apiOnly()
  router.resource('categories', CategoriesController).apiOnly()

  // Livres
  router.get('/books/home', [BooksController, 'home'])
  router.get('books', [BooksController, 'index'])
  router.get('books/:id', [BooksController, 'show'])
  router.get('books/:id/download', [BooksController, 'downloadEpub'])
  
  // Catégories
  router.get('categories/:category_id/books', [BooksController, 'booksPerCategory'])

  // Avis et Notes
  router.get('books/:id/Rewiews', [BooksController, 'getReviewsByBook'])
  router.get('books/:id/AvgRating', [EvaluatesController, 'AvgRating'])
})

// --- AUTHENTIFICATION ---

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
}).prefix('user')

// --- ROUTES PROTÉGÉES (Utilisateurs connectés) ---

router.group(() => {
  // Commentaires
  router.post('/comments', [CommentsController, 'store'])
  router.put('/comments/:id', [CommentsController, 'update'])
  router.delete('/comments/:id', [CommentsController, 'destroy'])

  // Évaluations
  router.post('/evaluates', [EvaluatesController, 'store'])
  router.put('/evaluates/:id', [EvaluatesController, 'update'])
  router.delete('/evaluates/:id', [EvaluatesController, 'destroy'])

  // Gestion des livres
  router.post('/books', [BooksController, 'store'])

  // --- Liseuse (Progression) ---
  router.get('books/:id/progress', [BooksController, 'getProgress'])
  router.post('books/:id/progress', [BooksController, 'saveProgress'])

}).use(middleware.auth())