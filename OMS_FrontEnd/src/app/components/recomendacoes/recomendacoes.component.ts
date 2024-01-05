import { Component } from '@angular/core';
import { Recomendacoes } from 'src/app/recomendacoes';
import { RecomendacoesService } from 'src/app/services/recomendacoes.service';
import { RecomendacoesDTO } from 'src/app/RecomendacoesDTO';


@Component({
  selector: 'app-recomendacoes',
  templateUrl: './recomendacoes.component.html',
  styleUrls: ['./recomendacoes.component.css']
})
export class RecomendacoesComponent {
  recs: Recomendacoes [] = [];
  selectedRec?: Recomendacoes;

  constructor(private recomendacoesService: RecomendacoesService) {}

  ngOnInit(): void {
    this.getRecs();
  }

  onSelect(rec: Recomendacoes): void {
    this.selectedRec = rec;
  }

  getRecs(): void {
    this.recomendacoesService.getRecs()
      .subscribe((data: Recomendacoes[]) => {
        this.recs = data;
      });
  }

  onRecCreated(newRec: RecomendacoesDTO): void {
    this.getRecs();
  }

}