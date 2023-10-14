export class LiteBook {
   id: number;
   title: string;
   authorId: number;
   authorName: string


   constructor(id: number, title: string, authorId: number, authorName: string) {
      this.id = id;
      this.title = title;
      this.authorId = authorId;
      this.authorName = authorName;
   }
}