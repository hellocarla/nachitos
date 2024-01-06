import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacoesFormComponent } from './recomendacoes-form.component';

describe('RecomendacoesFormComponent', () => {
  let component: RecomendacoesFormComponent;
  let fixture: ComponentFixture<RecomendacoesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecomendacoesFormComponent]
    });
    fixture = TestBed.createComponent(RecomendacoesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
