import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddGoalTransactionComponent } from './add-goal-transaction/add-goal-transaction.component';

@Component({
  selector: 'app-goal-transaction',
  standalone: true,
  imports: [DynamicDialogModule],
  templateUrl: './goal-transaction.component.html',
  styleUrl: './goal-transaction.component.scss',
  providers: [DialogService]
})
export class GoalTransactionComponent implements OnInit {

  constructor (
    private dialogService: DialogService
  ) {}

  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {


  }

  AddGoal() {
    this.ref = this.dialogService.open(AddGoalTransactionComponent, {
      header: 'Goal Form',
      width: '50%',
      modal:true,
      breakpoints: {
          '960px': '65vw',
          '640px': '90vw'
      },
  });
}
}
