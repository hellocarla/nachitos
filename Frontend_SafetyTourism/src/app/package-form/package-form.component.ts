import { Component, EventEmitter , Output } from '@angular/core';
import { Package } from '../package';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { PackageService } from '../package.service';
import { DestinationsService } from '../destinations.service';

@Component({
  selector: 'app-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.css']
})
export class PackageFormComponent {
  @Output() packageCreated = new EventEmitter<Package>();
  packageForm: FormGroup = new FormGroup({});

  constructor(
  private formBuilder: FormBuilder ,
  private packageService: PackageService ,
  private destinationsService: DestinationsService
  ) {
    this.createForm();
  }

  createForm(): void {
    this.packageForm = this.formBuilder.group({ 
      city: ['', Validators.required],
      pack_desc: ['', Validators.required],
      pack_price: ['', Validators.required],
      pack_type: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.packageForm.valid) {
      const newPackage: Package = this.packageForm.value as Package;
      this.packageService.createPackage(newPackage).subscribe(
        (createdPackage: Package) => {
          this.packageCreated.emit(createdPackage);
          this.resetForm();
      },
      (error) => {
        console.error('Erro a criar um pacote:', error);
      } 
      );
    } 
  }

  resetForm(): void {
    this.packageForm.reset();
  }
}

