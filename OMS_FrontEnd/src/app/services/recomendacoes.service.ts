import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recomendacoes } from '../recomendacoes';
import { RecomendacoesDTO } from '../RecomendacoesDTO';

@Injectable({
  providedIn: 'root'
})
export class RecomendacoesService {
  private apiUrl = 'http://localhost:8080/api/recomendacoes';

  constructor(private http: HttpClient) { }

  getRecs(): Observable<Recomendacoes[]> {
    return this.http.get<Recomendacoes[]>(this.apiUrl);
  }

  createRecs(newRec: RecomendacoesDTO): Observable<RecomendacoesDTO> {
    return this.http.post<RecomendacoesDTO>(this.apiUrl, newRec);
  }
}
