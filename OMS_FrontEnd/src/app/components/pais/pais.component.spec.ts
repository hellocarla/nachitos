import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisComponent } from './pais.component';

describe('PaisComponent', () => {
  let component: PaisComponent;
  let fixture: ComponentFixture<PaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaisComponent]
    });
    fixture = TestBed.createComponent(PaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
