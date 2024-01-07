import { Component, Input } from '@angular/core';
import { Reservations } from '../reservations';

@Component({
  selector: 'app-reservations-details',
  templateUrl: './reservations-details.component.html',
  styleUrls: ['./reservations-details.component.css']
})
export class ReservationsDetailsComponent {
  @Input() selectedReservation?: Reservations;
}
