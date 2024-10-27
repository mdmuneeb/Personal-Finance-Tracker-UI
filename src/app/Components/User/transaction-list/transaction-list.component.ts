import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TransactionServiceService } from '../../../Services/Transaction/transaction-service.service';
import { CommonServiceService } from '../../../Services/Common/common-service.service';
import { TableModule } from 'primeng/table';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { CommonModule } from '@angular/common';
import { CategoryServiceService } from '../../../Services/Category/category-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [TableModule, CommonModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  providers: [ToastrService],
  encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent implements OnInit{

  categoryType = false;
  incomeCategory!:any;
  expenseCategory!:any;
  UpdateForm!: FormGroup;
  singleData!:any;
  categoryTypeUpdate = false;

  constructor(private transactionService: TransactionServiceService,
    private commonService: CommonServiceService,
    private CategoryService: CategoryServiceService,
    private transactioService: TransactionServiceService,
    private toastr: ToastrService
  ){ }
  transactionList!:any;
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




    this.getTransactionsById();
    this.getcategoryExpense();
    this.getcategoryIncome();
  }


  submitForm(){
    this.UpdateForm.value.UpdatedDate = this.commonService.generateTodayDate();
    this.UpdateForm.value.CategoryId = +this.UpdateForm.value.CategoryId;
    this.UpdateForm.value.Amount = +this.UpdateForm.value.Amount;
    this.UpdateForm.value.UserId = this.commonService.getUserId();
    console.log(this.UpdateForm.value);
    this.transactioService.updateTransaction(this.UpdateForm.value).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.toastr.success('Added!', 'Your Transaction Has Successfully Added!');
        this.getTransactionsById();
      },
      error: (err)=>{
        console.log(err);
        this.toastr.success('Error!', 'Your Transaction Has Faced Some Error!');
      }

    })
  }


  getTransactionsById(){
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


  changeType(){
    this.categoryType = !this.categoryType
  }


  getUpdateFormData(data:any){
    this.transactioService.getTransactionByUserIdTransactionId(data.userId, data.transactionId).
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
      },
      error:(err)=>{
        console.log(err);

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

    this.transactioService.updateTransaction(this.UpdateForm.value).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.getTransactionsById();
      },
      error: (err)=>{
        console.log(err);
      }

    })
  }
}
