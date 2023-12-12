import Book from '../domain/book';

export interface LibraryService {
  fromISBNList(isbnList: string[]): Promise<Book[]>;
}
