import { LibraryService } from '../service/libraryService';
import Book from './book';


export default class Bookshelf{
  constructor(
    public books: Book[],
    private service: LibraryService
  ){}

  static async fromISBNList(isbnList: string[], service: LibraryService): Promise<Bookshelf> {
    const books = await service.fromISBNList(isbnList);
    return new Bookshelf(books, service);
  }
  
}