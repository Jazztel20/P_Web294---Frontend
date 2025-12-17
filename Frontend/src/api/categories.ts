import axios from 'axios'

export interface Category {
  id: number
  name: string
}

export async function getCategories(): Promise<Category[]> {
  const res = await axios.get('http://localhost:3333/categories')
  return res.data
}
