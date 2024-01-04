import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurtoComponent } from './surto.component';

describe('SurtoComponent', () => {
  let component: SurtoComponent;
  let fixture: ComponentFixture<SurtoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurtoComponent]
    });
    fixture = TestBed.createComponent(SurtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
