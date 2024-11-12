import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddRepeatedComponent } from './add-repeated/add-repeated.component';
import { EditRepeatedComponent } from './edit-repeated/edit-repeated.component';
import { RepeatedServicesService } from '../../../Services/repeated/repeated-services.service';
import { CommonServiceService } from '../../../Services/Common/common-service.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CategoryServiceService } from '../../../Services/Category/category-service.service';



@Component({
  selector: 'app-repeated-transaction',
  standalone: true,
  imports: [TableModule, CommonModule, ReactiveFormsModule, ToastrModule, DynamicDialogModule ],
  templateUrl: './repeated-transaction.component.html',
  styleUrl: './repeated-transaction.component.scss',
  providers: [DialogService]
})
export class RepeatedTransactionComponent implements OnInit{

  ref: DynamicDialogRef | undefined;
  repeatedTransactionData:any
  incomeCategory:any;
  expenseCategory:any;

  ngOnInit(): void {
    this.getTranactionByUserId()
    this.getcategoryExpense();
    this.getcategoryIncome();
  }

  constructor (
    private commonServive: CommonServiceService,
    public dialogService: DialogService,
    private repeatedService: RepeatedServicesService,
    private CategoryService: CategoryServiceService
  ) {}

  getTranactionByUserId(){

    this.repeatedService.getTranactionByUSerId(this.commonServive.getUserId()).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.repeatedTransactionData = res.filter((val:any)=>{
          return val.deleteTransaction != true
        })
      },
      error: (err)=>{
        console.log("Error",err);

      }
    })
  }


  addRepeatedTransaction(){
    this.ref = this.dialogService.open(AddRepeatedComponent, {
      header: 'Add Transaction',
            width: '50vw',
            modal:true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data:{
              getTransaction: this.getTranactionByUserId.bind(this)
            }
    });
  }

  editRepeatedTransactin(data:any){
    this.ref = this.dialogService.open(EditRepeatedComponent, {
      header: 'Edit Transaction',
            width: '50vw',
            modal:true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: {
              TData: data,
              getTransaction: this.getTranactionByUserId.bind(this)
          },
    });
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



