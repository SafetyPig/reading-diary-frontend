import {LiteBook} from "./liteBookModel"

export class DiaryEntryModel {
   id: number
   book: LiteBook
   numericalReview: number;
   review: string;
   startDate: Date;
   endDate: Date;
   finished: boolean;
   isView: boolean;

   constructor(id: number, book: LiteBook, numericalReview: number, review: string, startDate: Date, endDate: Date, finished: boolean, isView: boolean) {
      this.id = id;
      this.book = book;
      this.numericalReview = numericalReview;
      this.review = review;
      this.startDate = startDate;
      this.endDate = endDate;
      this.finished = finished;
      this.isView = isView;
   };   
}