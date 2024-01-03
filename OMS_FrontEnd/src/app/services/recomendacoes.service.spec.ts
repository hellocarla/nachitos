import { TestBed } from '@angular/core/testing';

import { RecomendacoesService } from './recomendacoes.service';

describe('RecomendacoesService', () => {
  let service: RecomendacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecomendacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
