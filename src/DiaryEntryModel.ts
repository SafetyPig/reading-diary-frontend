import {LiteBook}from "./LiteBookModel"

export class DiaryEntryModel {
   book: LiteBook
   author: string;
   numericalReview: number;
   review: string;
   startDate: Date;
   endDate: Date;
   finished: boolean;

   constructor(book: LiteBook, author: string, numericalReview: number, review: string, startDate: Date, endDate: Date, finished: boolean) {
      this.book = book
      this.author = author
      this.numericalReview = numericalReview
      this.review = review
      this.startDate = startDate
      this.endDate = endDate
      this.finished = finished
   };

   
}