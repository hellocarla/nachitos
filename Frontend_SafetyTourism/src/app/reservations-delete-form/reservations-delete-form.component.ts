import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reservations } from '../reservations';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservations-delete-form',
  templateUrl: './reservations-delete-form.component.html',
  styleUrls: ['./reservations-delete-form.component.css']
})
export class ReservationsDeleteFormComponent {
  @Input () reservations ?: Reservations;
  @Output() reservationsDeleted = new EventEmitter<Reservations>();
  reservationsDeleteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder ,
    private reservationsService: ReservationsService
    ) {
      this.reservationsDeleteForm = this.formBuilder.group({
        res_id: ['']
      });
  }

  ngOnChanges(): void {
    if (this.reservations) {
      this.reservationsDeleteForm.patchValue({
        _id: this.reservations._id
      });
    } 
  }

  onSave(): void {
    if (this.reservations) {
      this.reservationsService.deleteReservations(this.reservations).subscribe(
        () => { 
          console.log('Reserva deletada com sucesso');
          this.reservationsDeleted.emit(this.reservations);
        },
        (error) => {
          console.error('Erro ao eliminar a reserva', error);
        }
        ); 
      }
    }
  }
