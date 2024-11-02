import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionServiceService } from '../../../../Services/Transaction/transaction-service.service';
import { CommonServiceService } from '../../../../Services/Common/common-service.service';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-deleted-transaction',
  standalone: true,
  imports: [TableModule, CommonModule, ReactiveFormsModule, ToastrModule ],
  templateUrl: './deleted-transaction.component.html',
  styleUrl: './deleted-transaction.component.scss',
})
export class DeletedTransactionComponent implements OnInit{

  transactionList!:any;

  constructor(
    private transactionService: TransactionServiceService,
    private commonService: CommonServiceService,
  ) {}


  ngOnInit(): void {
    this.getTransactionsById()
  }


  getTransactionsById(){
    this.transactionService.gettransactionById(this.commonService.getUserId()).
    subscribe({
      next:(res)=>{
        this.transactionList = res.filter((val:any)=> val.deleteTransaction === true);
        console.log(this.transactionList);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  deleteTransaction(data:any){
    this.transactionService.deletetransaction(data.transactionId, data.userId).
    subscribe({
      next: (res)=>{
        console.log(res);
        this.getTransactionsById()
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

}
