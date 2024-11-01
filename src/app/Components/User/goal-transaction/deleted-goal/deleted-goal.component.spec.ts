import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedGoalComponent } from './deleted-goal.component';

describe('DeletedGoalComponent', () => {
  let component: DeletedGoalComponent;
  let fixture: ComponentFixture<DeletedGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedGoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
