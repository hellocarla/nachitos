import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDeleteFormComponent } from './package-delete-form.component';

describe('PackageDeleteFormComponent', () => {
  let component: PackageDeleteFormComponent;
  let fixture: ComponentFixture<PackageDeleteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageDeleteFormComponent]
    });
    fixture = TestBed.createComponent(PackageDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
