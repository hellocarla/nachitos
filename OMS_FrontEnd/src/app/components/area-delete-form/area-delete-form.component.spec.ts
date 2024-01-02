import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDeleteFormComponent } from './area-delete-form.component';

describe('AreaDeleteFormComponent', () => {
  let component: AreaDeleteFormComponent;
  let fixture: ComponentFixture<AreaDeleteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaDeleteFormComponent]
    });
    fixture = TestBed.createComponent(AreaDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
