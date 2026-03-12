import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reading_progress'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // Relation avec l'utilisateur
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      // Relation avec le livre
      table.integer('book_id').unsigned().references('books.id').onDelete('CASCADE')
      // Stockage du CFI (Position EPUB)
      table.string('last_cfi').notNullable()
      
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}