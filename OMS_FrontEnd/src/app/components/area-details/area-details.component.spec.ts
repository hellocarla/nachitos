import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDetailsComponent } from './area-details.component';

describe('AreaDetailsComponent', () => {
  let component: AreaDetailsComponent;
  let fixture: ComponentFixture<AreaDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaDetailsComponent]
    });
    fixture = TestBed.createComponent(AreaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
