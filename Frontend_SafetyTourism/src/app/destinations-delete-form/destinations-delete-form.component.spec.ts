import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsDeleteFormComponent } from './destinations-delete-form.component';

describe('DestinationsDeleteFormComponent', () => {
  let component: DestinationsDeleteFormComponent;
  let fixture: ComponentFixture<DestinationsDeleteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationsDeleteFormComponent]
    });
    fixture = TestBed.createComponent(DestinationsDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
