import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedTransactionComponent } from './deleted-transaction.component';

describe('DeletedTransactionComponent', () => {
  let component: DeletedTransactionComponent;
  let fixture: ComponentFixture<DeletedTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
