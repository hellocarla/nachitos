import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Areas } from 'src/app/areas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-area-edit-form',
  templateUrl: './area-edit-form.component.html',
  styleUrls: ['./area-edit-form.component.css']
})
export class AreaEditFormComponent {
  @Input() area?: Areas;
  @Output() areaEdited = new EventEmitter<Areas>();
  areaEditForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private areasService: AreasService) {
      this.areaEditForm = this.formBuilder.group({
        _id: [''],
        nome_zonageo: ['', Validators.required],
        cod_zonageo: ['', Validators.required]
      });
    }

  ngOnChanges(): void {
    if(this.area) {
      this.areaEditForm.patchValue({
        _id: this.area._id,
        nome_zonageo: this.area.nome_zonageo,
        cod_zonageo: this.area.cod_zonageo
      });
    }
  }

  onSave(): void {
    if(this.areaEditForm.valid) {
      const editedArea = this.areaEditForm.value as Areas;
      this.areasService.updateArea(editedArea).subscribe(
        (updatedArea: Areas) => {
          this.areaEdited.emit(editedArea);
          this.resetForm();
        }, (error) => {
          console.error('Error updating the area:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.areaEditForm.reset();
  }


}
