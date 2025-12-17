import axios from 'axios'
import { ref } from 'vue'
import type { Book, BookCreation } from '@/models/Book'
import type { Evaluate } from '@/models/Evaluate'

// -----------------------------
// API calls
// -----------------------------

export async function homePageAPI(): Promise<Book[]> {
  try {
    const res = await axios.get<Book[]>('http://localhost:3333/books/home')
    return res.data
  } catch (err) {
    console.error('Failed to load books:', err)
    return []
  }
}

export async function booksRatingAvg(
  bookId: number,
): Promise<{ evaluates: Evaluate[]; averageRating: number }> {
  try {
    const res = await axios.get(`http://localhost:3333/books/${bookId}/AvgRating`)
    return res.data
  } catch (err) {
    console.error('Failed to load ratings:', err)
    return { evaluates: [], averageRating: 0 }
  }
}

export async function getBooks(): Promise<Book[]> {
  try {
    const res = await axios.get<Book[]>('http://localhost:3333/books')
    return res.data
  } catch (err) {
    console.error('Failed to load books:', err)
    return []
  }
}

const error = ref<string | null>(null)

export async function fetchBook(bookId: number): Promise<{ book: Book }> {
  error.value = null

  try {
    const response = await axios.get<{ book: Book }>(`http://localhost:3333/books/${bookId}`)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function updateBook(bookId: number, payload: Partial<Book>): Promise<{ book: Book }> {
  try {
    const res = await axios.put<{ book: Book }>(`http://localhost:3333/books/${bookId}`, payload)

    return res.data
  } catch (err) {
    console.error('Failed to load books:', err)
    throw err
  }
}

export async function createBook(input: BookCreation) {
  const token = localStorage.getItem('authToken')

  const payload = {
    title: input.title,
    category_id: input.categoryId,
    writer_id: input.writerId,
    number_of_pages: input.numberOfPages,
    pdf_link: input.pdfLink,
    abstract: input.abstract,
    editor: input.editor,
    image_path: input.imagePath,
    edition_year:
      input.editionYear instanceof Date ? input.editionYear.getFullYear() : input.editionYear,
  }

  const res = await axios.post('http://localhost:3333/books', payload, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return res.data
}
