import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisDetailsComponent } from './pais-details.component';

describe('PaisDetailsComponent', () => {
  let component: PaisDetailsComponent;
  let fixture: ComponentFixture<PaisDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaisDetailsComponent]
    });
    fixture = TestBed.createComponent(PaisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
