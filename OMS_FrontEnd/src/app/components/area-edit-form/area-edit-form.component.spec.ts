import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEditFormComponent } from './area-edit-form.component';

describe('AreaEditFormComponent', () => {
  let component: AreaEditFormComponent;
  let fixture: ComponentFixture<AreaEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaEditFormComponent]
    });
    fixture = TestBed.createComponent(AreaEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
