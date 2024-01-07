import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsDeleteFormComponent } from './reservations-delete-form.component';

describe('ReservationsDeleteFormComponent', () => {
  let component: ReservationsDeleteFormComponent;
  let fixture: ComponentFixture<ReservationsDeleteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationsDeleteFormComponent]
    });
    fixture = TestBed.createComponent(ReservationsDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
