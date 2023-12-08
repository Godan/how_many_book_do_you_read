export interface BookRepository {
  // isbnからBookを取得する
  fromISBN(isbn: string): Promise<Book>;
}
export type Book{
  id: number;
  title: string;
}

export class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public price: number,
    public rating: number,
    public description: string,
    public cover: string,
  ) {}



  //   isbnからBookを取得する
  static fromISBN(isbn: string): Book {
    return new Book(
      1,
      'title',
      'author',
      1000,
      5,
      'description',
      'cover',
    );
  }
}