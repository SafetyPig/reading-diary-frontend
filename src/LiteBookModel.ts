export class LiteBook {
   id: number;
   name: string;
   authorId: number;
   authorName: string


   constructor(id: number, name: string, authorId: number, authorName: string) {
      this.id = id;
      this.name = name;
      this.authorId = authorId;
      this.authorName = authorName;
   }
}