import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environment';

@Injectable({
  providedIn: 'root'
})
export class RepeatedServicesService {

  constructor(
    private http: HttpClient
  ) { }

  getTranactionByUSerId(userId:any):Observable<any>{
    return this.http.get(`${environment.BASEURL}/RepeatedTransaction/GetAllTransaction/${userId}`);
  }

  getTransactionByTranactionId(userId:any,transactionId:any):Observable<any>{
    return this.http.get(`${environment.BASEURL}/RepeatedTransaction/GetTranaction/${userId}/${transactionId}`);
  }

  postTranaction(data:any):Observable<any>{
    return this.http.post(`${environment.BASEURL}/RepeatedTransaction/PostRepeatedTransaction`, data);
  }

  putTranaction(data:any):Observable<any>{
    return this.http.put(`${environment.BASEURL}/RepeatedTransaction/EditTransaction`, data);
  }
}
