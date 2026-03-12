import db from '@adonisjs/lucid/services/db'

async function checkEpubPaths() {
  const books = await db.from('books').select('id', 'title', 'epub_path')
  console.log('--- Database Check: EPUB Paths ---')
  for (const book of books) {
    console.log(`ID: ${book.id} | Title: ${book.title} | Path: ${book.epub_path}`)
  }
  process.exit(0)
}

checkEpubPaths()
