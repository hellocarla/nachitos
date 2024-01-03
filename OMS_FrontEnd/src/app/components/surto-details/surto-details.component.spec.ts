import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurtoDetailsComponent } from './surto-details.component';

describe('SurtoDetailsComponent', () => {
  let component: SurtoDetailsComponent;
  let fixture: ComponentFixture<SurtoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurtoDetailsComponent]
    });
    fixture = TestBed.createComponent(SurtoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
