import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Surto } from '../surto';
import { SurtoDTO } from '../surtoDTO';

@Injectable({
  providedIn: 'root'
})
export class SurtoService {
  private apiUrl = 'http://localhost:8080/api/surtos';

  constructor(private http: HttpClient) { }

  getSurtos(): Observable<Surto[]> {
    return this.http.get<Surto[]>(this.apiUrl);
  }

  createSurto(newSurto: SurtoDTO): Observable<SurtoDTO> {
    return this.http.post<SurtoDTO>(this.apiUrl, newSurto);
  }
}
