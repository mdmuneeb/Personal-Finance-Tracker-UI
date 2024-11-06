import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginServiceService } from '../../../Services/login-service.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[ToastrService]
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  RegisterForm!: FormGroup;
  signUpResult!:any;
  loginResult!: any;
  IsLoading!: any;
  constructor(private loginService: LoginServiceService,
    private router: Router,
    private toaster: ToastrService
  ){}
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
      this.IsLoading = true;
      this.loginService.RegisterUser(this.RegisterForm.value).
      subscribe({
        next:(res)=>{
          this.signUpResult = res
          console.log(res);

          if(this.signUpResult.isSuccess){
            console.log(res);
            this.toaster.success('You have successfully signup', 'Sucess!!')
            this.IsLoading = false;
            this.RegisterForm.reset();
          }
          else{
            this.IsLoading = false;
            this.toaster.error(this.signUpResult.message);
          }
        }
      })
    }
  }



  LoginUser(){
    this.IsLoading = true
    console.log(this.LoginForm.value);
    if(this.LoginForm.valid){
      this.loginService.LoginUser(this.LoginForm.value).
      subscribe({
        next: (res)=>{
          console.log(res);
            sessionStorage.setItem("userData", JSON.stringify(res))
            this.IsLoading = false
            this.LoginForm.reset()
            this.router.navigate(["/UserPage/dashboard"])
        },
        error: (err)=>{
          console.log("Error", err);
          this.IsLoading = false
        }
      })
    }
    else{
      console.log("The form is not valid");

    }
  }
}
