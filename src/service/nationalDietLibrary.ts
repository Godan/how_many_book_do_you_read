import axios, { AxiosInstance } from 'axios';
import { Book } from '../domain/book';

export class NationalDiteLibrary {
  constructor(
    public http: AxiosInstance
  ) {}

  // isbnからBookを取得する
  async fromISBN(isbn: string): Promise<Book> {
    const response = await this.http.get(
      "",
      {
        params: {
          isbn: isbn,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log('response', response);
    const book: Book = response.data.summary[0];
    return book;
  }
}