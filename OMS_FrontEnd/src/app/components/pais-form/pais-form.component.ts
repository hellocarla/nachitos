import { Component, EventEmitter, Output } from '@angular/core';
import { paisDTO } from 'src/app/paisDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Areas } from 'src/app/areas';
import { PaisService } from 'src/app/services/pais.service';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-pais-form',
  templateUrl: './pais-form.component.html',
  styleUrls: ['./pais-form.component.css']
})
export class PaisFormComponent {
  @Output() paisCreated = new EventEmitter<paisDTO>();
  paisForm: FormGroup = new FormGroup({});
  possibleAreas: Areas[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private paisService: PaisService,
    private areasService: AreasService) {
      this.getPossibleAreas();
      this.createForm();
    }

    getPossibleAreas(): void {
      this.areasService.getAreas()
      .subscribe((data: Areas[]) => {
        this.possibleAreas = data;
      });
    }

    createForm(): void {
      this.paisForm = this.formBuilder.group({
        nome_pais: ['', Validators.required],
        cod_pais: ['', Validators.required],
        cod_zonageo: ['', Validators.required]
      });
    }

  onSubmit(): void {
    if(this.paisForm.valid) {
      const newPais: paisDTO = this.paisForm.value as paisDTO;
      this.paisService.createPais(newPais).subscribe(
        (createdPais: paisDTO) => {
          this.paisCreated.emit(createdPais);
          this.resetForm();
        },
        (error) => {
          console.error('Error creating country: ', error);
        }
      );
    }
  }

  resetForm(): void {
    this.paisForm.reset();
  }

}
