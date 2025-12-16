export interface Book {
    id: string,
    title: string,
    numberOfPages: number,
    pdfLink: string,
    abstract: string,
    editor: string,
    editionYear: Date,
    imagePath: string,
    comment: string,
    categoryId: number,
    writerId: number,
    userId: number,
    global_rating: number,
    total_comments: number,
    writer: {
        id: number,
        firstname: string,
        lastname: string
    },
    category: {
        id: number,
        label: string
    }
}