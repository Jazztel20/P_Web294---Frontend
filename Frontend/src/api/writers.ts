import axios from 'axios'

export interface Writer {
  id: number
  first_name: string
  last_name: string
}

export async function getWriters(): Promise<Writer[]> {
  const res = await axios.get('http://localhost:3333/writers')
  return res.data
}

export async function createWriter(first_name: string, last_name: string): Promise<Writer> {
  const res = await axios.post('http://localhost:3333/writers', {
    first_name,
    last_name,
  })
  return res.data
}
