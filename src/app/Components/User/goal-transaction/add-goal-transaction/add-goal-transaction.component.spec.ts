import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalTransactionComponent } from './add-goal-transaction.component';

describe('AddGoalTransactionComponent', () => {
  let component: AddGoalTransactionComponent;
  let fixture: ComponentFixture<AddGoalTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGoalTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGoalTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
