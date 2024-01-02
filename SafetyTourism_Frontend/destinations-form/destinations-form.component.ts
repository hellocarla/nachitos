import { Component, EventEmitter, Output } from '@angular/core';
import { Destination } from '../destination';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinationsService } from '../destinations.service';

@Component({
  selector: 'app-destinations-form',
  templateUrl: './destinations-form.component.html',
  styleUrls: ['./destinations-form.component.css']
})

export class DestinationsFormComponent {
  @Output() destinationCreated = new EventEmitter<Destination>();
  destinationForm: FormGroup = new FormGroup({});

constructor(
  private formBuilder: FormBuilder ,
  private destinationService: DestinationsService) {
    this.createForm(); 
  }

  createForm(): void {
    this.destinationForm = this.formBuilder.group({ 
      city_name: ['', Validators.required],
      city_desc: ['', Validators.required],
      country_name: ['', Validators.required]
    });
  } 

onSubmit(): void {
  if (this.destinationForm.valid) {
    const newDestination: Destination = this.destinationForm.value as Destination;
    this.destinationService.createDestinations(newDestination).subscribe( 
      (createdDestination: Destination) => {
      this.destinationCreated.emit(createdDestination);
      this.resetForm();
      },  
      (error) => {
        console.error('Error creating destination:', error);
      }
      ); 
    }
  }

resetForm(): void {
  this.destinationForm.reset();
  } 
}

