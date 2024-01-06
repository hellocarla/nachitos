import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsFormComponent } from './reservations-form.component';

describe('ReservationsFormComponent', () => {
  let component: ReservationsFormComponent;
  let fixture: ComponentFixture<ReservationsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationsFormComponent]
    });
    fixture = TestBed.createComponent(ReservationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
