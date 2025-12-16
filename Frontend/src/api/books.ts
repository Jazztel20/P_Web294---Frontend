import axios from "axios";

export interface Book {
  id: number;
  title: string;
  image?: string;
  rating?: number;
  numberOfPages?: number;
  abstract?: string;
  editor?: string;
  editionYear?: number;
  writer?: { name: string };
  category?: { name: string };
  user?: { username: string };
}

export interface Evaluate {
  id: number
  note: number
}



//API pour la page home
export async function homePageAPI(): Promise<Book[]> {
  try {
    const res = await axios.get<Book[]>('http://localhost:3333/books/home');
    return res.data;
  } catch (err) {
    console.error('Failed to load books:', err);
    return [];
  }
}
//API pour le ratin d'un books avg
export async function booksRatingAvg(bookId: number): Promise<{ evaluates: Evaluate[]; averageRating: number }> {
  try {
    const res = await axios.get(`http://localhost:3333/books/${bookId}/AvgRating`);
    return res.data;
  } catch (err) {
    console.error('Failed to load ratings:', err);
    return { evaluates: [], averageRating: 0 };
  }
}

export async function EditBook(bookId: number): Promise<Book> {
  try{
    const res = await axios.get<Book>(`books/${bookId}`)
    return res.data;
  } catch (err){
    console.error('Failed to load books:', err);
    return({
        id: 0,
        title: ''
    });
  }
}

