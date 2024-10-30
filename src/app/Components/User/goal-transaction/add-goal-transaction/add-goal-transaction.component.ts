import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../../Services/Common/common-service.service';
import { GoalServiceService } from '../../../../Services/Goal/goal-service.service';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-goal-transaction',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-goal-transaction.component.html',
  styleUrl: './add-goal-transaction.component.scss',
  providers: [ToastrService]
})
export class AddGoalTransactionComponent implements OnInit{

  AddGoalForm!: FormGroup;
  IsLoading = false;


  constructor(
    private CommonService: CommonServiceService,
    private goalService: GoalServiceService,
    private ref: DynamicDialogRef,
    private toaster: ToastrService,
    private config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.AddGoalForm = new FormGroup({
      UserId: new FormControl(null, [Validators.required]),
      GoalName: new FormControl(null, [Validators.required]),
      Deadlline: new FormControl(null, [Validators.required]),
      CreatedDate: new FormControl(null, [Validators.required]),
    })
  }



  onSubmit(){
    this.IsLoading = true;
    this.AddGoalForm.value.UserId = this.CommonService.getUserId();
    this.AddGoalForm.value.CreatedDate = this.CommonService.generateTodayDate();

    console.log(this.AddGoalForm.value);
    this.goalService.addGoal(this.AddGoalForm.value).
    subscribe({
      next:(res)=>{
        console.log(res);
        this.IsLoading = false;
        this.toaster.success('Added', 'Successfully Added the Goal!');
        this.config.data.getAllGoal();
        this.ref.close()
      },
      error: (err)=>{
        console.log(err);
        this.IsLoading = false;
        this.toaster.error('Error', 'There was some in Submitting the form!')
        this.ref.close()
      }
    })

  }
}
