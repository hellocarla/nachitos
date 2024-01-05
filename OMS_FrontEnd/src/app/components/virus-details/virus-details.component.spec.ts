import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusDetailsComponent } from './virus-details.component';

describe('VirusDetailsComponent', () => {
  let component: VirusDetailsComponent;
  let fixture: ComponentFixture<VirusDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirusDetailsComponent]
    });
    fixture = TestBed.createComponent(VirusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
