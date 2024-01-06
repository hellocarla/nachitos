import { Component, OnInit } from '@angular/core';
import { Reservations } from '../reservations';
import { ReservationsService } from '../reservations.service';
import { ReservationsDTO } from '../reservationsDTO';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {
  reservations: Reservations[] = [];
  
  selectedReservation?: Reservations;

constructor (private reservationsService: ReservationsService) {}

ngOnInit(): void {
  this.getReservations();
}

onSelect(reservations: Reservations): void {
  this.selectedReservation = reservations;
}

  getReservations(): void {
    this.reservationsService.getReservations()
    .subscribe((data: Reservations[]) => {
      this.reservations = data;
    });
  }

  onReservationsCreated(newReservation: ReservationsDTO): void {
    this.getReservations();
  }

  onReservationsEdited(newReservation: Reservations): void {
    this.getReservations();
  }

  onReservationsDeleted(newReservation: Reservations): void {
    this.getReservations();
  }
}