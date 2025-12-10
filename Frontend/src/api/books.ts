import axios from "axios";

export interface Book {
  id: number;
  title: string;
  image?: string;
  rating?: number;
  writer?: { name: string };
  category?: { name: string };
  user?: { username: string };
}

export async function homePageAPI(): Promise<Book[]> {
  try {
    const res = await axios.get<Book[]>('http://localhost:3333/books/home');
    return res.data;
  } catch (err) {
    console.error('Failed to load books:', err);
    return [];
  }
}

