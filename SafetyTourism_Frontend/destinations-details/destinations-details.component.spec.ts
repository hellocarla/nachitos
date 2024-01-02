import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsDetailsComponent } from './destinations-details.component';

describe('DestinationsDetailsComponent', () => {
  let component: DestinationsDetailsComponent;
  let fixture: ComponentFixture<DestinationsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationsDetailsComponent]
    });
    fixture = TestBed.createComponent(DestinationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
