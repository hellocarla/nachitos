import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsEditFormComponent } from './reservations-edit-form.component';

describe('ReservationsEditFormComponent', () => {
  let component: ReservationsEditFormComponent;
  let fixture: ComponentFixture<ReservationsEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationsEditFormComponent]
    });
    fixture = TestBed.createComponent(ReservationsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
