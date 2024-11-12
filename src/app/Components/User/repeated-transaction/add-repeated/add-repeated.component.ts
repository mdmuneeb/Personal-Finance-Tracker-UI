import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryServiceService } from '../../../../Services/Category/category-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../../../../Services/Common/common-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RepeatedServicesService } from '../../../../Services/repeated/repeated-services.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-repeated',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastrModule],
  providers: [DatePipe, ToastrService],
  templateUrl: './add-repeated.component.html',
  styleUrl: './add-repeated.component.scss'
})
export class AddRepeatedComponent {


  transactionForm!: FormGroup;
  incomeCategory!:any;
  expenseCategory!:any;
  categoryTypeIncome = true;
  categoryTypeExpense = false;
  IsLoading = false;

  constructor(private CategoryService: CategoryServiceService, private commonService: CommonServiceService, private repeatedTransaction: RepeatedServicesService,
    private toastr: ToastrService,
    private config: DynamicDialogConfig,
    public dialogService: DialogService,
    private ref: DynamicDialogRef
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
      // this.transactioService.addTransaction(this.transactionForm.value).
      this.repeatedTransaction.postTranaction(this.transactionForm.value).
      subscribe({
        next:(res)=>{
          console.log(res);
          this.toastr.success('Added!', 'Your Transaction Has Successfully Added!');
          this.IsLoading = false;
          this.transactionForm.reset()
          this.config.data.getTransaction()
          this.ref.close()
        },
        error: (err)=>{
          console.log(err);
          this.toastr.success('Error!', 'Your Transaction Has Faced Some Error!');
          this.config.data.getTransaction()
          this.ref.close()
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
