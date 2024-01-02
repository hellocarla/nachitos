import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Destination } from '../destination';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { DestinationsService } from '../destinations.service';

@Component({
  selector: 'app-destinations-delete-form',
  templateUrl: './destinations-delete-form.component.html',
  styleUrls: ['./destinations-delete-form.component.css']
})
export class DestinationsDeleteFormComponent {
  @Input () destination?: Destination;
  @Output() destinationDeleted = new EventEmitter<Destination>();
  destinationsDeleteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder ,
    private destinationService: DestinationsService 
    ) {
      this.destinationsDeleteForm = this.formBuilder.group({
        city_name: ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.destination) {
      this.destinationsDeleteForm.patchValue({
        _id: this.destination.city_name
      });
    }
  }

  onSave(): void {
    if (this.destination) {
      this.destinationService.deleteDestination(this.destination).subscribe(
        () => {
          this.destinationDeleted.emit(this.destination);
        },
        (error) => {
          console.error('Erro a eliminar o destino:', error); }
      );
    }
  }
}
