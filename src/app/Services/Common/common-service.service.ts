import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

enum transactionInfo {
  Income = 1,
  Expense = 2,
}

@Injectable({
  providedIn: 'root'
})

export class CommonServiceService {

  constructor(private datePipe: DatePipe) { }



  generateTodayDate(){
    return `${this.datePipe.transform(new Date(), 'dd/MM/YYYY')}`
  }


  getUserId(){
    if (typeof window !== 'undefined'){
      let userId:any;
      userId = sessionStorage.getItem("userData");
      if(userId){
        userId = JSON.parse(userId);
        return userId?.userId || null;
      }
    }
  }
  getUserName(){
    if (typeof window !== 'undefined'){
      let userId:any;
      userId = sessionStorage.getItem("userData");
      if(userId){
        userId = JSON.parse(userId);
        return userId?.userName || null;
      }
    }
  }

}
