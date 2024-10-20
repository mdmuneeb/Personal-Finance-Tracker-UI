import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  RegisterUser(data:any){
    return this.http.post(`${environment.BASEURL}/UserToken/UserLogin`, data)
  }
  LoginUser(data:any){
    return this.http.post(`${environment.BASEURL}/UserToken/GetUser`, data)
  }
}
