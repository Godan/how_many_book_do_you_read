import { AxiosInstance } from 'axios';
import Book from '../domain/book';
import { LibraryService } from './libraryService';

export class NationalDiteLibrary implements LibraryService  {
  constructor(
    public http: AxiosInstance
  ) {}

  // isbnからBookを取得する
  async fromISBNList(isbnList: string[]): Promise<Book[]> {
    const response = await this.http.get(
      "",
      {
        params: {
          isbn: isbnList.join(",")
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log('response', response);
    const books: Book[] = response.data;
    return books;
  }
}