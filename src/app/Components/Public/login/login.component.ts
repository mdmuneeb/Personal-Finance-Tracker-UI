import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginServiceService } from '../../../Services/login-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  RegisterForm!: FormGroup;
  constructor(private loginService: LoginServiceService){}
  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      LEmail: new FormControl(null, [Validators.required]),
      LPassword: new FormControl(null, [Validators.required])
    })
    this.RegisterForm = new FormGroup({
      UserName: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.required]),
      Password: new FormControl(null, [Validators.required]),
      UserType: new FormControl(2, Validators.required)
    })
  }


  SignUpUser(){
    console.log(this.RegisterForm.value);
    if(this.RegisterForm.valid){
      this.loginService.RegisterUser(this.RegisterForm.value).
      subscribe({
        next:(res)=>{
          console.log(res);
        }
      })
    }
  }

  LoginUser(){
    console.log(this.LoginForm.value);
    if(this.LoginForm.valid){
      this.loginService.LoginUser(this.LoginForm.value).
      subscribe({
        next: (res)=>{
          console.log(res);
          sessionStorage.setItem("userData", JSON.stringify(res))
        }
      })
    }

  }
}
