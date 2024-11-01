import { Component, OnInit } from '@angular/core';
import { GoalServiceService } from '../../../../Services/Goal/goal-service.service';
import { CommonServiceService } from '../../../../Services/Common/common-service.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-deleted-goal',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './deleted-goal.component.html',
  styleUrl: './deleted-goal.component.scss'
})
export class DeletedGoalComponent implements OnInit{

  constructor (
    private goalService: GoalServiceService,
    private commonService: CommonServiceService,
  ){ }

  goalList:any;


  ngOnInit(): void {
    this.GetAllGoal();
  }




  GetAllGoal(){
    this.goalService.getGoalByUserId(this.commonService.getUserId()).
    subscribe({
      next:(res)=>{
        this.goalList = res.filter((val:any)=>{
          return (val.deleteTransaction === true);
        });

        console.log(this.goalList);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  deleteGoal(data:any){
    this.goalService.deleteGoal(data.goalId, data.userId).
    subscribe({
      next: (res)=>{
        console.log(res);
        this.GetAllGoal()
      },
      error: (err)=>{
        console.log(err);

      }
    })
  }

}
