import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurtoFormComponent } from './surto-form.component';

describe('SurtoFormComponent', () => {
  let component: SurtoFormComponent;
  let fixture: ComponentFixture<SurtoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurtoFormComponent]
    });
    fixture = TestBed.createComponent(SurtoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
