import Axios, { AxiosInstance } from 'axios';


type BookResponse = {
  isbn: string;
  title: string;
}
type BooksResponse = {
  summary: BookResponse[];
}

export class NationalDiteLibrary {
  constructor(private readonly http: AxiosInstance) {}

  // isbnからBookを取得する
  async fromISBN(isbn: string): Promise<BookResponse> {
    const response = await this.http.get<BooksResponse>(
      `https://iss.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn%3D%22${isbn}%22&recordPacking=xml&recordSchema=dcndl_simple`
    );
    const book: BookResponse = response.data.summary[0];
    return book;
  }
}