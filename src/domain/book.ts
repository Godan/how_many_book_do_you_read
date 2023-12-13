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

  public pageCount(): number {
    return this.page || 0;
  }

  public thicknessSum(): number {
    return this.thickness || 0;
  }

  public thumbnailUrl(): string {
    return `https://iss.ndl.go.jp/thumbnail/${this.isbn}`
  }
}