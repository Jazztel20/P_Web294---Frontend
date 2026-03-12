import Book from '#models/book'
import Evaluate from '#models/evaluate'
import Comment from '#models/comment'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class BooksController {
  /**
   * --- MÉTHODES EXISTANTES ---
   */

  // Liste de tous les livres avec relations
  async index({}: HttpContext) {
    return await Book.query().preload('writer').preload('user').preload('category')
  }

  // Détails d'un livre + calcul de la note moyenne
  async show({ params }: HttpContext) {
    const book = await Book.query()
      .preload('writer')
      .preload('user')
      .preload('category')
      .where('id', params.id)
      .firstOrFail()

    const evaluates = await Evaluate.query().where('book_id', params.id)
    const total = evaluates.length
    const average = total > 0 ? evaluates.reduce((sum, e) => sum + e.note, 0) / total : 0

    return {
      ...book.toJSON(),
      global_rating: Math.floor(average * 10) / 10,
      total_comments: total,
    }
  }

  // Livres pour la page d'accueil (limité à 5)
  async home({}: HttpContext) {
    return await Book.query().limit(5)
  }

  // Livres par catégorie
  async booksPerCategory({ params }: HttpContext) {
    return await Book.query().where('category_id', params.category_id).preload('writer')
  }

  // Récupérer les avis (commentaires + notes) d'un livre
  async getReviewsByBook({ params }: HttpContext) {
    return await Comment.query()
      .where('book_id', params.id)
      .preload('user')
      .orderBy('created_at', 'desc')
  }

  // Création d'un livre
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const data = request.all()
    const book = await Book.create({ ...data, userId: user.id })
    return response.created(book)
  }

  // Mise à jour d'un livre
  async update({ params, request, response }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    const data = request.all()
    book.merge(data)
    await book.save()
    return response.ok(book)
  }

  // Suppression d'un livre
  async destroy({ params, response }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    await book.delete()
    return response.ok({ message: 'Livre supprimé' })
  }

  /**
   * --- NOUVELLES MÉTHODES (LISEUSE & EPUB) ---
   */

  // Télécharger le fichier physique du livre
  public async downloadEpub({ params, response }: HttpContext) {
    try {
      const book = await Book.findOrFail(params.id)
      if (!book.epubPath) {
        console.error(`[Download] Pas de chemin epub pour le livre ${params.id}`)
        return response.notFound({ message: 'Fichier EPUB manquant dans la base.' })
      }
      
      // On cherche dans public/epub/ (ou directement dans public si epubPath contient deja 'epub/')
      const filePath = book.epubPath.startsWith('epub/') 
        ? app.publicPath(book.epubPath)
        : app.publicPath('epub', book.epubPath)

      console.log(`[Download] Tentative de lecture du fichier : ${filePath}`)
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Download] Fichier introuvable sur le disque : ${filePath}`)
        return response.notFound({ message: 'Fichier physique introuvable sur le serveur.' })
      }
      
      return response.download(filePath)
    } catch (error) {
      console.error(`[Download] Erreur : ${error.message}`)
      return response.internalServerError({ message: 'Erreur de téléchargement.' })
    }
  }

  // Sauvegarder la progression (CFI)
  public async saveProgress({ auth, request, params, response }: HttpContext) {
    const user = auth.user!
    const { last_cfi } = request.only(['last_cfi'])

    try {
      // 1. On cherche si une progression existe déjà
      const existing = await db
        .from('reading_progress')
        .where('user_id', user.id)
        .where('book_id', params.id)
        .first()

      if (existing) {
        // 2. Si elle existe, on met à jour
        await db
          .from('reading_progress')
          .where('id', existing.id)
          .update({
            last_cfi: last_cfi,
            updated_at: DateTime.now().toSQL(),
          })
      } else {
        // 3. Sinon, on crée une nouvelle ligne
        await db.table('reading_progress').insert({
          user_id: user.id,
          book_id: params.id,
          last_cfi: last_cfi,
          updated_at: DateTime.now().toSQL(),
        })
      }

      return response.ok({ message: 'Progression enregistrée.' })
    } catch (error) {
      return response.internalServerError({
        message: 'Erreur lors de la sauvegarde',
        error: error.message,
      })
    }
  }

  // Récupérer la progression
  public async getProgress({ auth, params, response }: HttpContext) {
    try {
      const user = auth.user!
      const progress = await db
        .from('reading_progress')
        .where('user_id', user.id)
        .where('book_id', params.id)
        .first()

      return response.ok(progress || { last_cfi: null })
    } catch (error) {
      return response.internalServerError({ message: 'Erreur de récupération' })
    }
  }
}