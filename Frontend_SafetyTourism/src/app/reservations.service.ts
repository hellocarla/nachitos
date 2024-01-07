import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservations } from './reservations';
import { ReservationsDTO } from './reservationsDTO';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private apiUrl = 'http://localhost:8090/api/reservations';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservations[]> {
    return this.http.get<Reservations[]>(this.apiUrl);
  }

  createReservations(newReservation: ReservationsDTO): Observable<ReservationsDTO> {
    return this.http.post<ReservationsDTO>(this.apiUrl, newReservation);
  }

  updateReservation(Reservation: Reservations): Observable<Reservations> { 
    const apiUrlID = this.apiUrl+"/"+Reservation._id;
    console.log(Reservation);
    return this.http.put<Reservations>(apiUrlID, Reservation);
  }

  deleteReservations(Reservation: Reservations): Observable<Reservations> { 
    const apiUrlID = this.apiUrl+"/"+Reservation._id;
    return this.http.delete<Reservations>(apiUrlID);
  }
}
