import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { errorMonitor } from 'events';
import { Observable } from 'rxjs';
import { environment } from '../../Environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  constructor(private http: HttpClient) { }

  addTransaction(data:any):Observable<any>{
    return this.http.post(`${environment.BASEURL}/Transaction/PostTransaction`, data)
  }

  updateTransaction(data:any):Observable<any>{
    return this.http.put(`${environment.BASEURL}/Transaction/UpdateTransaction`, data)
  }

  gettransactionById(userId:any):Observable<any>{
    return this.http.get(`${environment.BASEURL}/Transaction/GetTransactionById/${userId}`)
  }

  getTransactionByUserIdTransactionId(userId:number, transactionId:number):Observable<any>{
    return this.http.get(`${environment.BASEURL}/Transaction/GetTransactionByUserIdTransactionId/${userId}/${transactionId}`)
  }
}
