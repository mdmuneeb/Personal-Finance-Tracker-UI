import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environment';

@Injectable({
  providedIn: 'root'
})
export class GoalServiceService {

  constructor(
    private http:HttpClient
  ) { }

  addGoal(data:any):Observable<any>{
    return this.http.post(`${environment.BASEURL}/Goal/PostGoal`, data);
  }

  editGoal(data:any):Observable<any>{
    return this.http.put(`${environment.BASEURL}/Goal/UpdateGoal`, data)
  }

  getGoalByUserId(id:any):Observable<any>{
    return this.http.get(`${environment.BASEURL}/Goal/GetAllGoalbyUserId/${id}`)
  }

}

