import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TransactionServiceService } from '../../../../Services/Transaction/transaction-service.service';

import { CategoryServiceService } from '../../../../Services/Category/category-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../../../../Services/Common/common-service.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { LoaderComponent } from "../../../Public/loader/loader.component";

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [DynamicDialogModule, ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss'
})
export class EditTransactionComponent implements OnInit{

  UpdateForm!: FormGroup;
  transactionList!:any;
  incomeCategory!: any;
  expenseCategory!:any;
  categoryTypeUpdate = false;
  singleData!:any;
  Isloading = false;
  IsLoadingData = false;

  // ref: DynamicDialogRef | undefined;

  constructor(private transactionService: TransactionServiceService,
    private commonService: CommonServiceService,
    private CategoryService: CategoryServiceService,
    private toastr: ToastrService,
    private config: DynamicDialogConfig,
    public dialogService: DialogService,
    private ref: DynamicDialogRef

  ) {}


  ngOnInit(): void {
    this.UpdateForm = new FormGroup({
      UserId: new FormControl(null,[ Validators.required]),
      CategoryId: new FormControl(null,[ Validators.required]),
      Amount: new FormControl(null,[ Validators.required]),
      TransactionTypeId: new FormControl(null,[ Validators.required]),
      Description: new FormControl(null,[ Validators.required]),
      UpdatedDate: new FormControl(null,[ Validators.required]),
      TransactionId: new FormControl(null,[ Validators.required]),
      TransactionDate: new FormControl(null,[ Validators.required]),
      DeletedDate: new FormControl(null,[ Validators.required]),
      DeleteTransaction: new FormControl(null,[ Validators.required])
    })
    console.log(this.config.data.getTransaction);

    this.getTransactionsById();
    this.getcategoryExpense();
    this.getcategoryIncome();
    this.IsLoadingData = true;
    setTimeout(()=>{
      this.getUpdateFormData()
    }, 1000)
  }


  getTransactionsById(){

    console.log(this.config.data.getTransaction());

    this.transactionService.gettransactionById(this.commonService.getUserId()).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.transactionList = res.filter((val:any)=> val.deleteTransaction !== true);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  submitForm(){
    this.Isloading = true;
    this.UpdateForm.value.UpdatedDate = this.commonService.generateTodayDate();
    this.UpdateForm.value.CategoryId = +this.UpdateForm.value.CategoryId;
    this.UpdateForm.value.Amount = +this.UpdateForm.value.Amount;
    this.UpdateForm.value.UserId = this.commonService.getUserId();
    console.log(this.UpdateForm.value);
    this.transactionService.updateTransaction(this.UpdateForm.value).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.Isloading = false;
        this.ref.close();
        this.toastr.success('Updated!', 'Your Transaction Has Successfully Updated!');
        this.getTransactionsById();
      },
      error: (err)=>{
        console.log(err);
        this.getTransactionsById();
        this.toastr.success('Error!', 'Your Transaction Has Faced Some Error!');
        this.ref.close();
      }

    })
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

  getUpdateFormData(){
    this.transactionService.getTransactionByUserIdTransactionId(this.config.data.TData.userId, this.config.data.TData.transactionId).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.singleData = res
        let category;
        if (this.singleData.transactionTypeId === 1) {
          this.categoryTypeUpdate = true;
          category = this.incomeCategory.find((cat:any) => cat.categoryId === this.singleData.categoryId);
        } else {
          category = this.expenseCategory.find((cat:any) => cat.categoryId === this.singleData.categoryId);
        }
        console.log(category);

        this.UpdateForm.patchValue({
          Amount: this.singleData.amount,
          Description: this.singleData.description,
          CategoryId: category.categoryId,
          TransactionTypeId: this.singleData.transactionTypeId,
          TransactionId: this.singleData.transactionId,
          TransactionDate: this.singleData.transactionDate,
        })
        this.IsLoadingData = false;
      },
      error:(err)=>{
        console.log(err);
        this.IsLoadingData = false;
      }
    })
  }

  deleteTransaction(data:any){

    this.UpdateForm.patchValue({
      Amount: data.amount,
      Description: data.description,
      CategoryId: data.categoryId,
      TransactionTypeId: data.transactionTypeId,
      TransactionId: data.transactionId,
      TransactionDate: data.transactionDate,
      UpdatedDate : data.updatedDate,
      UserId : data.userId,
      DeletedDate: this.commonService.generateTodayDate(),
      DeleteTransaction: true
    })

    console.log(this.UpdateForm.value);

    this.transactionService.updateTransaction(this.UpdateForm.value).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.toastr.success('Deleted!', 'Your Transaction Has Successfully Deleted!');
        this.getTransactionsById();
      },
      error: (err)=>{
        console.log(err);
      }

    })
  }
}
