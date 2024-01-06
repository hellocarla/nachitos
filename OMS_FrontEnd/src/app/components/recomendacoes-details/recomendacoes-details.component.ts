import { Component, Input } from '@angular/core';
import { Recomendacoes } from 'src/app/recomendacoes';

@Component({
  selector: 'app-recomendacoes-details',
  templateUrl: './recomendacoes-details.component.html',
  styleUrls: ['./recomendacoes-details.component.css']
})
export class RecomendacoesDetailsComponent {
  @Input() selectedRec?: Recomendacoes;

}
