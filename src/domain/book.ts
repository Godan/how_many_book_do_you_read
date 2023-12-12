export default class Book {

  constructor(
    public id: number,
    public title: string,
    public author: string,
    public price: number,
    public rating: number,
    public description: string,
    public cover: string,
    public isbn?: string,
    public page?: number,
    public thickness?: number,
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