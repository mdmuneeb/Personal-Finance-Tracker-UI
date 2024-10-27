import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http: HttpClient) { }

  getIncomeCategory():Observable<any>{
    return this.http.get(`${environment.BASEURL}/Category/GetCategoryIncome`)
  }


  getExpenseCategory():Observable<any>{
    return this.http.get(`${environment.BASEURL}/Category/GetCategoryExpense`)
  }
}
