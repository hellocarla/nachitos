import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageEditFormComponent } from './package-edit-form.component';

describe('PackageEditFormComponent', () => {
  let component: PackageEditFormComponent;
  let fixture: ComponentFixture<PackageEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageEditFormComponent]
    });
    fixture = TestBed.createComponent(PackageEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
