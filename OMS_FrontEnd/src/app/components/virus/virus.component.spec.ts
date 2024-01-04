import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusComponent } from './virus.component';

describe('VirusComponent', () => {
  let component: VirusComponent;
  let fixture: ComponentFixture<VirusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirusComponent]
    });
    fixture = TestBed.createComponent(VirusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
