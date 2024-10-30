import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonServiceService } from '../../../../Services/Common/common-service.service';
import { GoalServiceService } from '../../../../Services/Goal/goal-service.service';

@Component({
  selector: 'app-edit-goal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-goal.component.html',
  styleUrl: './edit-goal.component.scss'
})
export class EditGoalComponent implements OnInit{

  EditGoalForm!: FormGroup;
  IsLoading = false;
  goalData:any;


  constructor(
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private CommonService: CommonServiceService,
    private goalService: GoalServiceService
  ) {}

  ngOnInit(): void {
    this.EditGoalForm = new FormGroup({
      GoalId: new FormControl(null, [Validators.required]),
      UserId: new FormControl(null, [Validators.required]),
      GoalName: new FormControl(null, [Validators.required]),
      Deadlline: new FormControl(null, [Validators.required]),
      CreatedDate: new FormControl(null, [Validators.required]),
      UpdatedDate: new FormControl(null, [Validators.required]),
      DeletedDate: new FormControl(null, [Validators.required]),
      DeleteTransaction: new FormControl(null, [Validators.required]),
    })
    console.log(this.config.data.product);
    console.log(this.config.data.getAllGoal);
    this.goalData = this.config.data.product;
    this.getGoalData()
  }

  onSubmit(){
    this.IsLoading = true;
    this.EditGoalForm.value.GoalId = this.goalData.goalId;
    this.EditGoalForm.value.UserId = this.goalData.userId;
    this.EditGoalForm.value.CreatedDate = this.goalData.createdDate;
    this.EditGoalForm.value.UpdatedDate = this.CommonService.generateTodayDate();
    console.log(this.EditGoalForm.value);
    this.goalService.editGoal(this.EditGoalForm.value).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.config.data.getAllGoal()
        this.IsLoading = false;
        this.ref.close()
      },
      error: (err)=>{
        console.log(err);
        this.IsLoading = false;
        this.ref.close()
      }
    })
  }

  getGoalData(){
    this.EditGoalForm.patchValue({
      GoalName: this.goalData.goalName,
      Deadlline: this.goalData.deadlline
    })
  }
}
