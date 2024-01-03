import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../pais';
import { paisDTO } from '../paisDTO';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private apiUrl = 'http://localhost:8080/api/paises';

  constructor(private http: HttpClient) { }

  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiUrl);
  }

  createPais(newPais: paisDTO): Observable<paisDTO> {
    return this.http.post<paisDTO>(this.apiUrl, newPais);
  }
}
