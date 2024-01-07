import { Component, EventEmitter , Output } from '@angular/core';
import { Reservations } from '../reservations';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { ReservationsService } from '../reservations.service';
import { ReservationsDTO } from '../reservationsDTO';

@Component({
  selector: 'app-reservations-form',
  templateUrl: './reservations-form.component.html',
  styleUrls: ['./reservations-form.component.css']
})
export class ReservationsFormComponent {
  @Output() ReservationCreated = new EventEmitter<ReservationsDTO>();
  ReservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private ReservationService: ReservationsService) {
      this.createForm();
    }

    createForm(): void {
      this.ReservationForm = this.formBuilder.group({
        res_clientId: ['', Validators.required],
        res_packageId: ['', Validators.required],
      });
    }

    onSubmit(): void {
      if (this.ReservationForm.valid) {
        const newReservation: ReservationsDTO = this.ReservationForm.value as ReservationsDTO;
        this.ReservationService.createReservations(newReservation).subscribe(
          (createdReservation: ReservationsDTO) => {
            this.ReservationCreated.emit(createdReservation);
            this.resetForm();
          },
        (error) => {
          console.error('Erro a criar uma reserva:', error);
          }
        ); 
      }
    }

  resetForm(): void {
    this.ReservationForm.reset();
  }
}
