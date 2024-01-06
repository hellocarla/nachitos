import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reservations } from '../reservations';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservations-edit-form',
  templateUrl: './reservations-edit-form.component.html',
  styleUrls: ['./reservations-edit-form.component.css']
})
export class ReservationsEditFormComponent {
  @Input () reservations ?: Reservations;
  @Output() reservationsEdited = new EventEmitter<Reservations>();
  reservationsEditForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ReservationsService: ReservationsService
    ) {
      this.reservationsEditForm = this.formBuilder.group({
        _id: ['', Validators.required],
        res_client: ['', Validators.required],
        res_package: ['', Validators.required]
      });
    }

    ngOnChanges(): void {
      if (this.reservations) {
        this.reservationsEditForm.patchValue({
          _id: this.reservations._id,
          res_client: this.reservations.res_client,
          res_package: this.reservations.res_package
        });
      }
    }

    onSave(): void {
      if (this.reservationsEditForm.valid) {
        const editedReservations = this.reservationsEditForm.value as Reservations;
        this.ReservationsService.updateReservation(editedReservations).subscribe(
          (updatedReservations: Reservations) => {
            this.reservationsEdited.emit(editedReservations);
            this.resetForm();
          },
          (error) => {
            console.error('Erro a atualizar a reserva:', error);
          }
          );
        }
      }
    resetForm(): void {
      this.reservationsEditForm.reset();
    }
  }
