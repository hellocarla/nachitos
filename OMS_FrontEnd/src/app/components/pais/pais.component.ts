import { Component } from '@angular/core';
import { Pais } from 'src/app/pais';
import { PaisService } from 'src/app/services/pais.service';
import { paisDTO } from 'src/app/paisDTO';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent {
  paises: Pais [] = [];
  selectedPais?: Pais;

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.getPaises();
  }

  onSelect(pais: Pais): void {
    this.selectedPais = pais;
  }

  getPaises(): void {
    this.paisService.getPaises()
    .subscribe((data: Pais[]) => {
      this.paises = data;
    });
  }

  onPaisCreated(newPais: paisDTO): void {
    this.getPaises();
  }

}