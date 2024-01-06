import { Component, EventEmitter, Output } from '@angular/core';
import { RecomendacoesDTO } from 'src/app/RecomendacoesDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecomendacoesService } from 'src/app/services/recomendacoes.service';
import { Surto } from 'src/app/surto';
import { SurtoService } from 'src/app/services/surto.service';
import { Areas } from 'src/app/areas';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-recomendacoes-form',
  templateUrl: './recomendacoes-form.component.html',
  styleUrls: ['./recomendacoes-form.component.css']
})
export class RecomendacoesFormComponent {
  @Output() recCreated = new EventEmitter<RecomendacoesDTO>();
  recForm: FormGroup = new FormGroup({});
  possibleAreas: Areas[] = [];
  possibleSurtos: Surto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private recService: RecomendacoesService,
    private areasService: AreasService,
    private surtoService: SurtoService) {
      this.getPossibleAreas();
      this.getPossibleSurtos();
      this.createForm();
    }

    getPossibleAreas(): void {
      this.areasService.getAreas()
        .subscribe((data: Areas[]) => {
          this.possibleAreas = data;
        });
    }

    getPossibleSurtos(): void {
      this.surtoService.getSurtos()
        .subscribe((data: Surto[]) => {
          this.possibleSurtos = data;
        });
    }

    createForm(): void {
      this.recForm = this.formBuilder.group({
        cod_recomendacao: ['', Validators.required],
        cod_zonageo: ['', Validators.required],
        cod_surto: ['', Validators.required],
        data_nota: ['', Validators.required],
        validade_nota: ['', Validators.required],
        recomendacao_texto: ['', Validators.required]
      });
    }

    onSubmit(): void {
      if(this.recForm.valid) {
        const newRec: RecomendacoesDTO = this.recForm.value as RecomendacoesDTO;
        this.recService.createRecs(newRec).subscribe(
          (createdRec: RecomendacoesDTO) => {
            this.recCreated.emit(createdRec);
            this.resetForm();
          }, (error) => {
            console.error('Error creating rec:', error);
          }
        );
      }
    }

    resetForm(): void {
      this.recForm.reset();
    }

}
