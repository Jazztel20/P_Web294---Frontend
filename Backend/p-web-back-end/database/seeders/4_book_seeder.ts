import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Book from '#models/book'
import Category from '#models/category'
import User from '#models/user'
import Writer from '#models/writer'

export default class extends BaseSeeder {
  async run() {
    const categories = await Category.query().orderBy('id', 'asc')
    const users = await User.query().orderBy('id', 'asc')
    const writers = await Writer.query().orderBy('id', 'asc')

    await Book.createMany([
      {
        title: 'Le Petit Prince',
        numberOfPages: 96,
        pdfLink: 'https://example.com/petit-prince.pdf',
        epubPath: 'epub/Dickens, Charles - Oliver Twist.epub', // Chemin réel
        abstract: "Un aviateur rencontre un petit prince venu d'une autre planète.",
        editor: 'Gallimard',
        editionYear: 1943,
        imagePath: 'covers/R.jpg', 
        categoryId: categories[0]?.id || 1,
        writerId: writers[1]?.id || 1,
        userId: users[1]?.id || 1,
      },
      {
        title: '1984',
        numberOfPages: 328,
        pdfLink: 'https://example.com/1984.pdf',
        epubPath: 'epub/Doyle, Artur Conan - Sherlock Holmes.epub', // Chemin réel
        abstract: 'Dans une société totalitaire où Big Brother surveille chaque citoyen.',
        editor: 'Secker & Warburg',
        editionYear: 1949,
        imagePath: 'covers/R.jpg',
        categoryId: categories[1]?.id || 1,
        writerId: writers[1]?.id || 1,
        userId: users[0]?.id || 1,
      },
      {
        title: "L'Étranger",
        numberOfPages: 159,
        pdfLink: 'https://example.com/etranger.pdf',
        epubPath: 'epub/Dumas, Alexandre - Les trois mousquetaires.epub', // Chemin réel
        abstract: 'Meursault doit affronter la justice après un acte irréparable.',
        editor: 'Gallimard',
        editionYear: 1942,
        imagePath: 'covers/R.jpg',
        categoryId: categories[0]?.id || 1,
        writerId: writers[2]?.id || 1,
        userId: users[1]?.id || 1,
      },
      {
        title: "Harry Potter à l'école des sorciers",
        numberOfPages: 320,
        pdfLink: 'https://example.com/harry-potter-1.pdf',
        epubPath: 'epub/La Fontaine, Jean de - Fables.epub', // Chemin réel
        abstract: "Harry Potter découvre qu'il est un sorcier.",
        editor: 'Gallimard Jeunesse',
        editionYear: 1997,
        imagePath: 'covers/R.jpg',
        categoryId: categories[2]?.id || 1,
        writerId: writers[3]?.id || 1,
        userId: users[1]?.id || 1,
      },
      {
        title: 'Le Seigneur des Anneaux',
        numberOfPages: 1216,
        pdfLink: 'https://example.com/lotr.pdf',
        epubPath: 'epub/Verne, Jules - Le tour du monde en quatre-vingts jours.epub', // Chemin réel
        abstract: 'Frodon Sacquet doit détruire un anneau maléfique.',
        editor: 'Allen & Unwin',
        editionYear: 1954,
        imagePath: 'covers/R.jpg',
        categoryId: categories[2]?.id || 1,
        writerId: writers[4]?.id || 1,
        userId: users[0]?.id || 1,
      },
      {
        title: "Sapiens",
        numberOfPages: 512,
        pdfLink: 'https://example.com/sapiens.pdf',
        epubPath: 'epub/Dickens, Charles - A Christmas Carol.epub', // Chemin réel
        abstract: "Une exploration fascinante de l'histoire de l'humanité.",
        editor: 'Albin Michel',
        editionYear: 2011,
        imagePath: 'covers/R.jpg',
        categoryId: categories[3]?.id || 1,
        writerId: writers[5]?.id || 1,
        userId: users[0]?.id || 1,
      }
    ])
  }
}