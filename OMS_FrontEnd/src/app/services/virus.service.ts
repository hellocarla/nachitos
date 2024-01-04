import { Injectable } from '@angular/core';
import { Virus } from '../virus';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirusService {

  private apiUrl = "http://localhost:8080/api/virus";

  constructor(private http: HttpClient) { }

  getViruses(): Observable<Virus[]> {
    return this.http.get<Virus[]>(this.apiUrl);
  }

  createVirus(newVirus: Virus): Observable<Virus> {
    return this.http.post<Virus>(this.apiUrl, newVirus);
  } 

  updateVirus(virus: Virus): Observable<Virus> {
    const apiUrlID = this.apiUrl+"/"+virus._id;
    return this.http.put<Virus>(apiUrlID, virus);
  }

  deleteVirus(virus: Virus): Observable<Virus> {
    const apiUrlID = this.apiUrl+"/"+virus._id;
    return this.http.delete<Virus>(apiUrlID);
  }
}
