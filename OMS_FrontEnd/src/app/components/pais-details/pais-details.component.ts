import { Component, Input } from '@angular/core';
import { Pais } from 'src/app/pais';

@Component({
  selector: 'app-pais-details',
  templateUrl: './pais-details.component.html',
  styleUrls: ['./pais-details.component.css']
})
export class PaisDetailsComponent {
  @Input() selectedPais?: Pais;

}
