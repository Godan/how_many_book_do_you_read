import { LibraryService } from '../service/libraryService';
import Book from './book';


export default class Bookshelf{
  constructor(
    public books: Book[],
    private service: LibraryService
  ){}

  public totalPages(): number {
    return this.books.reduce((total, book) => total + book.pageCount(), 0);
  }

  public totalThickness(): number {
    return this.books.reduce((total, book) => total + book.thicknessSum(), 0);
  }

  static async fromISBNList(isbnList: string[], service: LibraryService): Promise<Bookshelf> {
    const booksResponse = await service.fromISBNList(isbnList);

    const books = booksResponse.map((book) => {
      return new Book(
        book.id,
        book.title,
        book.author,
        book.price,
        book.rating,
        book.description,
        book.cover,
        book.isbn,
        book.page,
        book.thickness,
      );
    });
    return new Bookshelf(books, service);
  }
}
