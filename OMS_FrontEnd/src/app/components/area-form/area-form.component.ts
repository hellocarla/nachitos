import { Component, EventEmitter, Output } from '@angular/core';
import { Areas } from 'src/app/areas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent {
  @Output() areaCreated = new EventEmitter<Areas>();
  areaForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private areasService: AreasService) {
      this.createForm();
    }

    createForm(): void {
      this.areaForm = this.formBuilder.group({
        nome_zonageo: ['', Validators.required],
        cod_zonageo: ['', Validators.required]
      });
    }

    onSubmit(): void {
      if (this.areaForm.valid) {
        const newArea: Areas = this.areaForm.value as Areas;
        this.areasService.createArea(newArea).subscribe(
          (createdArea: Areas) => {
            this.areaCreated.emit(createdArea);
            this.resetForm();
          },
          (error) => {
            console.error('Error creating the area:', error);
          }
        );
      }
    }

    resetForm(): void {
      this.areaForm.reset();
    }

}
