import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRepeatedComponent } from './edit-repeated.component';

describe('EditRepeatedComponent', () => {
  let component: EditRepeatedComponent;
  let fixture: ComponentFixture<EditRepeatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRepeatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRepeatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
