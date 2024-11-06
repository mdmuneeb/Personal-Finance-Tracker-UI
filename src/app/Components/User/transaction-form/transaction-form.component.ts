import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryServiceService } from '../../../Services/Category/category-service.service';
import {} from '@angular/common/http';
import { CommonServiceService } from '../../../Services/Common/common-service.service';
import { TransactionServiceService } from '../../../Services/Transaction/transaction-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastrModule],
  providers: [DatePipe, ToastrService],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent implements OnInit{

  transactionForm!: FormGroup;
  incomeCategory!:any;
  expenseCategory!:any;
  categoryTypeIncome = true;
  categoryTypeExpense = false;
  IsLoading = false;

  constructor(private CategoryService: CategoryServiceService, private commonService: CommonServiceService, private transactioService: TransactionServiceService,
    private toastr: ToastrService
  ){ }

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
      UserId: new FormControl(null,[ Validators.required]),
      CategoryId: new FormControl(null,[ Validators.required]),
      Amount: new FormControl(null,[ Validators.required]),
      TransactionTypeId: new FormControl(null,[ Validators.required]),
      Description: new FormControl(null,[ Validators.required]),
      TransactionDate: new FormControl(null,[ Validators.required]),
    })
    this.getcategoryExpense();
    this.getcategoryIncome();
  }

  submitForm(){
    this.IsLoading = true
    this.transactionForm.value.TransactionDate = this.commonService.generateTodayDate();
    this.transactionForm.value.CategoryId = +this.transactionForm.value.CategoryId;
    this.transactionForm.value.Amount = +this.transactionForm.value.Amount;
    this.transactionForm.value.UserId = this.commonService.getUserId();
    console.log(this.transactionForm.value, this.transactionForm.valid);
    if(this.transactionForm.value.CategoryId !== null && this.transactionForm.value.Amount !== null && this.transactionForm.value.Description !== null){
      this.transactioService.addTransaction(this.transactionForm.value).
      subscribe({
        next:(res)=>{
          console.log(res);
          this.toastr.success('Added!', 'Your Transaction Has Successfully Added!');
          this.IsLoading = false;
          this.transactionForm.reset()
        },
        error: (err)=>{
          console.log(err);
          this.toastr.success('Error!', 'Your Transaction Has Faced Some Error!');
        }

      })
    }
    else{
      this.toastr.error("Kindly Enter all fields")
    }
  }

  changeType(type:any){
    switch(type){
      case "Income":
        this.categoryTypeIncome = true;
        this.categoryTypeExpense = false;
        break
      case "Expense":
        this.categoryTypeExpense = true;
        this.categoryTypeIncome = false;
    }
  }

  getcategoryIncome(){
    this.CategoryService.getIncomeCategory().
    subscribe({
      next: (res)=>{
        console.log(res);
        this.incomeCategory = res;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  getcategoryExpense(){
    this.CategoryService.getExpenseCategory().
    subscribe({
      next: (res)=>{
        console.log(res);
        this.expenseCategory = res;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

}
