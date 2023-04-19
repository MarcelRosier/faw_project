export type Book = {    
    id: number
    title: string,
    author: string,
    imageLink: string,
    language: string,
    pages: number,
    year: number,
    genre: string,
    description: string,
    price: string,
};

export type Books = {
    books: Book[]
}