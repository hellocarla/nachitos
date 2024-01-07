import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Package } from '../package';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-package-delete-form',
  templateUrl: './package-delete-form.component.html',
  styleUrls: ['./package-delete-form.component.css']
})
export class PackageDeleteFormComponent {
  @Input () package?: Package;
  @Output() packageDeleted = new EventEmitter<Package>();
  packageDeleteForm: FormGroup;

  constructor(
  private formBuilder: FormBuilder,
  private packageService: PackageService
  ) {
    this.packageDeleteForm = this.formBuilder.group({
      _id: ['']
    });
  }

  ngOnChanges(): void {
    if (this.package) {
      this.packageDeleteForm.patchValue({
        _id: this.package._id
      });
    }
  }

  onSave(): void {
    if (this.package) {
      this.packageService.deletePackage(this.package).subscribe(
        () => {
          this.packageDeleted.emit(this.package);
        },
        (error) => {
          console.error('Erro a eliminar o pacote:', error);
        }
      );
    }
  }
}
