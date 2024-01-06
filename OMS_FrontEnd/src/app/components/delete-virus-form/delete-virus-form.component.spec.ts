import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVirusFormComponent } from './delete-virus-form.component';

describe('DeleteVirusFormComponent', () => {
  let component: DeleteVirusFormComponent;
  let fixture: ComponentFixture<DeleteVirusFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteVirusFormComponent]
    });
    fixture = TestBed.createComponent(DeleteVirusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
