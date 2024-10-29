import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTransactionComponent } from './goal-transaction.component';

describe('GoalTransactionComponent', () => {
  let component: GoalTransactionComponent;
  let fixture: ComponentFixture<GoalTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
