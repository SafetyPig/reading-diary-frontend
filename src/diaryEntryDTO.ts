import {LiteBook} from "./liteBookModel"

export class DiaryEntryDTO {
   bookid: number
   book: LiteBook
   numericalReview: number;
   review: string;
   startDate: Date;
   endDate: Date;
   finished: boolean;
   isView: boolean;

   constructor(bookid: number, book: LiteBook, numericalReview: number, review: string, startDate: Date, endDate: Date, finished: boolean, isView: boolean) {
      this.bookid = bookid;
      this.book = book;
      this.numericalReview = numericalReview;
      this.review = review;
      this.startDate = startDate;
      this.endDate = endDate;
      this.finished = finished;
      this.isView = isView;
   };   
}