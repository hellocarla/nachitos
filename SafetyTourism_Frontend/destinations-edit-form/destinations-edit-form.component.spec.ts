import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsEditFormComponent } from './destinations-edit-form.component';

describe('DestinationsEditFormComponent', () => {
  let component: DestinationsEditFormComponent;
  let fixture: ComponentFixture<DestinationsEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationsEditFormComponent]
    });
    fixture = TestBed.createComponent(DestinationsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
