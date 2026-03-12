import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Writer from './writer.js'
import User from './user.js'
import Comment from './comment.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare numberOfPages: number

  @column()
  declare pdfLink: string

  // Utilise epubPath (camelCase) pour le code, 
  // Lucid fera le lien avec la colonne epub_path en SQL automatiquement
  @column()
  declare epubPath: string
  
  @column() 
  declare abstract: string

  @column() 
  declare editor: string

  @column() 
  declare editionYear: number

  @column() 
  declare imagePath: string

  // Clefs étrangères
  @column()
  declare categoryId: number | null

  @column()
  declare writerId: number | null

  @column()
  declare userId: number | null

  // Relations
  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => Writer)
  declare writer: BelongsTo<typeof Writer>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Mis au pluriel pour la clarté
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}