import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionServiceService } from '../../../../Services/Transaction/transaction-service.service';
import { CommonServiceService } from '../../../../Services/Common/common-service.service';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api/confirmationservice';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-deleted-transaction',
  standalone: true,
  imports: [TableModule, CommonModule, ReactiveFormsModule, ToastrModule, ConfirmPopupModule ],
  templateUrl: './deleted-transaction.component.html',
  styleUrl: './deleted-transaction.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class DeletedTransactionComponent implements OnInit{

  transactionList!:any;

  constructor(
    private transactionService: TransactionServiceService,
    private commonService: CommonServiceService,
    private confirmationService: ConfirmationService,
     private messageService: MessageService
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

  confirm2(event: Event, data:any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
            this.deleteTransaction(data);
            // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}
}
