import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusFormComponent } from './virus-form.component';

describe('VirusFormComponent', () => {
  let component: VirusFormComponent;
  let fixture: ComponentFixture<VirusFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirusFormComponent]
    });
    fixture = TestBed.createComponent(VirusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
