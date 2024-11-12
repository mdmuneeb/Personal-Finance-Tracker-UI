import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepeatedComponent } from './add-repeated.component';

describe('AddRepeatedComponent', () => {
  let component: AddRepeatedComponent;
  let fixture: ComponentFixture<AddRepeatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRepeatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRepeatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
