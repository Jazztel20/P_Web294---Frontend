import axios from 'axios'
import { ref } from 'vue'
import type { Book } from '@/models/Book'
import type { Evaluate } from '@/models/Evaluate'

//API pour la page home
export async function homePageAPI(): Promise<Book[]> {
  try {
    const res = await axios.get<Book[]>('http://localhost:3333/books/home')
    return res.data
  } catch (err) {
    console.error('Failed to load books:', err)
    return []
  }
}
//API pour le ratin d'un books avg
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

export async function addBook(
  bookId: number,
  payload: Partial<Book>,
  purpose: string,
): Promise<{ book: Book }> {
  try {
    // Add the purpose to the payload before sending it
    const updatedPayload = {
      ...payload,
      purpose, // This will add the purpose field to the payload
    }

    // Use POST instead of PUT for adding a new book
    const res = await axios.post<{ book: Book }>(`http://localhost:3333/books`, updatedPayload)

    return res.data
  } catch (err) {
    console.error('Failed to add book:', err)
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
