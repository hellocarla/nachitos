import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsFormComponent } from './destinations-form.component';

describe('DestinationsFormComponent', () => {
  let component: DestinationsFormComponent;
  let fixture: ComponentFixture<DestinationsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationsFormComponent]
    });
    fixture = TestBed.createComponent(DestinationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
