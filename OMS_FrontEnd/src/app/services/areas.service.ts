import { Injectable } from '@angular/core';
import { Areas } from '../areas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private apiUrl = "http://localhost:8080/api/zona";

  constructor(private http: HttpClient) { }

  getAreas(): Observable<Areas[]> {
    return this.http.get<Areas[]>(this.apiUrl);
  }

  createArea(newArea: Areas): Observable<Areas> {
    return this.http.post<Areas>(this.apiUrl, newArea);
  }

  updateArea(area: Areas): Observable<Areas> {
    const apiUrlID = this.apiUrl+"/"+area._id;
    return this.http.put<Areas>(apiUrlID, area);
  }

  deleteArea(area: Areas): Observable<Areas> {
    const apiUrlID = this.apiUrl+"/"+area._id;
    return this.http.delete<Areas>(apiUrlID);
  }
}
