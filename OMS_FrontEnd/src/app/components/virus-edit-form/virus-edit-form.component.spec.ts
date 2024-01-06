import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusEditFormComponent } from './virus-edit-form.component';

describe('VirusEditFormComponent', () => {
  let component: VirusEditFormComponent;
  let fixture: ComponentFixture<VirusEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirusEditFormComponent]
    });
    fixture = TestBed.createComponent(VirusEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
