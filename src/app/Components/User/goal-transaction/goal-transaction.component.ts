import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddGoalTransactionComponent } from './add-goal-transaction/add-goal-transaction.component';
import { TableModule } from 'primeng/table';
import { GoalServiceService } from '../../../Services/Goal/goal-service.service';
import { CommonServiceService } from '../../../Services/Common/common-service.service';
import { EditTransactionComponent } from '../transaction-list/edit-transaction/edit-transaction.component';
import { EditGoalComponent } from './edit-goal/edit-goal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-goal-transaction',
  standalone: true,
  imports: [DynamicDialogModule, TableModule],
  templateUrl: './goal-transaction.component.html',
  styleUrl: './goal-transaction.component.scss',
  providers: [DialogService, ToastrService]
})
export class GoalTransactionComponent implements OnInit {

  constructor (
    private dialogService: DialogService,
    private goaslService: GoalServiceService,
    private commonService: CommonServiceService,
    private toaster: ToastrService
  ) {}

  ref: DynamicDialogRef | undefined;
  goalList:any;
  doneGoalList:any;

  ngOnInit(): void {

    this.GetAllGoal();
  }

  AddGoal() {
    this.ref = this.dialogService.open(AddGoalTransactionComponent, {
      header: 'Goal Form',
      width: '50%',
      modal:true,
      data: {
        getAllGoal: this.GetAllGoal.bind(this)
      },
      breakpoints: {
          '960px': '65vw',
          '640px': '90vw'
      },
  });
  }

  EditGoal(product:any) {
    this.ref = this.dialogService.open(EditGoalComponent, {
      header: 'Goal Form',
      width: '50%',
      modal:true,
      data:{product: product,
        getAllGoal: this.GetAllGoal.bind(this)
      },

      breakpoints: {
          '960px': '65vw',
          '640px': '90vw'
      },
  });
  }
  GetAllGoal(){
    this.goaslService.getGoalByUserId(this.commonService.getUserId()).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.goalList = res.filter((val:any)=>{
          return (val.deleteTransaction !== true) && (val.done !== true) ;
        });
        this.doneGoalList = res.filter((val:any)=>{
          return (val.deleteTransaction !== true) && (val.done === true) ;
        });

      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  deleteGoal(data:any){
    // data.deleteTranasction = true;
    data.deletedDate = this.commonService.generateTodayDate()
    console.log(data);
    this.goaslService.editGoal(data).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.toaster.success('Deleted!', 'Your Transaction Has Successfully Deleted!');
        this.GetAllGoal()
      },
      error: (err)=>{
        console.log(err);

      }
    })
  }

  Done(data:any){
    data.done = true;
    console.log(data);

    this.goaslService.editGoal(data).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.toaster.success('Done!', 'Your Transaction Has Successfully Completed!');
        this.GetAllGoal()
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

}
