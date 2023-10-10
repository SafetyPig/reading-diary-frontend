import {LiteBook} from "./liteBookModel"

export class DiaryEntryModel {
   id: number
   book: LiteBook
   author: string;
   numericalReview: number;
   review: string;
   startDate: Date;
   endDate: Date;
   finished: boolean;
   isView: boolean;

   constructor(id: number, book: LiteBook, author: string, numericalReview: number, review: string, startDate: Date, endDate: Date, finished: boolean, isView: boolean) {
      this.id = id;
      this.book = book;
      this.author = author;
      this.numericalReview = numericalReview;
      this.review = review;
      this.startDate = startDate;
      this.endDate = endDate;
      this.finished = finished;
      this.isView = isView;
   };   
}