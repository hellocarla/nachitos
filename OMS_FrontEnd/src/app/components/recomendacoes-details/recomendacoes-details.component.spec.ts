import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacoesDetailsComponent } from './recomendacoes-details.component';

describe('RecomendacoesDetailsComponent', () => {
  let component: RecomendacoesDetailsComponent;
  let fixture: ComponentFixture<RecomendacoesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecomendacoesDetailsComponent]
    });
    fixture = TestBed.createComponent(RecomendacoesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
