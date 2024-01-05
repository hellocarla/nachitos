import { Component, EventEmitter, Output } from '@angular/core';
import { SurtoDTO } from 'src/app/surtoDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Virus } from 'src/app/virus';
import { Areas } from 'src/app/areas';
import { SurtoService } from 'src/app/services/surto.service';
import { VirusService } from 'src/app/services/virus.service';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-surto-form',
  templateUrl: './surto-form.component.html',
  styleUrls: ['./surto-form.component.css']
})
export class SurtoFormComponent {
  @Output() surtoCreated = new EventEmitter<SurtoDTO>();
  surtoForm: FormGroup = new FormGroup({});
  possibleAreas: Areas[] = [];
  possibleVirus: Virus[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private surtoService: SurtoService,
    private virusService: VirusService,
    private areasService: AreasService) {
      this.getPossibleVirus();
      this.getPossibleAreas();
      this.createForm();
    }

    getPossibleVirus(): void {
      this.virusService.getViruses()
        .subscribe((data: Virus[]) => {
          this.possibleVirus = data;
        });
    }

    getPossibleAreas(): void {
      this.areasService.getAreas()
        .subscribe((data: Areas[]) => {
          this.possibleAreas = data;
        });
    }

    createForm(): void {
      this.surtoForm = this.formBuilder.group({
        cod_surto: ['', Validators.required],
        cod_virus: ['', Validators.required],
        cod_zonageo: ['', Validators.required],
        data_inicio: ['', Validators.required],
        data_fim: ['']
      });
    }

    onSubmit(): void {
      if(this.surtoForm.valid) {
        const newSurto: SurtoDTO = this.surtoForm.value as SurtoDTO;
        this.surtoService.createSurto(newSurto).subscribe(
          (createdSurto: SurtoDTO) => {
            this.surtoCreated.emit(createdSurto);
            this.resetForm();
          },
          (error) => {
            console.error('Error creating the outbreak,', error);
          }
        );
      }
    }

    resetForm(): void {
      this.surtoForm.reset();
    }

}
