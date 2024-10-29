import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedTransactionComponent } from './repeated-transaction.component';

describe('RepeatedTransactionComponent', () => {
  let component: RepeatedTransactionComponent;
  let fixture: ComponentFixture<RepeatedTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepeatedTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeatedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
