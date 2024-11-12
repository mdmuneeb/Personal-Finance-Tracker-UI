import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../../../Public/loader/loader.component';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RepeatedServicesService } from '../../../../Services/repeated/repeated-services.service';
import { CommonServiceService } from '../../../../Services/Common/common-service.service';
import { CategoryServiceService } from '../../../../Services/Category/category-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-repeated',
  standalone: true,
  imports: [DynamicDialogModule, ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './edit-repeated.component.html',
  styleUrl: './edit-repeated.component.scss'
})
export class EditRepeatedComponent {
  UpdateForm!: FormGroup;
  transactionList!:any;
  incomeCategory!: any;
  expenseCategory!:any;
  categoryTypeUpdate = false;
  singleData!:any;
  Isloading = false;
  IsLoadingData = false;

  constructor(private repeatedTransacitonService: RepeatedServicesService,
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
      DeleteTransaction: new FormControl(null,[ Validators.required]),
      Id: new FormControl(null,[ Validators.required]),

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

    this.repeatedTransacitonService.getTranactionByUSerId(this.commonService.getUserId()).
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
    this.repeatedTransacitonService.putTranaction(this.UpdateForm.value).
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
    this.repeatedTransacitonService.getTransactionByTranactionId(this.config.data.TData.userId, this.config.data.TData.transactionId).
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
          TransactionDate: this.singleData.transactionDate,
          Id: this.config.data.TData.transactionId
        })
        this.IsLoadingData = false;
      },
      error:(err)=>{
        console.log(err);
        this.IsLoadingData = false;
      }
    })
  }


}
